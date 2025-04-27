import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import { Filter, SlidersHorizontal } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setCourses([
        {
          id: 1,
          title: 'Complete English Grammar Course',
          instructor: 'John Smith',
          rating: 4.8,
          reviews: 1254,
          price: 599000,
          salePrice: 299000,
          image: 'https://img-c.udemycdn.com/course/240x135/2380566_0476.jpg',
          level: 'Beginner',
          duration: '24h 30m'
        },
        {
          id: 2,
          title: 'English for Business Communication',
          instructor: 'Sarah Johnson',
          rating: 4.6,
          reviews: 876,
          price: 799000,
          salePrice: 399000,
          image: 'https://img-c.udemycdn.com/course/240x135/2139122_5c38.jpg',
          level: 'Intermediate',
          duration: '18h 45m'
        },
        {
          id: 3,
          title: 'IELTS Preparation Masterclass',
          instructor: 'David Wong',
          rating: 4.9,
          reviews: 2103,
          price: 899000,
          salePrice: 449000,
          image: 'https://img-c.udemycdn.com/course/240x135/3252778_7213.jpg',
          level: 'Advanced',
          duration: '32h 15m'
        },
        {
          id: 4,
          title: 'English Pronunciation Made Simple',
          instructor: 'Emma Thompson',
          rating: 4.7,
          reviews: 921,
          price: 499000,
          salePrice: 249000,
          image: 'https://img-c.udemycdn.com/course/240x135/1984422_1063_3.jpg',
          level: 'All Levels',
          duration: '12h 20m'
        },
        {
          id: 5,
          title: 'Advanced English Vocabulary',
          instructor: 'Michael Brown',
          rating: 4.5,
          reviews: 567,
          price: 649000,
          salePrice: 329000,
          image: 'https://img-c.udemycdn.com/course/240x135/1342498_a2be_4.jpg',
          level: 'Intermediate',
          duration: '15h 40m'
        },
        {
          id: 6,
          title: 'English Conversation Skills',
          instructor: 'Lisa Chen',
          rating: 4.8,
          reviews: 1105,
          price: 549000,
          salePrice: 279000,
          image: 'https://img-c.udemycdn.com/course/240x135/2563748_f17e_4.jpg',
          level: 'Beginner',
          duration: '20h 10m'
        },
      ]);
      setLoading(false);
    }, 1000);
  }, [query]);

  // Format price in VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {courses.length} kết quả cho "{query}"
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters sidebar - desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h2 className="font-bold text-xl mb-4">Bộ lọc</h2>
                
                {/* Rating filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Đánh giá</h3>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5, 3.0].map(rating => (
                      <div key={rating} className="flex items-center">
                        <input
                          id={`rating-${rating}`}
                          name="rating"
                          type="radio"
                          className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <label htmlFor={`rating-${rating}`} className="ml-3 text-sm text-gray-700 flex items-center">
                          <span className="flex items-center text-amber-400">
                            {Array(Math.floor(rating)).fill(0).map((_, i) => (
                              <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                            {rating % 1 === 0.5 && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            )}
                            <span className="ml-1 text-gray-700">{rating} & up</span>
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Level filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Trình độ</h3>
                  <div className="space-y-2">
                    {['Beginner', 'Intermediate', 'Advanced', 'All Levels'].map(level => (
                      <div key={level} className="flex items-center">
                        <input
                          id={`level-${level}`}
                          name="level"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor={`level-${level}`} className="ml-3 text-sm text-gray-700">
                          {level === 'Beginner' ? 'Cơ bản' : 
                           level === 'Intermediate' ? 'Trung cấp' : 
                           level === 'Advanced' ? 'Nâng cao' : 'Tất cả cấp độ'}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Thời lượng</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'duration-1', label: '0-5 giờ' },
                      { id: 'duration-2', label: '6-10 giờ' },
                      { id: 'duration-3', label: '11-20 giờ' },
                      { id: 'duration-4', label: '20+ giờ' }
                    ].map(item => (
                      <div key={item.id} className="flex items-center">
                        <input
                          id={item.id}
                          name="duration"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor={item.id} className="ml-3 text-sm text-gray-700">
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Giá</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'price-1', label: 'Miễn phí' },
                      { id: 'price-2', label: 'Có phí' },
                      { id: 'price-3', label: 'Đang giảm giá' }
                    ].map(item => (
                      <div key={item.id} className="flex items-center">
                        <input
                          id={item.id}
                          name="price"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor={item.id} className="ml-3 text-sm text-gray-700">
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile filter dialog */}
            <div className="lg:hidden mb-4">
              <button
                type="button"
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Bộ lọc
              </button>
              
              {filtersOpen && (
                <div className="fixed inset-0 z-40 overflow-y-auto p-4 bg-gray-500 bg-opacity-75">
                  <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold">Bộ lọc</h2>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => setFiltersOpen(false)}
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>
                    
                    {/* Filter content same as desktop but in modal */}
                    {/* ... */}
                    
                    <div className="mt-6 flex justify-end space-x-3">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={() => setFiltersOpen(false)}
                      >
                        Hủy
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => setFiltersOpen(false)}
                      >
                        Áp dụng
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Course results */}
            <div className="flex-1">
              {/* Sort options */}
              <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="text-sm text-gray-500">
                  <span>Sắp xếp theo</span>
                  <select className="ml-2 pl-2 pr-8 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                    <option>Phổ biến nhất</option>
                    <option>Đánh giá cao nhất</option>
                    <option>Mới nhất</option>
                    <option>Giá: Thấp đến cao</option>
                    <option>Giá: Cao đến thấp</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
                      <div className="h-36 bg-gray-300" />
                      <div className="p-4">
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
                        <div className="h-4 bg-gray-300 rounded w-1/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {courses.map(course => (
                    <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
                      <a href={`/course/${course.id}`}>
                        <img src={course.image} alt={course.title} className="w-full h-36 object-cover" />
                        <div className="p-4">
                          <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{course.title}</h3>
                          <p className="text-sm text-gray-600 mb-1">{course.instructor}</p>
                          <div className="flex items-center mb-1">
                            <span className="text-amber-500 font-bold mr-1">{course.rating}</span>
                            <div className="flex text-amber-400">
                              {Array(Math.floor(course.rating)).fill(0).map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              {course.rating % 1 === 0.5 && (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              )}
                            </div>
                            <span className="text-xs text-gray-500 ml-1">({course.reviews})</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500 space-x-2 mb-2">
                            <span>{course.level === 'Beginner' ? 'Cơ bản' : course.level === 'Intermediate' ? 'Trung cấp' : course.level === 'Advanced' ? 'Nâng cao' : 'Tất cả cấp độ'}</span>
                            <span>•</span>
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-bold text-gray-900">{formatPrice(course.salePrice)}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">{formatPrice(course.price)}</span>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults; 