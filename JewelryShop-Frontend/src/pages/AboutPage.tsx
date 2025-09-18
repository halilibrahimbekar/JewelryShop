import { Instagram, Heart, Award, Shield } from 'lucide-react'
import mivoraLogo from '../assets/mivora.png'

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img 
                src={mivoraLogo} 
                alt="Mivora Logo" 
                className="h-16 w-16 object-contain rounded-xl"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text bg-gradient-to-r from-yellow-300 via-pink-300 to-white bg-clip-text text-transparent">
                Mivora
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-purple-100">
              Kadının zarafetini öne çıkaran özel tasarım mücevherler
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Hikayemiz
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Mivora, kadınların doğal güzelliğini ve zarafetini öne çıkaran özel tasarım mücevherler yaratma tutkusuyla doğdu. 
                Her parçamız, modern kadının dinamik yaşam tarzını desteklerken, zamansız şıklığı da yakalayan tasarımlara sahiptir.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Bileklik, küpe, yüzük ve kolye koleksiyonlarımızda, kaliteli malzemeler ve özenli işçilikle hazırlanmış 
                parçalar bulacaksınız. Her ürünümüz, size özel hissettirecek detaylarla tasarlanmıştır.
              </p>
              
              {/* Social Media */}
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">Bizi takip edin:</span>
                <a 
                  href="https://instagram.com/mivoraofficial_" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300"
                >
                  <Instagram className="h-5 w-5" />
                  <span>@mivoraofficial_</span>
                </a>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop"
                alt="Mivora Mücevherler"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Değerlerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Her detayda mükemmelliği hedeflerken, sizlere en iyisini sunmak için çalışıyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Tutku</h3>
              <p className="text-gray-600">
                Mücevher tasarımına olan tutkumuz, her parçada kendini gösterir. 
                Yaratıcılık ve estetik anlayışımızla size özel parçalar üretiyoruz.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Kalite</h3>
              <p className="text-gray-600">
                En yüksek kalitede malzemeler kullanarak, uzun yıllar kullanabileceğiniz 
                dayanıklı ve güzel mücevherler üretiyoruz.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Güven</h3>
              <p className="text-gray-600">
                Müşteri memnuniyeti bizim için en önemli değerdir. 
                Güvenilir hizmet ve kaliteli ürünlerle yanınızdayız.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      {/* <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Koleksiyonlarımız
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Her kadının tarzına uygun, özel tasarım mücevher koleksiyonları
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mb-4 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=200&h=200&fit=crop" 
                  alt="Bileklik"
                  className="w-24 h-24 object-cover rounded-xl"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Bileklik</h3>
              <p className="text-sm text-gray-600">Zarif ve modern tasarımlar</p>
            </div>

            <div className="text-center">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mb-4 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&h=200&fit=crop" 
                  alt="Küpe"
                  className="w-24 h-24 object-cover rounded-xl"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Küpe</h3>
              <p className="text-sm text-gray-600">Şık ve göz alıcı modeller</p>
            </div>

            <div className="text-center">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mb-4 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1603561596112-db542eeb2503?w=200&h=200&fit=crop" 
                  alt="Yüzük"
                  className="w-24 h-24 object-cover rounded-xl"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Yüzük</h3>
              <p className="text-sm text-gray-600">Özel anlar için tasarımlar</p>
            </div>

            <div className="text-center">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mb-4 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&h=200&fit=crop" 
                  alt="Kolye"
                  className="w-24 h-24 object-cover rounded-xl"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Kolye</h3>
              <p className="text-sm text-gray-600">Zamansız şıklık</p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}