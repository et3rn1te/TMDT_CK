import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { 
  PlayCircle, 
  Clock, 
  BarChart2, 
  Globe, 
  Award, 
  MessageSquare, 
  Star, 
  Users,
  FileText,
  CheckCircle 
} from 'lucide-react';

// Interface cho dữ liệu từ API
interface CourseResponse {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPrice: number | null;
  categoryName: string;
  levelName: string;
  seller: {
    id: number;
    fullName: string;
    // Các trường khác của seller sẽ được thêm sau
  };
  status: string;
  lessons: {
    id: number;
    title: string;
    // Các trường khác của lesson sẽ được thêm sau
  }[];
}

// Interface mở rộng cho các trường sẽ được thêm sau
interface ExtendedCourseData extends CourseResponse {
  // Các trường sẽ được thêm sau
  instructor?: {
    name: string;
    avatar: string;
    title: string;
    rating: number;
    students: number;
    courses: number;
  };
  rating?: number;
  reviews?: number;
  students?: number;
  lastUpdated?: string;
  language?: string;
  duration?: string;
  lectures?: number;
  thumbnail?: string;
  videoUrl?: string;
  whatYouWillLearn?: string[];
  requirements?: string[];
  reviewsList?: {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
  }[];
}

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<ExtendedCourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview');

  // Format price in VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
    });
  };

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:8080/api/v1/courses/${courseId}`);
        
        if (!response.ok) {
          throw new Error('Không thể tải thông tin khóa học');
        }

        const data: CourseResponse = await response.json();
        
        // Tạm thời thêm dữ liệu mẫu cho các trường chưa có trong API
        const extendedData: ExtendedCourseData = {
          ...data,
          instructor: {
            name: data.seller.fullName,
            avatar: 'https://randomuser.me/api/portraits/men/41.jpg', // Sẽ được thay thế bằng API
            title: 'Giảng viên', // Sẽ được thay thế bằng API
            rating: 4.8, // Sẽ được thay thế bằng API
            students: 15420, // Sẽ được thay thế bằng API
            courses: 5 // Sẽ được thay thế bằng API
          },
          rating: 4.8, // Sẽ được thay thế bằng API
          reviews: 1254, // Sẽ được thay thế bằng API
          students: 5280, // Sẽ được thay thế bằng API
          lastUpdated: new Date().toISOString(), // Sẽ được thay thế bằng API
          language: 'Tiếng Anh', // Sẽ được thay thế bằng API
          duration: '24 giờ 30 phút', // Sẽ được thay thế bằng API
          lectures: data.lessons.length, // Tạm thời sử dụng số lượng lessons
          thumbnail: 'https://img-c.udemycdn.com/course/750x422/2380566_0476.jpg', // Sẽ được thay thế bằng API
          videoUrl: 'https://www.youtube.com/embed/ER9SspLe4Hg', // Sẽ được thay thế bằng API
          whatYouWillLearn: [ // Sẽ được thay thế bằng API
            'Nắm vững tất cả các thì trong tiếng Anh',
            'Sử dụng đúng cách các loại từ',
            'Xây dựng câu phức tạp',
            'Giao tiếp tự tin'
          ],
          requirements: [ // Sẽ được thay thế bằng API
            'Không yêu cầu kiến thức trước đó',
            'Chỉ cần có máy tính hoặc điện thoại thông minh',
            'Có động lực để học'
          ],
          reviewsList: [ // Sẽ được thay thế bằng API
            {
              id: 1,
              name: 'Nguyễn Văn A',
              avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
              rating: 5,
              date: '2023-06-10',
              comment: 'Khóa học rất hay và bổ ích'
            }
          ]
        };

        setCourse(extendedData);
      } catch (error) {
        console.error('Error fetching course details:', error);
        setError(error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải thông tin khóa học');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseDetail();
    }
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse p-8">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Đã xảy ra lỗi</h2>
            <p className="text-gray-600 mb-4">{error || 'Không tìm thấy thông tin khóa học'}</p>
            <Link
              to="/courses"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Quay lại danh sách khóa học
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section with video */}
        <div className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-5 w-5"
                        fill={star <= Math.round(course.rating || 0) ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <span className="mr-2">{course.rating || 0}</span>
                  <span className="text-gray-300">({course.reviews} đánh giá)</span>
                  <span className="mx-2">•</span>
                  <span>{course.students} học viên</span>
                </div>
                <p className="mb-4">
                  Được tạo bởi <span className="font-medium">{course.instructor?.name || course.seller.fullName}</span>
                </p>
                <div className="flex flex-wrap items-center text-sm text-gray-300 mb-6">
                  <div className="flex items-center mr-4 mb-2">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Cập nhật {formatDate(course.lastUpdated || new Date().toISOString())}</span>
                  </div>
                  <div className="flex items-center mr-4 mb-2">
                    <Globe className="h-4 w-4 mr-1" />
                    <span>{course.language}</span>
                  </div>
                  <div className="flex items-center mr-4 mb-2">
                    <BarChart2 className="h-4 w-4 mr-1" />
                    <span>{course.levelName}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FileText className="h-4 w-4 mr-1" />
                    <span>{course.lectures} bài giảng</span>
                  </div>
                </div>
                
                {/* Price and CTA section for mobile */}
                <div className="lg:hidden bg-gray-800 p-4 rounded-lg mb-6">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-bold mr-2">
                      {course.discountPrice ? formatPrice(course.discountPrice) : formatPrice(course.price)}
                    </span>
                    {course.discountPrice && (
                      <span className="text-gray-400 line-through">
                        {formatPrice(course.price)}
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/payment/${course.id}`}
                    className="block w-full text-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Đăng ký ngay
                  </Link>
                  <p className="text-sm text-center mt-2 text-gray-300">Bảo đảm hoàn tiền trong 30 ngày</p>
                </div>
                
                <div className="relative h-0 pb-[56.25%] lg:hidden mb-6">
                  <iframe
                    src={course.videoUrl}
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    allowFullScreen
                    title="Course preview"
                  ></iframe>
                </div>
              </div>
              
              {/* Video preview and CTA section for desktop */}
              <div className="hidden lg:block">
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <div className="relative h-0 pb-[56.25%]">
                    <iframe
                      src={course.videoUrl}
                      className="absolute top-0 left-0 w-full h-full"
                      allowFullScreen
                      title="Course preview"
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl font-bold mr-3">
                        {course.discountPrice ? formatPrice(course.discountPrice) : formatPrice(course.price)}
                      </span>
                      {course.discountPrice && (
                        <span className="text-gray-400 line-through">
                          {formatPrice(course.price)}
                        </span>
                      )}
                    </div>
                    <Link
                      to={`/payment/${course.id}`}
                      className="block w-full text-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 mb-4"
                    >
                      Đăng ký ngay
                    </Link>
                    <p className="text-sm text-center mb-4 text-gray-300">Bảo đảm hoàn tiền trong 30 ngày</p>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span>Thời lượng: {course.duration}</span>
                      </div>
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span>{course.lectures} bài giảng</span>
                      </div>
                      <div className="flex items-start">
                        <Globe className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span>Truy cập mọi lúc, mọi nơi</span>
                      </div>
                      <div className="flex items-start">
                        <Award className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span>Chứng chỉ hoàn thành khóa học</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course content tabs */}
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Tổng quan
              </button>
              <button
                onClick={() => setActiveTab('curriculum')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'curriculum'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Nội dung
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Đánh giá
              </button>
            </nav>
          </div>
        </div>

        {/* Tab content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Overview tab */}
          {activeTab === 'overview' && (
            <div>
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Mô tả khóa học</h2>
                <div className="text-gray-700">
                  <p className={`${showFullDescription ? '' : 'line-clamp-3'}`}>
                    {course.description}
                  </p>
                  {!showFullDescription && (
                    <button
                      onClick={() => setShowFullDescription(true)}
                      className="text-indigo-600 font-medium mt-2"
                    >
                      Xem thêm
                    </button>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Bạn sẽ học được gì</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(course.whatYouWillLearn || []).map((item, index) => (
                    <div key={index} className="flex">
                      <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mr-2" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Yêu cầu</h2>
                <ul className="list-disc pl-5 space-y-2">
                  {(course.requirements || []).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Giảng viên</h2>
                <div className="flex items-start">
                  <img 
                    src={course.instructor?.avatar || 'https://randomuser.me/api/portraits/men/41.jpg'} 
                    alt={course.instructor?.name || course.seller.fullName}
                    className="w-20 h-20 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{course.instructor?.name || course.seller.fullName}</h3>
                    <p className="text-gray-600 mb-2">{course.instructor?.title || 'Giảng viên'}</p>
                    <div className="flex items-center text-sm text-gray-600 space-x-4 mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{course.instructor?.rating || 0} Xếp hạng giảng viên</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{course.reviews || 0} Đánh giá</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{course.instructor?.students || 0} Học viên</span>
                      </div>
                      <div className="flex items-center">
                        <PlayCircle className="h-4 w-4 mr-1" />
                        <span>{course.instructor?.courses || 0} Khóa học</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Curriculum tab - simple version */}
          {activeTab === 'curriculum' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Nội dung khóa học</h2>
              <div className="border border-gray-200 rounded-lg divide-y">
                <div className="p-4 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Phần 1: Giới thiệu</h3>
                    <span className="text-sm text-gray-500">3 bài giảng • 45 phút</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <PlayCircle className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p>Bài 1: Tổng quan về khóa học</p>
                      <p className="text-sm text-gray-500">15:00</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    <PlayCircle className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p>Bài 2: Các tài liệu khóa học</p>
                      <p className="text-sm text-gray-500">10:00</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <PlayCircle className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p>Bài 3: Cách học hiệu quả</p>
                      <p className="text-sm text-gray-500">20:00</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Phần 2: Các thì trong tiếng Anh</h3>
                    <span className="text-sm text-gray-500">5 bài giảng • 2 giờ 15 phút</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <PlayCircle className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p>Bài 1: Hiện tại đơn và hiện tại tiếp diễn</p>
                      <p className="text-sm text-gray-500">30:00</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    <PlayCircle className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p>Bài 2: Quá khứ đơn và quá khứ tiếp diễn</p>
                      <p className="text-sm text-gray-500">25:00</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-500 text-sm ml-7">
                      +3 bài giảng khác
                    </p>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50">
                  <p className="text-center text-gray-500">
                    Và 8 phần học khác với tổng cộng 42 bài giảng
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Reviews tab */}
          {activeTab === 'reviews' && (
            <div>
              <div className="flex flex-col md:flex-row items-start mb-8">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <h2 className="text-xl font-bold mb-2">Đánh giá của học viên</h2>
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-5 w-5"
                          fill={star <= Math.round(course.rating || 0) ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-xl">{course.rating || 0}</span>
                  </div>
                  <p className="text-gray-600">{course.reviews || 0} đánh giá</p>
                </div>
                
                <div className="md:w-2/3">
                  {/* Rating distribution bars */}
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <div className="flex items-center w-20">
                          <span className="mr-1">{rating}</span>
                          <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                        </div>
                        <div className="flex-grow h-2 bg-gray-200 rounded-full mx-3">
                          <div 
                            className="h-2 bg-yellow-400 rounded-full" 
                            style={{ 
                              width: rating === 5 ? '70%' : 
                                    rating === 4 ? '20%' : 
                                    rating === 3 ? '7%' : 
                                    rating === 2 ? '2%' : '1%' 
                            }}
                          ></div>
                        </div>
                        <div className="w-12 text-right text-sm text-gray-600">
                          {rating === 5 ? '70%' : 
                            rating === 4 ? '20%' : 
                            rating === 3 ? '7%' : 
                            rating === 2 ? '2%' : '1%'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Reviews list */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Nhận xét từ học viên</h3>
                <div className="space-y-6">
                  {(course.reviewsList || []).map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-start">
                        <img 
                          src={review.avatar} 
                          alt={review.name}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <h4 className="font-medium">{review.name}</h4>
                          <div className="flex items-center mt-1 mb-2">
                            <div className="flex text-yellow-400 mr-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className="h-4 w-4"
                                  fill={star <= review.rating ? "currentColor" : "none"}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
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

export default CourseDetail; 