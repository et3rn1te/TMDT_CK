const Team = () => {
    const teamMembers = [
      {
        name: 'Nguyễn Văn Anh',
        position: 'Giám đốc Điều hành',
        bio: 'Thạc sĩ Giáo dục Đại học Cambridge với hơn 15 năm kinh nghiệm trong lĩnh vực giảng dạy tiếng Anh.',
        imageSrc: '/api/placeholder/300/300',
      },
      {
        name: 'Trần Minh Tú',
        position: 'Giám đốc Đào tạo',
        bio: 'Chuyên gia IELTS 8.5 với chứng chỉ CELTA và hơn 10 năm kinh nghiệm đào tạo giáo viên.',
        imageSrc: '/api/placeholder/300/300',
      },
      {
        name: 'Lê Thị Hương',
        position: 'Trưởng phòng Học liệu',
        bio: 'Tiến sĩ Ngôn ngữ học Đại học Melbourne với chuyên môn về phát triển tài liệu giảng dạy.',
        imageSrc: '/api/placeholder/300/300',
      },
      {
        name: 'Phạm Thanh Tùng',
        position: 'Giám đốc Công nghệ',
        bio: 'Kỹ sư phần mềm với 12 năm kinh nghiệm phát triển các nền tảng học tập trực tuyến.',
        imageSrc: '/api/placeholder/300/300',
      },
    ];
  
    return (
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Đội ngũ lãnh đạo</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              Gặp gỡ những người đứng sau thành công của EduEnglish - đội ngũ lãnh đạo giàu kinh nghiệm và đam mê 
              trong lĩnh vực giáo dục và công nghệ.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  className="w-full h-64 object-cover"
                  src={member.imageSrc} 
                  alt={member.name} 
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-indigo-600 font-medium mb-2">{member.position}</p>
                  <p className="text-gray-500 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-500">
              Cùng với đội ngũ hơn 50 giáo viên và nhân viên tận tâm, chúng tôi cam kết mang đến trải nghiệm học tập tốt nhất cho học viên.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Team;