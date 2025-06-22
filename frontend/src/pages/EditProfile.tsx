import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getUserProfile, updateUserProfile, type UserProfile, type UserUpdateRequest } from '../api/users';

const EditProfile: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UserUpdateRequest>({
        fullName: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await getUserProfile();
            setProfile(data);
            setFormData({
                fullName: data.fullName || '',
                phone: data.phone || '',
                address: data.address || ''
            });
        } catch (err) {
            setError('Không thể tải thông tin người dùng');
            console.error('Error loading profile:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccessMessage('');

        try {
            const updatedProfile = await updateUserProfile(formData);
            setProfile(updatedProfile);
            setSuccessMessage('Cập nhật thông tin thành công!');
            setIsEditing(false);
        } catch (err) {
            setError('Có lỗi xảy ra khi cập nhật thông tin');
            console.error('Error updating profile:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEdit = () => {
        setIsEditing(true);
        setFormData({
            fullName: profile?.fullName || '',
            phone: profile?.phone || '',
            address: profile?.address || ''
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setError('');
        setSuccessMessage('');
        if (profile) {
            setFormData({
                fullName: profile.fullName || '',
                phone: profile.phone || '',
                address: profile.address || ''
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Đang tải...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold">Thông tin cá nhân</h1>
                        {!isEditing && (
                            <button
                                onClick={handleEdit}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Chỉnh sửa
                            </button>
                        )}
                    </div>
                    
                    {error && (
                        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}
                    
                    {successMessage && (
                        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                            {successMessage}
                        </div>
                    )}

                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={profile?.email || ''}
                                    disabled
                                    className="w-full p-3 border rounded-lg bg-gray-100"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Họ và tên</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Số điện thoại</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Địa chỉ</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                                >
                                    {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300"
                                >
                                    Hủy
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-700 mb-2">Email</label>
                                <p className="p-3 bg-gray-50 rounded-lg">{profile?.email}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Họ và tên</label>
                                <p className="p-3 bg-gray-50 rounded-lg">{profile?.fullName}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Số điện thoại</label>
                                <p className="p-3 bg-gray-50 rounded-lg">{profile?.phone || '(Chưa cập nhật)'}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Địa chỉ</label>
                                <p className="p-3 bg-gray-50 rounded-lg">{profile?.address || '(Chưa cập nhật)'}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditProfile;
