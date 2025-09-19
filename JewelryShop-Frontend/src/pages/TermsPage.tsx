import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      {/* Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-purple-600 bg-white hover:bg-purple-50 px-4 py-2 rounded-full border border-gray-200 hover:border-purple-200 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Kullanım <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Koşulları</span>
            </h1>
            <p className="text-lg text-gray-600">
              Mivora hizmetlerini kullanırken geçerli olan şartlar ve koşullar
            </p>
            <div className="text-sm text-gray-500 mt-4">
              Son güncelleme: 20 Eylül 2025
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Genel Hükümler</h2>
              <p className="text-gray-700 mb-4">
                Bu kullanım koşulları, Mivora web sitesi ve hizmetlerinin kullanımını düzenler. 
                Sitemizi kullanarak bu koşulları kabul etmiş sayılırsınız.
              </p>
              <p className="text-gray-700">
                Mivora, takı ve mücevherat sektöründe kaliteli ürünler sunan bir e-ticaret platformudur. 
                Müşteri memnuniyeti ve güvenilirlik önceliklerimizdir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Hesap Oluşturma ve Güvenlik</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Hesap oluştururken doğru ve güncel bilgiler vermelisiniz</li>
                <li>Hesap güvenliğiniz sizin sorumluluğunuzdadır</li>
                <li>Şifrenizi kimseyle paylaşmamalısınız</li>
                <li>Hesabınızda yapılan tüm işlemlerden siz sorumlusunuz</li>
                <li>Şüpheli aktivite durumunda derhal bizimle iletişime geçiniz</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Ürün Bilgileri ve Fiyatlandırma</h2>
              <p className="text-gray-700 mb-4">
                Tüm ürün bilgileri, fiyatlar ve görseller mümkün olduğunca doğru şekilde sunulmaktadır. 
                Ancak teknik hatalar nedeniyle oluşabilecek yanlışlıklar için özür dileriz.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Fiyatlar KDV dahildir</li>
                <li>Ürün renkleri ekran ayarlarına göre değişiklik gösterebilir</li>
                <li>Stok durumu anlık olarak güncellenir</li>
                <li>Fiyat değişiklik hakkımız saklıdır</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Sipariş ve Ödeme</h2>
              <p className="text-gray-700 mb-4">
                Sipariş verdiğinizde, ürünlerin müsaitlik durumuna göre siparişiniz onaylanır veya iptal edilir.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Kredi kartı, banka kartı ve havale ile ödeme yapabilirsiniz</li>
                <li>Tüm ödemeler SSL güvenlik sertifikası ile korunur</li>
                <li>Sipariş onayından sonra ürün hazırlığına geçilir</li>
                <li>Stokta olmayan ürünler için bilgilendirilirsiniz</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Teslimat ve Kargo</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Teslimat süresi 1-3 iş günüdür</li>
                <li>Kargo ücreti sepet tutarına göre hesaplanır</li>
                <li>500 TL üzeri siparişlerde kargo ücretsizdir</li>
                <li>Adres bilgilerinin doğruluğu sizin sorumluluğunuzdadır</li>
                <li>Teslimat sırasında mutlaka kimlik kontrol edilir</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. İade ve Değişim</h2>
              <p className="text-gray-700 mb-4">
                Müşteri memnuniyeti önceliğimizdir. 14 gün içinde koşulsuz iade hakkınız bulunmaktadır.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Ürün orijinal ambalajında ve hasarsız olmalıdır</li>
                <li>Kişiye özel üretilen ürünler iade edilemez</li>
                <li>İade kargo ücreti müşteriye aittir</li>
                <li>Para iadesi 5-7 iş günü içinde yapılır</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Fikri Mülkiyet Hakları</h2>
              <p className="text-gray-700">
                Bu web sitesindeki tüm içerik, görseller, tasarımlar ve yazılımlar Mivora'nın 
                fikri mülkiyetindedir ve telif hakkı ile korunmaktadır. İzinsiz kullanımı yasaktır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Sorumluluk Sınırlaması</h2>
              <p className="text-gray-700">
                Mivora, hizmet kesintileri, teknik hatalar veya üçüncü taraf kaynaklı sorunlardan 
                doğabilecek zararlardan sorumlu tutulamaz. Kullanım kendi sorumluluğunuzdadır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Değişiklik Hakkı</h2>
              <p className="text-gray-700">
                Mivora, bu kullanım koşullarını önceden haber vermeksizin değiştirme hakkını saklı tutar. 
                Güncel koşullar her zaman web sitemizde yayınlanacaktır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. İletişim</h2>
              <p className="text-gray-700">
                Bu kullanım koşulları hakkında sorularınız için bizimle iletişime geçebilirsiniz:
              </p>
              <div className="bg-purple-50 rounded-lg p-4 mt-4">
                <p className="text-gray-700"><strong>E-posta:</strong> info@mivora.com</p>
                <p className="text-gray-700"><strong>Telefon:</strong> +90 212 555 0123</p>
                <p className="text-gray-700"><strong>Adres:</strong> Atatürk Mahallesi, Takı Sokak No:1, İstanbul</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}