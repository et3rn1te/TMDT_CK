import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative bg-indigo-200">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-fill"
          src="https://img.freepik.com/free-photo/virtual-classroom-study-space_23-2149178650.jpg?t=st=1750609131~exp=1750612731~hmac=7e636615853969fa8b4a856f300d5cd4a1a85716c518d9fcc7421e6cfc2a0f00&w=1380"
          alt="Students learning English"
        />
        <div className="absolute inset-0 bg-indigo-800 mix-blend-multiply opacity-30" aria-hidden="true"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Nâng cao khả năng tiếng Anh cùng EduEnglish</h1>
        <p className="mt-6 max-w-xl text-xl text-indigo-100">
          Khám phá hàng trăm khóa học tiếng Anh chất lượng cao với đội ngũ giáo viên giàu kinh nghiệm, giúp bạn đạt được mục tiêu học tập và sự nghiệp.
        </p>
        <div className="mt-10 flex gap-4">
          <a
            href="/courses"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Xem khóa học
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <a
            href="/free-trial"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Học thử miễn phí
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;