import React, { useState } from 'react'
import type { Product } from '../pages/CatalogPage'

export default function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const hasDiscount = product.discountPrice && product.discountPrice < product.price

  return (
    <div 
      className="bg-white rounded-xl shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
            <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21,15 16,10 5,21"/>
            </svg>
          </div>
        )}
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            %{Math.round(((product.price - product.discountPrice!) / product.price) * 100)} İndirim
          </div>
        )}

        {/* Hover Actions */}
        <div className={`absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}>
          <button 
            className={`w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 ${isFavorite ? 'text-red-500' : 'text-gray-600'}`}
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label="Favorilere ekle"
          >
            <svg width="20" height="20" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          
          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 text-gray-600" aria-label="Hızlı görüntüle">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
          
          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 text-gray-600" aria-label="Sepete ekle">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors duration-200">{product.name}</h3>
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                width="12" 
                height="12" 
                fill={i < 4 ? "#fbbf24" : "#e5e7eb"} 
                viewBox="0 0 24 24"
              >
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
              </svg>
            ))}
            <span className="text-xs text-gray-500 ml-2">(4.0)</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mb-3">
          {hasDiscount ? (
            <>
              <span className="text-gray-500 line-through text-sm">₺{product.price.toFixed(2)}</span>
              <span className="text-red-500 font-semibold text-lg">₺{product.discountPrice!.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-gray-900 font-semibold text-lg">₺{product.price.toFixed(2)}</span>
          )}
        </div>

        <button className="w-full gradient-gold-rose text-white py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
          Sepete Ekle
        </button>
      </div>
    </div>
  )
}
