import React from 'react';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import {Link} from "react-router-dom";

const ForgotPassword: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-6">Quên mật khẩu</h2>
                <p className="text-gray-500 mb-4">Nhập email của bạn để lấy lại mật khẩu </p>
                <form className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <Link to="/CheckEmail">
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg">Reset Password</button>
                    </Link>
                </form>
                <div className="mt-4 text-center">
                    <button className="text-blue-600">Về Đăng nhập</button>
                </div>
            </div>
        </div>
            <Footer />
        </div>
    );
};

export default ForgotPassword;
