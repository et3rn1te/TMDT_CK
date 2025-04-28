import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AlertCircle, BookOpen, User, Calendar, ArrowLeft } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  instructor: string;
  image: string;
  description: string;
  enrollmentDate: string;
  category: string;
  level: string;
}

interface ComplaintFormData {
  title: string;
  description: string;
  orderId: string;
}

const CourseComplaint = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState<ComplaintFormData>({
    title: '',
    description: '',
    orderId: ''
  });
  const [formErrors, setFormErrors] = useState({
    title: '',
    description: '',
    orderId: ''
  });

  // Mock data - replace with actual API call
  useEffect(() => {
    setTimeout(() => {
      // Simulate fetching course data
      if (courseId) {
        setCourse({
          id: parseInt(courseId),
          title: 'Complete English Grammar Course',
          instructor: 'John Smith',
          image: 'https://play-lh.googleusercontent.com/RDaDkf8_3otfI-Yoe-uIue0TckLkKlbu9pMOHE4bQcJIkwEcLuD6Fr-deph5DForNKQ',
          description: 'A comprehensive guide to English grammar for all levels.',
          enrollmentDate: '2023-06-01T10:15:00Z',
          category: 'Grammar',
          level: 'Intermediate'
        });
        setLoading(false);
      }
    }, 1000);
  }, [courseId]);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {
      title: '',
      description: '',
      orderId: ''
    };
    let isValid = true;

    if (!formData.title.trim()) {
      errors.title = 'Vui lòng nhập tiêu đề khiếu nại';
      isValid = false;
    }

    if (!formData.description.trim()) {
      errors.description = 'Vui lòng nhập nội dung khiếu nại';
      isValid = false;
    } else if (formData.description.trim().length < 20) {
      errors.description = 'Nội dung khiếu nại phải có ít nhất 20 ký tự';
      isValid = false;
    }

    if (!formData.orderId.trim()) {
      errors.orderId = 'Vui lòng nhập mã đơn hàng';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    // Simulate API call to submit complaint
    setTimeout(() => {
      console.log('Submitting complaint:', {
        courseId,
        userId: 101, // Assume current user id
        ...formData
      });
      
      setSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        title: '',
        description: '',
        orderId: ''
      });
      
      // Redirect back to course page after 3 seconds
      setTimeout(() => {
        navigate(`/my-courses`);
      }, 3000);
    }, 1500);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={goBack}
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Quay lại
          </button>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Gửi khiếu nại khóa học</h1>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : course ? (
            <>
              {/* Course information */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="md:flex">
                  <div className="md:w-1/4">
                    <img 
                      className="h-48 w-full object-cover md:h-full md:w-full" 
                      src={course.image} 
                      alt={course.title} 
                    />
                  </div>
                  <div className="p-6 md:w-3/4">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h2>
                    
                    <div className="mb-4">
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <User className="mr-1 h-4 w-4" />
                        <span>Giảng viên: {course.instructor}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <BookOpen className="mr-1 h-4 w-4" />
                        <span>Danh mục: {course.category} | Cấp độ: {course.level}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>Ngày đăng ký: {formatDate(course.enrollmentDate)}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{course.description}</p>
                  </div>
                </div>
              </div>
              
              {submitSuccess ? (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm leading-5 text-green-700">
                        Cảm ơn bạn đã gửi khiếu nại. Chúng tôi sẽ xem xét và phản hồi trong thời gian sớm nhất.
                      </p>
                      <p className="text-sm leading-5 text-green-700 mt-1">
                        Bạn sẽ được chuyển hướng lại trang khóa học của bạn trong giây lát...
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start mb-6">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-6 w-6 text-yellow-500" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm leading-5 font-medium text-gray-900">
                          Thông tin khiếu nại
                        </h3>
                        <div className="mt-1 text-sm leading-5 text-gray-500">
                          <p>
                            Vui lòng cung cấp thông tin chi tiết về vấn đề bạn đang gặp phải với khóa học này.
                            Đội ngũ hỗ trợ của chúng tôi sẽ xem xét và phản hồi trong vòng 24-48 giờ làm việc.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                      <div className="mb-6">
                        <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
                          Mã đơn hàng <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="orderId"
                          name="orderId"
                          value={formData.orderId}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            formErrors.orderId ? 'border-red-300' : ''
                          }`}
                          placeholder="Nhập mã đơn hàng của bạn"
                        />
                        {formErrors.orderId && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.orderId}</p>
                        )}
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                          Tiêu đề khiếu nại <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            formErrors.title ? 'border-red-300' : ''
                          }`}
                          placeholder="Nhập tiêu đề khiếu nại"
                        />
                        {formErrors.title && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
                        )}
                      </div>
                      
                      <div className="mb-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                          Nội dung khiếu nại <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={6}
                          value={formData.description}
                          onChange={handleInputChange}
                          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                            formErrors.description ? 'border-red-300' : ''
                          }`}
                          placeholder="Mô tả chi tiết vấn đề bạn đang gặp phải với khóa học này"
                        />
                        {formErrors.description && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                        )}
                        <p className="mt-2 text-xs text-gray-500">
                          Vui lòng cung cấp thông tin chi tiết về vấn đề (ít nhất 20 ký tự).
                          Bạn có thể mô tả lỗi gặp phải, vấn đề về nội dung, hoặc bất kỳ khiếu nại nào liên quan đến khóa học.
                        </p>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={goBack}
                          className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Hủy
                        </button>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {submitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Đang gửi...
                            </>
                          ) : (
                            'Gửi khiếu nại'
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Không tìm thấy thông tin khóa học. Vui lòng thử lại sau hoặc liên hệ với bộ phận hỗ trợ.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseComplaint; 