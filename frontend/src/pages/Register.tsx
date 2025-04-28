import React from 'react';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";

const Register: React.FC = () => {
  return (
      <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-90">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-5xl">
          <h2 className="text-2xl font-semibold italic text-gray-800 mb-1">ĐĂNG KÝ TÀI KHOẢN</h2>
          <form className="space-y-4">
            {/* First Name */}
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">Tên:</label>
              <input
                  type="text"
                  placeholder="Nhập tên"
                  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">Họ:</label>
              <input
                  type="text"
                  placeholder="Nhập họ"
                  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">Email:</label>
              <input
                  type="email"
                  placeholder="Nhập Email"
                  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">Mật khẩu:</label>
              <input
                  type="password"
                  placeholder="Nhập mật khẩu"
                  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">Xác nhận mật khẩu:</label>
              <input
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>


            {/* Profile Image */}
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 font-medium">Ảnh đại diện:</label>
              <input
                  type="file"
                  className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Create Account Button */}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 transition"
            >
              Tạo tài khoản
            </button>
          </form>
        </div>
      </div>
        <Footer />
      </div>
  );
};

export default Register;
