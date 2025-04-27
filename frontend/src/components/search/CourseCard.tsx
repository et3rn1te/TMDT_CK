import React from 'react';

type CourseCardProps = {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  reviews: number;
  price: number;
  salePrice: number | null;
  image: string;
  level: string;
  duration: string;
};

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  instructor,
  rating,
  reviews,
  price,
  salePrice,
  image,
  level,
  duration
}) => {
  // Format price in VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Map English level to Vietnamese
  const getLocalizedLevel = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'Cơ bản';
      case 'Intermediate':
        return 'Trung cấp';
      case 'Advanced':
        return 'Nâng cao';
      case 'All Levels':
        return 'Tất cả cấp độ';
      default:
        return level;
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
      <a href={`/course/${id}`}>
        <img src={image} alt={title} className="w-full h-36 object-cover" />
        <div className="p-4">
          <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-1">{instructor}</p>
          <div className="flex items-center mb-1">
            <span className="text-amber-500 font-bold mr-1">{rating}</span>
            <div className="flex text-amber-400">
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
            </div>
            <span className="text-xs text-gray-500 ml-1">({reviews})</span>
          </div>
          <div className="flex items-center text-xs text-gray-500 space-x-2 mb-2">
            <span>{getLocalizedLevel(level)}</span>
            <span>•</span>
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-gray-900">{formatPrice(salePrice || price)}</span>
            {salePrice && <span className="text-sm text-gray-500 line-through ml-2">{formatPrice(price)}</span>}
          </div>
        </div>
      </a>
    </div>
  );
};

export default CourseCard; 