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
import { courseApi } from '../../api/courses'; // Import courseApi
import { CourseResponse } from '../../types/courseTypes'; // Use the shared CourseResponse type

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<CourseResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'reviews'>('overview');

  // Format price in VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Format date (only if 'lastUpdated' is added to backend DTO later)
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return 'N/A'; // Fallback for invalid date strings
    }
  };

  useEffect(() => {
    const fetchCourseDetail = async () => {
      if (!courseId) {
        setError('Không tìm thấy ID khóa học');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await courseApi.getCourseById(Number(courseId));
        setCourse(data);
      } catch (error) {
        console.error('Error fetching course details:', error);
        setError(error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tải thông tin khóa học');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
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
                    {/* Rating, Reviews, Students - NOT in CourseResponse.java, removed display */}
                    <span className="mr-2">Chưa có đánh giá</span>
                    <span className="text-gray-300">(0 đánh giá)</span>
                    <span className="mx-2">•</span>
                    <span>0 học viên</span>
                  </div>
                  <p className="mb-4">
                    Được tạo bởi <span className="font-medium">{course.seller.fullName}</span>
                  </p>
                  <div className="flex flex-wrap items-center text-sm text-gray-300 mb-6">
                    {/* Last Updated, Language, Duration - NOT in CourseResponse.java, removed display */}
                    <div className="flex items-center mr-4 mb-2">
                      <BarChart2 className="h-4 w-4 mr-1" />
                      <span>{course.level.name}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <FileText className="h-4 w-4 mr-1" />
                      <span>{course.lessons.length} bài giảng</span>
                    </div>
                  </div>

                  {/* Price and CTA section for mobile */}
                  <div className="lg:hidden bg-gray-800 p-4 rounded-lg mb-6">
                    <div className="flex items-center mb-2">
                    <span className="text-2xl font-bold mr-3">
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

                  {/* Video Preview - 'videoUrl' is NOT in CourseResponse.java, using placeholder */}
                  <div className="relative h-0 pb-[56.25%] lg:hidden mb-6">
                    <iframe
                        src={course.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"} // Placeholder video
                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                        allowFullScreen
                        title="Course preview"
                    ></iframe>
                  </div>
                </div>

                {/* Video preview and CTA section for desktop */}
                <div className="hidden lg:block">
                  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                    {/* Video Preview - 'videoUrl' is NOT in CourseResponse.java, using placeholder */}
                    <div className="relative h-0 pb-[56.25%]">
                      <iframe
                          src={course.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"} // Placeholder video
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
                          <FileText className="h-5 w-5 mr-2 flex-shrink-0" />
                          <span>{course.lessons.length} bài giảng</span>
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
                      {!showFullDescription && course.description && course.description.length > 200 && (
                          <button
                              onClick={() => setShowFullDescription(true)}
                              className="text-indigo-600 font-medium mt-2"
                          >
                            Xem thêm
                          </button>
                      )}
                    </div>
                  </div>

                  {/* What you will learn - NOT in CourseResponse.java, using placeholder */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4">Bạn sẽ học được gì</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Provide sensible defaults or remove if no data is available */}
                      {(course.whatYouWillLearn || ['Dữ liệu "Bạn sẽ học được gì" chưa có từ API.']).map((item, index) => (
                          <div key={index} className="flex">
                            <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mr-2" />
                            <span>{item}</span>
                          </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold mb-4">Giảng viên</h2>
                    <div className="flex items-start">
                      {/* Instructor Avatar - NOT in CourseResponse.java (only seller.fullName), using placeholder */}
                      <img
                          src={course.seller.avatar || 'https://placehold.co/80x80/E0E0E0/000000?text=Avatar'} // Placeholder avatar
                          alt={course.seller.fullName}
                          className="w-20 h-20 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">{course.seller.fullName}</h3>
                        {/* Instructor Title, Rating, Students, Courses - NOT in CourseResponse.java, removed display */}
                        <p className="text-gray-600 mb-2">Thông tin giảng viên chưa được cung cấp.</p>
                        <div className="flex items-center text-sm text-gray-600 space-x-4 mb-2">
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>0 Đánh giá</span>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 space-x-4">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>0 Học viên</span>
                          </div>
                          <div className="flex items-center">
                            <PlayCircle className="h-4 w-4 mr-1" />
                            <span>0 Khóa học</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            )}

            {/* Curriculum tab - using actual lessons from API */}
            {activeTab === 'curriculum' && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Nội dung khóa học</h2>
                  {course.lessons.length === 0 ? (
                      <p className="text-gray-600">Khóa học này chưa có bài giảng nào được thêm.</p>
                  ) : (
                      <div className="border border-gray-200 rounded-lg divide-y">
                        <div className="p-4 bg-gray-50">
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold">Tất cả bài giảng</h3>
                            <span className="text-sm text-gray-500">
                        {course.lessons.length} bài giảng
                      </span>
                          </div>
                        </div>
                        {course.lessons.map((lesson) => (
                            <div key={lesson.id} className="p-4">
                              <div className="flex items-center">
                                <PlayCircle className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                                <div>
                                  <p>{lesson.title}</p>
                                  {/* If LessonSummaryResponse includes duration, display here */}
                                </div>
                              </div>
                            </div>
                        ))}
                      </div>
                  )}
                </div>
            )}

            {/* Reviews tab - 'reviewsList' is NOT in CourseResponse.java, using placeholder */}
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
                                  fill={"currentColor"} // Always fill for placeholder overall rating
                              />
                          ))}
                        </div>
                        <span className="font-bold text-xl">5.0</span> {/* Placeholder rating */}
                      </div>
                      <p className="text-gray-600">0 đánh giá</p> {/* Placeholder reviews */}
                    </div>

                    <div className="md:w-2/3">
                      {/* Rating distribution bars - hardcoded placeholders */}
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
                                    style={{ width: '0%' }} // No real data, so set to 0%
                                ></div>
                              </div>
                              <div className="w-12 text-right text-sm text-gray-600">
                                0%
                              </div>
                            </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Reviews list - using placeholder */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Nhận xét từ học viên</h3>
                    <div className="space-y-6">
                      {[{ // Single placeholder review if no real reviews from API
                        id: 999,
                        name: 'Học viên ẩn danh',
                        avatar: 'https://placehold.co/48x48/E0E0E0/000000?text=A',
                        rating: 5,
                        date: new Date().toISOString(),
                        comment: 'Chưa có nhận xét nào cho khóa học này. Hãy là người đầu tiên!'
                      }].map((review) => (
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
                              {formatDate(review.date)}
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
