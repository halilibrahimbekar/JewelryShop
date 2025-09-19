import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { fetchProducts, login, register } from '../services/api'
import type { Product } from '../services/api'
import ProductCard from '../components/ProductCard.tsx'
import { ArrowRight, X, Eye, EyeOff } from 'lucide-react'
import mivoraLogo from '../assets/mivora.png'
import { useAuth } from '../context/AuthContext'
import { useFormValidation } from '../hooks/useFormValidation'
import { loginSchema, registerSchema } from '../schemas/validationSchemas'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  
  const { login: authLogin } = useAuth()

  // Login form validation
  const {
    values: loginValues,
    errors: loginErrors,
    touched: loginTouched,
    handleInputChange: handleLoginInputChange,
    handleInputBlur: handleLoginInputBlur,
    validateForm: validateLogin,
    reset: resetLogin
  } = useFormValidation({
    schema: loginSchema,
    initialValues: { email: '', password: '' }
  })

  // Register form validation
  const {
    values: registerValues,
    errors: registerErrors,
    touched: registerTouched,
    handleInputChange: handleRegisterInputChange,
    handleInputBlur: handleRegisterInputBlur,
    validateForm: validateRegister,
    reset: resetRegister
  } = useFormValidation({
    schema: registerSchema,
    initialValues: { 
      firstName: '', 
      lastName: '', 
      email: '', 
      password: '', 
      confirmPassword: ''
    }
  })

  // Authentication handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateLogin()) return

    setAuthLoading(true)
    setAuthError('')

    try {
      const response = await login(loginValues)
      localStorage.setItem('auth-token', response.token)
      authLogin()
      setShowAuthModal(false)
      resetLogin()
    } catch (error: any) {
      setAuthError(error.response?.data?.message || 'Giriş yapılırken bir hata oluştu')
    } finally {
      setAuthLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateRegister()) return

    setAuthLoading(true)
    setAuthError('')

    try {
      await register(registerValues)
      setIsLoginMode(true)
      setAuthError('')
      resetRegister()
    } catch (error: any) {
      setAuthError(error.response?.data?.message || 'Kayıt olurken bir hata oluştu')
    } finally {
      setAuthLoading(false)
    }
  }

  const toggleAuthMode = () => {
    setIsLoginMode(!isLoginMode)
    setAuthError('')
    resetLogin()
    resetRegister()
  }

  const closeModal = () => {
    setShowAuthModal(false)
    setAuthError('')
    resetLogin()
    resetRegister()
    // Re-enable scroll
    document.body.style.overflow = 'unset'
  }

  // Effect to handle modal scroll lock
  useEffect(() => {
    if (showAuthModal) {
      // Disable scroll when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      // Re-enable scroll when modal is closed
      document.body.style.overflow = 'unset'
    }

    // Cleanup function to restore scroll on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showAuthModal])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts()
        setProducts(data.slice(0, 6)) // İlk 6 ürünü göster
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <div className={`min-h-screen transition-all duration-300 ${showAuthModal ? 'blur-sm' : ''}`}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white overflow-hidden w-full!important ">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative w-full px-4 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8 animate-fade-in">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl">
                <img 
                  src={mivoraLogo} 
                  alt="Mivora Logo" 
                  className="h-16 w-16 object-contain rounded-xl"
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Kadının
              <span className="block gradient-text bg-gradient-to-r from-yellow-300 via-pink-300 to-white bg-clip-text text-transparent">
                Zarafeti
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-purple-100 leading-relaxed">
              Bileklik, küpe, yüzük ve kolye koleksiyonlarımızla kadının güzelliğini öne çıkarın. Mivora ile tarzınızı tamamlayın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="btn-primary inline-flex items-center justify-center space-x-2 text-lg"
              >
                <span>Koleksiyonu Keşfet</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <button 
                onClick={() => setShowAuthModal(true)}
                className="btn-secondary inline-flex items-center justify-center space-x-2 text-lg bg-white/10 border-white/30 text-white hover:bg-white hover:text-purple-600"
              >
                <span>Giriş/Kayıt Ol</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="w-full px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Öne Çıkan <span className="gradient-text">Ürünler</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kadınlar için özel tasarlanmış bileklik, küpe, yüzük ve kolye koleksiyonlarımızı keşfedin
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-200"></div>
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-600 border-t-transparent absolute top-0"></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in h-full"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link
              to="/products"
              className="btn-primary inline-flex items-center space-x-2 text-lg"
            >
              <span>Tüm Ürünleri Gör</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      {/* <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="w-full px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Neden <span className="gradient-text">Mivora </span>?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Güvenli Alışveriş</h3>
                <p className="text-gray-600">256-bit SSL şifreleme ile güvenli ödeme sistemi</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Kaliteli Malzeme</h3>
                <p className="text-gray-600">925 ayar gümüş ve 14-18K altın garantisi</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Hızlı Kargo</h3>
                <p className="text-gray-600">24 saat içinde özel ambalajla kargoya teslim</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white rounded-2xl p-6 shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Müşteri Memnuniyeti</h3>
                <p className="text-gray-600">30 gün içinde koşulsuz iade garantisi</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Newsletter */}
      {/* <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Özel Kampanyalardan Haberdar Olun
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Yeni koleksiyonlar ve indirimlerden ilk siz haberdar olun
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Abone Ol
            </button>
          </div>
        </div>
      </section> */}
      
      {/* Auth Modal */}
      {showAuthModal && createPortal(
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal()
            }
          }}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {isLoginMode ? 'Giriş Yap' : 'Kayıt Ol'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {authError && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {authError}
                </div>
              )}

              {isLoginMode ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-posta Adresi
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={loginValues.email}
                      onChange={handleLoginInputChange}
                      onBlur={handleLoginInputBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        loginErrors.email && loginTouched.email
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-300'
                      }`}
                      placeholder="ornek@email.com"
                    />
                    {loginErrors.email && loginTouched.email && (
                      <p className="mt-1 text-sm text-red-600">{loginErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Şifre
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={loginValues.password}
                        onChange={handleLoginInputChange}
                        onBlur={handleLoginInputBlur}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10 ${
                          loginErrors.password && loginTouched.password
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300'
                        }`}
                        placeholder="Şifrenizi giriniz"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {loginErrors.password && loginTouched.password && (
                      <p className="mt-1 text-sm text-red-600">{loginErrors.password}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {authLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ad
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={registerValues.firstName}
                        onChange={handleRegisterInputChange}
                        onBlur={handleRegisterInputBlur}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          registerErrors.firstName && registerTouched.firstName
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300'
                        }`}
                        placeholder="Adınız"
                      />
                      {registerErrors.firstName && registerTouched.firstName && (
                        <p className="mt-1 text-sm text-red-600">{registerErrors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Soyad
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={registerValues.lastName}
                        onChange={handleRegisterInputChange}
                        onBlur={handleRegisterInputBlur}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          registerErrors.lastName && registerTouched.lastName
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300'
                        }`}
                        placeholder="Soyadınız"
                      />
                      {registerErrors.lastName && registerTouched.lastName && (
                        <p className="mt-1 text-sm text-red-600">{registerErrors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      E-posta Adresi
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={registerValues.email}
                      onChange={handleRegisterInputChange}
                      onBlur={handleRegisterInputBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        registerErrors.email && registerTouched.email
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-300'
                      }`}
                      placeholder="ornek@email.com"
                    />
                    {registerErrors.email && registerTouched.email && (
                      <p className="mt-1 text-sm text-red-600">{registerErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Şifre
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={registerValues.password}
                        onChange={handleRegisterInputChange}
                        onBlur={handleRegisterInputBlur}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10 ${
                          registerErrors.password && registerTouched.password
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300'
                        }`}
                        placeholder="Şifrenizi giriniz"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {registerErrors.password && registerTouched.password && (
                      <p className="mt-1 text-sm text-red-600">{registerErrors.password}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Şifre Onayı
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={registerValues.confirmPassword}
                      onChange={handleRegisterInputChange}
                      onBlur={handleRegisterInputBlur}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        registerErrors.confirmPassword && registerTouched.confirmPassword
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-300'
                      }`}
                      placeholder="Şifrenizi tekrar giriniz"
                    />
                    {registerErrors.confirmPassword && registerTouched.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">{registerErrors.confirmPassword}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {authLoading ? 'Kayıt olunuyor...' : 'Kayıt Ol'}
                  </button>
                </form>
              )}

              <div className="mt-6 text-center">
                <button
                  onClick={toggleAuthMode}
                  className="text-purple-600 hover:text-purple-700 transition-colors"
                >
                  {isLoginMode
                    ? 'Hesabınız yok mu? Kayıt olun'
                    : 'Zaten hesabınız var mı? Giriş yapın'}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}