import { Link } from 'react-router-dom'
import { Instagram, Heart } from 'lucide-react'
import mivoraLogo from '../assets/mivora.png'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-screen-xl mx-auto py-12">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
            {/* Brand */}
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src={mivoraLogo} 
                  alt="Mivora Logo" 
                  className="h-8 w-8 object-contain rounded-lg"
                />
                <span className="text-2xl font-bold text-gray-800">Mivora</span>
              </div>
              <p className="text-gray-600 mb-6">
                Kadının zarafetini öne çıkaran özel tasarım takı koleksiyonları.
              </p>
              <div className="space-y-2">
                <span className="text-gray-500 text-sm block">Bizi takip edin:</span>
                <a 
                  href="https://instagram.com/mivoraofficial_" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full hover:shadow-lg transition-all duration-300 text-sm"
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
                <li>
                  <Link to="/profile" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Hesabım
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Kategoriler</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/products?category=Bileklik" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Bileklik
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Küpe" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Küpe
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Yüzük" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Yüzük
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=Kolye" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Kolye
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Yasal & Destek</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/terms" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Kullanım Koşulları
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Gizlilik Politikası
                  </Link>
                </li>
                <li>
                  <a href="mailto:info@mivora.com" className="text-gray-600 hover:text-purple-600 transition-colors">
                    İletişim
                  </a>
                </li>
                <li>
                  <a href="tel:+902125550123" className="text-gray-600 hover:text-purple-600 transition-colors">
                    +90 212 555 0123
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                © 2025 Mivora. Tüm hakları saklıdır.
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