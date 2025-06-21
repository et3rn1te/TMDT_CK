import React from 'react';
import { Search, DollarSign, SlidersHorizontal } from 'lucide-react';
import { CategoryResponse } from '../../types/categoryTypes';

interface SearchFilterBarProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    selectedCategory: number;
    onCategoryChange: (categoryId: number) => void;
    sortBy: string;
    onSortChange: (sortBy: string) => void;
    minPrice: number | '';
    maxPrice: number | '';
    onMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    categories: CategoryResponse[];
    onFilterToggle: () => void;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
                                                             searchQuery,
                                                             onSearchChange,
                                                             selectedCategory,
                                                             onCategoryChange,
                                                             sortBy,
                                                             onSortChange,
                                                             minPrice,
                                                             maxPrice,
                                                             onMinPriceChange,
                                                             onMaxPriceChange,
                                                             categories,
                                                             onFilterToggle
                                                         }) => {
    return (
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
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>
                </div>

                {/* Mobile filter button */}
                <div className="lg:hidden">
                    <button
                        type="button"
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={onFilterToggle}
                    >
                        <SlidersHorizontal className="h-5 w-5 mr-2" />
                        Bộ lọc
                    </button>
                </div>

                {/* Category Filter */}
                <div className="flex-shrink-0">
                    <select
                        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(Number(e.target.value))}
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
                        onChange={(e) => onSortChange(e.target.value)}
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
                        type="text"
                        placeholder="Giá thấp nhất"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        value={minPrice === '' ? '' : new Intl.NumberFormat('vi-VN').format(minPrice)}
                        onChange={onMinPriceChange}
                    />
                </div>
                <span className="text-gray-500">-</span>
                <div className="relative flex-grow">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Giá cao nhất"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        value={maxPrice === '' ? '' : new Intl.NumberFormat('vi-VN').format(maxPrice)}
                        onChange={onMaxPriceChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchFilterBar;