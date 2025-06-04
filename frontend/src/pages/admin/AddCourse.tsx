import React, { useState } from 'react';
import { BookOpen, DollarSign, FileText, Info, CheckCircle } from 'lucide-react';
import { courseApi } from '../../api/courses'; // Import courseApi
import { CourseCreationRequest } from '../../types/courseTypes'; // Import CourseCreationRequest type
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const AddCoursePage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [courseDetails, setCourseDetails] = useState<CourseCreationRequest & { imageUrl: string, sections: { title: string; lectures: { title: string; videoUrl: string; }[]; }[] }>({
    title: '',
    description: '',
    category: '', // This should be categoryId in CourseCreationRequest
    price: '',    // This should be number in CourseCreationRequest
    imageUrl: '', // This field is not directly in CourseCreationRequest, but used in UI
    sections: [{ title: '', lectures: [{ title: '', videoUrl: '' }] }],
    categoryId: 0, // Initialize categoryId
    levelId: 0,    // Initialize levelId
    sellerId: 0,   // Initialize sellerId (will be set by backend based on authenticated user)
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle input changes for course details
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCourseDetails({ ...courseDetails, [name]: value });
  };

  // Handle input changes for sections and lectures
  const handleSectionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newSections = [...courseDetails.sections];
    newSections[index].title = e.target.value;
    setCourseDetails({ ...courseDetails, sections: newSections });
  };

  const handleLectureChange = (sectionIndex: number, lectureIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newSections = [...courseDetails.sections];
    newSections[sectionIndex].lectures[lectureIndex].title = e.target.value;
    setCourseDetails({ ...courseDetails, sections: newSections });
  };

  const handleVideoUrlChange = (sectionIndex: number, lectureIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newSections = [...courseDetails.sections];
    newSections[sectionIndex].lectures[lectureIndex].videoUrl = e.target.value;
    setCourseDetails({ ...courseDetails, sections: newSections });
  };

  // Add a new section
  const addSection = () => {
    setCourseDetails({
      ...courseDetails,
      sections: [...courseDetails.sections, { title: '', lectures: [{ title: '', videoUrl: '' }] }],
    });
  };

  // Add a new lecture to a specific section
  const addLecture = (sectionIndex: number) => {
    const newSections = [...courseDetails.sections];
    newSections[sectionIndex].lectures.push({ title: '', videoUrl: '' });
    setCourseDetails({ ...courseDetails, sections: newSections });
  };

  // Remove a section
  const removeSection = (index: number) => {
    const newSections = courseDetails.sections.filter((_, i) => i !== index);
    setCourseDetails({ ...courseDetails, sections: newSections });
  };

  // Remove a lecture from a specific section
  const removeLecture = (sectionIndex: number, lectureIndex: number) => {
    const newSections = [...courseDetails.sections];
    newSections[sectionIndex].lectures = newSections[sectionIndex].lectures.filter((_, i) => i !== lectureIndex);
    setCourseDetails({ ...courseDetails, sections: newSections });
  };

  // Navigate to the next step
  const nextStep = () => {
    // Basic validation for current step before moving next
    if (currentStep === 1) {
      if (!courseDetails.title || !courseDetails.description || !courseDetails.categoryId || !courseDetails.imageUrl) {
        setError('Vui lòng điền đầy đủ thông tin cơ bản.');
        return;
      }
    } else if (currentStep === 2) {
      if (isNaN(Number(courseDetails.price)) || Number(courseDetails.price) <= 0) {
        setError('Vui lòng nhập giá khóa học hợp lệ.');
        return;
      }
    }
    setError(null); // Clear previous errors
    setCurrentStep((prevStep) => prevStep + 1);
  };

  // Navigate to the previous step
  const prevStep = () => {
    setError(null); // Clear errors when going back
    setCurrentStep((prevStep) => prevStep - 1);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Prepare data for API call
      const dataToSend: CourseCreationRequest = {
        title: courseDetails.title,
        description: courseDetails.description,
        price: Number(courseDetails.price),
        discountPrice: courseDetails.discountPrice ? Number(courseDetails.discountPrice) : null,
        categoryId: Number(courseDetails.categoryId),
        levelId: Number(courseDetails.levelId),
        sellerId: courseDetails.sellerId, // This should ideally be handled by backend from auth context
      };

      // Call the API
      await courseApi.createCourse(dataToSend);
      setSuccessMessage('Khóa học đã được tạo thành công!');
      // Reset form and navigate to first step
      setCourseDetails({
        title: '',
        description: '',
        category: '',
        price: '',
        imageUrl: '',
        sections: [{ title: '', lectures: [{ title: '', videoUrl: '' }] }],
        categoryId: 0,
        levelId: 0,
        sellerId: 0,
      });
      setCurrentStep(1);
    } catch (err) {
      console.error('Error creating course:', err);
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi khi tạo khóa học.');
    } finally {
      setIsLoading(false);
    }
  };

  // Render content based on the current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Thông tin cơ bản</h2>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Tiêu đề khóa học</label>
              <input
                type="text"
                name="title"
                id="title"
                value={courseDetails.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                placeholder="Nhập tiêu đề khóa học"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả khóa học</label>
              <textarea
                name="description"
                id="description"
                value={courseDetails.description}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                placeholder="Mô tả chi tiết về khóa học"
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Danh mục</label>
              <select
                name="categoryId"
                id="categoryId"
                value={courseDetails.categoryId}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                required
              >
                <option value="0">Chọn danh mục</option>
                {/* Replace with dynamic categories fetched from API */}
                <option value="1">Ngôn ngữ</option>
                <option value="2">Lập trình</option>
                <option value="3">Thiết kế</option>
                <option value="4">Kinh doanh</option>
              </select>
            </div>
            <div>
              <label htmlFor="levelId" className="block text-sm font-medium text-gray-700">Cấp độ</label>
              <select
                name="levelId"
                id="levelId"
                value={courseDetails.levelId}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                required
              >
                <option value="0">Chọn cấp độ</option>
                {/* Replace with dynamic levels fetched from API */}
                <option value="1">Cơ bản</option>
                <option value="2">Trung cấp</option>
                <option value="3">Nâng cao</option>
              </select>
            </div>
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">URL ảnh bìa</label>
              <input
                type="text"
                name="imageUrl"
                id="imageUrl"
                value={courseDetails.imageUrl}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                placeholder="Ví dụ: https://example.com/course-image.jpg"
                required
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Giá khóa học</h2>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Giá (VNĐ)</label>
              <input
                type="number"
                name="price"
                id="price"
                value={courseDetails.price}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                placeholder="Nhập giá khóa học"
                min="0"
                required
              />
            </div>
            <div>
              <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700">Giá khuyến mãi (VNĐ - Tùy chọn)</label>
              <input
                type="number"
                name="discountPrice"
                id="discountPrice"
                value={courseDetails.discountPrice || ''}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                placeholder="Nhập giá khuyến mãi nếu có"
                min="0"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Nội dung khóa học</h2>
            {courseDetails.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="border border-gray-200 rounded-md p-4 bg-gray-50 relative">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Chương {sectionIndex + 1}</h3>
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => handleSectionChange(sectionIndex, e)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    placeholder={`Tiêu đề chương ${sectionIndex + 1}`}
                    required
                  />
                  {courseDetails.sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(sectionIndex)}
                      className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100 transition-colors"
                      title="Xóa chương"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>

                <div className="space-y-3 pl-6 border-l border-gray-300">
                  {section.lectures.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={lecture.title}
                        onChange={(e) => handleLectureChange(sectionIndex, lectureIndex, e)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                        placeholder={`Tiêu đề bài giảng ${lectureIndex + 1}`}
                        required
                      />
                      <input
                        type="text"
                        value={lecture.videoUrl}
                        onChange={(e) => handleVideoUrlChange(sectionIndex, lectureIndex, e)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                        placeholder={`URL video bài giảng ${lectureIndex + 1}`}
                        required
                      />
                      {section.lectures.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLecture(sectionIndex, lectureIndex)}
                          className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100 transition-colors"
                          title="Xóa bài giảng"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addLecture(sectionIndex)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-2"
                  >
                    Thêm bài giảng
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addSection}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Thêm chương mới
            </button>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Xem lại và Hoàn tất</h2>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <p className="text-lg text-gray-700">Bạn đã hoàn tất các bước. Vui lòng xem lại thông tin khóa học trước khi gửi.</p>
            <div className="bg-gray-100 p-4 rounded-md text-left">
              <h3 className="text-xl font-semibold mb-2">Thông tin khóa học:</h3>
              <p><strong>Tiêu đề:</strong> {courseDetails.title}</p>
              <p><strong>Mô tả:</strong> {courseDetails.description}</p>
              <p><strong>Danh mục ID:</strong> {courseDetails.categoryId}</p>
              <p><strong>Cấp độ ID:</strong> {courseDetails.levelId}</p>
              <p><strong>Giá:</strong> {courseDetails.price} VNĐ</p>
              {courseDetails.discountPrice && <p><strong>Giá khuyến mãi:</strong> {courseDetails.discountPrice} VNĐ</p>}
              <p><strong>URL ảnh bìa:</strong> {courseDetails.imageUrl}</p>
              <h4 className="text-lg font-medium mt-4">Nội dung:</h4>
              {courseDetails.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-2">
                  <p className="font-semibold">Chương {sectionIndex + 1}: {section.title}</p>
                  <ul className="list-disc list-inside ml-4">
                    {section.lectures.map((lecture, lectureIndex) => (
                      <li key={lectureIndex}>Bài giảng {lectureIndex + 1}: {lecture.title} (URL: {lecture.videoUrl || 'Chưa có'})</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Thêm Khóa học Mới</h1>

          {/* Step Indicator */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                <Info className="h-5 w-5" />
              </div>
              <span className={`text-sm mt-2 ${currentStep >= 1 ? 'text-indigo-600 font-medium' : 'text-gray-600'}`}>Thông tin</span>
            </div>
            <div className={`flex-1 h-1 ${currentStep > 1 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                <DollarSign className="h-5 w-5" />
              </div>
              <span className={`text-sm mt-2 ${currentStep >= 2 ? 'text-indigo-600 font-medium' : 'text-gray-600'}`}>Giá</span>
            </div>
            <div className={`flex-1 h-1 ${currentStep > 2 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                <BookOpen className="h-5 w-5" />
              </div>
              <span className={`text-sm mt-2 ${currentStep >= 3 ? 'text-indigo-600 font-medium' : 'text-gray-600'}`}>Nội dung</span>
            </div>
            <div className={`flex-1 h-1 ${currentStep > 3 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 4 ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                <FileText className="h-5 w-5" />
              </div>
              <span className={`text-sm mt-2 ${currentStep >= 4 ? 'text-indigo-600 font-medium' : 'text-gray-600'}`}>Hoàn tất</span>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Lỗi!</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Thành công!</strong>
              <span className="block sm:inline ml-2">{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isLoading}
                >
                  Quay lại
                </button>
              )}
              {currentStep < 4 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isLoading}
                >
                  Tiếp theo
                </button>
              )}
              {currentStep === 4 && (
                <button
                  type="submit"
                  className="ml-auto inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  disabled={isLoading}
                >
                  {isLoading ? 'Đang tạo...' : 'Tạo khóa học'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddCoursePage;
