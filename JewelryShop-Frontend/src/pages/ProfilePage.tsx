import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { User, Package, MapPin, Heart, LogOut, Edit, Save, X } from 'lucide-react'
import OrderHistory from '../components/OrderHistory'
import AddressManagement from '../components/AddressManagement'
import Favorites from '../components/Favorites'

interface UserProfile {
  id: string
  fullName: string
  email: string
  phone: string
  joinDate: string
  totalOrders: number
  totalSpent: number
}

export default function ProfilePage() {
  const { isAuth, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '1',
    fullName: 'Kullanıcı Adı',
    email: 'kullanici@example.com',
    phone: '+90 555 123 45 67',
    joinDate: '2024-01-15',
    totalOrders: 12,
    totalSpent: 45600
  })
  const [editedProfile, setEditedProfile] = useState<UserProfile>(userProfile)

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [isAuth, navigate])

  const handleEdit = () => {
    setIsEditing(true)
    setEditedProfile(userProfile)
  }

  const handleSave = () => {
    setUserProfile(editedProfile)
    setIsEditing(false)
    // TODO: API call to update profile
    console.log('Profile updated:', editedProfile)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedProfile(userProfile)
  }

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  if (!isAuth) {
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{userProfile.fullName}</h1>
                <p className="text-gray-600">{userProfile.email}</p>
                <p className="text-sm text-gray-500">Üye olduğu tarih: {formatDate(userProfile.joinDate)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                to="/products"
                className="btn-secondary px-4 py-2 text-sm"
              >
                Alışverişe Devam Et
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Çıkış Yap</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Toplam Sipariş</h3>
                <p className="text-2xl font-bold text-blue-600">{userProfile.totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold text-lg">₺</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Toplam Harcama</h3>
                <p className="text-2xl font-bold text-green-600">{formatPrice(userProfile.totalSpent)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Favori Ürünler</h3>
                <p className="text-2xl font-bold text-purple-600">8</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'profile'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <User className="h-4 w-4 inline mr-2" />
                Profil Bilgileri
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'orders'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Package className="h-4 w-4 inline mr-2" />
                Sipariş Geçmişi
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'addresses'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <MapPin className="h-4 w-4 inline mr-2" />
                Adreslerim
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'favorites'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Heart className="h-4 w-4 inline mr-2" />
                Favorilerim
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Profil Bilgileri</h2>
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Düzenle</span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <Save className="h-4 w-4" />
                        <span>Kaydet</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        <X className="h-4 w-4" />
                        <span>İptal</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ad Soyad
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{userProfile.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{userProfile.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{userProfile.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Üyelik Tarihi
                    </label>
                    <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-lg">{formatDate(userProfile.joinDate)}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Sipariş Geçmişi</h2>
                <OrderHistory />
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Adreslerim</h2>
                <AddressManagement />
              </div>
            )}

            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Favori Ürünlerim</h2>
                <Favorites />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}