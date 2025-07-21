import React, { useEffect, useState } from 'react';
import { employeeApi } from '../../services/api';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const AttendancePage = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAttendance = async () => {
        try {
            setLoading(true);
            const res = await employeeApi.getAttendanceHistory();
            setRecords(res.data || []);
        } catch (err) {
            toast.error('Failed to load attendance history');
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAttendance = async () => {
        try {
            const res = await employeeApi.markAttendance();
            toast.success(res.message || 'Attendance marked');
            fetchAttendance(); // Refresh after marking
        } catch (err) {
            toast.error(err.response?.data?.message || 'Could not mark attendance');
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    return (
        <motion.div
            className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#eef1ff] via-[#fefefe] to-[#dcf9ff] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-white transition-colors duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <motion.h2
                        className="text-3xl font-bold"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Attendance History
                    </motion.h2>
                    <motion.button
                        onClick={handleMarkAttendance}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                    >
                        Mark Attendance
                    </motion.button>
                </div>

                {loading ? (
                    <motion.p
                        className="text-center text-gray-500 dark:text-gray-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        Loading...
                    </motion.p>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="overflow-x-auto bg-white/40 dark:bg-white/10 backdrop-blur-lg rounded-2xl shadow border border-gray-200 dark:border-gray-700">
                            <table className="w-full table-auto border-collapse text-sm text-left">
                                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                                <tr>
                                    <th className="px-6 py-3 font-semibold">Date</th>
                                    <th className="px-6 py-3 font-semibold">Status</th>
                                    <th className="px-6 py-3 font-semibold">Check-In</th>
                                </tr>
                                </thead>
                                <tbody>
                                {records.map((rec, idx) => (
                                    <motion.tr
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.03 }}
                                        className="border-t border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100"
                                    >
                                        <td className="px-6 py-3">{rec.date}</td>
                                        <td className="px-6 py-3">{rec.status}</td>
                                        <td className="px-6 py-3">{rec.checkIn}</td>
                                    </motion.tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default AttendancePage;