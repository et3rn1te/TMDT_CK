import { Star, ArrowRight } from 'lucide-react';

type Course = {
  id: number;
  title: string;
  instructor: string;
  level: string;
  rating: number;
  reviewCount: number;
  price: number;
  discountPrice?: number;
  imageSrc: string;
};

const FeaturedCourses = () => {
  const courses: Course[] = [
    {
      id: 1,
      title: "IELTS Academic 7.0+",
      instructor: "Nguyễn Minh Tú",
      level: "Trung cấp - Nâng cao",
      rating: 4.9,
      reviewCount: 240,
      price: 2490000,
      discountPrice: 1990000,
      imageSrc: "/api/placeholder/640/360"
    },
    {
      id: 2,
      title: "TOEIC 4 kỹ năng từ 0-750+",
      instructor: "Trần Thị Hạnh",
      level: "Cơ bản - Trung cấp",
      rating: 4.8,
      reviewCount: 189,
      price: 1990000,
      discountPrice: 1590000,
      imageSrc: "/api/placeholder/640/360"
    },
    {
      id: 3,
      title: "Giao tiếp tiếng Anh thương mại",
      instructor: "David Williams",
      level: "Trung cấp",
      rating: 4.7,
      reviewCount: 152,
      price: 1790000,
      imageSrc: "/api/placeholder/640/360"
    },
    {
      id: 4,
      title: "Tiếng Anh giao tiếp cơ bản",
      instructor: "Sarah Johnson",
      level: "Cơ bản",
      rating: 4.9,
      reviewCount: 315,
      price: 1290000,
      discountPrice: 990000,
      imageSrc: "/api/placeholder/640/360"
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Khóa học nổi bật</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Các khóa học chất lượng cao, được thiết kế bởi chuyên gia giáo dục và giảng dạy bởi giáo viên hàng đầu.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <div key={course.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={course.imageSrc} alt={course.title} />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    {course.level}
                  </p>
                  <a href={`/courses/${course.id}`} className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">{course.title}</p>
                    <p className="mt-3 text-base text-gray-500">Giảng viên: {course.instructor}</p>
                  </a>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(course.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {course.rating} ({course.reviewCount} đánh giá)
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  {course.discountPrice ? (
                    <div className="flex items-end">
                      <p className="text-xl font-bold text-gray-900">
                        {formatPrice(course.discountPrice)}
                      </p>
                      <p className="ml-2 text-sm line-through text-gray-500">
                        {formatPrice(course.price)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xl font-bold text-gray-900">{formatPrice(course.price)}</p>
                  )}
                  <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a
            href="/courses"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Xem tất cả khóa học
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourses;