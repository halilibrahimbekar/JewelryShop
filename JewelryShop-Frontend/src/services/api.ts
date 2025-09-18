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
  category: string
}

// Mock data for jewelry products
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Altın Zincir Bileklik',
    description: 'Zarif 14 ayar altın zincir bileklik, günlük kullanım için ideal',
    price: 2500,
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
    category: 'Bileklik'
  },
  {
    id: '2',
    name: 'İnci Küpe Seti',
    description: 'Doğal inci ile süslenmiş gümüş küpe seti',
    price: 1800,
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
    category: 'Küpe'
  },
  {
    id: '3',
    name: 'Pırlanta Tek Taş Yüzük',
    description: '0.5 karat pırlanta ile 18 ayar beyaz altın yüzük',
    price: 15000,
    stock: 3,
    imageUrl: 'https://images.unsplash.com/photo-1603561596112-db542eeb2503?w=400&h=400&fit=crop',
    category: 'Yüzük'
  },
  {
    id: '4',
    name: 'Gül Altın Kolye',
    description: 'Minimalist tasarım gül altın kolye, kalp motifli',
    price: 3200,
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    category: 'Kolye'
  },
  {
    id: '5',
    name: 'Gümüş Halka Küpe',
    description: 'Modern tasarım gümüş halka küpe, her ortama uygun',
    price: 650,
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1506629905607-84e28e57d98d?w=400&h=400&fit=crop',
    category: 'Küpe'
  },
  {
    id: '6',
    name: 'Vintage Gümüş Bileklik',
    description: 'Antika görünümlü gümüş bileklik, el işçiliği detayları',
    price: 1200,
    stock: 7,
    imageUrl: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop',
    category: 'Bileklik'
  },
  {
    id: '7',
    name: 'Zümrüt Taşlı Yüzük',
    description: 'Doğal zümrüt taşı ile gümüş yüzük, özel tasarım',
    price: 4500,
    stock: 5,
    imageUrl: 'https://images.unsplash.com/photo-1584302179602-e4819e3a2468?w=400&h=400&fit=crop',
    category: 'Yüzük'
  },
  {
    id: '8',
    name: 'İnci Detaylı Kolye',
    description: 'Çok katlı inci detaylı altın kolye, şık ve zarif',
    price: 5800,
    stock: 6,
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
    category: 'Kolye'
  }
]

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
    console.error('Error fetching products, using mock data:', error)
    // Return mock data when API is not available
    return mockProducts
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