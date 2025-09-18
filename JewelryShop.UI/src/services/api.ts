import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5056'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor for auth tokens
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

// Add response interceptor for error handling
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

// Product interfaces
export interface Product {
  id: string
  name: string
  description?: string
  price: number
  imageUrl?: string
  discountPrice?: number
  category?: string
  stock?: number
  rating?: number
  reviews?: number
}

export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  sortBy?: 'price-asc' | 'price-desc' | 'name' | 'newest' | 'rating'
  page?: number
  limit?: number
}

// Auth interfaces
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
  }
}

// Cart interfaces
export interface CartItem {
  productId: string
  quantity: number
  product?: Product
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

// API Functions

// Products
export async function fetchProducts(filters?: ProductFilters): Promise<Product[]> {
  try {
    const params = new URLSearchParams()
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString())
        }
      })
    }
    
    const response = await api.get(`/api/products?${params}`)
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    // Return mock data for development
    return getMockProducts()
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

// Auth
export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  const response = await api.post('/api/auth/login', credentials)
  const authData = response.data
  
  // Store token
  localStorage.setItem('auth-token', authData.token)
  
  return authData
}

export async function register(userData: RegisterRequest): Promise<AuthResponse> {
  const response = await api.post('/api/auth/register', userData)
  const authData = response.data
  
  // Store token
  localStorage.setItem('auth-token', authData.token)
  
  return authData
}

export async function logout(): Promise<void> {
  try {
    await api.post('/api/auth/logout')
  } catch (error) {
    console.error('Error during logout:', error)
  } finally {
    localStorage.removeItem('auth-token')
  }
}

// Cart
export async function getCart(): Promise<Cart> {
  try {
    const response = await api.get('/api/cart')
    return response.data
  } catch (error) {
    console.error('Error fetching cart:', error)
    return { items: [], total: 0, itemCount: 0 }
  }
}

export async function addToCart(productId: string, quantity: number = 1): Promise<Cart> {
  const response = await api.post('/api/cart/add', { productId, quantity })
  return response.data
}

export async function updateCartItem(productId: string, quantity: number): Promise<Cart> {
  const response = await api.put('/api/cart/update', { productId, quantity })
  return response.data
}

export async function removeFromCart(productId: string): Promise<Cart> {
  const response = await api.delete(`/api/cart/remove/${productId}`)
  return response.data
}

export async function clearCart(): Promise<void> {
  await api.delete('/api/cart/clear')
}

// Categories
export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await api.get('/api/categories')
    return response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    return ['Kolyeler', 'Küpeler', 'Bileklikler', 'Yüzükler', 'Setler']
  }
}

// Mock data for development
function getMockProducts(): Product[] {
  return [
    {
      id: "1",
      name: "Altın Rose Kolye",
      price: 2499.99,
      discountPrice: 1999.99,
      imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center",
      category: "Kolye",
      stock: 15,
      rating: 4.5,
      reviews: 23,
      description: "Zarif tasarımıyla göz alıcı 14K altın rose kolye"
    },
    {
      id: "2",
      name: "Pırlanta Küpe Seti",
      price: 5999.99,
      imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&crop=center",
      category: "Küpe",
      stock: 8,
      rating: 4.8,
      reviews: 45,
      description: "Parlak pırlantalarla süslenmiş şık küpe seti"
    },
    {
      id: "3",
      name: "Gümüş Charm Bileklik",
      price: 899.99,
      discountPrice: 699.99,
      imageUrl: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop&crop=center",
      category: "Bileklik",
      stock: 25,
      rating: 4.2,
      reviews: 18,
      description: "Sevimli charmlarla süslenmiş 925 ayar gümüş bileklik"
    },
    {
      id: "4",
      name: "İnci Detaylı Yüzük",
      price: 1299.99,
      imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center",
      category: "Yüzük",
      stock: 12,
      rating: 4.6,
      reviews: 31,
      description: "Doğal incilerle bezeli zarif altın yüzük"
    },
    {
      id: "5",
      name: "Kristal Taşlı Set",
      price: 3499.99,
      discountPrice: 2799.99,
      imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop&crop=center",
      category: "Set",
      stock: 5,
      rating: 4.9,
      reviews: 67,
      description: "Kolye, küpe ve bileklik içeren kristal taşlı lüks set"
    },
    {
      id: "6",
      name: "Vintage Broş",
      price: 799.99,
      imageUrl: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop&crop=center",
      category: "Aksesuar",
      stock: 20,
      rating: 4.3,
      reviews: 12,
      description: "Antik desenli vintage tarzı şık broş"
    }
  ]
}
