import React from 'react';
import { Link } from 'react-router-dom';
import { User, BookOpen } from 'lucide-react';
import { CourseSummaryResponse } from '../../types/courseTypes.ts';

type CourseCardProps = {
    course: CourseSummaryResponse;
};

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const {
        id,
        title,
        price,
        discountPrice,
        thumbnailUrl,
        levelName,
        sellerName,
        categoryName,
    } = course;

    // Format price in VND
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    // Map English level to Vietnamese
    const getLocalizedLevel = (level: string) => {
        switch (level) {
            case 'Beginner':
                return 'Cơ bản';
            case 'Intermediate':
                return 'Trung cấp';
            case 'Advanced':
                return 'Nâng cao';
            case 'All Levels':
                return 'Tất cả cấp độ';
            default:
                return level;
        }
    };

    // Calculate discount percentage
    const getDiscountPercentage = () => {
        if (discountPrice && price > discountPrice) {
            return Math.round(((price - discountPrice) / price) * 100);
        }
        return 0;
    };

    const hasDiscount = discountPrice && price > discountPrice;

    return (
        <Link
            to={`/course/${id}`}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 block"
        >
            <div className="relative">
                <img
                    src={thumbnailUrl}
                    alt={title}
                    className="w-full h-48 object-cover"
                />
                {hasDiscount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                        {getDiscountPercentage()}% giảm
                    </div>
                )}
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {title}
                </h3>

                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <User className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{sellerName}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <div className="flex items-center mr-4">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        <span>{getLocalizedLevel(levelName)}</span>
                    </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                    <BookOpen className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{categoryName}</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        {hasDiscount ? (
                            <>
                                <span className="text-lg font-bold text-red-500">
                                    {formatPrice(discountPrice!)}
                                </span>
                                <span className="ml-2 text-sm text-gray-500 line-through">
                                    {formatPrice(price)}
                                </span>
                            </>
                        ) : (
                            <span className="text-lg font-bold text-gray-900">
                                {formatPrice(price)}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;