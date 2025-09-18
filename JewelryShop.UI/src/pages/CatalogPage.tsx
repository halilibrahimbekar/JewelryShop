import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../services/api'
import ProductCard from '../components/ProductCard'

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  imageUrl?: string
  discountPrice?: number
}

const categories = ['Tümü', 'Kolyeler', 'Küpeler', 'Bileklikler', 'Yüzükler', 'Setler']
const sortOptions = [
  { value: 'default', label: 'Varsayılan' },
  { value: 'price-low', label: 'Fiyata Göre: Düşükten Yükseğe' },
  { value: 'price-high', label: 'Fiyata Göre: Yüksekten Düşüğe' },
  { value: 'name', label: 'İsme Göre A-Z' },
  { value: 'newest', label: 'En Yeniler' }
]

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Tümü')
  const [sortBy, setSortBy] = useState('default')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data)
        setFilteredProducts(data)
      })
      .catch(() => {
        setProducts([])
        setFilteredProducts([])
      })
      .finally(() => setLoading(false))
  }, [])

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== 'Tümü') {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(selectedCategory.toLowerCase().slice(0, -4)) // Remove "ler" suffix
      )
    }

    // Price filter
    filtered = filtered.filter(product => {
      const price = product.discountPrice || product.price
      return price >= priceRange.min && price <= priceRange.max
    })

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price))
        break
      case 'price-high':
        filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price))
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'newest':
        // Assume products are already in newest first order
        break
      default:
        break
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, sortBy, priceRange])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 text-lg">Ürünler yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-rose-400 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-serif text-white mb-4">Ürün Kataloğu</h1>
          <p className="text-lg text-white/90">Mivora'nın özenle seçilmiş takı koleksiyonunu keşfedin</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filters and Search */}
        <div className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Takı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-4">
            {/* Filter Toggle (Mobile) */}
            <button 
              className="lg:hidden flex items-center space-x-2 bg-white border border-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setShowFilters(!showFilters)}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
              </svg>
              <span>Filtreler</span>
            </button>

            {/* Sort Dropdown */}
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent min-w-48"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={`w-64 space-y-6 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategoriler</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                      selectedCategory === category 
                        ? 'bg-yellow-400 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fiyat Aralığı</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                  <span className="text-gray-500">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  />
                </div>
                <div className="text-sm text-gray-600 text-center">
                  ₺{priceRange.min} - ₺{priceRange.max}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <button 
                className="w-full border-2 border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('Tümü')
                  setSortBy('default')
                  setPriceRange({ min: 0, max: 10000 })
                }}
              >
                Filtreleri Temizle
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <span className="text-gray-600">
                {filteredProducts.length} ürün bulundu
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mx-auto text-gray-400 mb-4">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ürün bulunamadı</h3>
                <p className="text-gray-600">Arama kriterlerinizi değiştirerek tekrar deneyin</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
