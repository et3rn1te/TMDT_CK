import { Clock, Award, Users, Video, MessageSquare, BookOpen } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      name: 'Học mọi lúc, mọi nơi',
      description:
        'Truy cập khóa học từ điện thoại, máy tính bảng hoặc máy tính, học bất cứ khi nào bạn có thời gian.',
      icon: Clock,
    },
    {
      name: 'Giáo viên chất lượng cao',
      description:
        'Đội ngũ giáo viên giàu kinh nghiệm, có chứng chỉ quốc tế và phương pháp giảng dạy hiệu quả.',
      icon: Award,
    },
    {
      name: 'Cộng đồng học tập',
      description:
        'Tham gia vào cộng đồng học viên sôi động, cùng nhau chia sẻ và học hỏi.',
      icon: Users,
    },
    {
      name: 'Bài giảng video chất lượng',
      description:
        'Các bài giảng được quay với chất lượng cao, nội dung được trình bày rõ ràng, dễ hiểu.',
      icon: Video,
    },
    {
      name: 'Hỗ trợ trực tuyến',
      description:
        'Đội ngũ hỗ trợ trực tuyến luôn sẵn sàng giải đáp mọi thắc mắc của bạn.',
      icon: MessageSquare,
    },
    {
      name: 'Tài liệu học tập đa dạng',
      description:
        'Tài liệu học tập phong phú, từ sách giáo trình đến các bài tập tương tác.',
      icon: BookOpen,
    },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Tại sao chọn EduEnglish
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Phương pháp học hiệu quả
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Chúng tôi cung cấp môi trường học tập tối ưu với nhiều tính năng và lợi ích giúp bạn phát triển kỹ năng tiếng Anh một cách toàn diện.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full border border-gray-200">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;