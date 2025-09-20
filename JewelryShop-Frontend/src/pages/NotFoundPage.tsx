import { Link } from 'react-router-dom'
import { ArrowLeft, Search, Home, ShoppingBag } from 'lucide-react'
import mivoraLogo from '../assets/mivora.png'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
            <img 
              src={mivoraLogo} 
              alt="Mivora Logo" 
              className="h-16 w-16 object-contain rounded-xl"
            />
          </div>
        </div>

        {/* 404 Visual */}
        <div className="mb-8">
          <div className="relative">
            <h1 className="text-8xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent opacity-20">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                <Search className="h-12 w-12 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sayfa Bulunamadı
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
            Lütfen URL'yi kontrol edin veya ana sayfadan devam edin.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="w-full btn-primary inline-flex items-center justify-center space-x-2 text-lg py-4"
          >
            <Home className="h-5 w-5" />
            <span>Ana Sayfaya Dön</span>
          </Link>
          
          <Link
            to="/products"
            className="w-full btn-secondary inline-flex items-center justify-center space-x-2 text-lg py-4"
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Ürünleri Keşfet</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center space-x-2 text-purple-600 hover:text-purple-700 font-medium py-3 px-6 rounded-lg hover:bg-purple-50 transition-all duration-300"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Geri Dön</span>
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Yardıma mı ihtiyacınız var?
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Aradığınızı bulamıyorsanız, size yardımcı olmaktan mutluluk duyarız.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/about"
              className="flex-1 text-center px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg font-medium transition-colors text-sm"
            >
              Hakkımızda
            </Link>
            <a
              href="mailto:info@mivora.com"
              className="flex-1 text-center px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg font-medium transition-colors text-sm"
            >
              İletişim
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-pink-200 rounded-full opacity-20 animate-pulse delay-300"></div>
        <div className="absolute top-1/3 right-20 w-12 h-12 bg-purple-300 rounded-full opacity-10 animate-pulse delay-700"></div>
      </div>
    </div>
  )
}