import { Link } from 'react-router-dom'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import type { Product } from '../services/api'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card-jewelry group">
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
        <img
          src={product.imageUrl || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop'}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
            <button className="bg-white/90 hover:bg-white text-purple-600 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
              <Heart className="h-5 w-5" />
            </button>
            <Link
              to={`/products/${product.id}`}
              className="bg-white/90 hover:bg-white text-purple-600 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-sm font-medium"
            >
              Detay
            </Link>
          </div>
        </div>

        {/* Stock badge */}
        {product.stock === 0 && (
          <div className="absolute top-2 left-2">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Tükendi
            </span>
          </div>
        )}
        
        {/* Discount badge */}
        {product.stock > 0 && product.stock < 5 && (
          <div className="absolute top-2 left-2">
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Son {product.stock} adet
            </span>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-6">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors duration-200">
            <Link to={`/products/${product.id}`}>
              {product.name}
            </Link>
          </h3>
          
          {/* Rating */}
          <div className="flex items-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-gray-500 ml-1">(24)</span>
          </div>
        </div>
        
        {product.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
        )}
        
        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold gradient-text">
              ₺{product.price.toLocaleString('tr-TR')}
            </span>
            <span className="text-sm text-gray-500">
              KDV dahil
            </span>
          </div>
          
          <button
            className={`p-3 rounded-full transition-all duration-200 ${
              product.stock === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:scale-110 shadow-lg hover:shadow-xl'
            }`}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
