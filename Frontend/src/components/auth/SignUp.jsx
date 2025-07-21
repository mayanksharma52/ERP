import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { authApi } from '../../services/api';
import OTPVerification from './OTPVerification.jsx';

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'employee',
        department: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showOTPVerification, setShowOTPVerification] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await authApi.signup(formData);
            toast.success('Registration successful! Please verify your email.');
            setShowOTPVerification(true);
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerificationSuccess = () => {
        toast.success('Account created successfully!');
        navigate('/login');
    };

    if (showOTPVerification) {
        return <OTPVerification email={formData.email} onVerificationSuccess={handleVerificationSuccess} />;
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center px-4 py-12">
            {/* Glowing Circles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse" />
                <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-600 rounded-full blur-2xl opacity-20 animate-pulse" />
            </div>

            {/* Signup Card */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-xl p-8"
            >
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Create your account</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                            Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-white mb-1">
                            Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="employee">Employee</option>
                            <option value="hr">HR</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-white mb-1">
                            Department
                        </label>
                        <input
                            id="department"
                            name="department"
                            type="text"
                            value={formData.department}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-white/70">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-400 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

export default SignUp;