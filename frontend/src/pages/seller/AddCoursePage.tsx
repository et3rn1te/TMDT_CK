import React, { useState } from 'react';
import { BookOpen, DollarSign, FileText, Info, CheckCircle } from 'lucide-react';

const AddCoursePage = () => {
    // State to manage the current step of the course creation process
    const [currentStep, setCurrentStep] = useState(1);
    // State to store course details
    const [courseDetails, setCourseDetails] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        imageUrl: '',
        sections: [{ title: '', lectures: [{ title: '', videoUrl: '' }] }],
    });

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
        setCurrentStep((prevStep) => prevStep + 1);
    };

    // Navigate to the previous step
    const prevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the courseDetails to a backend API
        console.log('Course Details Submitted:', courseDetails);
        alert('Khóa học đã được tạo thành công!'); // Use a custom modal in a real app
        // Optionally reset form or navigate away
        setCourseDetails({
            title: '',
            description: '',
            category: '',
            price: '',
            imageUrl: '',
            sections: [{ title: '', lectures: [{ title: '', videoUrl: '' }] }],
        });
        setCurrentStep(1); // Reset to first step
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
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Danh mục</label>
                            <select
                                name="category"
                                id="category"
                                value={courseDetails.category}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                            >
                                <option value="">Chọn danh mục</option>
                                <option value="language">Ngôn ngữ</option>
                                <option value="programming">Lập trình</option>
                                <option value="design">Thiết kế</option>
                                <option value="business">Kinh doanh</option>
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
                                            />
                                            <input
                                                type="text"
                                                value={lecture.videoUrl}
                                                onChange={(e) => handleVideoUrlChange(sectionIndex, lectureIndex, e)}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                                placeholder={`URL video bài giảng ${lectureIndex + 1}`}
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
                            <p><strong>Danh mục:</strong> {courseDetails.category}</p>
                            <p><strong>Giá:</strong> {courseDetails.price} VNĐ</p>
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

                {/* Form Content */}
                <form onSubmit={handleSubmit}>
                    {renderStepContent()}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        {currentStep > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Quay lại
                            </button>
                        )}
                        {currentStep < 4 && (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="ml-auto inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Tiếp theo
                            </button>
                        )}
                        {currentStep === 4 && (
                            <button
                                type="submit"
                                className="ml-auto inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Tạo khóa học
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCoursePage;
