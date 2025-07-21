import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './components/Home';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/hr/Dashboard';
import Attendance from './components/hr/Attendance';
import LeaveApproval from './components/hr/LeaveApproval';
import AssignProject from './components/hr/AssignProject';
import DashboardEmployee from './components/employee/DashboardEmployee';
import AttendancePage from './components/employee/AttendancePage';
import EmployeeProfile from './components/employee/EmployeeProfile';
import ApplyLeave from './components/employee/ApplyLeave';
import EmployeeLayout from './layout/EmployeeLayout';
import HRLayout from './layout/HRLayout'; // ✅ Use the actual new HR layout
import { ThemeProvider } from './context/ThemeContext';
import { authApi, checkRole } from './services/api';

// ✅ Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
    const isAuthenticated = authApi.isAuthenticated();
    const hasRequiredRole = allowedRoles ? checkRole(allowedRoles) : true;

    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (!hasRequiredRole) return <Navigate to="/" replace />;
    return children;
};

function App() {
    return (
        <ThemeProvider>
            <Router>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 3000,
                            style: {
                                background: '#333',
                                color: '#fff',
                            },
                            success: {
                                style: { background: 'green' },
                            },
                            error: {
                                style: { background: 'red' },
                            },
                        }}
                    />

                    <Routes>
                        {/* ✅ Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />

                        {/* ✅ HR Protected Routes */}
                        <Route
                            path="/hr/*"
                            element={
                                <ProtectedRoute allowedRoles={['hr']}>
                                    <HRLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Navigate to="dashboard" replace />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="employees" element={<Dashboard />} />
                            <Route path="attendance" element={<Attendance />} />
                            <Route path="payroll" element={<Dashboard />} />
                            <Route path="leaves" element={<LeaveApproval />} />
                            <Route path="assign/project" element={<AssignProject />} />
                            <Route path="*" element={<Navigate to="dashboard" replace />} />
                        </Route>

                        {/* ✅ Employee Protected Routes */}
                        <Route
                            path="/employee/*"
                            element={
                                <ProtectedRoute allowedRoles={["employee"]}>
                                    <EmployeeLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Navigate to="dashboard" replace />} />
                            <Route path="dashboard" element={<DashboardEmployee />} />
                            <Route path="attendance" element={<AttendancePage />} />
                            <Route path="apply-leave" element={<ApplyLeave />} />
                            <Route path="profile" element={<EmployeeProfile />} />
                            <Route path="*" element={<Navigate to="dashboard" replace />} />
                        </Route>

                        {/* ✅ Catch-all Fallback */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;