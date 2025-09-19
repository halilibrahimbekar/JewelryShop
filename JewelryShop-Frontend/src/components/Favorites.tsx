import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import ProductCard from './ProductCard'
import { fetchProducts } from '../services/api'
import type { Product } from '../services/api'

interface FavoritesProps {
  className?: string
}

export default function Favorites({ className = '' }: FavoritesProps) {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading favorites from localStorage or API
    const loadFavorites = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // For demo purposes, get first 2 products as favorites
      try {
        const allProducts = await fetchProducts()
        setFavoriteProducts(allProducts.slice(0, 2))
      } catch (error) {
        console.error('Error loading favorites:', error)
        setFavoriteProducts([])
      }
      
      setLoading(false)
    }

    loadFavorites()
  }, [])

  const handleRemoveFromFavorites = (productId: string) => {
    setFavoriteProducts(prev => prev.filter(product => product.id !== productId))
    // TODO: Update localStorage or API
  }

  if (loading) {
    return (
      <div className={className}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (favoriteProducts.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz favori ürününüz yok</h3>
        <p className="text-gray-500 mb-6">Beğendiğiniz ürünleri favorilerinize ekleyin</p>
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
        >
          <span>Ürünleri Keşfet</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteProducts.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard product={product} />
            <button
              onClick={() => handleRemoveFromFavorites(product.id)}
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors group"
              title="Favorilerden çıkar"
            >
              <Heart className="h-5 w-5 text-red-500 fill-current group-hover:text-red-600" />
            </button>
          </div>
        ))}
      </div>
      
      {favoriteProducts.length > 0 && (
        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            <span>Daha Fazla Ürün Keşfet</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  )
}