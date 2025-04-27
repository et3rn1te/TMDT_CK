import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CheckCircle, Clock, AlertCircle, Play, BookOpen, BarChart2, Download, Award } from 'lucide-react';

// Define course status type
type CourseStatus = 'completed' | 'in-progress' | 'not-started';
type PaymentStatus = 'paid' | 'pending' | 'failed';

interface RegisteredCourse {
  id: number;
  title: string;
  instructor: string;
  image: string;
  progress: number; // 0-100
  lastAccessed: string;
  courseStatus: CourseStatus;
  expiresAt: string | null;
  paymentStatus: PaymentStatus;
  paymentDate: string | null;
  certificate: boolean;
  totalLessons: number;
  completedLessons: number;
}

const RegisteredCourses = () => {
  const [courses, setCourses] = useState<RegisteredCourse[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed' | 'not-started'>('all');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  useEffect(() => {
    setTimeout(() => {
      setCourses([
        {
          id: 1,
          title: 'Complete English Grammar Course',
          instructor: 'John Smith',
          image: 'https://play-lh.googleusercontent.com/RDaDkf8_3otfI-Yoe-uIue0TckLkKlbu9pMOHE4bQcJIkwEcLuD6Fr-deph5DForNKQ',
          progress: 75,
          lastAccessed: '2023-06-15T14:30:00Z',
          courseStatus: 'in-progress',
          expiresAt: '2024-06-15T00:00:00Z',
          paymentStatus: 'paid',
          paymentDate: '2023-06-01T10:15:00Z',
          certificate: false,
          totalLessons: 48,
          completedLessons: 36
        },
        {
          id: 2,
          title: 'English for Business Communication',
          instructor: 'Sarah Johnson',
          image: 'https://play-lh.googleusercontent.com/RDaDkf8_3otfI-Yoe-uIue0TckLkKlbu9pMOHE4bQcJIkwEcLuD6Fr-deph5DForNKQ',
          progress: 100,
          lastAccessed: '2023-05-20T09:45:00Z',
          courseStatus: 'completed',
          expiresAt: null, // No expiration
          paymentStatus: 'paid',
          paymentDate: '2023-04-12T08:30:00Z',
          certificate: true,
          totalLessons: 36,
          completedLessons: 36
        },
        {
          id: 3,
          title: 'IELTS Preparation Masterclass',
          instructor: 'David Wong',
          image: 'https://img-c.udemycdn.com/course/240x135/3252778_7213.jpg',
          progress: 0,
          lastAccessed: null,
          courseStatus: 'not-started',
          expiresAt: '2024-07-10T00:00:00Z',
          paymentStatus: 'pending',
          paymentDate: null,
          certificate: false,
          totalLessons: 52,
          completedLessons: 0
        },
        {
          id: 4,
          title: 'English Pronunciation Made Simple',
          instructor: 'Emma Thompson',
          image: 'https://img-c.udemycdn.com/course/240x135/1984422_1063_3.jpg',
          progress: 30,
          lastAccessed: '2023-06-10T16:20:00Z',
          courseStatus: 'in-progress',
          expiresAt: '2024-06-05T00:00:00Z',
          paymentStatus: 'paid',
          paymentDate: '2023-06-05T11:20:00Z',
          certificate: false,
          totalLessons: 24,
          completedLessons: 7
        },
        {
          id: 5,
          title: 'Advanced English Vocabulary',
          instructor: 'Michael Brown',
          image: 'https://img-c.udemycdn.com/course/240x135/1342498_a2be_4.jpg',
          progress: 0,
          lastAccessed: null,
          courseStatus: 'not-started',
          expiresAt: '2024-08-20T00:00:00Z',
          paymentStatus: 'failed',
          paymentDate: '2023-06-18T13:45:00Z',
          certificate: false,
          totalLessons: 30,
          completedLessons: 0
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter courses based on active tab
  const filteredCourses = courses.filter(course => {
    if (activeTab === 'all') return true;
    if (activeTab === 'in-progress') return course.courseStatus === 'in-progress';
    if (activeTab === 'completed') return course.courseStatus === 'completed';
    if (activeTab === 'not-started') return course.courseStatus === 'not-started';
    return true;
  });

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get status icon
  const getStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  // Get status text
  const getStatusText = (status: PaymentStatus) => {
    switch (status) {
      case 'paid':
        return 'Đã thanh toán';
      case 'pending':
        return 'Đang xử lý';
      case 'failed':
        return 'Thanh toán thất bại';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Khóa học của tôi</h1>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm mb-6 p-1 border border-gray-200">
            <div className="sm:hidden">
              <select
                id="tabs"
                className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as any)}
              >
                <option value="all">Tất cả</option>
                <option value="in-progress">Đang học</option>
                <option value="completed">Đã hoàn thành</option>
                <option value="not-started">Chưa bắt đầu</option>
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-4 px-4" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`py-3 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'all'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Tất cả ({courses.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('in-progress')}
                    className={`py-3 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'in-progress'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Đang học ({courses.filter(c => c.courseStatus === 'in-progress').length})
                  </button>
                  <button
                    onClick={() => setActiveTab('completed')}
                    className={`py-3 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'completed'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Đã hoàn thành ({courses.filter(c => c.courseStatus === 'completed').length})
                  </button>
                  <button
                    onClick={() => setActiveTab('not-started')}
                    className={`py-3 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'not-started'
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Chưa bắt đầu ({courses.filter(c => c.courseStatus === 'not-started').length})
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Course list */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse p-4">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-40 h-24 bg-gray-300 rounded" />
                    <div className="ml-0 md:ml-4 mt-4 md:mt-0 flex-grow">
                      <div className="h-5 bg-gray-300 rounded w-2/3 mb-2" />
                      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2" />
                      <div className="h-4 bg-gray-300 rounded w-full mb-2" />
                      <div className="h-4 bg-gray-300 rounded w-1/4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Không có khóa học nào</h3>
              <p className="text-gray-500 mb-4">Bạn chưa đăng ký khóa học nào trong danh mục này.</p>
              <a
                href="/courses"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Khám phá khóa học
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCourses.map(course => (
                <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
                  <div className="p-5">
                    <div className="flex flex-col md:flex-row">
                      {/* Course image */}
                      <div className="w-full md:w-52 flex-shrink-0">
                        <img src={course.image} alt={course.title} className="w-full h-32 object-cover rounded" />
                      </div>
                      
                      {/* Course info */}
                      <div className="md:ml-6 mt-4 md:mt-0 flex-grow">
                        <div className="flex flex-wrap items-start justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{course.title}</h3>
                            <p className="text-sm text-gray-600 mb-3">Giảng viên: {course.instructor}</p>
                          </div>
                          
                          {/* Payment status */}
                          <div className="flex items-center px-3 py-1 rounded-full text-sm font-medium mb-3 md:mb-0" 
                               style={{ 
                                 backgroundColor: course.paymentStatus === 'paid' ? 'rgba(16, 185, 129, 0.1)' : 
                                                 course.paymentStatus === 'pending' ? 'rgba(245, 158, 11, 0.1)' : 
                                                 'rgba(239, 68, 68, 0.1)'
                               }}>
                            {getStatusIcon(course.paymentStatus)}
                            <span className="ml-1" 
                                 style={{ 
                                   color: course.paymentStatus === 'paid' ? 'rgb(16, 185, 129)' : 
                                           course.paymentStatus === 'pending' ? 'rgb(245, 158, 11)' : 
                                           'rgb(239, 68, 68)'
                                 }}>
                              {getStatusText(course.paymentStatus)}
                            </span>
                          </div>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="mb-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">
                              Tiến độ: {course.progress}%
                            </span>
                            <span className="text-xs text-gray-500">
                              {course.completedLessons}/{course.totalLessons} bài học
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-indigo-600 h-2.5 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        {/* Additional info */}
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 mt-3">
                          {course.lastAccessed && (
                            <div className="flex items-center mr-6 mb-2 sm:mb-0">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Truy cập lần cuối: {formatDate(course.lastAccessed)}</span>
                            </div>
                          )}
                          {course.paymentDate && (
                            <div className="flex items-center mr-6 mb-2 sm:mb-0">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              <span>Ngày thanh toán: {formatDate(course.paymentDate)}</span>
                            </div>
                          )}
                          {course.expiresAt && (
                            <div className="flex items-center mb-2 sm:mb-0">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              <span>Hết hạn: {formatDate(course.expiresAt)}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex flex-wrap items-center space-x-2 mt-4">
                          <a 
                            href={`/learn/${course.id}`}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                          >
                            <Play className="mr-1 h-4 w-4" />
                            {course.courseStatus === 'not-started' ? 'Bắt đầu học' : 'Tiếp tục học'}
                          </a>
                          
                          {course.courseStatus === 'completed' && course.certificate && (
                            <a 
                              href={`/certificate/${course.id}`}
                              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 border-indigo-600"
                            >
                              <Award className="mr-1 h-4 w-4" />
                              Xem chứng chỉ
                            </a>
                          )}
                          
                          <a 
                            href={`/course-details/${course.id}`}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                          >
                            <BookOpen className="mr-1 h-4 w-4" />
                            Chi tiết
                          </a>
                          
                          {course.paymentStatus === 'failed' && (
                            <a 
                              href={`/payment/retry/${course.id}`}
                              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                            >
                              <AlertCircle className="mr-1 h-4 w-4" />
                              Thử lại thanh toán
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisteredCourses; 