import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { courseApi } from '../../api/courses';
import { categoryApi } from '../../api/categories';
import { levelApi } from '../../api/levels';
import { CourseSummaryResponse, CourseFilterRequest } from '../../types/courseTypes';
import { CategoryResponse } from "../../types/categoryTypes.ts";
import { LevelResponse } from "../../types/levelTypes.ts";
import FilterSidebar from '../../components/course/FilterSidebar';
import SearchFilterBar from '../../components/course/SearchFilterBar';
import CourseGrid from '../../components/course/CourseGrid';

const CourseList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const urlQuery = searchParams.get('q') || '';

    // Data states
    const [courses, setCourses] = useState<CourseSummaryResponse[]>([]);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [allLevels, setAllLevels] = useState<LevelResponse[]>([]);

    // UI states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filtersOpen, setFiltersOpen] = useState(false);

    // Filter states
    const [searchQuery, setSearchQuery] = useState(urlQuery);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [minPrice, setMinPrice] = useState<number | ''>('');
    const [maxPrice, setMaxPrice] = useState<number | ''>('');
    const [sortBy, setSortBy] = useState<string>('id');
    const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
    const [selectedPriceTypes, setSelectedPriceTypes] = useState<string[]>([]);

    // Utility functions
    const getSortConfig = (sortBy: string) => {
        const sortConfigs = {
            'price-asc': { sortBy: 'discountPrice', sortDirection: 'asc' },
            'price-desc': { sortBy: 'discountPrice', sortDirection: 'desc' },
            'newest': { sortBy: 'id', sortDirection: 'desc' },
            default: { sortBy: 'id', sortDirection: 'desc' }
        };
        return sortConfigs[sortBy as keyof typeof sortConfigs] || sortConfigs.default;
    };

    const buildFilterRequest = (): CourseFilterRequest => {
        const { sortBy: backendSortBy, sortDirection } = getSortConfig(sortBy);
        const levelIds = allLevels
            .filter(level => selectedLevels.includes(level.name))
            .map(level => level.id);

        return {
            keyword: searchQuery.trim() || null,
            categoryId: selectedCategory || null,
            levelIds: levelIds.length > 0 ? levelIds : null,
            minPrice: minPrice !== '' ? minPrice : null,
            maxPrice: maxPrice !== '' ? maxPrice : null,
            sellerId: null,
            sortBy: backendSortBy,
            sortDirection,
            status: 'PUBLISHED'
        };
    };

    // API functions
    const fetchFilteredCourses = async () => {
        try {
            setLoading(true);
            setError(null);
            const filterRequest = buildFilterRequest();
            const fetchedCourses = await courseApi.filterCourses(filterRequest);
            setCourses(fetchedCourses);
        } catch (err) {
            console.error('Error fetching filtered courses:', err);
            setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tải danh sách khóa học');
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchInitialData = async () => {
        try {
            const [fetchedCategories, fetchedLevels] = await Promise.all([
                categoryApi.getAllCategories(),
                levelApi.getAllLevels()
            ]);

            setCategories([{ id: 0, name: 'Tất cả danh mục', description: '' }, ...fetchedCategories]);
            setAllLevels(fetchedLevels);
        } catch (err) {
            console.error('Error fetching initial data:', err);
        }
    };

    // Event handlers
    const handlePriceInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setter: React.Dispatch<React.SetStateAction<number | ''>>
    ) => {
        const numericValue = e.target.value.replace(/\D/g, '');
        setter(numericValue === '' ? '' : Number(numericValue));
    };

    const handleLevelChange = (levelName: string) => {
        setSelectedLevels(prev =>
            prev.includes(levelName)
                ? prev.filter(l => l !== levelName)
                : [...prev, levelName]
        );
    };

    const handlePriceTypeChange = (priceType: string) => {
        setSelectedPriceTypes(prev =>
            prev.includes(priceType)
                ? prev.filter(p => p !== priceType)
                : [...prev, priceType]
        );
    };

    // Effects
    useEffect(() => {
        setSearchQuery(urlQuery);
    }, [urlQuery]);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (searchQuery.trim()) {
            params.set('q', searchQuery.trim());
        } else {
            params.delete('q');
        }
        setSearchParams(params, { replace: true });
    }, [searchQuery, searchParams, setSearchParams]);

    useEffect(() => {
        if (categories.length === 0 || allLevels.length === 0) {
            fetchInitialData();
        }
    }, []);

    useEffect(() => {
        if (categories.length > 0 && allLevels.length > 0) {
            const debounceTimeout = setTimeout(fetchFilteredCourses, 300);
            return () => clearTimeout(debounceTimeout);
        }
    }, [searchQuery, selectedCategory, minPrice, maxPrice, sortBy, selectedLevels, categories.length, allLevels.length]);

    const isSearchMode = searchQuery.trim() !== '';

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-grow">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">
                        {isSearchMode ? `Kết quả tìm kiếm cho "${searchQuery}"` : 'Khám phá khóa học'}
                    </h1>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Filter Column */}
                        <aside className="hidden lg:block w-80 flex-shrink-0">
                            <div className="sticky top-8">
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"/>
                                        </svg>
                                        Bộ lọc tìm kiếm
                                    </h2>
                                    <FilterSidebar
                                        selectedLevels={selectedLevels}
                                        selectedPriceTypes={selectedPriceTypes}
                                        onLevelChange={handleLevelChange}
                                        onPriceTypeChange={handlePriceTypeChange}
                                        allLevels={allLevels}
                                    />
                                </div>
                            </div>
                        </aside>

                        {/* Main Content Column */}
                        <div className="flex-1 min-w-0 flex flex-col gap-6">
                            {/* Hàng 1: Bộ lọc tìm kiếm giá, danh mục, sắp xếp */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <p className="text-gray-600 mb-4">
                                    {isSearchMode
                                        ? `Tìm thấy ${courses.length} khóa học phù hợp`
                                        : 'Tìm kiếm và lựa chọn khóa học phù hợp với bạn'}
                                </p>
                                <SearchFilterBar
                                    searchQuery={searchQuery}
                                    onSearchChange={setSearchQuery}
                                    selectedCategory={selectedCategory}
                                    onCategoryChange={setSelectedCategory}
                                    sortBy={sortBy}
                                    onSortChange={setSortBy}
                                    minPrice={minPrice}
                                    maxPrice={maxPrice}
                                    onMinPriceChange={(e) => handlePriceInputChange(e, setMinPrice)}
                                    onMaxPriceChange={(e) => handlePriceInputChange(e, setMaxPrice)}
                                    categories={categories}
                                    onFilterToggle={() => setFiltersOpen(!filtersOpen)}
                                />
                            </div>

                            {/* Hàng 2: Danh sách khóa học */}
                            <div className="bg-white rounded-lg shadow-sm">
                                {error ? (
                                    <div className="p-8 text-center">
                                        <div className="text-red-500 mb-4">
                                            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-red-800 mb-2">Có lỗi xảy ra</h3>
                                        <p className="text-red-600">{error}</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="p-6 bg-gray-50 rounded-t-lg">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <h2 className="text-xl font-semibold text-gray-900">Danh sách khóa
                                                        học</h2>
                                                    {!loading && (
                                                        <span
                                                            className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                        {courses.length} khóa học
                      </span>
                                                    )}
                                                </div>
                                                {/* Mobile Filter Toggle */}
                                                <button
                                                    onClick={() => setFiltersOpen(!filtersOpen)}
                                                    className="lg:hidden bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor"
                                                         viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2}
                                                              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"/>
                                                    </svg>
                                                    <span>Bộ lọc</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <CourseGrid
                                                courses={courses}
                                                loading={loading}
                                                searchQuery={searchQuery}
                                                isSearchMode={isSearchMode}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>


            <Footer/>
        </div>
    );
};

export default CourseList;