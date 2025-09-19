import { z } from 'zod'

// Auth Schemas
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'E-posta adresi gereklidir')
    .email('Geçerli bir e-posta adresi giriniz'),
  password: z
    .string()
    .min(1, 'Şifre gereklidir')
    .min(6, 'Şifre en az 6 karakter olmalıdır')
})

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, 'Ad gereklidir')
    .min(2, 'Ad en az 2 karakter olmalıdır')
    .max(50, 'Ad en fazla 50 karakter olabilir'),
  lastName: z
    .string()
    .min(1, 'Soyad gereklidir')
    .min(2, 'Soyad en az 2 karakter olmalıdır')
    .max(50, 'Soyad en fazla 50 karakter olabilir'),
  email: z
    .string()
    .min(1, 'E-posta adresi gereklidir')
    .email('Geçerli bir e-posta adresi giriniz'),
  password: z
    .string()
    .min(1, 'Şifre gereklidir')
    .min(8, 'Şifre en az 8 karakter olmalıdır')
    .regex(/(?=.*[a-z])/, 'Şifre en az bir küçük harf içermelidir')
    .regex(/(?=.*[A-Z])/, 'Şifre en az bir büyük harf içermelidir')
    .regex(/(?=.*\d)/, 'Şifre en az bir rakam içermelidir'),
  confirmPassword: z
    .string()
    .min(1, 'Şifre onayı gereklidir')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword']
})

// Checkout Schema
export const checkoutSchema = z.object({
  // Personal Info
  firstName: z
    .string()
    .min(1, 'Ad gereklidir')
    .min(2, 'Ad en az 2 karakter olmalıdır'),
  lastName: z
    .string()
    .min(1, 'Soyad gereklidir')
    .min(2, 'Soyad en az 2 karakter olmalıdır'),
  email: z
    .string()
    .min(1, 'E-posta adresi gereklidir')
    .email('Geçerli bir e-posta adresi giriniz'),
  phone: z
    .string()
    .min(1, 'Telefon numarası gereklidir')
    .regex(/^(\+90|0)?[0-9]{10}$/, 'Geçerli bir telefon numarası giriniz'),
  
  // Address Info
  address: z
    .string()
    .min(1, 'Adres gereklidir')
    .min(10, 'Adres en az 10 karakter olmalıdır'),
  city: z
    .string()
    .min(1, 'Şehir gereklidir'),
  postalCode: z
    .string()
    .min(1, 'Posta kodu gereklidir')
    .regex(/^[0-9]{5}$/, 'Posta kodu 5 haneli olmalıdır'),
  
  // Payment Info
  cardNumber: z
    .string()
    .min(1, 'Kart numarası gereklidir')
    .regex(/^[0-9]{16}$/, 'Kart numarası 16 haneli olmalıdır'),
  expiryDate: z
    .string()
    .min(1, 'Son kullanma tarihi gereklidir')
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Geçerli bir tarih giriniz (MM/YY)'),
  cvv: z
    .string()
    .min(1, 'CVV gereklidir')
    .regex(/^[0-9]{3,4}$/, 'CVV 3 veya 4 haneli olmalıdır'),
  cardHolder: z
    .string()
    .min(1, 'Kart sahibi adı gereklidir')
    .min(2, 'Kart sahibi adı en az 2 karakter olmalıdır')
})

// Address Schema
export const addressSchema = z.object({
  title: z
    .string()
    .min(1, 'Adres başlığı gereklidir')
    .max(50, 'Adres başlığı en fazla 50 karakter olabilir'),
  fullName: z
    .string()
    .min(1, 'Ad Soyad gereklidir')
    .min(2, 'Ad Soyad en az 2 karakter olmalıdır'),
  phone: z
    .string()
    .min(1, 'Telefon numarası gereklidir')
    .regex(/^(\+90|0)?[0-9]{10}$/, 'Geçerli bir telefon numarası giriniz'),
  address: z
    .string()
    .min(1, 'Adres gereklidir')
    .min(10, 'Adres en az 10 karakter olmalıdır'),
  city: z
    .string()
    .min(1, 'Şehir gereklidir'),
  district: z
    .string()
    .min(1, 'İlçe gereklidir'),
  postalCode: z
    .string()
    .min(1, 'Posta kodu gereklidir')
    .regex(/^[0-9]{5}$/, 'Posta kodu 5 haneli olmalıdır')
})

// Profile Schema
export const profileSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Ad Soyad gereklidir')
    .min(2, 'Ad Soyad en az 2 karakter olmalıdır')
    .max(100, 'Ad Soyad en fazla 100 karakter olabilir'),
  email: z
    .string()
    .min(1, 'E-posta adresi gereklidir')
    .email('Geçerli bir e-posta adresi giriniz'),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^(\+90|0)?[0-9]{10}$/.test(val), {
      message: 'Geçerli bir telefon numarası giriniz'
    })
})

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type CheckoutFormData = z.infer<typeof checkoutSchema>
export type AddressFormData = z.infer<typeof addressSchema>
export type ProfileFormData = z.infer<typeof profileSchema>