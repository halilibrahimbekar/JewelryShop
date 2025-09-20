import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { CheckCircle, Package, MapPin, CreditCard, ArrowRight, Share2, Clock } from 'lucide-react'
import mivoraLogo from '../assets/mivora.png'

interface OrderSummary {
  orderNumber: string
  orderDate: string
  total: number
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
    imageUrl: string
  }>
  shippingAddress: {
    fullName: string
    address: string
    city: string
    district: string
    postalCode: string
  }
  paymentMethod: string
  estimatedDelivery: string
  trackingNumber?: string
}

export default function OrderConfirmationPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const orderNumber = searchParams.get('orderNumber')
  const [orderData, setOrderData] = useState<OrderSummary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch order details
    const fetchOrderData = async () => {
      if (!orderNumber) {
        navigate('/404')
        return
      }

      setLoading(true)
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock order data
      const mockOrder: OrderSummary = {
        orderNumber: orderNumber,
        orderDate: new Date().toISOString(),
        total: 8750,
        items: [
          {
            id: '1',
            name: 'Altın Zincir Bileklik',
            price: 2500,
            quantity: 1,
            imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop'
          },
          {
            id: '3',
            name: 'Pırlanta Tek Taş Yüzük',
            price: 6250,
            quantity: 1,
            imageUrl: 'https://images.unsplash.com/photo-1603561596112-db542eeb2503?w=100&h=100&fit=crop'
          }
        ],
        shippingAddress: {
          fullName: 'Ayşe Yılmaz',
          address: 'Kadıköy Mahallesi, Bağdat Caddesi No: 123 Daire: 4',
          city: 'İstanbul',
          district: 'Kadıköy',
          postalCode: '34710'
        },
        paymentMethod: 'Kredi Kartı (**** 1234)',
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('tr-TR'),
        trackingNumber: 'MV' + Math.random().toString(36).substr(2, 9).toUpperCase()
      }

      setOrderData(mockOrder)
      setLoading(false)
    }

    fetchOrderData()
  }, [orderNumber, navigate])

  const handleShareOrder = () => {
    const shareText = `Mivora'dan siparişim onaylandı! Sipariş No: ${orderData?.orderNumber}`
    if (navigator.share) {
      navigator.share({
        title: 'Mivora Sipariş Onayı',
        text: shareText,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(`${shareText} - ${window.location.href}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-200 mx-auto"></div>
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-600 border-t-transparent absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="text-purple-600 font-medium">Sipariş bilgileriniz yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sipariş Bulunamadı</h2>
          <Link to="/" className="btn-primary">Ana Sayfaya Dön</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Siparişiniz Onaylandı! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Teşekkür ederiz! Siparişiniz başarıyla alındı.
          </p>
          <p className="text-lg text-purple-600 font-semibold">
            Sipariş No: #{orderData.orderNumber}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Package className="h-5 w-5 mr-2 text-purple-600" />
                Sipariş Detayları
              </h3>
              
              <div className="space-y-4">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <p className="text-gray-600">Adet: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple-600">
                        ₺{(item.price * item.quantity).toLocaleString('tr-TR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Toplam:</span>
                  <span className="text-purple-600">₺{orderData.total.toLocaleString('tr-TR')}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-purple-600" />
                Teslimat Adresi
              </h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-semibold text-gray-900">{orderData.shippingAddress.fullName}</p>
                <p className="text-gray-600">{orderData.shippingAddress.address}</p>
                <p className="text-gray-600">
                  {orderData.shippingAddress.district}, {orderData.shippingAddress.city} {orderData.shippingAddress.postalCode}
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-purple-600" />
                Ödeme Yöntemi
              </h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-900 font-medium">{orderData.paymentMethod}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Status */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Sipariş Durumu</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-gray-900">Sipariş Onaylandı</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">Hazırlanıyor</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">Kargoda</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-600">Teslim Edildi</span>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Teslimat Bilgisi</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600">Tahmini Teslimat:</span>
                  <p className="font-semibold text-purple-600">{orderData.estimatedDelivery}</p>
                </div>
                {orderData.trackingNumber && (
                  <div>
                    <span className="text-gray-600">Takip Numarası:</span>
                    <p className="font-semibold text-gray-900">{orderData.trackingNumber}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                to="/profile"
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <Package className="h-4 w-4" />
                <span>Siparişlerimi Görüntüle</span>
              </Link>
              
              <button
                onClick={handleShareOrder}
                className="w-full btn-secondary flex items-center justify-center space-x-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Siparişi Paylaş</span>
              </button>
              
              <Link
                to="/products"
                className="w-full flex items-center justify-center space-x-2 text-purple-600 hover:text-purple-700 font-medium py-3 px-6 rounded-lg hover:bg-purple-50 transition-all duration-300"
              >
                <span>Alışverişe Devam Et</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Brand Section */}
        <div className="mt-12 text-center">
          <div className="flex justify-center mb-4">
            <img src={mivoraLogo} alt="Mivora" className="h-12 w-12 object-contain" />
          </div>
          <p className="text-gray-600">
            Mivora'yı tercih ettiğiniz için teşekkür ederiz. 
            <br />
            Sorularınız için <a href="mailto:info@mivora.com" className="text-purple-600 hover:underline">iletişime geçebilirsiniz</a>.
          </p>
        </div>
      </div>
    </div>
  )
}