import React, { useState } from 'react';
import Navbar from "../components/Navbar.tsx";
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import Footer from "../components/Footer.tsx";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            const data = await response.json();
            
            // Kiểm tra response.ok và code thành công từ API
            if (response.ok && data.code === 0 && data.data.authenticated) {
                const { token, user } = data.data; // Giả định data.data chứa token và user object
                const userEmailFromResponse = user?.email || email; // Lấy email từ user object hoặc dùng email đã nhập
                const userRoles = user?.roles || []; // Lấy mảng vai trò từ user object, mặc định là mảng rỗng nếu không có
                
                // Lưu token, email và vai trò vào AuthContext
                login(userEmailFromResponse, token, userRoles,user?.id); 
                
                // Điều hướng về trang chủ
                navigate('/');
            } else {
                // Hiển thị thông báo lỗi từ backend hoặc thông báo mặc định
                setError(data.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.');
            }
        } catch (err) {
            setError('Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar/>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow">
                    <Link to="/">
                        <button className="text-sm text-gray-600 mb-4">&larr; Về trang chủ</button>
                    </Link>
                    <h2 className="text-3xl font-semibold mb-6">Chào mừng!</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-end text-sm text-gray-600">
                            <Link to="/forgotpassword" className="text-blue-500 hover:underline">
                                <button type="button">Quên mật khẩu?</button>
                            </Link>
                        </div>
                        <button type="submit" className="w-full bg-black text-white p-3 rounded-lg">Đăng nhập</button>
                        <button type="button"
                                className="w-full bg-black text-white p-3 rounded-lg flex items-center justify-center space-x-2">
                            <FcGoogle size={24}/>
                            <span>Đăng nhập bằng Google</span>
                        </button>
                        <button type="button"
                                className="w-full bg-black text-white p-3 rounded-lg flex items-center justify-center space-x-2">
                            <FaFacebook size={24} color="#1877F2"/>
                            <span>Đăng nhập bằng Facebook</span>
                        </button>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Login;
