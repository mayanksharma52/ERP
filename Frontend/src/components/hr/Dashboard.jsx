import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hrApi } from '../../services/api';
import { toast } from 'react-hot-toast';
import {
    PlusIcon, PencilIcon, TrashIcon, XMarkIcon
} from '@heroicons/react/24/outline';
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from 'recharts';
import LoadingSpinner from '../common/LoadingSpinner';

const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#14b8a6'];

const EmployeeModal = ({
                           isModalOpen, selectedEmployee, formData, setFormData,
                           setIsModalOpen, resetForm, handleSubmit
                       }) => (
    <AnimatePresence>
        {isModalOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-gray-900 border border-purple-500/20 rounded-xl p-6 w-full max-w-md shadow-xl"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-purple-300">
                            {selectedEmployee ? 'Edit Employee' : 'Add Employee'}
                        </h2>
                        <button
                            type="button"
                            onClick={() => {
                                setIsModalOpen(false);
                                resetForm();
                            }}
                        >
                            <XMarkIcon className="h-6 w-6 text-gray-400 hover:text-white" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {['name', 'email', 'department', 'password'].map((field) => (
                            <div key={field}>
                                <label className="block text-sm text-purple-200 capitalize">
                                    {field}
                                </label>
                                <input
                                    type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
                                    value={formData[field]}
                                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                                    required={field !== 'department'}
                                    className="w-full mt-1 px-3 py-2 bg-gray-800 text-white border border-purple-500/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                        ))}
                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    resetForm();
                                }}
                                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded hover:brightness-110"
                            >
                                {selectedEmployee ? 'Update' : 'Add'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

const StatCard = ({ label, value }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl p-6 border border-purple-500/20 text-center shadow-lg"
    >
        <h3 className="text-sm font-semibold text-purple-400 mb-2">{label}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
    </motion.div>
);

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [departmentData, setDepartmentData] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        password: ''
    });

    const [stats, setStats] = useState({
        totalEmployees: 0,
        departments: 0,
        attendance: 0,
        tasks: 0
    });

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const response = await hrApi.getAllEmployees();
            const employeeData = response.data;
            setEmployees(employeeData);

            const departmentCounts = employeeData.reduce((acc, emp) => {
                acc[emp.department] = (acc[emp.department] || 0) + 1;
                return acc;
            }, {});

            const departmentStats = Object.entries(departmentCounts).map(([name, value]) => ({ name, value }));
            setDepartmentData(departmentStats);

            setStats({
                totalEmployees: employeeData.length,
                departments: Object.keys(departmentCounts).length,
                attendance: Math.floor(Math.random() * 100),
                tasks: Math.floor(Math.random() * 50)
            });

        } catch (error) {
            toast.error('Failed to load dashboard data');
            console.error('Dashboard error:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', department: '', password: '' });
        setSelectedEmployee(null);
    };

    const handleEdit = (emp) => {
        setSelectedEmployee(emp);
        setFormData({
            name: emp.name,
            email: emp.email,
            department: emp.department,
            password: emp.password
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (email) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await hrApi.deleteEmployee(email);
                toast.success('Employee deleted');
                loadDashboardData();
            } catch (error) {
                toast.error('Delete failed');
                console.error('Delete error:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedEmployee) {
                await hrApi.updateEmployee(selectedEmployee.email, formData);
                toast.success('Employee updated');
            } else {
                await hrApi.addEmployee(formData);
                toast.success('Employee added');
            }
            setIsModalOpen(false);
            resetForm();
            loadDashboardData();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative min-h-screen bg-black text-white px-4 sm:px-6 lg:px-12 py-8 overflow-x-hidden"
        >
            {/* Background grid */}
            <div className="absolute inset-0 -z-10 animate-pulse bg-[radial-gradient(#1e1e2f_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
            <div className="absolute inset-0 -z-20 bg-gradient-to-tr from-purple-900/40 via-indigo-900/40 to-black"></div>

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 drop-shadow-lg">
                    HR Dashboard
                </h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-2 rounded-full text-white font-semibold shadow hover:brightness-110"
                >
                    <PlusIcon className="h-5 w-5 mr-2" /> Add Employee
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <StatCard label="Employees" value={stats.totalEmployees} />
                <StatCard label="Departments" value={stats.departments} />
                <StatCard label="Attendance %" value={stats.attendance} />
                <StatCard label="Tasks" value={stats.tasks} />
            </div>

            {/* Department Distribution */}
            <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-purple-500/20 shadow-lg">
                <h2 className="text-xl font-bold text-purple-300 mb-4">Department Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={departmentData} dataKey="value" nameKey="name" outerRadius={100} label>
                            {departmentData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Employee Table */}
            <div className="bg-gray-900 rounded-xl p-6 border border-purple-500/20 shadow-lg">
                <h2 className="text-xl font-bold text-purple-300 mb-4">Employee List</h2>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto text-left text-white">
                        <thead>
                        <tr className="bg-gray-800 text-purple-300">
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Department</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.email} className="border-t border-gray-700 hover:bg-gray-800">
                                <td className="px-4 py-2">{emp.name}</td>
                                <td className="px-4 py-2">{emp.email}</td>
                                <td className="px-4 py-2">{emp.department}</td>
                                <td className="px-4 py-2 flex space-x-2">
                                    <button onClick={() => handleEdit(emp)} className="text-blue-400 hover:text-blue-300">
                                        <PencilIcon className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleDelete(emp.email)} className="text-red-400 hover:text-red-300">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <EmployeeModal
                isModalOpen={isModalOpen}
                selectedEmployee={selectedEmployee}
                formData={formData}
                setFormData={setFormData}
                setIsModalOpen={setIsModalOpen}
                resetForm={resetForm}
                handleSubmit={handleSubmit}
            />
        </motion.div>
    );
};

export default Dashboard;