import React from 'react';
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";

const CheckEmail: React.FC = () => {
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
                <h2 className="text-2xl font-semibold mb-2">Check Your Email</h2>
                <p className="text-gray-500 mb-4">
                    We've sent a password reset link to:
                    <br />
                    <span className="font-semibold">user@example.com</span>
                </p>
                <p className="text-sm text-gray-500 mb-4">
                    Check your inbox and follow the link to reset your password.
                </p>
                <button className="text-blue-600 mb-2">Resend</button>
                <br />
                <button className="text-blue-600">Back to Login</button>
            </div>
        </div>
            <Footer />
        </div>
    );
};

export default CheckEmail;
