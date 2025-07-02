import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
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
        <div className="mt-8">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Verify Your Email</h2>
                <p className="text-gray-600 mb-6">
                    We've sent a verification code to {email}. Please enter it below.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                            Verification Code
                        </label>
                        <div className="mt-1">
                            <input
                                id="otp"
                                name="otp"
                                type="text"
                                required
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter 6-digit code"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {isLoading ? 'Verifying...' : 'Verify Email'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default OTPVerification;