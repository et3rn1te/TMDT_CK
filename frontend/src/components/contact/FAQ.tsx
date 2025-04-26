import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-indigo-600" />
        ) : (
          <ChevronDown className="h-5 w-5 text-indigo-600" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4">
          <p className="text-gray-500">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "Làm thế nào để đăng ký khóa học?",
      answer: "Bạn có thể đăng ký khóa học trực tuyến trên website của chúng tôi hoặc liên hệ trực tiếp với đội ngũ tư vấn qua số điện thoại 1800 1234. Sau khi đăng ký, bạn sẽ nhận được email xác nhận và hướng dẫn thanh toán."
    },
    {
      question: "Các phương thức thanh toán được chấp nhận?",
      answer: "EduEnglish chấp nhận nhiều phương thức thanh toán bao gồm: chuyển khoản ngân hàng, thẻ tín dụng/ghi nợ (Visa, Mastercard, JCB), ví điện tử (Momo, ZaloPay, VNPay), và thanh toán trực tiếp tại văn phòng."
    },
    {
      question: "Làm thế nào để tôi biết khóa học nào phù hợp với mình?",
      answer: "Chúng tôi cung cấp bài kiểm tra trình độ miễn phí và buổi tư vấn cá nhân để đánh giá nhu cầu và trình độ hiện tại của bạn. Từ đó, đội ngũ tư vấn sẽ giúp bạn chọn khóa học phù hợp nhất."
    },
    {
      question: "Chính sách hoàn tiền như thế nào?",
      answer: "EduEnglish cam kết hoàn tiền 100% nếu bạn không hài lòng sau 7 ngày học đầu tiên. Đối với các trường hợp hủy khóa học sau thời gian này, mức hoàn tiền sẽ được tính theo tỷ lệ thời gian còn lại của khóa học."
    },
    {
      question: "Tôi có thể học thử trước khi đăng ký khóa học không?",
      answer: "Có, chúng tôi cung cấp buổi học thử miễn phí cho hầu hết các khóa học. Bạn có thể đăng ký học thử trên website hoặc liên hệ trực tiếp với đội ngũ tư vấn."
    },
    {
      question: "Liệu tôi có thể chuyển đổi giữa các khóa học?",
      answer: "Có, bạn có thể chuyển đổi giữa các khóa học trong vòng 30 ngày đầu tiên nếu cảm thấy khóa học hiện tại không phù hợp. Sự chênh lệch về học phí (nếu có) sẽ được hoàn trả hoặc thu thêm tùy từng trường hợp."
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Câu hỏi thường gặp</h2>
          <p className="mt-4 text-lg text-gray-500">
            Những thắc mắc phổ biến về khóa học và dịch vụ của chúng tôi
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden px-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-500">
            Bạn không tìm thấy câu trả lời cho thắc mắc của mình?
          </p>
          <a
            href="#"
            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Liên hệ hỗ trợ
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;