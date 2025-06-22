import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {
    Edit,
    Info,
    CheckCircle,
    BookOpen,
    Tag,
    DollarSign,
    Image,
    ArrowRight,
    ArrowLeft,
    Check,
    X,
    Upload,
    RotateCcw
} from 'lucide-react'; // Added icons for consistent UI
import {courseApi} from '../../api/courses';
import {categoryApi} from '../../api/categories';
import {levelApi} from '../../api/levels';
import {CourseResponse, CourseUpdateRequest} from '../../types/courseTypes';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {CategoryResponse} from "../../types/categoryTypes.ts";
import {LevelResponse} from "../../types/levelTypes.ts";
import BackButton from "../../components/common/BackButton.tsx";
import {useAuth} from '../../context/AuthContext';

const EditCoursePage: React.FC = () => {
    const {userRole} = useAuth();
    const {courseId} = useParams<{ courseId: string }>();
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(1); // Added for multi-step form
    const [courseDetails, setCourseDetails] = useState<CourseResponse | null>(null); // Original fetched details
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
    const [isUpdatingCourseStatus, setIsUpdatingCourseStatus] = useState(false);
    const [levels, setLevels] = useState<LevelResponse[]>([]);
    const [selectedAdminStatus, setSelectedAdminStatus] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true); // For initial data fetch (course + dropdowns)
    const [isUpdating, setIsUpdating] = useState(false); // For form submission
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const getLocalizedCourseStatus = (status: string) => {
        switch (status) {
            case 'DRAFT':
                return 'Bản nháp';
            case 'PENDING_APPROVAL':
                return 'Chờ duyệt';
            case 'PUBLISHED':
                return 'Đã xuất bản';
            case 'REJECTED':
                return 'Đã từ chối';
            case 'ARCHIVED':
                return 'Đã lưu trữ';
            default:
                return status;
        }
    };

    // Effect to fetch initial course data and dropdown options
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

                const courseData = await courseApi.getCourseById(Number(courseId));
                setCourseDetails(courseData); // Store original course details
                setFormData({ // Populate formData for editing
                    title: courseData.title,
                    description: courseData.description,
                    price: courseData.price,
                    discountPrice: courseData.discountPrice,
                    categoryId: courseData.category.id,
                    levelId: courseData.level.id,
                    thumbnailUrl: courseData.thumbnailUrl || '',
                });
                setSelectedAdminStatus(courseData.status);

                const [fetchedCategories, fetchedLevels] = await Promise.all([
                    categoryApi.getAllCategories(),
                    levelApi.getAllLevels(),
                ]);
                setCategories(fetchedCategories);
                setLevels(fetchedLevels);

            } catch (err) {
                console.error('Error fetching data for editing:', err);
                setError(err instanceof Error ? err.message : 'Không thể tải thông tin khóa học hoặc danh mục/cấp độ.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [courseId]);

    // Handle input changes (same as AddCoursePage)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: (name === 'price' || name === 'discountPrice' || name === 'categoryId' || name === 'levelId')
                ? Number(value)
                : value,
        }));
    };

    // Handle change for admin status dropdown
    const handleAdminStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAdminStatus(e.target.value);
    };

    // Navigate to the next step (validation added)
    const nextStep = () => {
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
        setError(null);
        setCurrentStep((prevStep) => prevStep + 1);
    };

    // Navigate to the previous step
    const prevStep = () => {
        setError(null);
        setCurrentStep((prevStep) => prevStep - 1);
    };

    // Handle form submission (update course)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!courseId) return;

        setIsUpdating(true);
        setError(null);
        setSuccessMessage(null);

        // Final validation before submission
        if (!formData.title || !formData.description || formData.categoryId === 0 || formData.levelId === 0 || formData.price <= 0 || !formData.thumbnailUrl) {
            setError('Vui lòng điền đầy đủ và chính xác các thông tin bắt buộc trước khi cập nhật khóa học.');
            setIsUpdating(false);
            return;
        }

        try {
            await courseApi.updateCourse(Number(courseId), formData);
            setSuccessMessage('Cập nhật khóa học thành công!');
            setTimeout(() => {
                navigate('/manage-courses'); // Redirect to manage courses after success
            }, 1500);
        } catch (err) {
            console.error('Error updating course:', err);
            setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi cập nhật khóa học.');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleUpdateCourseStatus = async (newStatus: string) => {
        if (!courseId) return; // Đảm bảo có courseId

        const confirmMessage = `Bạn có chắc chắn muốn chuyển trạng thái khóa học sang "${newStatus}" không?`;
        if (window.confirm(confirmMessage)) {
            setIsUpdatingCourseStatus(true);
            try {
                await courseApi.updateCourseStatus(parseInt(courseId), {status: newStatus});
                alert(`Trạng thái khóa học đã được cập nhật thành "${newStatus}"!`);
                // Tải lại chi tiết khóa học để cập nhật UI ngay lập tức
                const updatedCourse = await courseApi.getCourseById(parseInt(courseId));
                setCourseDetails(updatedCourse);
                setFormData({
                    ...updatedCourse,
                    categoryId: updatedCourse.category.id,
                    levelId: updatedCourse.level.id,
                });
                setSelectedAdminStatus(updatedCourse.status);
            } catch (err: any) {
                console.error("Lỗi khi cập nhật trạng thái khóa học:", err);
                alert(err.message || "Không thể cập nhật trạng thái khóa học.");
            } finally {
                setIsUpdatingCourseStatus(false);
            }
        }
    };

    // Render content based on the current step
    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-8">
                        <div className="text-center border-b pb-6">
                            <div
                                className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="h-8 w-8 text-blue-600"/>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thông tin khóa học</h2>
                            <p className="text-gray-600">Chỉnh sửa thông tin cơ bản về khóa học của bạn</p>
                        </div>

                        <div className="grid gap-6">
                            <div className="space-y-2">
                                <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Tiêu đề
                                    khóa học *</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                                    placeholder="Tiêu đề khóa học"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Mô tả
                                    khóa học *</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
                                    placeholder="Mô tả chi tiết về khóa học"
                                    required
                                ></textarea>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="categoryId"
                                           className="block text-sm font-semibold text-gray-700"><Tag
                                        className="inline h-4 w-4 mr-1"/>Danh mục *</label>
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
                                    <label htmlFor="levelId" className="block text-sm font-semibold text-gray-700">Cấp
                                        độ *</label>
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
                                <label htmlFor="thumbnailUrl"
                                       className="block text-sm font-semibold text-gray-700"><Image
                                    className="inline h-4 w-4 mr-1"/>URL ảnh bìa *</label>
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

                            <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
                                <div className="flex items-center mb-4">
                                    <DollarSign className="h-5 w-5 text-green-600 mr-2"/>
                                    <h3 className="text-lg font-semibold text-gray-900">Định giá khóa học</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="price" className="block text-sm font-semibold text-gray-700">Giá
                                            gốc (VNĐ) *</label>
                                        <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                                            placeholder="499000"
                                            min="0"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="discountPrice"
                                               className="block text-sm font-semibold text-gray-700">Giá khuyến mãi
                                            (VNĐ)</label>
                                        <input
                                            type="number"
                                            name="discountPrice"
                                            id="discountPrice"
                                            value={formData.discountPrice || ''}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
                                            placeholder="399000"
                                            min="0"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Phần cập nhật trạng thái cho SELLER */}
                            {userRole === 'SELLER' && courseDetails && ( // Chỉ hiển thị nếu là SELLER và có chi tiết khóa học
                                <div className="mt-8 pt-8 border-t border-gray-200">
                                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                        <Info className="h-6 w-6 mr-2 text-indigo-600"/> Quản lý trạng thái khóa học
                                    </h2>
                                    <div className="space-y-4">
                                        <p className="text-gray-700">
                                            Trạng thái hiện tại: <span className={`font-semibold ${
                                            courseDetails.status === 'PUBLISHED' ? 'text-green-600' :
                                                courseDetails.status === 'PENDING_APPROVAL' ? 'text-yellow-600' :
                                                    courseDetails.status === 'REJECTED' ? 'text-red-600' :
                                                        'text-gray-600'
                                        }`}>
                    {getLocalizedCourseStatus(courseDetails.status)}
                </span>
                                        </p>

                                        {/* Nút/dropdown cho SELLER để chuyển trạng thái */}
                                        <div className="flex gap-4">
                                            {courseDetails.status === 'DRAFT' && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleUpdateCourseStatus('PENDING_APPROVAL')}
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    disabled={isUpdatingCourseStatus}
                                                >
                                                    {isUpdatingCourseStatus ? (
                                                        <div
                                                            className="animate-spin rounded-full h-5 w-5 border-b-2 border-white-500 inline-block mr-2"></div>
                                                    ) : (
                                                        <Upload className="h-5 w-5 mr-2"/>
                                                    )}
                                                    Gửi duyệt
                                                </button>
                                            )}

                                            {courseDetails.status === 'PENDING_APPROVAL' && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleUpdateCourseStatus('DRAFT')}
                                                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    disabled={isUpdatingCourseStatus}
                                                >
                                                    {isUpdatingCourseStatus ? (
                                                        <div
                                                            className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500 inline-block mr-2"></div>
                                                    ) : (
                                                        <RotateCcw className="h-5 w-5 mr-2"/>
                                                    )}
                                                    Rút lại bản nháp
                                                </button>
                                            )}

                                            {courseDetails.status === 'REJECTED' && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleUpdateCourseStatus('DRAFT')}
                                                    className="inline-flex items-center px-4 py-2 border border-blue-300 text-sm font-medium rounded-md shadow-sm text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                    disabled={isUpdatingCourseStatus}
                                                >
                                                    {isUpdatingCourseStatus ? (
                                                        <div
                                                            className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 inline-block mr-2"></div>
                                                    ) : (
                                                        <Edit className="h-5 w-5 mr-2"/>
                                                    )}
                                                    Chỉnh sửa lại (về bản nháp)
                                                </button>
                                            )}
                                            {/* Bạn có thể thêm các trạng thái khác nếu SELLER có thể thay đổi */}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Phần cập nhật trạng thái cho ADMIN */}
                            {userRole === 'ADMIN' && courseDetails && (
                                <div className="mt-8 pt-8 border-t border-gray-200">
                                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                        <Info className="h-6 w-6 mr-2 text-blue-600"/> Quản lý trạng thái khóa học
                                    </h2>
                                    <div className="space-y-4">
                                        <p className="text-gray-700">
                                            Trạng thái hiện tại: <span className={`font-semibold ${
                                            courseDetails.status === 'PUBLISHED' ? 'text-green-600' :
                                                courseDetails.status === 'PENDING_APPROVAL' ? 'text-yellow-600' :
                                                    courseDetails.status === 'REJECTED' ? 'text-red-600' :
                                                        'text-gray-600'
                                        }`}>
                                                {getLocalizedCourseStatus(courseDetails.status)}
                                            </span>
                                        </p>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4">
                                                <label htmlFor="adminStatus"
                                                       className="block text-sm font-semibold text-gray-700">
                                                    Chọn trạng thái mới:
                                                </label>
                                                <select
                                                    id="adminStatus"
                                                    name="adminStatus"
                                                    value={selectedAdminStatus}
                                                    onChange={handleAdminStatusChange}
                                                    className="min-w-[200px] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                >
                                                    <option value="DRAFT">{getLocalizedCourseStatus('DRAFT')}</option>
                                                    <option
                                                        value="PENDING_APPROVAL">{getLocalizedCourseStatus('PENDING_APPROVAL')}</option>
                                                    <option
                                                        value="PUBLISHED">{getLocalizedCourseStatus('PUBLISHED')}</option>
                                                    <option
                                                        value="REJECTED">{getLocalizedCourseStatus('REJECTED')}</option>
                                                    <option
                                                        value="ARCHIVED">{getLocalizedCourseStatus('ARCHIVED')}</option>
                                                </select>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleUpdateCourseStatus(selectedAdminStatus)}
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                disabled={isUpdatingCourseStatus}
                                            >
                                                {isUpdatingCourseStatus ? (
                                                    <div
                                                        className="animate-spin rounded-full h-5 w-5 border-b-2 border-white-500 inline-block mr-2"></div>
                                                ) : (
                                                    <Check className="h-5 w-5 mr-2"/>
                                                )}
                                                Cập nhật trạng thái
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-8">
                        <div className="text-center border-b pb-6">
                            <div
                                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="h-8 w-8 text-green-600"/>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Xác nhận thông tin</h2>
                            <p className="text-gray-600">Kiểm tra lại thông tin trước khi cập nhật khóa học</p>
                        </div>

                        <div
                            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                            <div className="flex items-start space-x-4">
                                <div
                                    className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                                    {formData.thumbnailUrl ? (
                                        <img src={formData.thumbnailUrl} alt="Thumbnail Preview"
                                             className="object-cover w-full h-full"/>
                                    ) : (
                                        <Image className="h-8 w-8 text-gray-400"/>
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
                                        {formData.discountPrice ?
                                            `${formData.discountPrice.toLocaleString()}đ` :
                                            `${formData.price.toLocaleString()}đ`
                                        }
                                    </div>
                                    {formData.discountPrice && (
                                        <div className="text-sm text-gray-500 line-through">
                                            {formData.price.toLocaleString()}đ
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

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
                                <span
                                    className="text-gray-900">{categories.find(c => c.id === formData.categoryId)?.name}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="font-medium text-gray-700">Cấp độ:</span>
                                <span
                                    className="text-gray-900">{levels.find(l => l.id === formData.levelId)?.name}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="font-medium text-gray-700">Trạng thái:</span>
                                <span
                                    className="text-gray-900">{courseDetails ? getLocalizedCourseStatus(courseDetails.status) : 'N/A'}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                <span className="font-medium text-gray-700">Giá gốc:</span>
                                <span className="text-gray-900 font-semibold">{formData.price.toLocaleString()}đ</span>
                            </div>
                            {formData.discountPrice !== null && formData.discountPrice !== 0 && (
                                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                                    <span className="font-medium text-gray-700">Giá khuyến mãi:</span>
                                    <span
                                        className="text-green-600 font-semibold">{formData.discountPrice.toLocaleString()}đ</span>
                                </div>
                            )}
                        </div>
                    </div>
                );

            default:
                return null;
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

    // Display error if initial fetch fails and no course details are loaded
    if (error && !courseDetails) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                <Navbar/>
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
                <Footer/>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <Navbar/>
            <div className="container mx-auto px-4 py-8">
                <BackButton size="lg"/>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Chỉnh sửa Khóa
                            học: {courseDetails?.title}</h1>
                        <p className="text-lg text-gray-600">Cập nhật thông tin chi tiết của khóa học này</p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-center mb-12">
                        <div className="flex items-center space-x-8">
                            <div className="flex items-center">
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        currentStep >= 1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600'
                                    }`}>
                                    <Info className="h-6 w-6"/>
                                </div>
                                <span
                                    className={`ml-3 font-medium ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-500'}`}>
                Thông tin
              </span>
                            </div>

                            <div className={`w-16 h-1 transition-all duration-300 ${
                                currentStep > 1 ? 'bg-blue-600' : 'bg-gray-300'
                            }`}></div>

                            <div className="flex items-center">
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        currentStep >= 2 ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600'
                                    }`}>
                                    <CheckCircle className="h-6 w-6"/>
                                </div>
                                <span
                                    className={`ml-3 font-medium ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-500'}`}>
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
                                    <X className="h-5 w-5 text-red-500 mr-3"/>
                                    <span className="text-red-700 font-medium">{error}</span>
                                </div>
                            )}
                            {/* Success Message */}
                            {successMessage && (
                                <div
                                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                                    <Check className="h-5 w-5 text-green-500 mr-3"/>
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
                                            disabled={isUpdating}
                                        >
                                            <ArrowLeft className="h-5 w-5 mr-2"/>
                                            Quay lại
                                        </button>
                                    )}
                                    {currentStep < 2 && (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="ml-auto inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                            disabled={isUpdating}
                                        >
                                            Tiếp theo
                                            <ArrowRight className="h-5 w-5 ml-2"/>
                                        </button>
                                    )}
                                    {currentStep === 2 && (
                                        <button
                                            type="submit"
                                            className="ml-auto inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg shadow-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                                            disabled={isUpdating}
                                        >
                                            {isUpdating ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                         xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10"
                                                                stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor"
                                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Đang cập nhật...
                                                </>
                                            ) : (
                                                <>
                                                    <Check className="h-5 w-5 mr-2"/>
                                                    Cập nhật khóa học
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
            <Footer/>
        </div>
    );
};

export default EditCoursePage;
