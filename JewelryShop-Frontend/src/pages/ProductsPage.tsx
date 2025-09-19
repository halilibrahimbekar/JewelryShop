import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchProducts } from '../services/api'
import type { Product } from '../services/api'
import ProductCard from '../components/ProductCard'
import { Search, ChevronUp } from 'lucide-react'

const categories = ['Tümü', 'Bileklik', 'Küpe', 'Yüzük', 'Kolye']

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tümü')
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchParams] = useSearchParams()
  const [showScrollTop, setShowScrollTop] = useState(false)
  
  // Sort state
  const [sortBy, setSortBy] = useState('default')

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        const data = await fetchProducts(sortBy, selectedCategory)
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [sortBy, selectedCategory]) // kategori değiştiğinde de API'yi tekrar çağır

  // Handle category from URL params
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl && categories.includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl)
    }
  }, [searchParams])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    let filtered = products

    // Filter by search term (local filtering for search)
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Note: Category filtering and sorting are now handled by the API
    setFilteredProducts(filtered)
  }, [searchTerm, products])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-full px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Mivora <span className="gradient-text">Koleksiyonu</span>
          </h1>
          <p className="text-lg text-gray-600">
            Kadın takıları koleksiyonumuzu keşfedin - Bileklik, küpe, yüzük ve kolye
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-600 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Sort */}
        <div className="mb-8 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Ürün ara..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Sort */}
            <div className="flex-shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 min-w-[180px]"
              >
                <option value="default">Varsayılan</option>
                <option value="price-low">Fiyat: Düşük → Yüksek</option>
                <option value="price-high">Fiyat: Yüksek → Düşük</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        {!loading && (
          <div className="mb-4 text-center">
            <p className="text-gray-600">
              {filteredProducts.length} ürün bulundu
              {searchTerm && (
                <span className="ml-1">
                  "<span className="font-medium">{searchTerm}</span>" için
                </span>
              )}
            </p>
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm ? 'Aradığınız kriterlere uygun ürün bulunamadı.' : 'Henüz ürün bulunmuyor.'}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 text-sm text-gray-600">
              {filteredProducts.length} ürün gösteriliyor
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50 group"
          aria-label="Sayfa başına dön"
        >
          <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6 group-hover:animate-bounce" />
        </button>
      )}
    </div>
  )
}
