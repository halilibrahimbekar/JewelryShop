import { useState, useEffect } from 'react'
import { MapPin, Plus, Edit, Trash2, Home, Building, Star } from 'lucide-react'
import { useFormValidation } from '../hooks/useFormValidation'
import { addressSchema, type AddressFormData as AddressValidationData } from '../schemas/validationSchemas'

export interface Address {
  id: string
  title: string
  type: 'home' | 'work' | 'other'
  fullName: string
  phone: string
  address: string
  district: string
  city: string
  postalCode: string
  isDefault: boolean
}

const mockAddresses: Address[] = [
  {
    id: '1',
    title: 'Ev Adresim',
    type: 'home',
    fullName: 'Ayşe Yılmaz',
    phone: '+90 555 123 45 67',
    address: 'Atatürk Mahallesi, Cumhuriyet Caddesi No: 15 Daire: 3',
    district: 'Kadıköy',
    city: 'İstanbul',
    postalCode: '34710',
    isDefault: true
  },
  {
    id: '2',
    title: 'İş Adresim',
    type: 'work',
    fullName: 'Ayşe Yılmaz',
    phone: '+90 555 123 45 67',
    address: 'Levent Mahallesi, İş Merkezi Blok A Kat: 5 No: 12',
    district: 'Beşiktaş',
    city: 'İstanbul',
    postalCode: '34330',
    isDefault: false
  }
]

interface AddressManagementProps {
  className?: string
}

export default function AddressManagement({ className = '' }: AddressManagementProps) {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  const {
    values,
    errors,
    touched,
    handleInputChange,
    handleInputBlur,
    handleTextareaChange,
    handleTextareaBlur,
    validateForm,
    setValue,
    reset
  } = useFormValidation<AddressValidationData>({
    schema: addressSchema,
    initialValues: {
      title: '',
      fullName: '',
      phone: '',
      address: '',
      city: '',
      district: '',
      postalCode: ''
    }
  })

  useEffect(() => {
    // Simulate API call
    const fetchAddresses = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 800))
      setAddresses(mockAddresses)
      setLoading(false)
    }

    fetchAddresses()
  }, [])

  const handleAddNew = () => {
    setEditingAddress(null)
    reset()
    setShowForm(true)
  }

  const handleEdit = (address: Address) => {
    setEditingAddress(address)
    setValue('title', address.title)
    setValue('fullName', address.fullName)
    setValue('phone', address.phone)
    setValue('address', address.address)
    setValue('district', address.district)
    setValue('city', address.city)
    setValue('postalCode', address.postalCode)
    setShowForm(true)
  }

  const handleDelete = (addressId: string) => {
    if (window.confirm('Bu adresi silmek istediğinizden emin misiniz?')) {
      setAddresses(prev => prev.filter(addr => addr.id !== addressId))
      // TODO: API call to delete address
    }
  }

  const handleSetDefault = (addressId: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })))
    // TODO: API call to set default address
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const isValid = validateForm()
    if (!isValid) {
      console.log('Validation errors:', errors)
      return
    }
    
    if (editingAddress) {
      // Edit existing address
      setAddresses(prev => prev.map(addr => 
        addr.id === editingAddress.id 
          ? { 
            ...addr, 
            title: values.title,
            fullName: values.fullName,
            phone: values.phone,
            address: values.address,
            city: values.city,
            district: values.district,
            postalCode: values.postalCode
          }
          : addr
      ))
    } else {
      // Add new address
      const newAddress: Address = {
        id: Date.now().toString(),
        title: values.title,
        type: 'home', // Default type
        fullName: values.fullName,
        phone: values.phone,
        address: values.address,
        district: values.district,
        city: values.city,
        postalCode: values.postalCode,
        isDefault: addresses.length === 0 // First address is default
      }
      setAddresses(prev => [...prev, newAddress])
    }
    
    setShowForm(false)
    setEditingAddress(null)
    reset()
    // TODO: API call to save address
  }

  const getAddressTypeIcon = (type: Address['type']) => {
    switch (type) {
      case 'home':
        return <Home className="h-5 w-5 text-purple-600" />
      case 'work':
        return <Building className="h-5 w-5 text-blue-600" />
      default:
        return <MapPin className="h-5 w-5 text-gray-600" />
    }
  }

  const getAddressTypeText = (type: Address['type']) => {
    switch (type) {
      case 'home':
        return 'Ev'
      case 'work':
        return 'İş'
      default:
        return 'Diğer'
    }
  }

  if (loading) {
    return (
      <div className={className}>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                <div className="h-5 bg-gray-200 rounded w-32"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Add New Address Button */}
      <div className="mb-6">
        <button
          onClick={handleAddNew}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
        >
          <Plus className="h-5 w-5" />
          <span>Yeni Adres Ekle</span>
        </button>
      </div>

      {/* Address Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {editingAddress ? 'Adresi Düzenle' : 'Yeni Adres Ekle'}
              </h3>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adres Başlığı
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="Ev, İş, Diğer..."
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      touched.title && errors.title 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-300'
                    }`}
                  />
                  {touched.title && errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adres Tipi
                  </label>
                  <select
                    value="home"
                    onChange={() => {}} // Type is not in validation schema, using default
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="home">Ev</option>
                    <option value="work">İş</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ad Soyad
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={values.fullName}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                        touched.fullName && errors.fullName 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-300'
                      }`}
                    />
                    {touched.fullName && errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={values.phone}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                        touched.phone && errors.phone 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-300'
                      }`}
                    />
                    {touched.phone && errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adres
                  </label>
                  <textarea
                    name="address"
                    value={values.address}
                    onChange={handleTextareaChange}
                    onBlur={handleTextareaBlur}
                    rows={3}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-300 ${
                      touched.address && errors.address 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-300'
                    }`}
                  />
                  {touched.address && errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      İlçe
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={values.district}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                        touched.district && errors.district 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-300'
                      }`}
                    />
                    {touched.district && errors.district && (
                      <p className="mt-1 text-sm text-red-600">{errors.district}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Şehir
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={values.city}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                        touched.city && errors.city 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-300'
                      }`}
                    />
                    {touched.city && errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Posta Kodu
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={values.postalCode}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      touched.postalCode && errors.postalCode 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-300'
                    }`}
                  />
                  {touched.postalCode && errors.postalCode && (
                    <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>
                  )}
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-medium transition-all duration-300"
                  >
                    {editingAddress ? 'Güncelle' : 'Kaydet'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Address List */}
      {addresses.length === 0 ? (
        <div className="text-center py-12">
          <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz adresiniz yok</h3>
          <p className="text-gray-500 mb-6">Hızlı teslimat için adresinizi ekleyin</p>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getAddressTypeIcon(address.type)}
                    <div>
                      <h3 className="font-semibold text-gray-900">{address.title}</h3>
                      <span className="text-sm text-gray-500">{getAddressTypeText(address.type)}</span>
                    </div>
                    {address.isDefault && (
                      <span className="inline-flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-medium">
                        <Star className="h-3 w-3" />
                        <span>Varsayılan</span>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(address)}
                      className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <p className="font-medium text-gray-900">{address.fullName}</p>
                  <p>{address.phone}</p>
                  <p>{address.address}</p>
                  <p>{address.district}, {address.city} {address.postalCode}</p>
                </div>

                {!address.isDefault && (
                  <div className="mt-4 pt-4 border-t">
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                    >
                      Varsayılan Adres Yap
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}