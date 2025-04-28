import React from 'react';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";

const EditProfile: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow">
                <div className="flex items-center space-x-4 mb-8">
                    <div className="w-20 h-20 bg-gray-300 rounded-full" />
                    <div>
                        <h2 className="text-xl font-semibold">Lê Văn A</h2>
                        <p className="text-gray-500">tang@gmail.com</p>
                    </div>
                    <button className="ml-auto bg-blue-600 text-white py-2 px-6 rounded-lg">Chỉnh sửa</button>
                </div>

                <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-700"> Họ và tên</label>
                            <input type="text" placeholder="Your Full Name" className="w-full mt-1 p-3 border rounded-lg" />
                        </div>
                        <div>
                            <label className="text-gray-700">Nick Name</label>
                            <input type="text" placeholder="Your Nick Name" className="w-full mt-1 p-3 border rounded-lg" />
                        </div>
                        <div>
                            <label className="text-gray-700">Giới tính </label>
                            <select className="w-full mt-1 p-3 border rounded-lg">
                                <option> Giới tính</option>
                                <option>Nam</option>
                                <option>Nữ</option>
                                <option>Khác</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-gray-700">Quê quán</label>
                            <input type="text" placeholder="Quê quán" className="w-full mt-1 p-3 border rounded-lg" />
                        </div>
                        <div>
                            <label className="text-gray-700">Ngôn ngữ</label>
                            <select className="w-full mt-1 p-3 border rounded-lg">
                                <option>Ngôn ngữ của bạn</option>
                                <option>Vietnamese</option>
                                <option>English</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-gray-700">Time Zone</label>
                            <input type="text" placeholder="Your Time Zone" className="w-full mt-1 p-3 border rounded-lg" />
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-2">Địa chỉ email</h3>
                        <p className="text-gray-600">tang@gmail.com</p>
                        <p className="text-gray-400 text-sm">1 tháng trước</p>
                        <button className="mt-2 text-blue-600 text-sm">+ Thêm địa chỉ email</button>
                    </div>
                </form>
            </div>
        </div>
            <Footer />
        </div>
    );
};

export default EditProfile;
