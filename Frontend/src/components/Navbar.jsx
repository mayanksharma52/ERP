import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);

        // load dark mode setting from localStorage
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    const toggleDarkMode = () => {
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-lg text-gray-800 dark:text-white transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="text-xl font-bold">
                        ProjectERP
                    </Link>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleDarkMode}
                            className="px-2 py-1 text-sm border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
                        </button>

                        {/* Desktop Menu */}
                        <div className="hidden sm:flex items-center space-x-4">
                            {isLoggedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="hover:underline"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link to="/login" className="hover:underline">
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="sm:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                {isMenuOpen ? '✖' : '☰'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="sm:hidden px-4 pb-4">
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="block w-full text-left py-2 hover:underline">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="block py-2 hover:underline">
                                Login
                            </Link>
                            <Link to="/signup" className="block py-2 hover:underline">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;