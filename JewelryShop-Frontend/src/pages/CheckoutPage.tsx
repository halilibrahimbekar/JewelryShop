import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CreditCard, MapPin, User, Phone, Mail, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useFormValidation } from '../hooks/useFormValidation'
import { checkoutSchema, type CheckoutFormData } from '../schemas/validationSchemas'

export default function CheckoutPage() {
  const { items, getTotalPrice } = useCart()
  const [currentStep, setCurrentStep] = useState(1)

  const {
    values,
    errors,
    touched,
    handleInputChange,
    handleInputBlur,
    validateForm
  } = useFormValidation<CheckoutFormData>({
    schema: checkoutSchema,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardHolder: ''
    }
  })

  const validateCurrentStep = () => {
    const currentStepFields = getCurrentStepFields()
    const stepData: Partial<CheckoutFormData> = {}
    
    // Sadece mevcut adıma ait alanları al
    currentStepFields.forEach(field => {
      stepData[field] = values[field]
    })

    try {
      // Sadece mevcut adım için kısmi schema oluştur ve doğrula
      const stepSchema = checkoutSchema.pick(
        Object.fromEntries(currentStepFields.map(field => [field, true]))
      )
      stepSchema.parse(stepData)
      return true
    } catch (error) {
      return false
    }
  }

  const getCurrentStepFields = (): (keyof CheckoutFormData)[] => {
    switch (currentStep) {
      case 1:
        return ['firstName', 'lastName', 'email', 'phone']
      case 2:
        return ['address', 'city', 'postalCode']
      case 3:
        return ['cardHolder', 'cardNumber', 'expiryDate', 'cvv']
      default:
        return []
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (currentStep < 3) {
      // Sadece mevcut adımı doğrula
      if (validateCurrentStep()) {
        setCurrentStep(currentStep + 1)
      }
    } else {
      // Son adımda tüm formu doğrula
      const isValid = validateForm()
      if (!isValid) {
        console.log('Validation errors:', errors)
        return
      }
      
      // Final submission
      console.log('Order submitted:', values)
      alert('Siparişiniz başarıyla alındı!')
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return values.firstName && values.lastName && values.email && values.phone
      case 2:
        return values.address && values.city && values.postalCode
      case 3:
        return values.cardHolder && values.cardNumber && values.expiryDate && values.cvv
      default:
        return false
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 0L5 7h14m-9 6v6a1 1 0 102 0v-6m-3 0v6a1 1 0 102 0v-6"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">Sepetiniz Boş</h1>
            <p className="text-gray-600 mb-8">Ödeme yapmak için önce sepetinize ürün eklemelisiniz.</p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Alışverişe Başla</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-purple-600 bg-white hover:bg-purple-50 px-4 py-2 rounded-full border border-gray-200 hover:border-purple-200 transition-all duration-300 shadow-sm hover:shadow-md mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Alışverişe Devam Et</span>
          </Link>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Ödeme
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-6 h-fit">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sipariş Özeti</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Adet: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Ara Toplam</span>
                <span className="text-gray-900">{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Kargo</span>
                <span className="text-green-600">Ücretsiz</span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold text-gray-900 pt-2 border-t">
                <span>Toplam</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            {/* Step Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step <= currentStep 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step < currentStep ? <Check className="h-5 w-5" /> : step}
                    </div>
                    {step < 3 && (
                      <div className={`w-16 h-1 ml-4 ${
                        step < currentStep ? 'bg-purple-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-sm">
                <span className={currentStep >= 1 ? 'text-purple-600 font-medium' : 'text-gray-500'}>
                  Kişisel Bilgiler
                </span>
                <span className={currentStep >= 2 ? 'text-purple-600 font-medium' : 'text-gray-500'}>
                  Teslimat Adresi
                </span>
                <span className={currentStep >= 3 ? 'text-purple-600 font-medium' : 'text-gray-500'}>
                  Ödeme
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2 text-purple-600" />
                    Kişisel Bilgiler
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ad
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                          touched.firstName && errors.firstName 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-gray-300'
                        }`}
                      />
                      {touched.firstName && errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Soyad
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                          touched.lastName && errors.lastName 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-gray-300'
                        }`}
                      />
                      {touched.lastName && errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="h-4 w-4 inline mr-1" />
                        E-posta
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                          touched.email && errors.email 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-gray-300'
                        }`}
                      />
                      {touched.email && errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="h-4 w-4 inline mr-1" />
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
                </div>
              )}

              {/* Step 2: Address Information */}
              {currentStep === 2 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-purple-600" />
                    Teslimat Adresi
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adres
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={values.address}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
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
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment Information */}
              {currentStep === 3 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-purple-600" />
                    Ödeme Bilgileri
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kart Üzerindeki İsim
                      </label>
                      <input
                        type="text"
                        name="cardHolder"
                        value={values.cardHolder}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                          touched.cardHolder && errors.cardHolder 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-gray-300'
                        }`}
                      />
                      {touched.cardHolder && errors.cardHolder && (
                        <p className="mt-1 text-sm text-red-600">{errors.cardHolder}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kart Numarası
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={values.cardNumber}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        placeholder="1234 5678 9012 3456"
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                          touched.cardNumber && errors.cardNumber 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-gray-300'
                        }`}
                      />
                      {touched.cardNumber && errors.cardNumber && (
                        <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Son Kullanma Tarihi
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={values.expiryDate}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          placeholder="MM/YY"
                          required
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                            touched.expiryDate && errors.expiryDate 
                              ? 'border-red-500 bg-red-50' 
                              : 'border-gray-300'
                          }`}
                        />
                        {touched.expiryDate && errors.expiryDate && (
                          <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={values.cvv}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          placeholder="123"
                          required
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                            touched.cvv && errors.cvv 
                              ? 'border-red-500 bg-red-50' 
                              : 'border-gray-300'
                          }`}
                        />
                        {touched.cvv && errors.cvv && (
                          <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Geri</span>
                </button>

                <button
                  type="submit"
                  disabled={!isStepValid()}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isStepValid()
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transform hover:scale-105 shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span>
                    {currentStep === 3 ? `Siparişi Tamamla - ${formatPrice(getTotalPrice())}` : 'Devam Et'}
                  </span>
                  {currentStep < 3 && <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}