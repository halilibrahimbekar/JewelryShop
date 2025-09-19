import { createContext, useContext, useReducer, ReactNode } from 'react'
import type { Product } from '../services/api'

// Sepet item tipi
export interface CartItem {
  id: string
  name: string
  price: number
  images: string[]
  category: string
  quantity: number
}

// Sepet state tipi
interface CartState {
  items: CartItem[]
  isOpen: boolean
  total: number
  itemCount: number
}

// Action tipleri
type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'ADD_ITEM_SILENT'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }

// Context tipi
interface CartContextType {
  state: CartState
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  addItemSilent: (product: Product, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotalPrice: () => number
}

// Sepet hesaplama fonksiyonları
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0)
}

const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0)
}

// Reducer fonksiyonu
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1 } = action.payload
      
      // Aynı ürün varsa miktarını artır
      const existingItemIndex = state.items.findIndex(
        item => item.id === product.id
      )

      let newItems: CartItem[]

      if (existingItemIndex >= 0) {
        // Mevcut item'ın miktarını artır
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // Yeni item ekle
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          images: product.images || [product.imageUrl || ''],
          category: product.category,
          quantity
        }
        newItems = [...state.items, newItem]
      }

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems),
        isOpen: true // Sepete ürün eklendiğinde sepeti aç
      }
    }

    case 'ADD_ITEM_SILENT': {
      const { product, quantity = 1 } = action.payload
      
      // Aynı ürün varsa miktarını artır
      const existingItemIndex = state.items.findIndex(
        item => item.id === product.id
      )

      let newItems: CartItem[]

      if (existingItemIndex >= 0) {
        // Mevcut item'ın miktarını artır
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // Yeni item ekle
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          images: product.images || [product.imageUrl || ''],
          category: product.category,
          quantity
        }
        newItems = [...state.items, newItem]
      }

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
        // isOpen durumunu değiştirmiyoruz
      }
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => 
        !(item.id === action.payload.id)
      )
      
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      }
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload
      
      if (quantity <= 0) {
        // Miktar 0 veya negatifse item'ı kaldır
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { id } })
      }

      const newItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      }
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        itemCount: 0
      }

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen
      }

    case 'OPEN_CART':
      return {
        ...state,
        isOpen: true
      }

    case 'CLOSE_CART':
      return {
        ...state,
        isOpen: false
      }

    default:
      return state
  }
}

// Initial state
const initialState: CartState = {
  items: [],
  isOpen: false,
  total: 0,
  itemCount: 0
}

// Context oluştur
const CartContext = createContext<CartContextType | undefined>(undefined)

// Provider component
interface CartProviderProps {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } })
  }

  const addItemSilent = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM_SILENT', payload: { product, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' })
  }

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' })
  }

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' })
  }

  const getTotalPrice = () => {
    return state.total
  }

  const value: CartContextType = {
    state,
    items: state.items,
    addItem,
    addItemSilent,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    getTotalPrice
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}