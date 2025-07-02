import axios from 'axios';

const API_URL = 'http://localhost:4001/api'; // adjust this to your backend URL

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

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
    }
};