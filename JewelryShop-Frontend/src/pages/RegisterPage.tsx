import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register as apiRegister } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import mivoraLogo from '../assets/mivora.png'
import { useFormValidation } from '../hooks/useFormValidation'
import { registerSchema, type RegisterFormData } from '../schemas/validationSchemas'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')
  
  const navigate = useNavigate()
  const { login } = useAuth()

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm
  } = useFormValidation<RegisterFormData>({
    schema: registerSchema,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    setApiError('')

    try {
      await apiRegister({ 
        email: values.email, 
        password: values.password, 
        fullName: `${values.firstName} ${values.lastName}` 
      })
      login()
      navigate('/')
    } catch (err: any) {
      setApiError(err.response?.data?.message || 'Kayıt başarısız')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-purple-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h3 className="text-4xl font-bold mb-4">Ailemize Katılın</h3>
            <p className="text-xl opacity-90">
              Özel indirimler ve yeni koleksiyonlardan ilk siz haberdar olun
            </p>
          </div>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          {/* Logo and Brand */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center space-x-4 mb-8">
              <img 
                src={mivoraLogo} 
                alt="Mivora Logo" 
                className="h-16 w-16 object-contain rounded-lg"
              />
              <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Mivora</span>
            </Link>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Hesap Oluşturun
            </h2>
            <p className="text-gray-600">
              Hemen üye olun ve özel fırsatları kaçırmayın
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Ad Soyad - İki ayrı alan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    Ad
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      className={`block w-full pl-10 pr-3 py-3 border rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                        touched.firstName && errors.firstName 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300'
                      }`}
                      placeholder="Adınız"
                      value={values.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      onBlur={() => handleBlur('firstName')}
                    />
                  </div>
                  {touched.firstName && errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Soyad
                  </label>
                  <div className="relative">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      className={`block w-full px-3 py-3 border rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                        touched.lastName && errors.lastName 
                          ? 'border-red-300 bg-red-50' 
                          : 'border-gray-300'
                      }`}
                      placeholder="Soyadınız"
                      value={values.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      onBlur={() => handleBlur('lastName')}
                    />
                  </div>
                  {touched.lastName && errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-posta
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                      touched.email && errors.email 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300'
                    }`}
                    placeholder="ornek@email.com"
                    value={values.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Şifre
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    className={`block w-full pl-10 pr-12 py-3 border rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                      touched.password && errors.password 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300'
                    }`}
                    placeholder="••••••••"
                    value={values.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    onBlur={() => handleBlur('password')}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
              
              {/* Şifre Onayı */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Şifre Onayı
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                      touched.confirmPassword && errors.confirmPassword 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-300'
                    }`}
                    placeholder="••••••••"
                    value={values.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    onBlur={() => handleBlur('confirmPassword')}
                  />
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {apiError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{apiError}</p>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading || !values.firstName || !values.lastName || !values.email || !values.password || !values.confirmPassword}
                className="btn-primary w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Hesap oluşturuluyor...
                  </div>
                ) : (
                  'Hesap Oluştur'
                )}
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Zaten hesabınız var mı?{' '}
                <Link
                  to="/login"
                  className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200"
                >
                  Giriş yapın
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}