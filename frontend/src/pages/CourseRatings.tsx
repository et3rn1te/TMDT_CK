import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Star, Edit, X, BookOpen, User, Calendar, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { courseApi } from '../api/courses';
import { reviewsApi } from '../api/reviews';
import { EnrolledCourse, CourseReview } from '../types/courseTypes';

interface User {
  id: number;
  email: string;
}

const CourseRatings = () => {
  // Mock user for now - in a real app, get this from auth context
  const user: User = { id: 1, email: 'user@example.com' };
  
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [reviews, setReviews] = useState<CourseReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<EnrolledCourse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const coursesPerPage = 3;

  // Load enrolled courses and reviews
  useEffect(() => {
    const fetchData = async () => {
      try {
        const enrolledCourses = await courseApi.getEnrolledCourses();
        const allReviews = await reviewsApi.getAllReviews();
        
        setCourses(enrolledCourses);
        setReviews(allReviews);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = (courses ??[]).slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil((courses ??[]).length / coursesPerPage);

  // Open review modal
  const openReviewModal = (course: EnrolledCourse) => {
    setSelectedCourse(course);
    // Check if user has already reviewed this course
    const existingReview = reviews.find(review => review.courseId === course.id && review.userId === user?.id);
    if (existingReview) {
      setReviewRating(existingReview.rating);
      setReviewComment(existingReview.comment);
    } else {
      setReviewRating(0);
      setReviewComment('');
    }
    setIsModalOpen(true);
  };

  // Close review modal
  const closeReviewModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
    setReviewRating(0);
    setReviewComment('');
    setHoveredRating(0);
  };

  // Submit review
  const submitReview = async () => {
    if (!selectedCourse || reviewRating === 0 || !user) return;
    
    try {
      const reviewData = {
        courseId: selectedCourse.id,
        userId: user.id,
        rating: reviewRating,
        comment: reviewComment
      };
      
      const newReview = await reviewsApi.submitReview(reviewData);
      
      // Update local state
      const existingReviewIndex = reviews.findIndex(
        review => review.courseId === selectedCourse.id && review.userId === user.id
      );
      
      if (existingReviewIndex >= 0) {
        // Update existing review
        const updatedReviews = [...reviews];
        updatedReviews[existingReviewIndex] = newReview;
        setReviews(updatedReviews);
      } else {
        // Add new review
        setReviews([...reviews, newReview]);
      }
      
      closeReviewModal();
    } catch (error) {
      console.error('Error submitting review:', error);
      // Handle error (show error message)
    }
  };

  // Get course reviews
  const getCourseReviews = (courseId: number) => {
    return reviews.filter(review => review.courseId === courseId);
  };

  // Calculate average rating
  const calculateAverageRating = (courseId: number) => {
    const courseReviews = getCourseReviews(courseId);
    if (courseReviews.length === 0) return 0;
    
    const sum = courseReviews.reduce((total, review) => total + review.rating, 0);
    return Math.round((sum / courseReviews.length) * 10) / 10;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Đánh giá khóa học</h1>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-gray-600 mb-4">
                  Bạn có thể đánh giá và chia sẻ trải nghiệm học tập của mình cho các khóa học đã mua.
                  Điều này sẽ giúp cải thiện chất lượng khóa học và hỗ trợ học viên khác trong việc lựa chọn.
                </p>
              </div>

              {/* Course List */}
              <div className="grid md:grid-cols-1 gap-6 mb-8">
                {currentCourses.map(course => {
                  const courseReviews = getCourseReviews(course.id);
                  const hasReviewed = courseReviews.some(review => review.userId === user?.id);
                  const averageRating = calculateAverageRating(course.id);
                  
                  return (
                    <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/4">
                          <img 
                            className="h-48 w-full object-cover md:h-full md:w-full" 
                            src={course.thumbnail} 
                            alt={course.title} 
                          />
                        </div>
                        <div className="p-6 md:w-3/4">
                          <div className="flex justify-between items-start mb-2">
                            <h2 className="text-xl font-bold text-gray-900">{course.title}</h2>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, index) => (
                                <Star
                                  key={index}
                                  className={`h-5 w-5 ${
                                    index < Math.floor(averageRating)
                                      ? 'text-yellow-400 fill-current'
                                      : averageRating - index > 0 && averageRating - index < 1
                                      ? 'text-yellow-400 fill-current' // For partial stars (future enhancement)
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="ml-1 text-gray-600">
                                {averageRating > 0 ? `(${averageRating})` : 'Chưa có đánh giá'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex items-center text-sm text-gray-600 mb-1">
                              <User className="mr-1 h-4 w-4" />
                              <span>Giảng viên: {course.instructorName}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="mr-1 h-4 w-4" />
                              <span>Ngày đăng ký: {formatDate(course.enrollmentDate)}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              {courseReviews.length > 0 ? (
                                <span className="text-sm text-gray-600">
                                  {courseReviews.length} đánh giá từ học viên
                                </span>
                              ) : (
                                <span className="text-sm text-gray-600">Chưa có đánh giá</span>
                              )}
                            </div>
                            
                            <button
                              onClick={() => openReviewModal(course)}
                              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${
                                hasReviewed
                                  ? 'text-indigo-700 bg-indigo-100 hover:bg-indigo-200'
                                  : 'text-white bg-indigo-600 hover:bg-indigo-700'
                              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              {hasReviewed ? 'Chỉnh sửa đánh giá' : 'Viết đánh giá'}
                            </button>
                          </div>
                          
                          {/* Add complaint button */}
                          <div className="mt-3">
                            <a
                              href={`/course-complaint/${course.id}`}
                              className="inline-flex items-center text-sm text-yellow-600 hover:text-yellow-800"
                            >
                              <AlertCircle className="mr-1 h-4 w-4" />
                              Gặp vấn đề? Gửi khiếu nại
                            </a>
                          </div>
                          
                          {/* Display the most recent review if any */}
                          {courseReviews.length > 0 && (
                            <div className="mt-4 border-t pt-4">
                              <h3 className="text-sm font-medium text-gray-900 mb-2">Đánh giá gần đây nhất:</h3>
                              <div className="flex items-start">
                                <img 
                                  className="h-10 w-10 rounded-full mr-3"
                                  src={courseReviews[0].userAvatar}
                                  alt={courseReviews[0].userName}
                                />
                                <div>
                                  <div className="flex items-center mb-1">
                                    <p className="text-sm font-medium text-gray-900 mr-2">{courseReviews[0].userName}</p>
                                    <div className="flex">
                                      {Array.from({ length: 5 }).map((_, index) => (
                                        <Star
                                          key={index}
                                          className={`h-4 w-4 ${
                                            index < courseReviews[0].rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600">{courseReviews[0].comment}</p>
                                  <p className="text-xs text-gray-500 mt-1">{formatDate(courseReviews[0].createdAt)}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center mt-8">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Trước
                  </button>
                  <div className="mx-4">
                    <span className="text-sm text-gray-700">
                      Trang {currentPage} / {totalPages}
                    </span>
                  </div>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sau
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Review Modal */}
      {isModalOpen && selectedCourse && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" style={{zIndex : -1}}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block z-50 align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  onClick={closeReviewModal}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Đóng</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Đánh giá khóa học: {selectedCourse.title}
                  </h3>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-center">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setReviewRating(index + 1)}
                          onMouseEnter={() => setHoveredRating(index + 1)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="focus:outline-none mx-1"
                        >
                          <Star
                            className={`h-10 w-10 ${
                              index < (hoveredRating || reviewRating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-2">
                      {reviewRating === 0
                        ? 'Chọn đánh giá'
                        : reviewRating === 1
                        ? 'Không hài lòng'
                        : reviewRating === 2
                        ? 'Tạm được'
                        : reviewRating === 3
                        ? 'Hài lòng'
                        : reviewRating === 4
                        ? 'Rất hài lòng'
                        : 'Xuất sắc'}
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="review-comment" className="block text-sm font-medium text-gray-700 mb-2">
                      Nhận xét của bạn
                    </label>
                    <textarea
                      id="review-comment"
                      rows={4}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Chia sẻ trải nghiệm học tập của bạn..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={submitReview}
                  disabled={reviewRating === 0}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                >
                  Gửi đánh giá
                </button>
                <button
                  type="button"
                  onClick={closeReviewModal}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CourseRatings; 