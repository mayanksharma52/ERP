// src/components/Home.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalProjects: 0,
        activeUsers: 0,
        pendingTasks: 0,
        completedTasks: 0
    });

    useEffect(() => {
        setStats({
            totalProjects: 25,
            activeUsers: 150,
            pendingTasks: 48,
            completedTasks: 236
        });
    }, []);

    const features = [
        {
            title: 'Project Management',
            description: 'Easily organize and monitor all ongoing projects.',
            image: '/images/ProjectManagement.jpg'
        },
        {
            title: 'Task Tracking',
            description: 'Stay on top of your daily deliverables and timelines.',
            image: '/images/TaskTracking.jpg'
        },
        {
            title: 'Resource Allocation',
            description: 'Efficiently manage human and technical resources.',
            image: '/images/ResourceAllocation.jpeg'
        },
        {
            title: 'Reports & Analytics',
            description: 'Visualize your team’s performance with in-depth insights.',
            image: '/images/Analytic.png'
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 sm:px-6 lg:px-12 overflow-hidden"
        >
            {/* Futuristic Background Effects */}
            <div className="absolute inset-0 -z-10 animate-pulse bg-[radial-gradient(#1e1e2f_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
            <div className="absolute inset-0 -z-20 bg-gradient-to-tr from-purple-900/40 via-indigo-900/40 to-black"></div>

            {/* Hero Section */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-center py-24"
            >
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 drop-shadow-lg">
                    StratoWorks
                </h1>
                <p className="mt-4 text-xl md:text-2xl text-gray-300">
                    Next-Gen ERP for Modern Enterprises
                </p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/login')}
                    className="mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-semibold shadow-lg hover:shadow-pink-500/40 transition"
                >
                    Get Started 🚀
                </motion.button>
            </motion.div>

            {/* Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {[{ label: 'Total Projects', value: stats.totalProjects },
                    { label: 'Active Users', value: stats.activeUsers },
                    { label: 'Pending Tasks', value: stats.pendingTasks },
                    { label: 'Completed Tasks', value: stats.completedTasks }].map((item, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-xl p-6 border border-purple-500/10 text-center"
                    >
                        <h3 className="text-lg font-semibold text-purple-300 mb-1">{item.label}</h3>
                        <p className="text-4xl font-bold text-white">{item.value}</p>
                    </motion.div>
                ))}
            </section>

            {/* Features */}
            <motion.section
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
            >
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-900 rounded-lg overflow-hidden shadow-xl transition-transform border border-gray-800"
                    >
                        <img src={feature.image} alt={feature.title} className="h-40 w-full object-cover" />
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-purple-200 mb-2">{feature.title}</h3>
                            <p className="text-gray-400 text-sm">{feature.description}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.section>

            {/* Recent Activity */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900 rounded-xl shadow-md p-6 border border-gray-800"
            >
                <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
                        <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                        <div>
                            <p className="text-gray-200">New project "Website Redesign" created</p>
                            <p className="text-sm text-gray-500">2 hours ago</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
                        <span className="h-3 w-3 rounded-full bg-green-500"></span>
                        <div>
                            <p className="text-gray-200">Task "Database Migration" completed</p>
                            <p className="text-sm text-gray-500">5 hours ago</p>
                        </div>
                    </div>
                </div>
            </motion.section>
        </motion.div>
    );
}

export default Home;
