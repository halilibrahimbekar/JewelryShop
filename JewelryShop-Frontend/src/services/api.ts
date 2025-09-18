import axios from 'axios'

const API_BASE = 'http://localhost:5056'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Types
export interface Product {
  id: string
  name: string
  description?: string
  price: number
  stock: number
  imageUrl?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  fullName?: string
  role?: string
}

export interface AuthResponse {
  token: string
  expiresAt: string
}

// Product API functions
export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await api.get('/api/products')
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const response = await api.get(`/api/products/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

// Auth API functions
export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  const response = await api.post('/api/auth/login', credentials)
  const authData = response.data
  
  localStorage.setItem('auth-token', authData.token)
  return authData
}

export async function register(userData: RegisterRequest): Promise<AuthResponse> {
  const response = await api.post('/api/auth/register', userData)
  const authData = response.data
  
  localStorage.setItem('auth-token', authData.token)
  return authData
}

export async function logout(): Promise<void> {
  localStorage.removeItem('auth-token')
}

// Helper functions
export function isAuthenticated(): boolean {
  return !!localStorage.getItem('auth-token')
}

export function getToken(): string | null {
  return localStorage.getItem('auth-token')
}