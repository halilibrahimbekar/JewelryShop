import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ShoppingBag, User, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import mivoraLogo from '../assets/mivora.png'

export default function Header() {
  const { isAuth, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={mivoraLogo} 
                alt="Mivora Logo" 
                className="h-8 w-8 object-contain rounded-lg"
              />
              <span className="text-2xl font-bold gradient-text">
                Mivora
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Ana Sayfa
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Ürünler
            </Link>
            <Link
              to="/categories"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Kategoriler
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Hakkımızda
            </Link>
          </nav>

          {/* Desktop Auth & Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-gray-400 hover:text-purple-600 transition-colors duration-200"
            >
              <ShoppingBag className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {isAuth ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/profile"
                  className="p-2 text-gray-400 hover:text-purple-600 transition-colors duration-200"
                >
                  <User className="h-6 w-6" />
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Giriş
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  Kayıt ol
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-purple-600"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ana Sayfa
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ürünler
              </Link>
              <Link
                to="/categories"
                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kategoriler
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Hakkımızda
              </Link>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                {isAuth ? (
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/profile"
                      className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profilim
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setMobileMenuOpen(false)
                      }}
                      className="text-red-600 hover:text-red-700 px-3 py-2 rounded-md text-base font-medium text-left"
                    >
                      Çıkış Yap
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/login"
                      className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Giriş
                    </Link>
                    <Link
                      to="/register"
                      className="btn-primary text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Kayıt ol
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}