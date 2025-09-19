import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package, Eye, Truck, CheckCircle, Clock, ArrowRight } from 'lucide-react'

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl: string
}

export interface Order {
  id: string
  orderNumber: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: OrderItem[]
  trackingNumber?: string
  estimatedDelivery?: string
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'MV-2024-001',
    date: '2024-03-15T10:30:00Z',
    status: 'delivered',
    total: 8500,
    trackingNumber: 'TR123456789',
    items: [
      {
        id: '1',
        name: 'Altın Zincir Bileklik',
        price: 2500,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop'
      },
      {
        id: '4',
        name: 'Gül Altın Kolye',
        price: 3200,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop'
      }
    ]
  },
  {
    id: '2',
    orderNumber: 'MV-2024-002',
    date: '2024-03-20T14:15:00Z',
    status: 'shipped',
    total: 15000,
    trackingNumber: 'TR987654321',
    estimatedDelivery: '2024-03-25',
    items: [
      {
        id: '3',
        name: 'Pırlanta Tek Taş Yüzük',
        price: 15000,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1603561596112-db542eeb2503?w=400&h=400&fit=crop'
      }
    ]
  },
  {
    id: '3',
    orderNumber: 'MV-2024-003',
    date: '2024-03-22T09:45:00Z',
    status: 'processing',
    total: 1800,
    estimatedDelivery: '2024-03-28',
    items: [
      {
        id: '2',
        name: 'İnci Küpe Seti',
        price: 1800,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop'
      }
    ]
  }
]

interface OrderHistoryProps {
  className?: string
}

export default function OrderHistory({ className = '' }: OrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    // Simulate API call
    const fetchOrders = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      setOrders(mockOrders)
      setLoading(false)
    }

    fetchOrders()
  }, [])

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'cancelled':
        return <Clock className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Onay Bekliyor'
      case 'processing':
        return 'Hazırlanıyor'
      case 'shipped':
        return 'Kargoda'
      case 'delivered':
        return 'Teslim Edildi'
      case 'cancelled':
        return 'İptal Edildi'
      default:
        return 'Bilinmiyor'
    }
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price)
  }

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-6 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz siparişiniz yok</h3>
        <p className="text-gray-500 mb-6">İlk siparişinizi vermek için alışverişe başlayın</p>
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
        >
          <span>Alışverişe Başla</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="p-6">
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                <div className="mb-2 sm:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Sipariş #{order.orderNumber}
                  </h3>
                  <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="ml-2">{getStatusText(order.status)}</span>
                  </span>
                  <button
                    onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                    className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 font-medium"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Detay</span>
                  </button>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex -space-x-2">
                  {order.items.slice(0, 3).map((item, index) => (
                    <img
                      key={item.id}
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-12 w-12 rounded-lg border-2 border-white object-cover"
                      style={{ zIndex: 10 - index }}
                    />
                  ))}
                  {order.items.length > 3 && (
                    <div className="h-12 w-12 rounded-lg border-2 border-white bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">
                    {order.items.length} ürün
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatPrice(order.total)}
                  </p>
                </div>
              </div>

              {/* Tracking Info */}
              {order.trackingNumber && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Kargo Takip No</p>
                      <p className="text-lg font-mono text-gray-900">{order.trackingNumber}</p>
                    </div>
                    {order.estimatedDelivery && (
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-700">Tahmini Teslimat</p>
                        <p className="text-sm text-gray-900">
                          {new Date(order.estimatedDelivery).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Order Details (Expandable) */}
              {selectedOrder?.id === order.id && (
                <div className="border-t pt-4 mt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Sipariş Detayları</h4>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-16 w-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{item.name}</h5>
                          <p className="text-sm text-gray-500">Adet: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Toplam</span>
                      <span>{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}