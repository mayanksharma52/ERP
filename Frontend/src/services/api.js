// src/services/api.js
import axios from 'axios';

const API_URL = 'https://erp-backend-q8pv.onrender.com';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth API
export const authApi = {
    signup: async (userData) => {
        const response = await api.post('/auth/signup', userData);
        return response.data;
    },
    verifyOTP: async (data) => {
        const response = await api.post('/auth/verify-otp', data);
        return response.data;
    },
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },
    forgetPassword: async (email) => {
        const response = await api.post('/auth/forget-password', { email });
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};

// HR API
export const hrApi = {
    // ✅ Get HR profile
    getProfile: async () => {
        const response = await api.get('/hr/profile');
        return response.data;
    },

    // ✅ Get all employees
    getAllEmployees: async () => {
        const response = await api.get('/hr/employees');
        return response.data;
    },

    // ✅ Get single employee by email
    getSingleEmployee: async (email) => {
        const response = await api.get(`/hr/employees/${email}`);
        return response.data;
    },

    // ✅ Add new employee
    addEmployee: async (employeeData) => {
        const response = await api.post('/hr/addEmployee', employeeData);
        return response.data;
    },

    // ✅ Update employee
    updateEmployee: async (email, employeeData) => {
        const response = await api.put(`/hr/updateEmployee/${email}`, employeeData);
        return response.data;
    },

    // ✅ Delete employee
    deleteEmployee: async (email) => {
        const response = await api.delete(`/hr/deleteEmployee/${email}`);
        return response.data;
    },

    // ✅ Get all attendance records
    getAllAttendance: async () => {
        const response = await api.get('/hr/attendance');
        return response.data;
    },

    // ✅ Get all leave requests
    getLeaves: async () => {
        const response = await api.get('/hr/leaves');
        return response.data;
    },

    updateLeaveStatus: async (id, status) => {
        const response = await api.put(`/hr/leaves/${id}`, { status });
        return response.data;
    },

    // ✅ Assign a project to employee
    assignProject: async (projectData) => {
        const response = await api.post('/hr/assignProject', projectData);
        return response.data;
    },

    // ✅ Assign a task to employee
    assignTask: async (taskData) => {
        const response = await api.post('/hr/assignTask', taskData);
        return response.data;
    }
};

// Employee API
// Employee API
export const employeeApi = {
    // ✅ Mark attendance (POST)
    markAttendance: async () => {
        const response = await api.post('/employee/attendance/mark');
        return response.data;
    },

    // ✅ Get own attendance records
    getAttendanceHistory: async () => {
        const response = await api.get('/employee/attendance/view');
        return response.data;
    },

    // ✅ Apply for leave (POST)
    applyLeave: async (leaveData) => {
        const response = await api.post('/employee/apply/leave', leaveData);
        return response.data;
    },

    // ✅ Get payroll records
    getPayroll: async () => {
        const response = await api.get('/employee/payroll/me');
        return response.data;
    },

    // ✅ Get projects and tasks
    getProjectsAndTasks: async () => {
        const response = await api.get('/employee/projects/my-tasks');
        return response.data;
    }
};

// Role-based access control helper
export const checkRole = (requiredRoles) => {
    const user = authApi.getCurrentUser();
    if (!user) return false;
    return requiredRoles.includes(user.role);
};

// Export the base api instance for other uses
export default api;
