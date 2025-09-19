import { ArrowLeft, Shield, Lock, Eye, Database } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PrivacyPage() {
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
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-4">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Gizlilik <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Politikası</span>
            </h1>
            <p className="text-lg text-gray-600">
              Kişisel verilerinizin korunması ve işlenmesi hakkında detaylı bilgiler
            </p>
            <div className="text-sm text-gray-500 mt-4">
              Son güncelleme: 20 Eylül 2025
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Database className="h-6 w-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">1. Veri Sorumlusu ve İletişim</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Kişisel verilerinizin işlenmesinden sorumlu olan veri sorumlusu Mivora'dır.
              </p>
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">İletişim Bilgileri:</h3>
                <p className="text-gray-700"><strong>Şirket:</strong> Mivora Takı ve Mücevherat Ltd. Şti.</p>
                <p className="text-gray-700"><strong>E-posta:</strong> kvkk@mivora.com</p>
                <p className="text-gray-700"><strong>Telefon:</strong> +90 212 555 0123</p>
                <p className="text-gray-700"><strong>Adres:</strong> Atatürk Mahallesi, Takı Sokak No:1, Beşiktaş/İstanbul</p>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Eye className="h-6 w-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">2. Hangi Kişisel Verileri Topluyoruz?</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Hizmetlerimizi sunabilmek için aşağıdaki kişisel verilerinizi işliyoruz:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Kimlik Bilgileri</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Ad, soyad</li>
                    <li>• E-posta adresi</li>
                    <li>• Telefon numarası</li>
                    <li>• Doğum tarihi (isteğe bağlı)</li>
                  </ul>
                </div>
                
                <div className="border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">İletişim Bilgileri</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Teslimat adresi</li>
                    <li>• Fatura adresi</li>
                    <li>• İl, ilçe bilgileri</li>
                    <li>• Posta kodu</li>
                  </ul>
                </div>
                
                <div className="border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Alışveriş Bilgileri</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Sipariş geçmişi</li>
                    <li>• Ödeme tercihleri</li>
                    <li>• Sepet içeriği</li>
                    <li>• Favori ürünler</li>
                  </ul>
                </div>
                
                <div className="border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Teknik Bilgiler</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• IP adresi</li>
                    <li>• Tarayıcı bilgileri</li>
                    <li>• Çerez verileri</li>
                    <li>• Site kullanım istatistikleri</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center mb-4">
                <Lock className="h-6 w-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-semibold text-gray-900">3. Kişisel Verilerin İşlenme Amaçları</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Kişisel verilerinizi aşağıdaki amaçlarla işliyoruz:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Hesap oluşturma ve kullanıcı kimlik doğrulaması</li>
                <li>Sipariş işlemlerinin gerçekleştirilmesi</li>
                <li>Ödeme işlemlerinin güvenli şekilde yapılması</li>
                <li>Ürün teslimatının sağlanması</li>
                <li>Müşteri hizmetleri ve destek sağlanması</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>Site performansının iyileştirilmesi</li>
                <li>Pazarlama ve promosyon faaliyetleri (onay dahilinde)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Kişisel Verilerin İşlenme Hukuki Dayanakları</h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <ul className="text-gray-700 space-y-3">
                  <li><strong>Sözleşmenin İfası:</strong> Alışveriş sözleşmesinin yerine getirilmesi</li>
                  <li><strong>Hukuki Yükümlülük:</strong> Yasal zorunlulukların karşılanması</li>
                  <li><strong>Meşru Menfaat:</strong> İş operasyonlarının yürütülmesi</li>
                  <li><strong>Açık Rıza:</strong> Pazarlama iletişimi için verilen onay</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Veri Paylaşımı ve Aktarımı</h2>
              <p className="text-gray-700 mb-4">
                Kişisel verileriniz aşağıdaki durumlarda üçüncü taraflarla paylaşılabilir:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Kargo şirketleri (teslimat için)</li>
                <li>Ödeme hizmet sağlayıcıları (güvenli ödeme için)</li>
                <li>Hukuki makamlar (yasal zorunluluk halinde)</li>
                <li>İş ortakları (hizmet sağlama amacıyla)</li>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-gray-700">
                  <strong>Önemli:</strong> Verileriniz hiçbir zaman ticari amaçlarla üçüncü taraflara satılmaz!
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Veri Güvenliği</h2>
              <p className="text-gray-700 mb-4">
                Kişisel verilerinizin güvenliği için aşağıdaki önlemleri alıyoruz:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Teknik Önlemler</h3>
                  <ul className="text-green-700 space-y-1">
                    <li>• SSL şifreleme</li>
                    <li>• Güvenlik duvarları</li>
                    <li>• Düzenli güvenlik taramaları</li>
                    <li>• Veri yedekleme</li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">İdari Önlemler</h3>
                  <ul className="text-blue-700 space-y-1">
                    <li>• Erişim kontrolü</li>
                    <li>• Personel eğitimleri</li>
                    <li>• Gizlilik sözleşmeleri</li>
                    <li>• Düzenli denetimler</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Çerezler (Cookies)</h2>
              <p className="text-gray-700 mb-4">
                Web sitemizde kullanıcı deneyimini iyileştirmek için çerezler kullanıyoruz:
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Zorunlu Çerezler</h3>
                  <p className="text-gray-700">Site işlevselliği için gerekli, devre dışı bırakılamaz.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Analitik Çerezler</h3>
                  <p className="text-gray-700">Site kullanımını analiz etmek için kullanılır.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Pazarlama Çerezleri</h3>
                  <p className="text-gray-700">Kişiselleştirilmiş reklamlar için kullanılır.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Haklarınız</h2>
              <p className="text-gray-700 mb-4">
                KVKK kapsamında sahip olduğunuz haklar:
              </p>
              <div className="bg-purple-50 rounded-lg p-6">
                <ul className="text-gray-700 space-y-3">
                  <li><strong>Bilgi Alma Hakkı:</strong> Verilerinizin işlenip işlenmediğini öğrenme</li>
                  <li><strong>Erişim Hakkı:</strong> İşlenen verileriniz hakkında bilgi talep etme</li>
                  <li><strong>Düzeltme Hakkı:</strong> Yanlış verilerin düzeltilmesini isteme</li>
                  <li><strong>Silme Hakkı:</strong> Verilerinizin silinmesini talep etme</li>
                  <li><strong>İtiraz Hakkı:</strong> Veri işlemeye itiraz etme</li>
                  <li><strong>Taşınabilirlik Hakkı:</strong> Verilerinizi başka bir hizmete aktarma</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Veri Saklama Süreleri</h2>
              <p className="text-gray-700 mb-4">
                Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca saklanır:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Hesap verileri: Hesap aktif olduğu sürece</li>
                <li>Sipariş bilgileri: 10 yıl (yasal zorunluluk)</li>
                <li>İletişim kayıtları: 3 yıl</li>
                <li>Pazarlama verileri: Rıza geri alınana kadar</li>
                <li>Çerez verileri: 12 ay</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Başvuru ve İletişim</h2>
              <p className="text-gray-700 mb-4">
                KVKK haklarınızı kullanmak için bizimle iletişime geçebilirsiniz:
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Başvuru Yöntemleri:</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>E-posta:</strong> kvkk@mivora.com</p>
                  <p><strong>Posta:</strong> Atatürk Mah. Takı Sok. No:1 Beşiktaş/İstanbul</p>
                  <p><strong>Online Form:</strong> Web sitemizden başvuru formu</p>
                </div>
                <div className="mt-4 p-4 bg-white rounded-lg border border-purple-200">
                  <p className="text-sm text-gray-600">
                    <strong>Not:</strong> Başvurularınız en geç 30 gün içinde cevaplanacaktır.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Politika Güncellemeleri</h2>
              <p className="text-gray-700">
                Bu gizlilik politikası gerektiğinde güncellenebilir. Önemli değişiklikler 
                hakkında e-posta veya site bildirimi ile bilgilendirileceksiniz. 
                Güncel politika her zaman web sitemizde yayınlanacaktır.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}