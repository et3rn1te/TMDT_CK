import { Briefcase, Users, Award, BookOpen } from 'lucide-react';

const MissionValues = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Lịch sử hình thành */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Lịch sử hình thành</h2>
          <div className="prose prose-indigo prose-lg text-gray-500 max-w-none">
            <p>
              EduEnglish được thành lập vào năm 2018 với sứ mệnh mang đến phương pháp học tiếng Anh hiệu quả và phù hợp với người Việt Nam. 
              Xuất phát từ nhận thấy những khó khăn mà người học tiếng Anh tại Việt Nam thường gặp phải, chúng tôi đã xây dựng 
              nền tảng học tập trực tuyến kết hợp với các lớp học trực tiếp để tạo môi trường học tập tối ưu.
            </p>
            <p>
              Qua hơn 5 năm hoạt động, EduEnglish đã giúp hơn 50,000 học viên cải thiện kỹ năng tiếng Anh và đạt được các chứng chỉ quốc tế 
              như IELTS, TOEIC. Chúng tôi tự hào là đối tác đào tạo tiếng Anh cho nhiều doanh nghiệp lớn tại Việt Nam và liên tục 
              phát triển các chương trình học mới đáp ứng nhu cầu ngày càng đa dạng của người học.
            </p>
          </div>
        </div>

        {/* Sứ mệnh và Tầm nhìn */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Sứ mệnh</h3>
            <p className="text-gray-500">
              Cung cấp giải pháp học tiếng Anh toàn diện và hiệu quả cho người Việt Nam, giúp người học 
              xây dựng nền tảng vững chắc và tự tin sử dụng tiếng Anh trong học tập, công việc và cuộc sống.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Tầm nhìn</h3>
            <p className="text-gray-500">
              Trở thành nền tảng học tiếng Anh hàng đầu tại Việt Nam, đồng hành cùng người học trong hành trình 
              chinh phục ngôn ngữ toàn cầu và mở ra cơ hội phát triển không giới hạn.
            </p>
          </div>
        </div>

        {/* Giá trị cốt lõi */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Giá trị cốt lõi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 text-center mb-2">Học viên là trọng tâm</h3>
              <p className="text-gray-500 text-center">
                Mọi hoạt động của chúng tôi đều hướng đến lợi ích và trải nghiệm học tập tốt nhất cho học viên.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <Award className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 text-center mb-2">Chất lượng giảng dạy</h3>
              <p className="text-gray-500 text-center">
                Đảm bảo chất lượng giảng dạy cao với đội ngũ giáo viên chuyên nghiệp và nội dung học tập chuẩn quốc tế.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 text-center mb-2">Đổi mới sáng tạo</h3>
              <p className="text-gray-500 text-center">
                Không ngừng cải tiến phương pháp giảng dạy và ứng dụng công nghệ để tối ưu hóa trải nghiệm học tập.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <Briefcase className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 text-center mb-2">Tính thực tiễn</h3>
              <p className="text-gray-500 text-center">
                Tập trung vào khả năng ứng dụng thực tế, giúp học viên sử dụng tiếng Anh một cách tự nhiên và hiệu quả.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionValues;