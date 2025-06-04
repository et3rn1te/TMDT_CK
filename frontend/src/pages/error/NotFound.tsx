import { Search, Home, ArrowLeft, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const NotFound = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const popularCourses = [
    { name: 'IELTS', link: '/courses/ielts' },
    { name: 'TOEIC', link: '/courses/toeic' },
    { name: 'Tiếng Anh giao tiếp', link: '/courses/conversation' },
    { name: 'Tiếng Anh doanh nghiệp', link: '/courses/business' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8 text-center py-12">
          {/* Animated 404 */}
          <div className="relative">
            <h1 className="text-9xl font-bold text-gray-200 select-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-indigo-100 rounded-full p-4 animate-bounce">
                <Search className="h-12 w-12 text-indigo-600" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-gray-900">
              Trang không tìm thấy
            </h2>
            <p className="text-gray-600 text-lg">
              Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="Tìm kiếm khóa học..."
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <ArrowLeft className="h-5 w-5 text-gray-400 hover:text-indigo-500 rotate-180" />
              </button>
            </form>
          </div>

          {/* Popular Courses */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-center">
              <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
              Khóa học phổ biến
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {popularCourses.map((course, index) => (
                <Link
                  key={index}
                  to={course.link}
                  className="block p-3 text-sm text-gray-600 bg-gray-50 rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  {course.name}
                </Link>
              ))}
            </div>
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
              
              <Link
                to="/courses"
                className="inline-flex items-center justify-center px-6 py-3 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Xem khóa học
              </Link>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-indigo-800">
              <strong>Vẫn không tìm thấy?</strong> Liên hệ với chúng tôi để được hỗ trợ: 
              <a 
                href="mailto:info@eduenglish.vn" 
                className="ml-1 text-indigo-600 hover:text-indigo-500 underline"
              >
                info@eduenglish.vn
              </a>
              <span className="mx-2">•</span>
              <a 
                href="tel:02812345678" 
                className="text-indigo-600 hover:text-indigo-500 underline"
              >
                028 1234 5678
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;