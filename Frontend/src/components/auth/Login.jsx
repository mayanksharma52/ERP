// src/components/auth/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { authApi } from '../../services/api';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await authApi.login({ email, password, role });
            toast.success('Login successful!');
            if (role === 'hr') navigate('/hr');
            if(role==='employee') navigate('/emoployee');
            else navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center overflow-hidden">
            {/* Glowing Circles Background */}
            <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-pink-500 opacity-30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-blue-500 opacity-30 rounded-full blur-3xl animate-pulse" />

            {/* Login Card */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="relative z-10 bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-8 w-full max-w-md"
            >
                <h2 className="text-3xl font-extrabold text-white text-center mb-6">Welcome to <span className="text-blue-400">StratoWorks</span></h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-white">Role</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="mt-1 w-full px-4 py-2 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="employee">Employee</option>
                            <option value="hr">HR</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="flex justify-between text-sm text-blue-200">
                        <Link to="/forgot-password" className="hover:underline">Forgot password?</Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 disabled:opacity-60"
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-white">
                    Don’t have an account?{' '}
                    <Link to="/signup" className="text-blue-300 hover:underline">
                        Sign up here
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

export default Login;