import React, { useState } from 'react';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from '../api/auth';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            await forgotPassword(email);
            navigate('/CheckEmail', { state: { email } });
        } catch (err) {
            setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="bg-white p-8 rounded-2xl shadow max-w-md w-full">
                    <h2 className="text-2xl font-semibold mb-6">Quên mật khẩu</h2>
                    <p className="text-gray-500 mb-4">Nhập email của bạn để lấy lại mật khẩu </p>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:bg-blue-300"
                            disabled={loading}
                        >
                            {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <button 
                            className="text-blue-600"
                            onClick={() => navigate('/login')}
                        >
                            Về Đăng nhập
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ForgotPassword;
