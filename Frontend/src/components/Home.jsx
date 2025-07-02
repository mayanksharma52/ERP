import React from 'react';
import { useState, useEffect } from 'react';

function Home() {
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

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <header className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to ProjectERP</h1>
                <p className="text-xl text-gray-600">Your Complete Enterprise Resource Planning Solution</p>
            </header>

            {/* Statistics Dashboard */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="text-blue-500 mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Projects</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalProjects}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="text-green-500 mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Users</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeUsers}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="text-yellow-500 mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending Tasks</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.pendingTasks}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="text-purple-500 mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Completed Tasks</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.completedTasks}</p>
                </div>
            </section>

            {/* Features Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {['Project Management', 'Task Tracking', 'Resource Allocation', 'Reports & Analytics'].map((feature, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature}</h3>
                            <p className="text-gray-600">Manage and track your resources efficiently with our tools</p>
                        </div>
                    </div>
                ))}
            </section>

            {/* Recent Activity */}
            <section className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <div>
                            <p className="text-gray-900">New project "Website Redesign" created</p>
                            <p className="text-sm text-gray-500">2 hours ago</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <div>
                            <p className="text-gray-900">Task "Database Migration" completed</p>
                            <p className="text-sm text-gray-500">5 hours ago</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;