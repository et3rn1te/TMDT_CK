import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseApi } from '../../api/courses';
import { categoryApi } from '../../api/categories'; // Import categoryApi
import { levelApi } from '../../api/levels';     // Import levelApi
import { CourseResponse, CourseUpdateRequest } from '../../types/courseTypes';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {LevelResponse} from "../../types/levelTypes.ts";
import {CategoryResponse} from "../../types/categoryTypes.ts";

const EditCoursePage: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();

    const [courseDetails, setCourseDetails] = useState<CourseResponse | null>(null);
    const [formData, setFormData] = useState<CourseUpdateRequest>({
        title: '',
        description: '',
        price: 0,
        discountPrice: null,
        categoryId: 0,
        levelId: 0,
        thumbnailUrl: '',
    });
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [levels, setLevels] = useState<LevelResponse[]>([]);

    const [isLoading, setIsLoading] = useState(true); // Loading for course details and dropdowns
    const [isUpdating, setIsUpdating] = useState(false); // Loading for form submission
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!courseId) {
                setError('Không tìm thấy ID khóa học.');
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);

                // Fetch course details (bây giờ đã có categoryId, levelId trực tiếp)
                const courseData = await courseApi.getCourseById(Number(courseId));
                setCourseDetails(courseData);
                setFormData({
                    title: courseData.title,
                    description: courseData.description,
                    price: courseData.price,
                    discountPrice: courseData.discountPrice,
                    categoryId: courseData.category.id, // LẤY TRỰC TIẾP TỪ courseData
                    levelId: courseData.level.id,       // LẤY TRỰC TIẾP TỪ courseData
                    thumbnailUrl: courseData.thumbnailUrl || '',
                });

                // Fetch categories và levels để điền vào dropdown
                const [fetchedCategories, fetchedLevels] = await Promise.all([
                    categoryApi.getAllCategories(),
                    levelApi.getAllLevels(),
                ]);
                setCategories(fetchedCategories);
                setLevels(fetchedLevels);

            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err instanceof Error ? err.message : 'Không thể tải thông tin khóa học hoặc danh mục/cấp độ.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [courseId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: (name === 'price' || name === 'discountPrice' || name === 'categoryId' || name === 'levelId')
                ? Number(value)
                : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!courseId) return;

        setIsUpdating(true);
        setError(null);
        setSuccessMessage(null);

        // Basic validation
        if (!formData.title || !formData.description || formData.categoryId === 0 || formData.levelId === 0 || formData.price <= 0 || !formData.thumbnailUrl) {
            setError('Vui lòng điền đầy đủ và chính xác các thông tin bắt buộc.');
            setIsUpdating(false);
            return;
        }

        try {
            await courseApi.updateCourse(Number(courseId), formData);
            setSuccessMessage('Cập nhật khóa học thành công!');
            setTimeout(() => {
                navigate('/manage-courses');
            }, 1500);
        } catch (err) {
            console.error('Error updating course:', err);
            setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi cập nhật khóa học.');
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                <p className="ml-4 text-gray-700">Đang tải thông tin khóa học...</p>
            </div>
        );
    }

    if (error && !courseDetails) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                <Navbar />
                <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-xl text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Lỗi tải khóa học</h2>
                    <p className="text-gray-700 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/manage-courses')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Quay lại trang quản lý
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-8">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
                    <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Chỉnh sửa Khóa học: {courseDetails?.title}</h1>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Lỗi!</strong>
                            <span className="block sm:inline ml-2">{error}</span>
                        </div>
                    )}
                    {successMessage && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <strong className="font-bold">Thành công!</strong>
                            <span className="block sm:inline ml-2">{successMessage}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Tiêu đề khóa học */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Tiêu đề khóa học</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập tiêu đề khóa học"
                                required
                            />
                        </div>

                        {/* Mô tả khóa học */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả khóa học</label>
                            <textarea
                                name="description"
                                id="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={4}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Mô tả chi tiết về khóa học"
                                required
                            ></textarea>
                        </div>

                        {/* Danh mục */}
                        <div>
                            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Danh mục</label>
                            <select
                                name="categoryId"
                                id="categoryId"
                                value={formData.categoryId}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                required
                            >
                                <option value="0">Chọn danh mục</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Cấp độ */}
                        <div>
                            <label htmlFor="levelId" className="block text-sm font-medium text-gray-700">Cấp độ</label>
                            <select
                                name="levelId"
                                id="levelId"
                                value={formData.levelId}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                required
                            >
                                <option value="0">Chọn cấp độ</option>
                                {levels.map((lvl) => (
                                    <option key={lvl.id} value={lvl.id}>{lvl.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Giá */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Giá (VNĐ)</label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập giá khóa học"
                                min="0"
                                required
                            />
                        </div>

                        {/* Giá khuyến mãi */}
                        <div>
                            <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700">Giá khuyến mãi (VNĐ - Tùy chọn)</label>
                            <input
                                type="number"
                                name="discountPrice"
                                id="discountPrice"
                                value={formData.discountPrice || ''}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Nhập giá khuyến mãi nếu có"
                                min="0"
                            />
                        </div>

                        {/* URL ảnh bìa */}
                        <div>
                            <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700">URL ảnh bìa</label>
                            <input
                                type="text"
                                name="thumbnailUrl"
                                id="thumbnailUrl"
                                value={formData.thumbnailUrl}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Ví dụ: https://placehold.co/600x400/E0E0E0/000000?text=Course+Image"
                                required
                            />
                        </div>

                        {/* Nút lưu */}
                        <div className="flex justify-end mt-6">
                            <button
                                type="submit"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                disabled={isUpdating}
                            >
                                {isUpdating ? 'Đang cập nhật...' : 'Cập nhật Khóa học'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditCoursePage;
