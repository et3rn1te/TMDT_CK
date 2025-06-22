import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Plus, 
    Edit, 
    Trash2, 
    Eye, 
    EyeOff, 
    ArrowUp, 
    ArrowDown,
    Video,
    FileText,
    GripVertical,
    BookOpen,
    Loader2
} from 'lucide-react';
import { lessonApi } from '../../api/lessons';
import { courseApi } from '../../api/courses';
import { LessonSummaryResponse } from '../../types/lessonTypes';
import { CourseResponse } from '../../types/courseTypes';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BackButton from '../../components/common/BackButton';
import { useAuth } from '../../context/AuthContext';

const ManageLessons: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();
    const { userRole } = useAuth();

    const [lessons, setLessons] = useState<LessonSummaryResponse[]>([]);
    const [courseDetails, setCourseDetails] = useState<CourseResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Fetch lessons and course details
    useEffect(() => {
        const fetchData = async () => {
            if (!courseId) {
                setError('Không tìm thấy ID khóa học');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const [courseData, lessonsData] = await Promise.all([
                    courseApi.getCourseById(Number(courseId)),
                    lessonApi.getLessonsByCourseId(Number(courseId))
                ]);
                setCourseDetails(courseData);
                setLessons([...lessonsData].sort((a, b) => a.order - b.order));
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tải dữ liệu');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [courseId]);

    const handleDeleteLesson = async (lessonId: number) => {
        if (!courseId) return;
        
        if (window.confirm('Bạn có chắc chắn muốn xóa bài học này không?')) {
            setIsDeleting(true);
            try {
                await lessonApi.deleteLesson(Number(courseId), lessonId);
                setLessons(prevLessons => prevLessons.filter(lesson => lesson.id !== lessonId));
            } catch (err) {
                console.error('Error deleting lesson:', err);
                setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi xóa bài học');
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const handleMoveLesson = async (lessonId: number, direction: 'up' | 'down') => {
        if (!courseId) return;

        const currentIndex = lessons.findIndex(lesson => lesson.id === lessonId);
        if (
            (direction === 'up' && currentIndex === 0) || 
            (direction === 'down' && currentIndex === lessons.length - 1)
        ) return;

        const newLessons = [...lessons];
        const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        
        // Swap lessons
        [newLessons[currentIndex], newLessons[targetIndex]] = 
        [newLessons[targetIndex], newLessons[currentIndex]];

        // Update order property
        newLessons[currentIndex].order = currentIndex + 1;
        newLessons[targetIndex].order = targetIndex + 1;

        try {
            await lessonApi.reorderLessons(
                Number(courseId), 
                newLessons.map(lesson => lesson.id)
            );
            setLessons(newLessons);
        } catch (err) {
            console.error('Error reordering lessons:', err);
            setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi sắp xếp lại bài học');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-700">{error}</p>
                    </div>
                    <button
                        onClick={() => navigate('/manage-courses')}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        ← Quay lại trang quản lý khóa học
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <BackButton />
                
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Quản lý bài học: {courseDetails?.title}
                    </h1>
                    <p className="text-gray-600">
                        Tổng số bài học: {lessons.length}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate(`/manage-courses/${courseId}/lessons/add`)}
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Thêm bài học mới
                    </button>
                </div>

                {/* Lessons List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {lessons.length === 0 ? (
                        <div className="p-8 text-center">
                            <div className="mb-4">
                                <BookOpen className="h-12 w-12 text-gray-400 mx-auto" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Chưa có bài học nào
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Bắt đầu thêm bài học đầu tiên cho khóa học của bạn
                            </p>
                            <button
                                onClick={() => navigate(`/manage-courses/${courseId}/lessons/add`)}
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Thêm bài học mới
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Thứ tự
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tiêu đề
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Trạng thái
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {lessons.map((lesson, index) => (
                                        <tr key={lesson.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <GripVertical className="h-4 w-4 text-gray-400 mr-2" />
                                                    <span className="text-sm text-gray-900">{lesson.order}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {lesson.title}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    lesson.isPreview 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {lesson.isPreview ? (
                                                        <>
                                                            <Eye className="h-3 w-3 mr-1" />
                                                            Xem trước
                                                        </>
                                                    ) : (
                                                        <>
                                                            <EyeOff className="h-3 w-3 mr-1" />
                                                            Khóa
                                                        </>
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button
                                                        onClick={() => handleMoveLesson(lesson.id, 'up')}
                                                        disabled={index === 0}
                                                        className={`p-1 rounded-lg hover:bg-gray-100 ${
                                                            index === 0 ? 'text-gray-300' : 'text-gray-500'
                                                        }`}
                                                    >
                                                        <ArrowUp className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleMoveLesson(lesson.id, 'down')}
                                                        disabled={index === lessons.length - 1}
                                                        className={`p-1 rounded-lg hover:bg-gray-100 ${
                                                            index === lessons.length - 1 ? 'text-gray-300' : 'text-gray-500'
                                                        }`}
                                                    >
                                                        <ArrowDown className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => navigate(`/manage-courses/${courseId}/lessons/${lesson.id}/edit`)}
                                                        className="p-1 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteLesson(lesson.id)}
                                                        disabled={isDeleting}
                                                        className="p-1 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ManageLessons; 