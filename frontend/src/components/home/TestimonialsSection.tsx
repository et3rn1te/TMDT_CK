import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      content:
        'Khóa học IELTS của EduEnglish đã giúp tôi đạt được 7.5 chỉ sau 3 tháng học tập. Giáo viên rất tận tâm và phương pháp giảng dạy rất hiệu quả.',
      author: {
        name: 'Nguyễn Thanh Hà',
        role: 'Học viên IELTS',
        imageSrc: '/api/placeholder/100/100',
      },
      rating: 5,
    },
    {
      id: 2,
      content:
        'Tôi đã cải thiện kỹ năng giao tiếp tiếng Anh rất nhiều sau khi tham gia khóa học tại EduEnglish. Các buổi học thực hành rất thú vị và bổ ích.',
      author: {
        name: 'Trần Minh Đức',
        role: 'Học viên tiếng Anh giao tiếp',
        imageSrc: '/api/placeholder/100/100',
      },
      rating: 5,
    },
    {
      id: 3,
      content:
        'Từ một người không biết gì về tiếng Anh, sau 6 tháng học tại EduEnglish, tôi đã có thể tự tin giao tiếp với đối tác nước ngoài. Cảm ơn EduEnglish rất nhiều!',
      author: {
        name: 'Phạm Thị Lan',
        role: 'Học viên tiếng Anh doanh nghiệp',
        imageSrc: '/api/placeholder/100/100',
      },
      rating: 4,
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Học viên nói gì về EduEnglish
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Hàng ngàn học viên đã tin tưởng và thành công cùng chúng tôi.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 rounded-xl p-8 shadow-sm">
              <div className="flex items-center space-x-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                  />
                ))}
              </div>
              <p className="mt-4 text-lg text-gray-600 italic">"{testimonial.content}"</p>
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={testimonial.author.imageSrc}
                    alt={testimonial.author.name}
                  />
                </div>
                <div className="ml-4">
                  <div className="text-base font-medium text-gray-900">
                    {testimonial.author.name}
                  </div>
                  <div className="text-sm text-gray-500">{testimonial.author.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;