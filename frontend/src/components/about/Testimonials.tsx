const Testimonials = () => {
    const testimonials = [
      {
        content: "Tôi đã học IELTS tại EduEnglish và đạt được band score 7.5 chỉ sau 3 tháng. Phương pháp giảng dạy của thầy cô rất hiệu quả và dễ hiểu.",
        author: "Nguyễn Thị Minh Anh",
        position: "Sinh viên Đại học Ngoại thương",
        imageSrc: "/api/placeholder/100/100"
      },
      {
        content: "Khóa học Business English đã giúp tôi tự tin hơn rất nhiều trong các cuộc họp với đối tác quốc tế. Cảm ơn EduEnglish rất nhiều!",
        author: "Trần Văn Minh",
        position: "Quản lý Marketing, Công ty ABC",
        imageSrc: "/api/placeholder/100/100"
      },
      {
        content: "Con tôi rất thích học tại EduEnglish. Các thầy cô rất nhiệt tình và lớp học luôn vui vẻ, giúp con tiến bộ rõ rệt chỉ sau vài tháng.",
        author: "Phạm Thị Hoa",
        position: "Phụ huynh học sinh",
        imageSrc: "/api/placeholder/100/100"
      }
    ];
  
    return (
      <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Học viên nói gì về chúng tôi</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              Niềm vui và thành công của học viên là động lực lớn nhất để chúng tôi không ngừng cải tiến và phát triển.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mr-4">
                    <img 
                      className="h-12 w-12 rounded-full" 
                      src={testimonial.imageSrc} 
                      alt={testimonial.author} 
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <a 
              href="#" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Xem thêm đánh giá
            </a>
          </div>
        </div>
      </div>
    );
  };
  
  export default Testimonials;