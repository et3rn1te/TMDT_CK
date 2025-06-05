import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Edit, Trash2, PlusCircle, BookOpen} from 'lucide-react'; // Icons for actions
import {courseApi} from '../../api/courses'; // Import courseApi
import {CourseSummaryResponse} from '../../types/courseTypes'; // Import CourseSummaryResponse type
import {useAuth} from '../../context/AuthContext'; // Import useAuth to get user role
import Navbar from '../../components/Navbar'; // Import Navbar
import Footer from '../../components/Footer'; // Import Footer

const ManageCourse = () => {
    const [courses, setCourses] = useState<CourseSummaryResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false); // State for delete operation
    const {userRole, isAuthenticated, loading: authLoading} = useAuth(); // Get userRole and authLoading

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

                // Đảm bảo fetchedCoursesData luôn là một mảng
                const coursesToSet = fetchedCoursesData || [];
                setCourses(coursesToSet);
            } else {
                setCourses([]);
                setError('Bạn không có quyền truy cập trang này.');
            }
        } catch (err) {
            console.error('Error fetching courses for management:', err);
            setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tải danh sách khóa học');
            setCourses([]); // Đảm bảo courses là mảng rỗng khi có lỗi
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoursesForManagement();
    }, [userRole, isAuthenticated, authLoading]); // Dependency array

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
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Quản lý Khóa học</h1>
                        {(userRole === 'ADMIN' || userRole === 'SELLER') && (
                            <Link
                                to="/add-course"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <PlusCircle className="h-5 w-5 mr-2"/> Thêm khóa học mới
                            </Link>
                        )}
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6"
                             role="alert">
                            <strong className="font-bold">Lỗi! </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {courses && courses.length === 0 && !loading && !error ? (
                        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4"/>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">Không có khóa học nào để quản lý</h3>
                            <p className="text-gray-500">Hãy thêm khóa học mới để bắt đầu.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tiêu đề
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Người bán
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Danh mục
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Giá
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Trạng thái
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Hành động
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {courses.map((course) => (
                                    <tr key={course.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {course.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-10 w-10 rounded-full object-cover"
                                                         src={course.thumbnailUrl} alt={course.title}/>
                                                </div>
                                                <div className="ml-4">
                                                    <div
                                                        className="text-sm font-medium text-gray-900">{course.title}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {course.sellerName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {course.categoryName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {course.discountPrice ? (
                                                <>
                                                    <span
                                                        className="text-red-500 font-semibold">{formatPrice(course.discountPrice)}</span>
                                                    <span
                                                        className="ml-1 line-through">{formatPrice(course.price)}</span>
                                                </>
                                            ) : (
                                                formatPrice(course.price)
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            course.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                                course.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                    course.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                        'bg-gray-100 text-gray-800'
                        }`}>
                          {course.status}
                        </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link to={`/manage-courses/edit/${course.id}`}
                                                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                  title="Chỉnh sửa">
                                                <Edit className="h-5 w-5 inline-block"/>
                                            </Link>
                                            <button onClick={() => handleDeleteCourse(course.id)}
                                                    className="text-red-600 hover:text-red-900" title="Xóa"
                                                    disabled={isDeleting}>
                                                {isDeleting ? (
                                                    <div
                                                        className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500 inline-block"></div>
                                                ) : (
                                                    <Trash2 className="h-5 w-5 inline-block"/>
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ManageCourse;
