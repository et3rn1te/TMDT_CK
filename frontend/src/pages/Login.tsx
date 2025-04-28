import React from 'react';
import Navbar from "../components/Navbar.tsx";
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import Footer from "../components/Footer.tsx";
import {Link} from "react-router-dom";
const Login: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow">
                <Link to="/">
                <button className="text-sm text-gray-600 mb-4">&larr; Về trang chủ</button>
                </Link>
                <h2 className="text-3xl font-semibold mb-2">Welcome!</h2>
                <p className="text-gray-500 mb-6">Create a free account or log in to get started with us</p>
                <form className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>
                    <div className="flex justify-end text-sm text-gray-600">
                        <Link to="/forgotpassword" className="text-blue-500 hover:underline">
                        <button>Forgot password?</button>
                        </Link>
                    </div>
                    <button className="w-full bg-black text-white p-3 rounded-lg">Log In</button>
                    <button className="w-full bg-black text-white p-3 rounded-lg flex items-center justify-center space-x-2">
                        <FcGoogle size={24} />
                        <span>Log in with Google</span>
                    </button>
                    <button className="w-full bg-black text-white p-3 rounded-lg flex items-center justify-center space-x-2">
                        <FaFacebook size={24} color="#1877F2" />
                        <span>Log in with Facebook</span>
                    </button>
                </form>
            </div>
        </div>
            <Footer />
        </div>
    );
};

export default Login;
