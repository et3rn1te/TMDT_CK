import { ShieldX, Home, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Forbidden = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center py-12">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="bg-red-100 rounded-full p-6">
              <ShieldX className="h-16 w-16 text-red-600" />
            </div>
          </div>

          {/* Error Code */}
          <div>
            <h1 className="text-9xl font-bold text-gray-900">403</h1>
          </div>

          {/* Error Message */}
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-gray-900">
              Truy cập bị từ chối
            </h2>
            <p className="text-gray-600 text-lg">
              Bạn không có quyền truy cập vào trang này.
            </p>
            <p className="text-gray-500 text-sm">
              Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là lỗi.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGoBack}
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </button>
              
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <Home className="h-4 w-4 mr-2" />
                Về trang chủ
              </Link>
            </div>
          </div>

          {/* Additional Help */}
          <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-indigo-800">
              <strong>Cần hỗ trợ?</strong> Liên hệ với chúng tôi qua email: 
              <a 
                href="mailto:info@eduenglish.vn" 
                className="ml-1 text-indigo-600 hover:text-indigo-500 underline"
              >
                info@eduenglish.vn
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Forbidden;