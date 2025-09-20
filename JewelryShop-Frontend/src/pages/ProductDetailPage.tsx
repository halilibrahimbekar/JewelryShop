import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { fetchProductById } from '../services/api'
import type { Product } from '../services/api'
import { useCart } from '../context/CartContext'
import { ArrowLeft, Heart, Share2, ShoppingCart, Star, Shield, Truck, Copy, Check } from 'lucide-react'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addItem, addItemSilent } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showSharePopup, setShowSharePopup] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return
      
      try {
        const data = await fetchProductById(id)
        setProduct(data)
      } catch (error) {
        console.error('Error loading product:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  // Close share popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSharePopup && !(event.target as Element).closest('.share-popup-container')) {
        setShowSharePopup(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSharePopup])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-200"></div>
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-600 border-t-transparent absolute top-0"></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.881-6.08 2.33"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">Ürün Bulunamadı</h2>
          <p className="text-gray-600 mb-8">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
          <Link 
            to="/products" 
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Tüm Ürünlere Dön</span>
          </Link>
        </div>
      </div>
    )
  }

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    if (!product) return
    
    addItem(product, quantity)
    setQuantity(1)
    toast.success(`✨ ${product.name} sepete eklendi! 🛒`)
  }

  const handleBuyNow = () => {
    if (!product) return
    
    // Önce sepete ekle (cart sidebar'ı açmadan)
    addItemSilent(product, quantity)
    toast.success('🚀 Ürün sepete eklendi, checkout\'a yönlendiriliyorsunuz!')
    // Sonra checkout'a yönlendir
    navigate('/checkout')
  }

  const handleCopyLink = async () => {
    const currentUrl = window.location.href
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      toast.success('🔗 Ürün linki kopyalandı!')
      setTimeout(() => {
        setCopied(false)
        setShowSharePopup(false)
      }, 2000)
    } catch (err) {
      toast.error('❌ Link kopyalanırken hata oluştu')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      {/* Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/products" 
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-purple-600 bg-white hover:bg-purple-50 px-4 py-2 rounded-full border border-gray-200 hover:border-purple-200 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Tüm Ürünler</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.imageUrl || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail images - Future enhancement */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-white rounded-lg overflow-hidden border-2 border-transparent hover:border-purple-300 cursor-pointer transition-colors">
                  <img
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=150&h=150&fit=crop'}
                    alt={`${product.name} ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full border-2 transition-colors ${
                      isFavorite 
                        ? 'border-red-200 bg-red-50 text-red-500' 
                        : 'border-gray-200 hover:border-red-200 hover:bg-red-50 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <div className="relative share-popup-container">
                    <button 
                      onClick={() => setShowSharePopup(!showSharePopup)}
                      className="p-2 rounded-full border-2 border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <Share2 className="h-5 w-5 text-gray-600" />
                    </button>
                    
                    {/* Share Popup */}
                    {showSharePopup && (
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50">
                        <div className="mb-3">
                          <h3 className="text-sm font-semibold text-gray-900 mb-2">Ürünü Paylaş</h3>
                          <div className="bg-gray-50 rounded-lg p-3 border">
                            <p className="text-xs text-gray-600 break-all">
                              {window.location.href}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={handleCopyLink}
                          disabled={copied}
                          className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                            copied 
                              ? 'bg-green-100 text-green-700 border-green-200' 
                              : 'bg-purple-600 hover:bg-purple-700 text-white'
                          }`}
                        >
                          {copied ? (
                            <>
                              <Check className="h-4 w-4" />
                              <span>Kopyalandı!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              <span>Linki Kopyala</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">(128 değerlendirme)</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-purple-600 mb-4">
                ₺{product.price.toLocaleString('tr-TR')}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ürün Açıklaması</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || 'Bu zarif takı parçası, özenle seçilmiş malzemelerden üretilmiştir. Modern tasarımı ve kaliteli işçiliği ile günlük kullanımda veya özel anlarda mükemmel bir seçimdir.'}
              </p>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Miktar</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  Stokta {product.stock} adet var
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full btn-primary inline-flex items-center justify-center space-x-2 text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>{product.stock === 0 ? 'Stokta Yok' : 'Sepete Ekle'}</span>
              </button>
              
              <button 
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="w-full btn-secondary inline-flex items-center justify-center space-x-2 text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Hemen Satın Al</span>
              </button>
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-600">2 Yıl Garanti</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-600">Ücretsiz Kargo</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="h-5 w-5 text-red-600" />
                  <span className="text-sm text-gray-600">30 Gün İade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}