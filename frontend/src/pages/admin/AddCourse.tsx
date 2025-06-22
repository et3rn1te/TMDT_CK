import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, CheckCircle, BookOpen, Tag, DollarSign, Image, ArrowRight, ArrowLeft, Check, X } from 'lucide-react'; // Updated icons
import { courseApi } from '../../api/courses';
import { categoryApi } from '../../api/categories';
import { levelApi } from '../../api/levels';
import { CourseCreationRequest } from '../../types/courseTypes';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {CategoryResponse} from "../../types/categoryTypes.ts";
import {LevelResponse} from "../../types/levelTypes.ts";
import BackButton from "../../components/common/BackButton.tsx";

const AddCoursePage: React.FC = () => {
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<CourseCreationRequest>({
        title: '',
        description: '',
        price: 0,
        discountPrice: null,
        categoryId: 0,
        levelId: 0,
        sellerId: 0, // This will be set by backend based on authenticated user
        thumbnailUrl: '',
    });
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [levels, setLevels] = useState<LevelResponse[]>([]);

    // State for price inputs to handle formatted strings
    const [priceInput, setPriceInput] = useState<string>('');
    const [discountPriceInput, setDiscountPriceInput] = useState<string>('');

    const [isLoading, setIsLoading] = useState(false); // For form submission
    const [isDataLoading, setIsDataLoading] = useState(true); // For loading categories/levels
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchDropdownData = async () => {
            try {
                setIsDataLoading(true);
                const [fetchedCategories, fetchedLevels] = await Promise.all([
                    categoryApi.getAllCategories(),
                    levelApi.getAllLevels(),
                ]);
                setCategories(fetchedCategories);
                setLevels(fetchedLevels);
            } catch (err) {
                console.error("Error fetching categories or levels:", err);
                setError(err instanceof Error ? err.message : "Không thể tải danh mục hoặc cấp độ.");
            } finally {
                setIsDataLoading(false);
            }
        };
        fetchDropdownData();
    }, []);

    // Effect to update formatted price inputs when formData.price/discountPrice changes
    useEffect(() => {
        setPriceInput(formData.price === 0 ? '' : new Intl.NumberFormat('vi-VN').format(formData.price));
        setDiscountPriceInput(formData.discountPrice === null || formData.discountPrice === 0 ? '' : new Intl.NumberFormat('vi-VN').format(formData.discountPrice));
    }, [formData.price, formData.discountPrice]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: (name === 'categoryId' || name === 'levelId')
                ? Number(value)
                : value,
        }));
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Remove all non-digit characters for internal storage
        const rawValue = value.replace(/\D/g, '');
        const numericValue = rawValue === '' ? 0 : Number(rawValue);

        if (name === 'price') {
            setFormData(prevData => ({ ...prevData, price: numericValue }));
        } else if (name === 'discountPrice') {
            setFormData(prevData => ({ ...prevData, discountPrice: numericValue || null }));
        }
        // Update the input state for display (will be formatted by useEffect)
        if (name === 'price') {
            setPriceInput(value);
        } else if (name === 'discountPrice') {
            setDiscountPriceInput(value);
        }
    };

    const nextStep = () => {
        // Basic validation for current step before moving next
        if (currentStep === 1) { // Basic Info & Price
            if (!formData.title || !formData.description || formData.categoryId === 0 || formData.levelId === 0 || !formData.thumbnailUrl) {
                setError('Vui lòng điền đầy đủ thông tin cơ bản và chọn danh mục/cấp độ.');
                return;
            }
            if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
                setError('Vui lòng nhập giá khóa học hợp lệ.');
                return;
            }
        }
        setError(null); // Clear previous errors
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setError(null); // Clear errors when going back
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        // Final validation before submission
        if (!formData.title || !formData.description || formData.categoryId === 0 || formData.levelId === 0 || formData.price <= 0 || !formData.thumbnailUrl) {
            setError('Vui lòng điền đầy đủ và chính xác các thông tin bắt buộc trước khi tạo khóa học.');
            setIsLoading(false);
            return;
        }

        try {
            await courseApi.createCourse(formData);
            setSuccessMessage('Khóa học đã được tạo thành công!');
            // Reset form and navigate to first step or manage courses
            setFormData({
                title: '',
                description: '',
                price: 0,
                discountPrice: null,
                categoryId: 0,
                levelId: 0,
                sellerId: 0,
                thumbnailUrl: '',
            });
            // Reset price input states as well
            setPriceInput('');
            setDiscountPriceInput('');
            setCurrentStep(1); // Reset to first step
            setTimeout(() => navigate('/manage-courses'), 1500); // Redirect after success message
        } catch (err) {
            console.error('Error creating course:', err);
            setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tạo khóa học.');
        } finally {
            setIsLoading(false);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-8">
                        {/* Header */}
                        <div className="text-center border-b pb-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="h-8 w-8 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thông tin khóa học</h2>
                            <p className="text-gray-600">Điền thông tin cơ bản về khóa học của bạn</p>
                        </div>

                        {/* Basic Information */}
                        <div className="grid gap-6">
                            <div className="space-y-2">
                                <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                                    Tiêu đề khóa học *
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                    placeholder="Ví dụ: Luyện thi chứng chỉ IELTS 8.0+"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                                    Mô tả khóa học *
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
                                    placeholder="Mô tả chi tiết về nội dung, mục tiêu và đối tượng học viên của khóa học..."
                                    required
                                ></textarea>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="categoryId" className="block text-sm font-semibold text-gray-700">
                                        <Tag className="inline h-4 w-4 mr-1" />
                                        Danh mục *
                                    </label>
                                    <select
                                        name="categoryId"
                                        id="categoryId"
                                        value={formData.categoryId}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                                        required
                                    >
                                        <option value="0">Chọn danh mục</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="levelId" className="block text-sm font-semibold text-gray-700">
                                        Cấp độ *
                                    </label>
                                    <select
                                        name="levelId"
                                        id="levelId"
                                        value={formData.levelId}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                                        required
                                    >
                                        <option value="0">Chọn cấp độ</option>
                                        {levels.map((lvl) => (
                                            <option key={lvl.id} value={lvl.id}>{lvl.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="thumbnailUrl" className="block text-sm font-semibold text-gray-700">
                                    <Image className="inline h-4 w-4 mr-1" />
                                    URL ảnh bìa *
                                </label>
                                <input
                                    type="url"
                                    name="thumbnailUrl"
                                    id="thumbnailUrl"
                                    value={formData.thumbnailUrl}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                    placeholder="https://example.com/course-thumbnail.jpg"
                                    required
                                />
                            </div>

                            {/* Pricing */}
                            <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
                                <div className="flex items-center mb-4">
                                    <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                                    <h3 className="text-lg font-semibold text-gray-900">Định giá khóa học</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="price" className="block text-sm font-semibold text-gray-700">
                                            Giá gốc (VNĐ) *
                                        </label>
                                        <input
                                            type="text" // Changed to text
                                            name="price"
                                            id="price"
                                            value={priceInput} // Use priceInput state
                                            onChange={handlePriceChange} // Use new handler
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                                            placeholder="4.990.000"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="discountPrice" className="block text-sm font-semibold text-gray-700">
                                            Giá khuyến mãi (VNĐ)
                                        </label>
                                        <input
                                            type="text" // Changed to text
                                            name="discountPrice"
                                            id="discountPrice"
                                            value={discountPriceInput} // Use discountPriceInput state
                                            onChange={handlePriceChange} // Use new handler
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                                            placeholder="3.990.000"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-8">
                        {/* Header */}
                        <div className="text-center border-b pb-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Xác nhận thông tin</h2>
                            <p className="text-gray-600">Kiểm tra lại thông tin trước khi tạo khóa học</p>
                        </div>

                        {/* Course Preview */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                            <div className="flex items-start space-x-4">
                                <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                                    {formData.thumbnailUrl ? (
                                        <img src={formData.thumbnailUrl} alt="Thumbnail Preview" className="object-cover w-full h-full" />
                                    ) : (
                                        <Image className="h-8 w-8 text-gray-400" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{formData.title}</h3>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{formData.description}</p>
                                    <div className="flex items-center space-x-4 text-sm">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {categories.find(c => c.id === formData.categoryId)?.name}
                    </span>
                                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      {levels.find(l => l.id === formData.levelId)?.name}
                    </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-2xl font-bold text-green-600">
                                        {formData.discountPrice && formData.discountPrice > 0 ? // Check if discountPrice exists and is greater than 0
                                            `${new Intl.NumberFormat('vi-VN').format(formData.discountPrice)}đ` :
                                            `${new Intl.NumberFormat('vi-VN').format(formData.price)}đ`
                                        }
                                    </div>
                                    {formData.discountPrice && formData.discountPrice > 0 && ( // Display original price only if discount exists
                                        <div className="text-sm text-gray-500 line-through">
                                            {new Intl.NumberFormat('vi-VN').format(formData.price)}đ
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Details List */}
                        <div className="grid gap-4">
                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="font-medium text-gray-700">Tiêu đề:</span>
                                <span className="text-gray-900">{formData.title}</span>
                            </div>
                            <div className="flex justify-between items-start py-3 border-b border-gray-200">
                                <span className="font-medium text-gray-700">Mô tả:</span>
                                <span className="text-gray-900 text-right max-w-md">{formData.description}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="font-medium text-gray-700">Danh mục:</span>
                                <span className="text-gray-900">{categories.find(c => c.id === formData.categoryId)?.name}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="font-medium text-gray-700">Cấp độ:</span>
                                <span className="text-gray-900">{levels.find(l => l.id === formData.levelId)?.name}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="font-medium text-gray-700">Giá gốc:</span>
                                <span className="text-gray-900 font-semibold">{new Intl.NumberFormat('vi-VN').format(formData.price)}đ</span>
                            </div>
                            {formData.discountPrice !== null && formData.discountPrice !== 0 && ( // Ensure discountPrice is not null or 0
                                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                    <span className="font-medium text-gray-700">Giá khuyến mãi:</span>
                                    <span className="text-green-600 font-semibold">{new Intl.NumberFormat('vi-VN').format(formData.discountPrice)}đ</span>
                                </div>
                            )}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    if (isDataLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                <p className="ml-4 text-gray-700">Đang tải dữ liệu...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <BackButton size="lg" />
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tạo khóa học mới</h1>
                        <p className="text-lg text-gray-600">Chia sẻ kiến thức của bạn với cộng đồng học viên</p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-center mb-12">
                        <div className="flex items-center space-x-8">
                            <div className="flex items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                                    currentStep >= 1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600'
                                }`}>
                                    <Info className="h-6 w-6" />
                                </div>
                                <span className={`ml-3 font-medium ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-500'}`}>
                  Thông tin
                </span>
                            </div>

                            <div className={`w-16 h-1 transition-all duration-300 ${
                                currentStep > 1 ? 'bg-blue-600' : 'bg-gray-300'
                            }`}></div>

                            <div className="flex items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                                    currentStep >= 2 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600'
                                }`}>
                                    <CheckCircle className="h-6 w-6" />
                                </div>
                                <span className={`ml-3 font-medium ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-500'}`}>
                  Xác nhận
                </span>
                            </div>
                        </div>
                    </div>

                    {/* Main Form Card */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                        <div className="p-8">
                            {/* Error Message */}
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                                    <X className="h-5 w-5 text-red-500 mr-3" />
                                    <span className="text-red-700 font-medium">{error}</span>
                                </div>
                            )}
                            {/* Success Message */}
                            {successMessage && (
                                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                                    <Check className="h-5 w-5 text-green-500 mr-3" />
                                    <span className="text-green-700 font-medium">{successMessage}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                {renderStepContent()}

                                {/* Navigation Buttons */}
                                <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
                                    {currentStep > 1 && (
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-semibold rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                            disabled={isLoading}
                                        >
                                            <ArrowLeft className="h-5 w-5 mr-2" />
                                            Quay lại
                                        </button>
                                    )}
                                    {currentStep < 2 && (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="ml-auto inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                            disabled={isLoading}
                                        >
                                            Tiếp theo
                                            <ArrowRight className="h-5 w-5 ml-2" />
                                        </button>
                                    )}
                                    {currentStep === 2 && (
                                        <button
                                            type="submit"
                                            className="ml-auto inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg shadow-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Đang tạo...
                                                </>
                                            ) : (
                                                <>
                                                    <Check className="h-5 w-5 mr-2" />
                                                    Tạo khóa học
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AddCoursePage;