import React from 'react';
import { BookOpen } from 'lucide-react';
import { CourseSummaryResponse } from '../../types/courseTypes';
import CourseCard from './CourseCard';

interface CourseGridProps {
    courses: CourseSummaryResponse[];
    loading: boolean;
    searchQuery: string;
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses, loading, searchQuery }) => {
    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
    );

    const EmptyState = () => (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
                {searchQuery.trim() !== ''
                    ? `Không tìm thấy khóa học cho "${searchQuery}"`
                    : 'Không tìm thấy khóa học'
                }
            </h3>
            <p className="text-gray-500">
                Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục/khoảng giá khác.
            </p>
        </div>
    );

    if (loading) {
        return <LoadingSkeleton />;
    }

    if (courses.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {courses.map(course => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
};

export default CourseGrid;