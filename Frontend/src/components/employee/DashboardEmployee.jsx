import React, { useEffect, useState } from 'react';
import { employeeApi } from '../../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const DashboardEmployee = () => {
    const [attendance, setAttendance] = useState([]);
    const [payroll, setPayroll] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const attendanceData = await employeeApi.getAttendanceHistory();
            const payrollData = await employeeApi.getPayroll();
            const projectsData = await employeeApi.getProjectsAndTasks();

            setAttendance(attendanceData.data || []);
            setPayroll(payrollData.data || []);
            setProjects(projectsData.data || []);
        } catch (err) {
            toast.error('Failed to fetch dashboard data');
        }
    };

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] transition-colors duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <motion.div
                className="max-w-6xl w-full space-y-10"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
            >
                <h1 className="text-3xl font-bold text-center text-cyan-400 drop-shadow-[0_0_8px_#22d3ee]">
                    🚀 Welcome to your Dashboard
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Attendance */}
                    <motion.div
                        className="bg-white/10 backdrop-blur-md border border-cyan-500/40 p-6 rounded-2xl shadow-md hover:shadow-cyan-500/30 hover:scale-[1.02] transition-all text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h2 className="text-xl font-semibold text-cyan-300 mb-2">📅 Attendance</h2>
                        <p>Total Days: <strong>{attendance.length}</strong></p>
                        <p>Last Marked: <strong>{attendance[0]?.date || 'N/A'}</strong></p>
                        <Link
                            to="/employee/attendance"
                            className="inline-block mt-4 text-cyan-400 hover:text-cyan-200 underline transition"
                        >
                            View Attendance →
                        </Link>
                    </motion.div>

                    {/* Payroll */}
                    <motion.div
                        className="bg-white/10 backdrop-blur-md border border-violet-500/40 p-6 rounded-2xl shadow-md hover:shadow-violet-500/30 hover:scale-[1.02] transition-all text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-xl font-semibold text-violet-300 mb-2">💰 Payroll</h2>
                        <p>Last Amount: ₹<strong>{payroll[0]?.amount || '0'}</strong></p>
                        <p>Status: <strong>{payroll[0]?.status || 'N/A'}</strong></p>
                        <Link
                            to="/employee/payroll"
                            className="inline-block mt-4 text-violet-400 hover:text-violet-200 underline transition"
                        >
                            View Payroll →
                        </Link>
                    </motion.div>

                    {/* Projects */}
                    <motion.div
                        className="bg-white/10 backdrop-blur-md border border-emerald-500/40 p-6 rounded-2xl shadow-md hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-xl font-semibold text-emerald-300 mb-2">🛠️ Projects</h2>
                        <p>Total Projects: <strong>{projects.length}</strong></p>
                        <p>Total Tasks: <strong>{projects.reduce((sum, p) => sum + p.tasks.length, 0)}</strong></p>
                        <Link
                            to="/employee/projects"
                            className="inline-block mt-4 text-emerald-400 hover:text-emerald-200 underline transition"
                        >
                            View Projects →
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default DashboardEmployee;