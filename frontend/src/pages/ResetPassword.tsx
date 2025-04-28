import React from 'react';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";

const ResetPassword: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-6">Đổi mật khẩu</h2>
                <form className="space-y-4">
                    <input
                        type="password"
                        placeholder="Mật khẩu mới"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <ul className="text-sm text-gray-500 list-disc pl-5">
                        <li>Ít nhất 8 ký tự</li>
                        <li>Bao gồm ít nhất 1 số và 1 ký tự đặc biệt </li>
                        <li>Bao gồm chữ thường và chữ in hoa</li>
                    </ul>
                    <input
                        type="password"
                        placeholder="Xác nhận lại mật khẩu"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg">Đổi mật khẩu </button>
                    <button className="w-full text-gray-500 mt-2">Hủy</button>
                </form>
            </div>
        </div>
            <Footer />
        </div>
    );
};

export default ResetPassword;
