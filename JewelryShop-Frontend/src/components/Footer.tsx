import { Link } from 'react-router-dom'
import { Instagram, Heart, Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-8 w-8 text-purple-500" />
                <span className="text-2xl font-bold text-gray-800">Mivora</span>
              </div>
              <p className="text-gray-600 mb-6 max-w-md">
                Kadının zarafetini öne çıkaran özel tasarım bileklik, küpe, yüzük ve kolye koleksiyonları. 
                Her parça, size özel hissettirecek detaylarla tasarlanmıştır.
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-gray-500">Bizi takip edin:</span>
                <a 
                  href="https://instagram.com/mivoraofficial_" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300"
                >
                  <Instagram className="h-4 w-4" />
                  <span>@mivoraofficial_</span>
                </a>
              </div>
            </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Ürünler
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Hakkımızda
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Kategoriler</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=bileklik" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Bileklik
                </Link>
              </li>
              <li>
                <Link to="/products?category=küpe" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Küpe
                </Link>
              </li>
              <li>
                <Link to="/products?category=yüzük" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Yüzük
                </Link>
              </li>
              <li>
                <Link to="/products?category=kolye" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Kolye
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 Mivora. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center space-x-1 text-gray-500 text-sm mt-4 md:mt-0">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400" />
              <span>for women</span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </footer>
  )
}