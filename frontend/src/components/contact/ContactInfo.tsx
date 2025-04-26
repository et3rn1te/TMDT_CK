import { Mail, Phone, MapPin, Clock, User, Calendar } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông tin liên hệ</h2>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <MapPin className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">Địa chỉ</h3>
            <p className="text-gray-500">
              Trụ sở chính: 123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh<br />
              Chi nhánh: 456 Lê Lợi, Quận 1, TP. Hồ Chí Minh<br />
              Chi nhánh: 789 Trần Hưng Đạo, Quận Hoàn Kiếm, Hà Nội
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <Phone className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">Điện thoại</h3>
            <p className="text-gray-500">
              Hotline: 1800 1234<br />
              Tư vấn khóa học: 028 1234 5678<br />
              Hỗ trợ kỹ thuật: 028 8765 4321
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <Mail className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">Email</h3>
            <p className="text-gray-500">
              Thông tin chung: info@eduenglish.vn<br />
              Tư vấn khóa học: courses@eduenglish.vn<br />
              Hỗ trợ kỹ thuật: support@eduenglish.vn
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <Clock className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">Giờ làm việc</h3>
            <p className="text-gray-500">
              Thứ Hai - Thứ Sáu: 8:00 - 20:00<br />
              Thứ Bảy: 8:00 - 17:00<br />
              Chủ Nhật: 9:00 - 12:00
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <User className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">Đặt lịch tư vấn</h3>
            <p className="text-gray-500">
              Để được tư vấn chi tiết về khóa học phù hợp với nhu cầu của bạn, 
              vui lòng đặt lịch hẹn tư vấn với đội ngũ chuyên viên của chúng tôi.
            </p>
            <a 
              href="#" 
              className="mt-2 inline-flex items-center px-4 py-2 border border-indigo-600 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Đặt lịch hẹn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;