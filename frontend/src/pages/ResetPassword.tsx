import React, { useState } from 'react';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../api/auth';

const ResetPassword: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!email) {
        navigate('/forgot-password');
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await resetPassword(email, newPassword);
            navigate('/login', { state: { message: 'Đổi mật khẩu thành công. Vui lòng đăng nhập lại.' } });
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
                    <h2 className="text-2xl font-semibold mb-6">Đổi mật khẩu</h2>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="password"
                            placeholder="Mật khẩu mới"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <ul className="text-sm text-gray-500 list-disc pl-5">
                            <li>Ít nhất 8 ký tự</li>
                            <li>Bao gồm ít nhất 1 số và 1 ký tự đặc biệt </li>
                            <li>Bao gồm chữ thường và chữ in hoa</li>
                        </ul>
                        <input
                            type="password"
                            placeholder="Xác nhận lại mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <button 
                            type="submit" 
                            className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:bg-blue-300"
                            disabled={loading}
                        >
                            {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                        </button>
                        <button 
                            type="button"
                            onClick={() => navigate('/login')}
                            className="w-full text-gray-500 mt-2"
                        >
                            Hủy
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ResetPassword;
