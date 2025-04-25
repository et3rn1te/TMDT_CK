import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Thông tin công ty */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">EduEnglish</h3>
            <p className="text-gray-300 text-sm">
              Nền tảng học tiếng Anh trực tuyến hàng đầu Việt Nam, giúp bạn tiếp cận phương pháp học hiệu quả và đội ngũ giáo viên chất lượng cao.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Khóa học</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">IELTS</a></li>
              <li><a href="#" className="hover:text-white">TOEIC</a></li>
              <li><a href="#" className="hover:text-white">Tiếng Anh giao tiếp</a></li>
              <li><a href="#" className="hover:text-white">Tiếng Anh doanh nghiệp</a></li>
              <li><a href="#" className="hover:text-white">Tiếng Anh cho trẻ em</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Hỗ trợ</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Trung tâm hỗ trợ</a></li>
              <li><a href="#" className="hover:text-white">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="hover:text-white">Điều khoản sử dụng</a></li>
              <li><a href="#" className="hover:text-white">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-white">Phương thức thanh toán</a></li>
            </ul>
          </div>

          {/* Thông tin liên hệ */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-indigo-400" />
                <span>123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-indigo-400" />
                <span>028 1234 5678</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-indigo-400" />
                <span>info@eduenglish.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} EduEnglish. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;