import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Briefcase, User, LogOut, Menu, X, Clock, CalendarPlus, Sun, Moon } from "lucide-react";
import { authApi } from "../services/api";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EmployeeLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const handleLogout = () => {
        authApi.logout();
        navigate("/login");
    };

    const navItems = [
        { to: "dashboard", label: "Dashboard", icon: <Briefcase size={18} /> },
        { to: "attendance", label: "Attendance", icon: <Clock size={18} /> },
        { to: "apply-leave", label: "Apply Leave", icon: <CalendarPlus size={18} /> },
        { to: "profile", label: "Profile", icon: <User size={18} /> },
    ];

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#0f172a] via-[#0a0a23] to-[#1e293b] transition-all duration-300">

            {/* ✅ Mobile Sidebar */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: -260 }}
                            animate={{ x: 0 }}
                            exit={{ x: -260 }}
                            transition={{ duration: 0.3 }}
                            className="fixed z-50 h-full w-64 bg-white/10 backdrop-blur-lg border-r border-cyan-600/20 p-6 shadow-lg md:hidden"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-cyan-400">Employee Panel</h2>
                                <button onClick={() => setSidebarOpen(false)}>
                                    <X className="text-cyan-300" />
                                </button>
                            </div>

                            <nav className="flex flex-col gap-4">
                                {navItems.map((item) => (
                                    <button
                                        key={item.to}
                                        onClick={() => {
                                            navigate(`/employee/${item.to}`);
                                            setSidebarOpen(false);
                                        }}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition hover:bg-cyan-500/10 text-white ${
                                            location.pathname.includes(item.to)
                                                ? "bg-cyan-500/20 font-semibold"
                                                : ""
                                        }`}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </button>
                                ))}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-500 hover:bg-red-900/40 transition"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* ✅ Desktop Sidebar */}
            <aside className="hidden md:flex md:flex-col w-64 bg-white/10 backdrop-blur-md border-r border-cyan-600/20 p-6 shadow-md">
                <h2 className="text-2xl font-bold text-cyan-400 mb-8">Employee Panel</h2>
                <nav className="flex flex-col gap-4 text-white">
                    {navItems.map((item) => (
                        <button
                            key={item.to}
                            onClick={() => navigate(`/employee/${item.to}`)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition hover:bg-cyan-500/10 w-full text-left ${
                                location.pathname.includes(item.to)
                                    ? "bg-cyan-500/20 font-semibold"
                                    : ""
                            }`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-500 hover:bg-red-900/40 transition"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </nav>
            </aside>

            {/* ✅ Main Content */}
            <main className="flex-1 px-4 py-6 md:px-8 md:py-8 text-white transition-all duration-300">
                {/* Top Bar - Mobile */}
                <div className="flex items-center justify-between mb-6 md:hidden">
                    <h1 className="text-xl font-bold text-cyan-400">Employee Dashboard</h1>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="bg-white/10 p-2 rounded-lg shadow hover:bg-white/20 transition"
                        >
                            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="bg-white/10 p-2 rounded-lg shadow hover:bg-white/20 transition"
                        >
                            <Menu size={20} className="text-white" />
                        </button>
                    </div>
                </div>

                {/* Top Bar - Desktop */}
                <div className="hidden md:flex justify-end mb-4">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg bg-white/10 hover:bg-white/20 transition text-white"
                    >
                        {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                </div>

                {/* Nested Page Content */}
                <Outlet />
            </main>
        </div>
    );
}