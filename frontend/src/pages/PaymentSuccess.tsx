import { useEffect, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CheckCircle, Calendar, Play, Download, AlertTriangle } from 'lucide-react';
import { courseApi } from '../api/courses';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../config';
import { getOrderByCourseAndUser } from '../api/orders';

interface OrderDetail {
  id: number;
  course: {
    id: number;
    title: string;
    thumbnailUrl: string;
    sellerName: string;
  };
  price: number;
}

interface Order {
  id: number;
  orderNumber: string;
  createdAt: string;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  orderDetails: OrderDetail[];
}

const PaymentSuccess = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  // Format price in VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get user ID from localStorage
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        if (authData.userId) {
          setUserId(authData.userId);
        } else {
          setError("Không thể xác định người dùng. Vui lòng đăng nhập lại.");
          setLoading(false);
        }
      } catch (e) {
        console.error("Failed to parse stored auth data", e);
        setError("Lỗi xác thực. Vui lòng đăng nhập lại.");
        setLoading(false);
      }
    } else {
      setError("Vui lòng đăng nhập để xem thông tin thanh toán.");
      setLoading(false);
    }
  }, []);

  // Check payment status when userId and courseId are available
  useEffect(() => {
    const checkPayment = async () => {
      if (!userId || !courseId) return;

      try {
        // First check if payment is completed
        const isPaid = await courseApi.checkPaymentStatus(Number(courseId), userId);
        
        if (!isPaid) {
          setError("Chưa tìm thấy thông tin thanh toán cho khóa học này. Vui lòng kiểm tra lại sau.");
          setLoading(false);
          return;
        }
        
        // If paid, fetch order details
        const result = await getOrderByCourseAndUser(Number(courseId), userId);
        console.log(result);
        if (result) {
          setOrder(result);
        } else {
          setError("Không thể tải thông tin đơn hàng. Vui lòng thử lại sau.");
        }
      } catch (err) {
        console.error("Error checking payment:", err);
        setError("Đã xảy ra lỗi khi kiểm tra thanh toán. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    checkPayment();
  }, [userId, courseId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center px-4 py-12">
            <svg className="animate-spin h-12 w-12 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Đang xác nhận thanh toán...</h2>
            <p className="text-gray-600">Vui lòng đợi trong giây lát...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
              <div className="text-center mb-8">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                  <AlertTriangle className="h-10 w-10 text-red-500" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Xác nhận thanh toán thất bại</h1>
                <p className="text-gray-600 mt-1">{error}</p>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 justify-center">
                  <Link 
                    to={courseId ? `/course/${courseId}` : "/courses"}
                    className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Quay lại trang khóa học
                  </Link>
                  <Link 
                    to="/"
                    className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Về trang chủ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!order || !order.orderDetails || order.orderDetails.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
              <div className="text-center mb-8">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
                  <AlertTriangle className="h-10 w-10 text-yellow-500" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Không tìm thấy thông tin đơn hàng</h1>
                <p className="text-gray-600 mt-1">Không thể tải thông tin chi tiết đơn hàng</p>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 justify-center">
                  <Link 
                    to="/my-courses"
                    className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Xem khóa học đã mua
                  </Link>
                  <Link 
                    to="/"
                    className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Về trang chủ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get the first course from order details
  const courseDetail = order.orderDetails[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
            <div className="text-center mb-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Thanh toán thành công!</h1>
              <p className="text-gray-600 mt-1">Cảm ơn bạn đã đăng ký khóa học</p>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mb-6">
              <div className="flex flex-col sm:flex-row items-center mb-6">
                <img 
                  src={courseDetail.course.thumbnailUrl} 
                  alt={courseDetail.course.title} 
                  className="w-48 h-32 object-cover rounded mb-4 sm:mb-0 sm:mr-6"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{courseDetail.course.title}</h2>
                  <p className="text-sm text-gray-500 mb-2">Giảng viên: {courseDetail.course.sellerName}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Ngày mua: {formatDate(order.createdAt)}</span>
                  </div>
                  <div className="flex space-x-3">
                    <Link
                      to={`/learn/${courseDetail.course.id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Play className="mr-1 h-4 w-4" />
                      Bắt đầu học
                    </Link>
                    <Link
                      to="/my-courses"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Khóa học của tôi
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Chi tiết đơn hàng</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Mã đơn hàng:</p>
                  <p className="font-medium">{order.orderNumber}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Ngày thanh toán:</p>
                  <p className="font-medium">{formatDate(order.createdAt)}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Phương thức thanh toán:</p>
                  <p className="font-medium">{order.paymentMethod === 'BANK_TRANSFER' ? 'Chuyển khoản ngân hàng' : order.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Tổng tiền:</p>
                  <p className="font-medium text-lg">{formatPrice(order.totalAmount)}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-600 mb-4">
                Một email xác nhận đã được gửi tới địa chỉ email của bạn. Vui lòng kiểm tra hộp thư đến của bạn.
              </p>
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
                <Link 
                  to="/my-courses"
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Xem khóa học đã mua
                </Link>
                <button 
                  onClick={() => window.print()}
                  className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Download className="mr-1 h-4 w-4" />
                  Tải hóa đơn
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess; 