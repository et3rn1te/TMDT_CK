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
            
            if (data.code === 0 && data.data.authenticated) {
                // Save token and login info
                login(data.data.token, email);
                // Redirect to home page
                navigate('/');
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('An error occurred during login. Please try again.');
            console.error('Login error:', err);
        }
    };

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
                            placeholder="Password"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end text-sm text-gray-600">
                        <Link to="/forgotpassword" className="text-blue-500 hover:underline">
                        <button type="button">Forgot password?</button>
                        </Link>
                    </div>
                    <button type="submit" className="w-full bg-black text-white p-3 rounded-lg">Log In</button>
                    <button type="button" className="w-full bg-black text-white p-3 rounded-lg flex items-center justify-center space-x-2">
                        <FcGoogle size={24} />
                        <span>Log in with Google</span>
                    </button>
                    <button type="button" className="w-full bg-black text-white p-3 rounded-lg flex items-center justify-center space-x-2">
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
