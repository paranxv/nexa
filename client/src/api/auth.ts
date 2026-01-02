import { api } from './client'

export const AuthService = {
    login: async (email: string, password: string) => {
        const formData = new URLSearchParams()
        formData.append('username', email)
        formData.append('password', password)

        const response = await api.post('/auth/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        if (response.data.access_token) {
            localStorage.setItem('access_token', response.data.access_token)
            localStorage.setItem('refresh_token', response.data.refresh_token)
        }
        return response.data
    },

    signup: async (email: string, password: string) => {
        const response = await api.post('/auth/signup', { email, password })
        return response.data
    },

    logout: () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('access_token')
    }
}
