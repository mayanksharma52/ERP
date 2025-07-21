// src/components/hr/AssignProject.jsx
import React, { useState } from 'react';
import { hrApi } from '../../services/api';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const AssignProject = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        assignedTo: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAssign = async (e) => {
        e.preventDefault();
        const { name, description, assignedTo } = formData;

        if (!name || !description || !assignedTo) {
            return toast.error('Please fill all fields');
        }

        try {
            setLoading(true);
            const response = await hrApi.assignProject({ name, description, assignedTo });
            toast.success(response.message || 'Project assigned successfully!');
            setFormData({ name: '', description: '', assignedTo: '' });
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'Failed to assign project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 py-12"
        >
            <motion.div
                className="bg-white/10 backdrop-blur-md rounded-2xl border border-[#00f2ff33] shadow-lg p-8 w-full max-w-xl relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
            >
                {/* Neon border ring */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur-xl opacity-20 z-0 animate-pulse"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white text-center mb-6">
                        🚀 Assign Project
                    </h2>

                    <form onSubmit={handleAssign} className="space-y-6">
                        <div>
                            <label className="block text-sm text-blue-300 mb-1">Project Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-black/40 text-white border border-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                                placeholder="e.g. Build Attendance Dashboard"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-blue-300 mb-1">Description</label>
                            <textarea
                                name="description"
                                rows="3"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-black/40 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                                placeholder="Briefly describe the project..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-blue-300 mb-1">Employee Email</label>
                            <input
                                type="email"
                                name="assignedTo"
                                value={formData.assignedTo}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-black/40 text-white border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                                placeholder="e.g. mayanksharma12662@gmail.com"
                            />
                        </div>

                        <motion.button
                            type="submit"
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            className={`w-full py-2 text-white font-bold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-pink-500 hover:to-yellow-500 transition duration-300 ${
                                loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {loading ? 'Assigning...' : 'Assign Project'}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AssignProject;