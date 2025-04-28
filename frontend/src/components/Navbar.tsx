import { useState } from 'react';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import {Link} from "react-router-dom";
// import logo from '../assets/logo.svg'; // Bạn cần thêm logo vào thư mục assets

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo và menu chính */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {/* <img className="h-8 w-auto" src={logo} alt="EduEnglish Logo" /> */}
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="/" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Trang chủ
              </a>
              <a href="/courses" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Khóa học
              </a>
              <a href="/my-courses" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Khóa học của tôi
              </a>
              <a href="/course-ratings" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Đánh giá khóa học
              </a>
              <a href="/about" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Về chúng tôi
              </a>
              <a href="/contact" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Liên hệ
              </a>
            </div>
          </div>
          
          {/* Tìm kiếm, giỏ hàng và đăng nhập */}
          <div className="hidden sm:flex items-center">
            <div className="flex-shrink-0 relative">
              <form action="/search" method="get" className="flex-shrink-0 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Tìm kiếm khóa học..."
                  type="search"
                  name="q"
                />
              </form>
            </div>
            <div className="ml-4 flex items-center">
              <button
                type="button"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <ShoppingCart className="h-6 w-6" />
              </button>
            </div>
            <div className="ml-4">
              <Link to="/Login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Đăng nhập
              </Link>
            </div>
            <div className="ml-4">
              <Link to="/Register" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Đăng ký
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, toggle classes based on menu state */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <a
            href="/"
            className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Trang chủ
          </a>
          <a
            href="/courses"
            className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Khóa học
          </a>
          <a
            href="/my-courses"
            className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Khóa học của tôi
          </a>
          <a
            href="/course-ratings"
            className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Đánh giá khóa học
          </a>
          <a
            href="/about"
            className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Về chúng tôi
          </a>
          <a
            href="/contact"
            className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Liên hệ
          </a>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <User className="h-10 w-10 rounded-full text-gray-400" />
            </div>
            <div className="ml-3">
              <a
                href="/frontend/src/pages/Login"
                className="block text-base font-medium text-gray-700"
              >
                Đăng nhập
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;