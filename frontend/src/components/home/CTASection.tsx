import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <div className="bg-indigo-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">Sẵn sàng nâng cao trình độ tiếng Anh?</span>
          <span className="block text-indigo-200">Đăng ký ngay hôm nay và nhận ưu đãi 20%.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="/register"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              Đăng ký ngay
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
            >
              Tư vấn miễn phí
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;