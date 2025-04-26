const Map = () => {
    return (
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Vị trí của chúng tôi</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              Các cơ sở của EduEnglish đều nằm ở vị trí trung tâm, thuận tiện di chuyển và dễ dàng tìm kiếm.
            </p>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg">
            {/* Đây là placeholder cho bản đồ. Trong thực tế, bạn sẽ tích hợp Google Maps hoặc bản đồ khác */}
            <div className="bg-gray-200 w-full h-96 flex items-center justify-center">
              <p className="text-gray-500 text-lg">Bản đồ Google Maps sẽ được hiển thị ở đây</p>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Trụ sở chính TP.HCM</h3>
              <p className="text-gray-500">
                123 Nguyễn Văn Linh, Quận 7<br />
                TP. Hồ Chí Minh<br />
                Điện thoại: 028 1234 5678
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Chi nhánh Quận 1</h3>
              <p className="text-gray-500">
                456 Lê Lợi, Quận 1<br />
                TP. Hồ Chí Minh<br />
                Điện thoại: 028 2345 6789
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Chi nhánh Hà Nội</h3>
              <p className="text-gray-500">
                789 Trần Hưng Đạo, Quận Hoàn Kiếm<br />
                Hà Nội<br />
                Điện thoại: 024 8765 4321
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Map;