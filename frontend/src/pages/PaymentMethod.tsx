import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CreditCard, Smartphone, Check, ChevronRight, Lock, AlertCircle, Info } from 'lucide-react';

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
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Format price in VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Handle payment method selection
  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method);
    setShowCardForm(method === 'credit-card');
    setErrors({});
  };

  // Handle card input change
  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData({
      ...cardData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  // Validate card details
  const validateCardDetails = () => {
    const newErrors: Record<string, string> = {};
    
    if (!cardData.cardNumber.trim()) {
      newErrors.cardNumber = 'Vui lòng nhập số thẻ';
    } else if (!/^\d{16}$/.test(cardData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Số thẻ không hợp lệ';
    }
    
    if (!cardData.cardName.trim()) {
      newErrors.cardName = 'Vui lòng nhập tên chủ thẻ';
    }
    
    if (!cardData.expDate.trim()) {
      newErrors.expDate = 'Vui lòng nhập ngày hết hạn';
    } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(cardData.expDate)) {
      newErrors.expDate = 'Định dạng MM/YY không hợp lệ';
    }
    
    if (!cardData.cvv.trim()) {
      newErrors.cvv = 'Vui lòng nhập mã CVV';
    } else if (!/^\d{3,4}$/.test(cardData.cvv)) {
      newErrors.cvv = 'CVV không hợp lệ';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Process payment
  const handlePayment = async () => {
    if (selectedMethod === 'credit-card' && !validateCardDetails()) {
      return;
    }
    
    setProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessingPayment(false);
      // Redirect to success page (mock)
      navigate('/payment/success');
    }, 2000);
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
                
                {/* Credit/Debit Card */}
                <div 
                  className={`border rounded-lg p-4 mb-4 cursor-pointer ${selectedMethod === 'credit-card' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                  onClick={() => handleMethodSelect('credit-card')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-6 w-6 text-gray-500 mr-3" />
                      <div>
                        <p className="font-medium">Thẻ tín dụng/ghi nợ</p>
                        <p className="text-sm text-gray-500 mt-1">Visa, MasterCard, JCB</p>
                      </div>
                    </div>
                    {selectedMethod === 'credit-card' ? (
                      <Check className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  
                  {/* Credit card form */}
                  {showCardForm && (
                    <div className="mt-4 border-t pt-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Số thẻ
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={cardData.cardNumber}
                            onChange={handleCardInputChange}
                            className={`block w-full rounded-md shadow-sm ${errors.cardNumber ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                            placeholder="1234 5678 9012 3456"
                          />
                          {errors.cardNumber && (
                            <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                            Tên chủ thẻ
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={cardData.cardName}
                            onChange={handleCardInputChange}
                            className={`block w-full rounded-md shadow-sm ${errors.cardName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                            placeholder="NGUYEN VAN A"
                          />
                          {errors.cardName && (
                            <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">
                              Ngày hết hạn
                            </label>
                            <input
                              type="text"
                              id="expDate"
                              name="expDate"
                              value={cardData.expDate}
                              onChange={handleCardInputChange}
                              className={`block w-full rounded-md shadow-sm ${errors.expDate ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                              placeholder="MM/YY"
                            />
                            {errors.expDate && (
                              <p className="mt-1 text-sm text-red-600">{errors.expDate}</p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={cardData.cvv}
                              onChange={handleCardInputChange}
                              className={`block w-full rounded-md shadow-sm ${errors.cvv ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                              placeholder="123"
                            />
                            {errors.cvv && (
                              <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center text-sm text-gray-500">
                        <Lock className="h-4 w-4 mr-1" />
                        <span>Thông tin thanh toán của bạn được bảo mật.</span>
                      </div>
                    </div>
                  )}
                </div>
                
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
                        <p className="font-medium">Internet Banking</p>
                        <p className="text-sm text-gray-500">Thanh toán bằng tài khoản ngân hàng</p>
                      </div>
                    </div>
                    {selectedMethod === 'bank-transfer' ? (
                      <Check className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                
                {/* Payment button */}
                <div className="mt-6">
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
                      `Thanh toán ${formatPrice(courseMock.salePrice)}`
                    )}
                  </button>
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
                      src={courseMock.image} 
                      alt={courseMock.title} 
                      className="w-20 h-16 object-cover rounded flex-shrink-0"
                    />
                    <div className="ml-3">
                      <h3 className="text-base font-medium">{courseMock.title}</h3>
                      <p className="text-sm text-gray-500">Giảng viên: {courseMock.instructor}</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Giá gốc</span>
                    <span className="text-gray-600 line-through">{formatPrice(courseMock.regularPrice)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Giảm giá</span>
                    <span className="text-green-600">-{courseMock.discount}%</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mb-4">
                    <span>Tổng cộng</span>
                    <span>{formatPrice(courseMock.salePrice)}</span>
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