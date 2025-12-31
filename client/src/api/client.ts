import axios from 'axios'

// Use environment variable or fallback for dev
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Add a request interceptor to attach the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Add a response interceptor to handle 401s (optional auto-logout or refresh)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Token might be expired. 
            // For simplicity in this iteration, we just logout.
            // A more advanced implementations would try to use the refresh token here.
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            // window.location.href = '/login' // Optional redirect
        }
        return Promise.reject(error)
    }
)
