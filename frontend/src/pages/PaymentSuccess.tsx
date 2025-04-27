import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CheckCircle, Calendar, Play, Download } from 'lucide-react';

const PaymentSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({
    orderId: '',
    date: '',
    amount: 0,
    course: {
      id: 1,
      title: 'Complete English Grammar Course',
      image: 'https://img-c.udemycdn.com/course/240x135/2380566_0476.jpg',
    },
  });

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

  // Generate random order ID
  const generateOrderId = () => {
    return `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  useEffect(() => {
    // Simulate API call to get order details
    setTimeout(() => {
      setOrderDetails({
        orderId: generateOrderId(),
        date: new Date().toISOString(),
        amount: 399000,
        course: {
          id: 1,
          title: 'Complete English Grammar Course',
          image: 'https://img-c.udemycdn.com/course/240x135/2380566_0476.jpg',
        },
      });
      setLoading(false);
    }, 1000);
  }, []);

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
                  src={orderDetails.course.image} 
                  alt={orderDetails.course.title} 
                  className="w-48 h-32 object-cover rounded mb-4 sm:mb-0 sm:mr-6"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{orderDetails.course.title}</h2>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Ngày mua: {formatDate(orderDetails.date)}</span>
                  </div>
                  <div className="flex space-x-3">
                    <Link
                      to={`/learn/${orderDetails.course.id}`}
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
                  <p className="font-medium">{orderDetails.orderId}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Ngày thanh toán:</p>
                  <p className="font-medium">{formatDate(orderDetails.date)}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Phương thức thanh toán:</p>
                  <p className="font-medium">Thẻ tín dụng (xxx-xxx-xx789)</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Tổng tiền:</p>
                  <p className="font-medium text-lg">{formatPrice(orderDetails.amount)}</p>
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