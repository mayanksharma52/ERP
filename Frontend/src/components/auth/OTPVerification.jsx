// src/components/auth/OTPVerification.jsx
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { authApi } from '../../services/api';

function OTPVerification({ email, onVerificationSuccess }) {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await authApi.verifyOTP({ email, otp });
            toast.success('Email verified successfully!');
            onVerificationSuccess();
        } catch (error) {
            toast.error(error.response?.data?.msg || 'OTP verification failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center px-4 py-12">
            {/* Glowing Circles */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            </div>

            {/* Glass Form */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-xl p-8"
            >
                <h2 className="text-2xl font-bold text-white mb-4 text-center">Verify Your Email</h2>
                <p className="text-sm text-gray-300 mb-6 text-center">
                    We've sent a verification code to <span className="font-semibold text-blue-300">{email}</span>.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="otp" className="block text-sm font-medium text-white mb-1">
                            Verification Code
                        </label>
                        <input
                            id="otp"
                            name="otp"
                            type="text"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter 6-digit code"
                            className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {isLoading ? 'Verifying...' : 'Verify Email'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

export default OTPVerification;