import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, ArrowLeft, Video, FileText, Eye } from 'lucide-react';
import { lessonApi } from '../../api/lessons';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BackButton from '../../components/common/BackButton';
import { LessonCreationRequest } from '../../types/lessonTypes';

const AddLesson: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<LessonCreationRequest>({
        title: '',
        description: '',
        videoUrl: '',
        fileUrl: '',
        order: null,
        courseId: Number(courseId),
        isPreview: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!courseId) return;

        setIsSubmitting(true);
        setError(null);

        try {
            await lessonApi.createLesson(Number(courseId), formData);
            navigate(`/manage-courses/${courseId}/lessons`);
        } catch (err) {
            console.error('Error creating lesson:', err);
            setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tạo bài học');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <BackButton />
                
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Thêm bài học mới</h1>
                        <p className="text-gray-600">Tạo nội dung cho bài học của bạn</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="space-y-6">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Tiêu đề bài học *
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Nhập tiêu đề bài học"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    Mô tả
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Nhập mô tả cho bài học"
                                />
                            </div>

                            {/* Video URL */}
                            <div>
                                <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-2">
                                    <Video className="inline-block h-4 w-4 mr-1" />
                                    URL Video
                                </label>
                                <input
                                    type="url"
                                    id="videoUrl"
                                    name="videoUrl"
                                    value={formData.videoUrl}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Nhập URL video bài học"
                                />
                            </div>

                            {/* File URL */}
                            <div>
                                <label htmlFor="fileUrl" className="block text-sm font-medium text-gray-700 mb-2">
                                    <FileText className="inline-block h-4 w-4 mr-1" />
                                    URL Tài liệu
                                </label>
                                <input
                                    type="url"
                                    id="fileUrl"
                                    name="fileUrl"
                                    value={formData.fileUrl}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Nhập URL tài liệu bài học"
                                />
                            </div>

                            {/* Order */}
                            <div>
                                <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">
                                    Thứ tự
                                </label>
                                <input
                                    type="number"
                                    id="order"
                                    name="order"
                                    value={formData.order || ''}
                                    onChange={handleInputChange}
                                    min="1"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Nhập thứ tự bài học (để trống để tự động)"
                                />
                            </div>

                            {/* Preview Toggle */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isPreview"
                                    name="isPreview"
                                    checked={formData.isPreview}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="isPreview" className="ml-2 block text-sm text-gray-700">
                                    <Eye className="inline-block h-4 w-4 mr-1" />
                                    Cho phép xem trước
                                </label>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                type="button"
                                onClick={() => navigate(`/manage-courses/${courseId}/lessons`)}
                                className="mr-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Đang tạo...
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <Plus className="h-4 w-4 mr-1" />
                                        Tạo bài học
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AddLesson; 