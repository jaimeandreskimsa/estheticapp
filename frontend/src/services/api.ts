import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export interface User {
  id: string
  email: string
  name: string
  firstName?: string
  lastName?: string
  role: string
  clinicId: string
  clinicName?: string
  avatar: string | null
}

export interface Patient {
  id: string
  first_name: string
  last_name: string
  rut: string | null
  email: string | null
  phone: string
  date_of_birth: string
  biological_sex: string | null
  city: string | null
  is_active: boolean
  last_visit: string | null
  total_consultas?: number
  created_at: string
}

// Auth
export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ token: string; user: User }>('/api/auth/login', { email, password }),
  register: (data: {
    email: string; password: string
    firstName: string; lastName: string; clinicName?: string
  }) => api.post<{ token: string; user: User }>('/api/auth/register', data),
  me: () => api.get<User>('/api/auth/me'),
}

// Patients
export const patientsApi = {
  list: (params?: { search?: string; page?: number; limit?: number }) =>
    api.get<{ data: Patient[]; total: number; page: number; limit: number }>('/api/patients', { params }),
  get: (id: string) =>
    api.get<{ data: Patient }>(`/api/patients/${id}`),
  create: (data: {
    firstName: string; lastName: string; phone: string; dateOfBirth: string
    rut?: string; email?: string; biologicalSex?: string
    address?: string; city?: string
    emergencyContactName?: string; emergencyContactPhone?: string
  }) => api.post<{ data: Patient }>('/api/patients', data),
  update: (id: string, data: Partial<Patient>) =>
    api.put<{ data: Patient }>(`/api/patients/${id}`, data),
}

export default api
