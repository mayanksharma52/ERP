import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-hot-toast';

const Attendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await api.get('/hr/attendance');
                setAttendanceData(response.data.data || []);
            } catch (error) {
                toast.error('Failed to fetch attendance');
                console.error('Attendance fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAttendance();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
                <div className="text-center">
                    <div className="loader border-4 border-t-4 border-cyan-400 rounded-full h-12 w-12 mb-4 animate-spin"></div>
                    <h2 className="text-cyan-300 text-xl font-semibold">Loading Attendance Data...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
            <h1 className="text-3xl font-bold mb-8 text-center text-cyan-300">
                🧾 Employee Attendance Records
            </h1>

            <div className="overflow-x-auto bg-white/5 backdrop-blur-lg rounded-xl border border-cyan-400/20 shadow-2xl">
                <table className="min-w-full divide-y divide-cyan-500/30">
                    <thead className="bg-cyan-900/40">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-cyan-200 uppercase tracking-wider">
                            Employee ID
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-cyan-200 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-cyan-200 uppercase tracking-wider">
                            Status
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-cyan-700/40">
                    {attendanceData.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="text-center py-6 text-cyan-300">
                                No attendance records found.
                            </td>
                        </tr>
                    ) : (
                        attendanceData.map((record) => (
                            <tr key={record._id} className="hover:bg-cyan-800/10 transition">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-100">
                                    {record.userId}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-cyan-200">
                                    {new Date(record.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${
                                                record.status === 'Present'
                                                    ? 'bg-green-600/20 text-green-300 border border-green-400/40'
                                                    : record.status === 'Absent'
                                                        ? 'bg-red-600/20 text-red-300 border border-red-400/40'
                                                        : 'bg-yellow-600/20 text-yellow-200 border border-yellow-400/40'
                                            }`}
                                        >
                                            {record.status}
                                        </span>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Attendance;