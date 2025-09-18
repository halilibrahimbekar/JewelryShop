import React from 'react'
import ProductCard from '../components/ProductCard'
import { Product } from './CatalogPage'

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Altın Rose Kolye",
    price: 2499.99,
    discountPrice: 1999.99,
    imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: "2",
    name: "Pırlanta Küpe Seti",
    price: 5999.99,
    imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: "3",
    name: "Gümüş Charm Bileklik",
    price: 899.99,
    discountPrice: 699.99,
    imageUrl: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop&crop=center"
  },
  {
    id: "4",
    name: "İnci Detaylı Yüzük",
    price: 1299.99,
    imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center"
  }
]

const categories = [
  {
    name: "Kolyeler",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&crop=center",
    count: "120+ Ürün"
  },
  {
    name: "Küpeler",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop&crop=center",
    count: "85+ Ürün"
  },
  {
    name: "Bileklikler",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&h=300&fit=crop&crop=center",
    count: "60+ Ürün"
  },
  {
    name: "Yüzükler",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop&crop=center",
    count: "95+ Ürün"
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 via-yellow-50 to-rose-100 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-rose-400/10"></div>
        <div className="container mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-serif leading-tight">
                Zarafet ve Güzellik
                <span className="block gradient-text bg-gradient-to-r from-yellow-500 to-rose-500 bg-clip-text text-transparent">
                  Mivora
                </span> 
                ile Buluşuyor
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Kadının özgüvenini yansıtan, her anına değer katan özel tasarım takılarımızla 
                kendi tarzınızı keşfedin. El yapımı koleksiyonlarımızla güzelliğinizi ortaya çıkarın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="gradient-gold-rose text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:shadow-xl hover:-translate-y-1">
                  Koleksiyonu Keşfet
                </button>
                <button className="border-2 border-yellow-400 text-yellow-600 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 hover:text-white transition-all duration-200">
                  Yeni Gelenler
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop&crop=center" 
                  alt="Mivora Jewelry Collection"
                  className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-3 rounded-2xl shadow-lg transform rotate-12">
                  <span className="text-2xl font-bold block">%30</span>
                  <small className="text-sm">İndirim</small>
                </div>
              </div>
              <div className="absolute -z-10 top-8 left-8 w-full h-full bg-gradient-to-br from-yellow-200 to-rose-200 rounded-3xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 p-6 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-rose-400 rounded-full flex items-center justify-center mx-auto text-white">
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                  <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
                  <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Kalite Garantisi</h3>
              <p className="text-gray-600">925 ayar gümüş ve 14K altın ile üretilen kaliteli takılar</p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-rose-400 rounded-full flex items-center justify-center mx-auto text-white">
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Hızlı Teslimat</h3>
              <p className="text-gray-600">2-3 iş günü içinde kapınızda, ücretsiz kargo avantajı</p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-rose-400 rounded-full flex items-center justify-center mx-auto text-white">
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Güvenli Alışveriş</h3>
              <p className="text-gray-600">SSL sertifikası ile korumalı ödeme ve veri güvenliği</p>
            </div>
            
            <div className="text-center space-y-4 p-6 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-rose-400 rounded-full flex items-center justify-center mx-auto text-white">
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M14 9V5a3 3 0 0 0-6 0v4"/>
                  <rect x="2" y="9" width="20" height="12" rx="2" ry="2"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Yaşam Boyu Garanti</h3>
              <p className="text-gray-600">Satın aldığınız tüm ürünlerde yaşam boyu garanti hizmeti</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-4">Kategorilerimizi Keşfedin</h2>
            <p className="text-lg text-gray-600">Her zevke uygun takı koleksiyonları</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden rounded-2xl mb-4">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                    <button className="gradient-gold-rose text-white px-6 py-3 rounded-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Koleksiyonu Gör
                    </button>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <span className="text-gray-500">{category.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-lg text-gray-600">En beğenilen ve trend takılarımız</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <button className="border-2 border-yellow-400 text-yellow-600 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 hover:text-white transition-all duration-200">
              Tüm Ürünleri Gör
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-rose-400">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-serif text-white mb-4">Yeni Koleksiyonlardan Haberdar Olun</h2>
              <p className="text-lg text-white/90">Özel kampanyalar ve yeni ürün duyuruları için e-posta listemize katılın</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="E-posta adresiniz..." 
                className="flex-1 px-6 py-4 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900 placeholder-gray-500"
              />
              <button className="bg-white text-yellow-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap">
                Abone Ol
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}