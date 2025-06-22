import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Search, Edit, Trash2, PlusCircle, BookOpen, CheckCircle, XCircle, Filter, MoreVertical, Users, Star, TrendingUp, Clock} from 'lucide-react';
import {courseApi} from '../../api/courses';
import {CourseSummaryResponse} from '../../types/courseTypes';
import {useAuth} from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ManageCourse = () => {
    const [courses, setCourses] = useState<CourseSummaryResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL');
    const {userRole, isAuthenticated, loading: authLoading} = useAuth();

    const fetchCoursesForManagement = async () => {
        if (authLoading) {
            return;
        }

        try {
            setLoading(true);
            setError(null);
            let fetchedCoursesData: CourseSummaryResponse[] = [];

            if (isAuthenticated && (userRole === 'ADMIN' || userRole === 'SELLER')) {
                if (userRole === 'ADMIN') {
                    fetchedCoursesData = await courseApi.getAllCourses();
                } else if (userRole === 'SELLER') {
                    fetchedCoursesData = await courseApi.getMyCourses();
                }

                const coursesToSet = fetchedCoursesData || [];
                setCourses(coursesToSet);
            } else {
                setCourses([]);
                setError('Bạn không có quyền truy cập trang này.');
            }
        } catch (err) {
            console.error('Error fetching courses for management:', err);
            setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tải danh sách khóa học');
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    // Filter courses based on search term and status
    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.sellerName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'ALL' || course.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    // Get course statistics
    const courseStats = {
        total: courses.length,
        published: courses.filter(c => c.status === 'PUBLISHED').length,
        pending: courses.filter(c => c.status === 'PENDING_APPROVAL').length,
        draft: courses.filter(c => c.status === 'DRAFT').length,
        rejected: courses.filter(c => c.status === 'REJECTED').length,
        totalStudents: courses.reduce((sum, course) => sum + (course.students || 0), 0),
        avgRating: courses.length > 0 ? (courses.reduce((sum, course) => sum + (course.rating || 0), 0) / courses.length).toFixed(1) : '0'
    };

    // Hàm trợ giúp để hiển thị trạng thái tiếng Việt
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

    // Get status color classes
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PUBLISHED':
                return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'PENDING_APPROVAL':
                return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'DRAFT':
                return 'bg-gray-100 text-gray-700 border-gray-200';
            case 'REJECTED':
                return 'bg-red-100 text-red-700 border-red-200';
            case 'ARCHIVED':
                return 'bg-purple-100 text-purple-700 border-purple-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    useEffect(() => {
        fetchCoursesForManagement();
    }, [userRole, isAuthenticated, authLoading]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const handleDeleteCourse = async (courseId: number) => {
        if (window.confirm(`Bạn có chắc chắn muốn xóa khóa học này (ID: ${courseId})?`)) {
            setIsDeleting(true);
            setError(null);
            try {
                await courseApi.deleteCourse(courseId);
                setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
                alert('Khóa học đã được xóa thành công!');
            } catch (err) {
                console.error('Error deleting course:', err);
                setError(`Lỗi khi xóa khóa học: ${err instanceof Error ? err.message : 'Đã xảy ra lỗi'}`);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const handleApproveCourse = async (id: number) => {
        if (window.confirm('Bạn có chắc chắn muốn phê duyệt khóa học này không?')) {
            setIsUpdatingStatus(true);
            try {
                await courseApi.approveCourse(id);
                alert('Khóa học đã được phê duyệt!');
                fetchCoursesForManagement();
            } catch (err: any) {
                setError(err.message || "Lỗi khi phê duyệt khóa học.");
            } finally {
                setIsUpdatingStatus(false);
            }
        }
    };

    const handleRejectCourse = async (id: number) => {
        if (window.confirm('Bạn có chắc chắn muốn từ chối khóa học này không?')) {
            setIsUpdatingStatus(true);
            try {
                await courseApi.rejectCourse(id);
                alert('Khóa học đã bị từ chối!');
                fetchCoursesForManagement();
            } catch (err: any) {
                setError(err.message || "Lỗi khi từ chối khóa học.");
            } finally {
                setIsUpdatingStatus(false);
            }
        }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                <p className="ml-4 text-gray-700">Đang tải dữ liệu khóa học...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar/>
            <div className="min-h-screen bg-gray-50/50">
                <div className="max-w-7xl mx-auto p-6">
                    {/* Header with Statistics */}
                    <div className="mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Quản lý Khóa học</h1>
                                <p className="text-gray-600 mt-1">Quản lý và theo dõi tất cả khóa học của bạn</p>
                            </div>
                            {(userRole === 'ADMIN' || userRole === 'SELLER') && (
                                <Link to="/create-course">
                                    <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm">
                                        <PlusCircle size={18}/>
                                        Thêm khóa học mới
                                    </button>
                                </Link>
                            )}
                        </div>

                        {/* Statistics Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <BookOpen className="w-5 h-5 text-blue-600"/>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Tổng khóa học</p>
                                        <p className="text-xl font-bold text-gray-900">{courseStats.total}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-emerald-600"/>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Đã xuất bản</p>
                                        <p className="text-xl font-bold text-gray-900">{courseStats.published}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-amber-600"/>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Chờ duyệt</p>
                                        <p className="text-xl font-bold text-gray-900">{courseStats.pending}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <Users className="w-5 h-5 text-purple-600"/>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Tổng học viên</p>
                                        <p className="text-xl font-bold text-gray-900">{courseStats.totalStudents}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filter */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm khóa học, giảng viên..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20}/>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[180px]"
                                >
                                    <option value="ALL">Tất cả trạng thái</option>
                                    <option value="PUBLISHED">Đã xuất bản</option>
                                    <option value="PENDING_APPROVAL">Chờ phê duyệt</option>
                                    <option value="DRAFT">Bản nháp</option>
                                    <option value="REJECTED">Đã từ chối</option>
                                    <option value="ARCHIVED">Đã lưu trữ</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span className="font-medium">Đã xảy ra lỗi:</span>
                                <span>{error}</span>
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {filteredCourses.length === 0 && !loading && !error ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-gray-400"/>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {searchTerm || filterStatus !== 'ALL' ? 'Không tìm thấy khóa học' : 'Chưa có khóa học nào'}
                            </h3>
                            <p className="text-gray-600">
                                {searchTerm || filterStatus !== 'ALL'
                                    ? 'Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc'
                                    : 'Hãy thêm khóa học mới để bắt đầu quản lý'}
                            </p>
                        </div>
                    ) : (
                        /* Course List */
                        <div className="space-y-4">
                            {filteredCourses.map((course) => (
                                <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="flex flex-col lg:flex-row">
                                        {/* Large Thumbnail */}
                                        <div className="lg:w-80 lg:flex-shrink-0">
                                            <div className="relative aspect-video lg:aspect-[4/3] overflow-hidden">
                                                <img
                                                    src={course.thumbnailUrl}
                                                    alt={course.title}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className={`px-3 py-1.5 text-sm font-medium rounded-full ${getStatusColor(course.status)}`}>
                                                        {getLocalizedCourseStatus(course.status)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 p-6">
                                            <div className="flex flex-col h-full">
                                                {/* Header */}
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex-1">
                                                            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                                                {course.title}
                                                            </h3>
                                                            <p className="text-gray-600 mb-3">
                                                                Giảng viên: <span className="font-semibold text-gray-800">{course.sellerName}</span>
                                                            </p>
                                                        </div>
                                                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">ID: {course.id}</span>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-4 mb-4">
                                                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
                                                            {course.categoryName}
                                                        </span>
                                                        <div className="flex items-center gap-1 text-sm">
                                                            {/*<Star className="w-4 h-4 text-yellow-500 fill-current"/>*/}
                                                            {/*<span className="font-semibold">{course.rating}</span>*/}
                                                            {/*<span className="text-gray-500">({course.students} học viên)</span>*/}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            {course.discountPrice ? (
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-2xl font-bold text-blue-600">
                                                                        {formatPrice(course.discountPrice)}
                                                                    </span>
                                                                    <span className="text-lg text-gray-500 line-through">
                                                                        {formatPrice(course.price)}
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                <span className="text-2xl font-bold text-gray-900">
                                                                    {formatPrice(course.price)}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                                    <Link to={`/manage-courses/edit/${course.id}`} className="flex-1">
                                                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
                                                            <Edit size={16}/>
                                                            Chỉnh sửa
                                                        </button>
                                                    </Link>

                                                    {userRole === 'ADMIN' && course.status === 'PENDING_APPROVAL' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleApproveCourse(course.id)}
                                                                disabled={isUpdatingStatus}
                                                                className="flex items-center justify-center w-11 h-11 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors disabled:opacity-50"
                                                                title="Phê duyệt"
                                                            >
                                                                {isUpdatingStatus ? (
                                                                    <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"/>
                                                                ) : (
                                                                    <CheckCircle size={20}/>
                                                                )}
                                                            </button>
                                                            <button
                                                                onClick={() => handleRejectCourse(course.id)}
                                                                disabled={isUpdatingStatus}
                                                                className="flex items-center justify-center w-11 h-11 text-amber-600 bg-amber-50 hover:amber-100 rounded-xl transition-colors disabled:opacity-50"
                                                                title="Từ chối"
                                                            >
                                                                {isUpdatingStatus ? (
                                                                    <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"/>
                                                                ) : (
                                                                    <XCircle size={20}/>
                                                                )}
                                                            </button>
                                                        </>
                                                    )}

                                                    <button
                                                        onClick={() => handleDeleteCourse(course.id)}
                                                        disabled={isDeleting}
                                                        className="flex items-center justify-center w-11 h-11 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors disabled:opacity-50"
                                                        title="Xóa"
                                                    >
                                                        {isDeleting ? (
                                                            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"/>
                                                        ) : (
                                                            <Trash2 size={20}/>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ManageCourse;