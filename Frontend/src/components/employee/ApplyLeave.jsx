import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { employeeApi } from '../../services/api.js';
import toast from 'react-hot-toast';

const ApplyLeave = () => {
    const [formData, setFormData] = useState({
        reason: '',
        fromDate: '',
        toDate: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { reason, fromDate, toDate } = formData;

        if (!reason || !fromDate || !toDate) {
            return toast.error('All fields are required');
        }

        try {
            setLoading(true);
            const res = await employeeApi.applyLeave(formData);
            toast.success(res.message || 'Leave Applied');
            setFormData({ reason: '', fromDate: '', toDate: '' });
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to apply leave');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-[#eef1ff] via-[#fefefe] to-[#dcf9ff] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <motion.div
                className="w-full max-w-xl bg-white/40 dark:bg-white/10 backdrop-blur-lg border border-gray-200 dark:border-gray-700 p-8 rounded-2xl shadow-lg"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Apply for Leave</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Reason</label>
                        <textarea
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Enter leave reason"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white"
                            required
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">From Date</label>
                            <input
                                type="date"
                                name="fromDate"
                                value={formData.fromDate}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">To Date</label>
                            <input
                                type="date"
                                name="toDate"
                                value={formData.toDate}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white"
                                required
                            />
                        </div>
                    </div>

                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileTap={{ scale: 0.97 }}
                        className={`w-full py-3 px-4 rounded-md text-white font-semibold transition-all duration-200 ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {loading ? 'Submitting...' : 'Apply Leave'}
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default ApplyLeave;