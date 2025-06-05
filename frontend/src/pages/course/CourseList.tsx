import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, BookOpen, User, Search, Filter, DollarSign } from 'lucide-react'; // Added DollarSign icon
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { courseApi } from '../../api/courses';
import { categoryApi } from '../../api/categories';
import { CourseSummaryResponse, CourseFilterRequest } from '../../types/courseTypes';
import {CategoryResponse} from "../../types/categoryTypes.ts"; // Import CourseFilterRequest

const CourseList = () => {
    const [courses, setCourses] = useState<CourseSummaryResponse[]>([]);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter and Sort states, mapping to CourseFilterRequest fields
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number>(0); // 0 for 'all' categories
    const [minPrice, setMinPrice] = useState<number | ''>(''); // Allow empty string for no filter
    const [maxPrice, setMaxPrice] = useState<number | ''>(''); // Allow empty string for no filter
    const [sortBy, setSortBy] = useState<string>('id'); // Default sortBy field for backend (e.g., 'id')
    const [sortDirection, setSortDirection] = useState<string>('desc'); // Default sortDirection ('asc' or 'desc')

    useEffect(() => {
        const fetchFilteredCourses = async () => {
            try {
                setLoading(true);
                setError(null);

                // Map frontend sortBy to backend sortBy and sortDirection
                let backendSortBy = 'id'; // Default to ID for 'newest'
                let backendSortDirection = 'desc';

                if (sortBy === 'price-asc') {
                    backendSortBy = 'price'; // Assuming backend sorts by 'price' for price-related sort
                    backendSortDirection = 'asc';
                } else if (sortBy === 'price-desc') {
                    backendSortBy = 'price';
                    backendSortDirection = 'desc';
                }
                // If sortBy is 'newest', it implies 'id' desc, which is the default set above.

                const filterRequest: CourseFilterRequest = {
                    keyword: searchQuery.trim() !== '' ? searchQuery : null, // Send null if empty
                    categoryId: selectedCategory !== 0 ? selectedCategory : null, // Send null if 'all'
                    levelId: null, // Not currently exposed in UI, send null
                    minPrice: minPrice !== '' ? minPrice : null, // Send null if empty
                    maxPrice: maxPrice !== '' ? maxPrice : null, // Send null if empty
                    sellerId: null, // Not currently exposed in UI, send null
                    sortBy: backendSortBy,
                    sortDirection: backendSortDirection,
                    status: null // Not currently exposed in UI, send null
                };

                // Fetch courses using the filter endpoint
                const fetchedCourses = await courseApi.filterCourses(filterRequest);
                setCourses(fetchedCourses);

            } catch (err) {
                console.error('Error fetching filtered courses:', err);
                setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tải danh sách khóa học');
                setCourses([]); // Ensure courses is empty on error
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const fetchedCategories = await categoryApi.getAllCategories();
                setCategories([{ id: 0, name: 'Tất cả danh mục', description: '' }, ...fetchedCategories]);
            } catch (err) {
                console.error('Error fetching categories:', err);
                // Optionally set an error specifically for categories if needed
            }
        };

        // Fetch categories only once on component mount
        fetchCategories();

        // Fetch filtered courses whenever filter/sort parameters change
        const debounceTimeout = setTimeout(() => {
            fetchFilteredCourses();
        }, 300); // Debounce API calls for search/filter inputs

        return () => clearTimeout(debounceTimeout); // Cleanup debounce timeout
    }, [searchQuery, selectedCategory, minPrice, maxPrice, sortBy, sortDirection]); // Dependencies for re-fetching

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    // New helper function to handle price input formatting
    const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number | ''>>) => {
        const rawValue = e.target.value;
        // Remove non-numeric characters (allowing only digits)
        const numericValue = rawValue.replace(/\D/g, ''); // \D matches any character that is not a digit

        if (numericValue === '') {
            setter(''); // If input is empty, set state to empty string
        } else {
            setter(Number(numericValue)); // Convert to number and set state
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Khám phá khóa học</h1>
                        <p className="text-gray-600">Tìm kiếm và lựa chọn khóa học phù hợp với bạn</p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                            <strong className="font-bold">Lỗi! </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {/* Search and Filter */}
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                        <div className="flex flex-col md:flex-row gap-4 mb-4">
                            {/* Search */}
                            <div className="flex-grow">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm khóa học..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="flex-shrink-0">
                                <select
                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(Number(e.target.value))}
                                >
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort */}
                            <div className="flex-shrink-0">
                                <select
                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                    value={sortBy}
                                    onChange={(e) => {
                                        setSortBy(e.target.value);
                                        // Adjust sortDirection based on sortBy selection
                                        if (e.target.value === 'price-asc') setSortDirection('asc');
                                        else if (e.target.value === 'price-desc') setSortDirection('desc');
                                        else setSortDirection('desc'); // Default for 'newest' (id)
                                    }}
                                >
                                    <option value="newest">Mới nhất</option>
                                    <option value="price-asc">Giá tăng dần</option>
                                    <option value="price-desc">Giá giảm dần</option>
                                </select>
                            </div>
                        </div>

                        {/* Price Range Filter */}
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <span className="text-gray-700 font-medium whitespace-nowrap">Khoảng giá:</span>
                            <div className="relative flex-grow">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text" // Changed to text for formatting
                                    placeholder="Giá thấp nhất"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    value={minPrice === '' ? '' : new Intl.NumberFormat('vi-VN').format(minPrice)} // Format for display
                                    onChange={(e) => handlePriceInputChange(e, setMinPrice)}
                                    // min="0" is not applicable for type="text"
                                />
                            </div>
                            <span className="text-gray-500">-</span>
                            <div className="relative flex-grow">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text" // Changed to text for formatting
                                    placeholder="Giá cao nhất"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    value={maxPrice === '' ? '' : new Intl.NumberFormat('vi-VN').format(maxPrice)} // Format for display
                                    onChange={(e) => handlePriceInputChange(e, setMaxPrice)}
                                    // min="0" is not applicable for type="text"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Course List */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                                    <div className="h-48 bg-gray-200" />
                                    <div className="p-4">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : courses.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-1">Không tìm thấy khóa học</h3>
                            <p className="text-gray-500">Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục/khoảng giá khác.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map(course => (
                                <Link
                                    key={course.id}
                                    to={`/course/${course.id}`}
                                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                                >
                                    <div className="relative">
                                        <img
                                            src={course.thumbnailUrl}
                                            alt={course.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        {course.discountPrice && course.price > course.discountPrice && ( // Ensure discount price is actually lower
                                            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                                                {Math.round(((course.price - course.discountPrice) / course.price) * 100)}% giảm
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                            {course.title}
                                        </h3>
                                        <div className="flex items-center text-sm text-gray-600 mb-2">
                                            <User className="h-4 w-4 mr-1" />
                                            <span>{course.sellerName}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600 mb-4">
                                            <BookOpen className="h-4 w-4 mr-1" />
                                            <span>{course.category.name}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                {course.discountPrice ? (
                                                    <>
                            <span className="text-lg font-bold text-red-500">
                              {formatPrice(course.discountPrice)}
                            </span>
                                                        <span className="ml-2 text-sm text-gray-500 line-through">
                              {formatPrice(course.price)}
                            </span>
                                                    </>
                                                ) : (
                                                    <span className="text-lg font-bold text-gray-900">
                            {formatPrice(course.price)}
                          </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CourseList;
