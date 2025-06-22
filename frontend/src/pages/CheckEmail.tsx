import React, { useState } from 'react';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOtp } from '../api/auth';

const CheckEmail: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || '';
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await verifyOtp(email, otp);
            navigate('/ResetPassword', { state: { email, otp } });
        } catch (err) {
            setError('Mã OTP không đúng hoặc đã hết hạn');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        // Implement resend logic if needed
    };

    if (!email) {
        navigate('/forgot-password');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="bg-white p-8 rounded-2xl shadow max-w-md w-full text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            ✅
                        </div>
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">Kiểm tra Email của bạn</h2>
                    <p className="text-gray-500 mb-4">
                        Chúng tôi đã gửi mã OTP đến email:
                        <br />
                        <span className="font-semibold">{email}</span>
                    </p>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form onSubmit={handleVerifyOtp} className="mb-4">
                        <input
                            type="text"
                            placeholder="Nhập mã OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
                            required
                        />
                        <button 
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:bg-blue-300"
                            disabled={loading}
                        >
                            {loading ? 'Đang xử lý...' : 'Xác nhận'}
                        </button>
                    </form>
                    <button 
                        onClick={handleResend} 
                        className="text-blue-600 mb-2"
                    >
                        Gửi lại mã
                    </button>
                    <br />
                    <button 
                        onClick={() => navigate('/login')} 
                        className="text-blue-600"
                    >
                        Về Đăng nhập
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CheckEmail;
