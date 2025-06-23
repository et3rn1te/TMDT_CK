import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Smartphone, Check, ChevronRight, Info, Copy } from 'lucide-react';
import { courseApi } from '../api/courses';
import { CourseResponse } from '../types/courseTypes';
import { toast } from 'react-toastify';

// Mock course data - in a real app this would come from props or context
const courseMock = {
  id: 1,
  title: 'Complete English Grammar Course',
  instructor: 'John Smith',
  image: 'https://play-lh.googleusercontent.com/RDaDkf8_3otfI-Yoe-uIue0TckLkKlbu9pMOHE4bQcJIkwEcLuD6Fr-deph5DForNKQ',
  regularPrice: 799000,
  salePrice: 399000,
  discount: 50,
};

const PaymentMethod = () => {
  const {courseId} = useParams();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [courseData, setCourseData] = useState<CourseResponse>();
  const [userId, setUserId] = useState<number | null>(null);
  const [copySuccess, setCopySuccess] = useState({
    accountNumber: false,
    content: false
  });
  const [checkingPayment, setCheckingPayment] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      const response = await courseApi.getCourseById(Number(courseId));
      setCourseData(response);
    };
    fetchCourseData();
  }, [courseId]);

  // Get user ID from localStorage
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        // Assuming user ID is stored in auth data, adjust as needed
        if (authData.userId) {
          setUserId(authData.userId);
        }
      } catch (e) {
        console.error("Failed to parse stored auth data", e);
      }
    }
  }, []);

  // Format price in VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Handle payment method selection
  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
  };

  // Copy text to clipboard
  const copyToClipboard = (text: string, type: 'accountNumber' | 'content') => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess({
          ...copySuccess,
          [type]: true
        });
        
        // Reset success message after 2 seconds
        setTimeout(() => {
          setCopySuccess({
            ...copySuccess,
            [type]: false
          });
        }, 2000);
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  // Generate payment content
  const generatePaymentContent = () => {
    return `COURSE${courseData?.id}USER${userId || ''}`;
  };

  // Process payment
  const handlePayment = async () => {
    if (!selectedMethod) return;
    
    setProcessingPayment(true);
    
    // Simulate payment processing for non-bank methods
    if (selectedMethod !== 'bank-transfer') {
      setTimeout(() => {
        setProcessingPayment(false);
        // Redirect to success page (mock)
        navigate('/payment/success');
      }, 2000);
    } else {
      // For bank transfer, just show the information
      setProcessingPayment(false);
    }
  };

  // Check payment status
  const checkPaymentStatus = async () => {
    if (!userId || !courseId) {
      toast.error("Thông tin người dùng hoặc khóa học không hợp lệ");
      return;
    }

    setCheckingPayment(true);
    try {
      const isPaid = await courseApi.checkPaymentStatus(Number(courseId), userId);
      
      if (isPaid) {
        toast.success("Thanh toán đã được xác nhận!");
        navigate(`/payment/success/${courseId}`);
      } else {
        toast.warning("Chưa nhận được thanh toán. Vui lòng đợi hoặc kiểm tra lại thông tin chuyển khoản.");
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      toast.error("Đã xảy ra lỗi khi kiểm tra thanh toán");
    } finally {
      setCheckingPayment(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Thanh toán khóa học</h1>
            <p className="text-gray-600 mt-1">Chọn phương thức thanh toán phù hợp với bạn</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Payment methods section */}
            <div className="flex-grow order-2 lg:order-1">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h2 className="text-lg font-semibold mb-4">Phương thức thanh toán</h2>
                
                {/* E-wallets section */}
                <h3 className="text-sm font-medium text-gray-700 mb-3">Ví điện tử</h3>
                
                {/* Momo */}
                <div 
                  className={`border rounded-lg p-4 mb-4 cursor-pointer ${selectedMethod === 'momo' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => handleMethodSelect('momo')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold mr-3">
                        <Smartphone className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium">Momo</p>
                        <p className="text-sm text-gray-500">Thanh toán bằng ví Momo</p>
                      </div>
                    </div>
                    {selectedMethod === 'momo' ? (
                      <Check className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                
                {/* Zalo Pay */}
                <div 
                  className={`border rounded-lg p-4 mb-4 cursor-pointer ${selectedMethod === 'zalopay' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => handleMethodSelect('zalopay')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-3">
                        <span>ZP</span>
                      </div>
                      <div>
                        <p className="font-medium">ZaloPay</p>
                        <p className="text-sm text-gray-500">Thanh toán bằng ví ZaloPay</p>
                      </div>
                    </div>
                    {selectedMethod === 'zalopay' ? (
                      <Check className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                
                {/* VN Pay */}
                <div 
                  className={`border rounded-lg p-4 mb-4 cursor-pointer ${selectedMethod === 'vnpay' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => handleMethodSelect('vnpay')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-3">
                        <span>VN</span>
                      </div>
                      <div>
                        <p className="font-medium">VNPay</p>
                        <p className="text-sm text-gray-500">Thanh toán bằng QR VNPay</p>
                      </div>
                    </div>
                    {selectedMethod === 'vnpay' ? (
                      <Check className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Bank transfer */}
                <h3 className="text-sm font-medium text-gray-700 mb-3">Chuyển khoản ngân hàng</h3>
                <div 
                  className={`border rounded-lg p-4 mb-4 cursor-pointer ${selectedMethod === 'bank-transfer' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => handleMethodSelect('bank-transfer')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold mr-3">
                        <span>ATM</span>
                      </div>
                      <div>
                        <p className="font-medium">Chuyển khoản ngân hàng</p>
                        <p className="text-sm text-gray-500">Thanh toán bằng chuyển khoản ngân hàng</p>
                      </div>
                    </div>
                    {selectedMethod === 'bank-transfer' ? (
                      <Check className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>

                  {/* Bank transfer details */}
                  {selectedMethod === 'bank-transfer' && (
                    <div className="mt-4 border-t pt-4">
                      <div className="flex justify-center mb-4">
                        <img src="/images/banking.png" alt="QR Code" className="max-w-full h-auto" />
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium text-gray-700">Ngân hàng</p>
                          <p className="text-gray-900">Ngân hàng TMCP Đầu tư và Phát triển Việt Nam (BIDV)</p>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-700">Số Tài Khoản</p>
                            <button 
                              onClick={() => copyToClipboard('96247WKIJN', 'accountNumber')}
                              className="text-indigo-600 hover:text-indigo-800 flex items-center"
                            >
                              <Copy className="h-4 w-4 mr-1" />
                              {copySuccess.accountNumber ? 'Đã sao chép' : 'Sao chép'}
                            </button>
                          </div>
                          <p className="text-gray-900 font-medium">96247WKIJN</p>
                        </div>
                        
                        <div>
                          <p className="font-medium text-gray-700">Người thụ hưởng</p>
                          <p className="text-gray-900">TRAN VO HOANG HUY</p>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-700">Nội dung</p>
                            <button 
                              onClick={() => copyToClipboard(generatePaymentContent(), 'content')}
                              className="text-indigo-600 hover:text-indigo-800 flex items-center"
                            >
                              <Copy className="h-4 w-4 mr-1" />
                              {copySuccess.content ? 'Đã sao chép' : 'Sao chép'}
                            </button>
                          </div>
                          <p className="text-gray-900 font-medium">{generatePaymentContent()}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                        <div className="flex items-start">
                          <Info className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-700">
                            <span className="font-bold">Lưu ý:</span> Vui lòng thanh toán đúng số tiền và nội dung chuyển khoản. Khóa học sẽ được kích hoạt sau khi chúng tôi xác nhận thanh toán của bạn (trong vòng 24 giờ).
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Payment button */}
                <div className="mt-6">
                  {selectedMethod === 'bank-transfer' ? (
                    <button
                      onClick={checkPaymentStatus}
                      disabled={checkingPayment || !userId}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      {checkingPayment ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Đang kiểm tra...
                        </>
                      ) : (
                        'Đã chuyển khoản, kiểm tra ngay'
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={handlePayment}
                      disabled={!selectedMethod || processingPayment}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                        !selectedMethod || processingPayment
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      }`}
                    >
                      {processingPayment ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Đang xử lý...
                        </>
                      ) : (
                        `Thanh toán ${formatPrice(courseData?.price || 0)}`
                      )}
                    </button>
                  )}
                </div>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>Bằng cách nhấn "Thanh toán", bạn đồng ý với <a href="/terms" className="text-indigo-600 hover:text-indigo-500">Điều khoản sử dụng</a> và <a href="/privacy" className="text-indigo-600 hover:text-indigo-500">Chính sách bảo mật</a> của chúng tôi.</p>
                </div>
              </div>
            </div>
            
            {/* Order summary section */}
            <div className="lg:w-80 order-1 lg:order-2">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 sticky top-6">
                <h2 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h2>
                
                <div className="mb-4">
                  <div className="flex items-start">
                    <img 
                      src={courseData?.thumbnailUrl} 
                      alt={courseData?.title} 
                      className="w-20 h-16 object-cover rounded flex-shrink-0"
                    />
                    <div className="ml-3">
                      <h3 className="text-base font-medium">{courseData?.title}</h3>
                      <p className="text-sm text-gray-500">Giảng viên: {courseData?.seller.fullName}</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Giá gốc</span>
                    <span className="text-gray-600 line-through">{formatPrice(courseData?.price || 0)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Giảm giá</span>
                    <span className="text-green-600">{formatPrice((courseData?.price || 0) - (courseData?.discountPrice || 0))}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mb-4">
                    <span>Tổng cộng</span>
                    <span>{formatPrice(courseData?.discountPrice || 0)}</span>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md mb-4">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-600">
                        Bạn sẽ được cấp quyền truy cập trọn đời vào khóa học này sau khi thanh toán thành công.
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center mb-1">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Bảo đảm hoàn tiền trong 30 ngày</span>
                    </div>
                    <div className="flex items-center mb-1">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Truy cập trọn đời vào khóa học</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Chứng chỉ hoàn thành</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentMethod; 