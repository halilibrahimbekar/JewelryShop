import React, { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount] = useState(3)

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        {/* Mobile Menu Button */}
        <button
          className={`lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 transition-all duration-300 ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ease-in-out ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ease-in-out ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Logo */}
        <div className="flex flex-col items-center lg:items-start">
          <h1 className="text-2xl lg:text-3xl font-bold text-gradient-gold-rose font-serif">Mivora</h1>
          <span className="text-xs text-gray-600 font-light tracking-wider">Elegant Jewelry</span>
        </div>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? 'flex flex-col absolute top-16 left-0 right-0 bg-white shadow-lg p-4 space-y-4' : 'hidden'} lg:flex lg:static lg:flex-row lg:space-y-0 lg:space-x-8 lg:bg-transparent lg:shadow-none lg:p-0`}>
          <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200 relative group">
            Ana Sayfa
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 transition-all duration-200 group-hover:w-full"></span>
          </a>
          <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200 relative group">
            Koleksiyonlar
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 transition-all duration-200 group-hover:w-full"></span>
          </a>
          <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200 relative group">
            Yeni Ürünler
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 transition-all duration-200 group-hover:w-full"></span>
          </a>
          <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200 relative group">
            Kampanyalar
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 transition-all duration-200 group-hover:w-full"></span>
          </a>
          <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200 relative group">
            Hakkımızda
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 transition-all duration-200 group-hover:w-full"></span>
          </a>
          <a href="#" className="text-gray-700 hover:text-yellow-600 font-medium transition-colors duration-200 relative group">
            İletişim
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 transition-all duration-200 group-hover:w-full"></span>
          </a>
        </nav>

        {/* Header Actions */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <button className="p-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-full transition-all duration-200" aria-label="Arama">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>

          {/* Favorites */}
          <button className="p-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-full transition-all duration-200" aria-label="Favoriler">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>

          {/* Cart */}
          <button className="p-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-full transition-all duration-200 relative" aria-label="Sepet">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account */}
          <button className="p-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-full transition-all duration-200" aria-label="Hesabım">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden bg-gray-50 p-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Takı ara..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-yellow-600">
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
