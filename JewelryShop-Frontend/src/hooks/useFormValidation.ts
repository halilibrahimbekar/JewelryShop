import { useState } from 'react'
import { z } from 'zod'

interface UseFormValidationProps<T> {
  schema: z.ZodSchema<T>
  initialValues: T
}

interface ValidationErrors {
  [key: string]: string | undefined
}

export function useFormValidation<T>({ schema, initialValues }: UseFormValidationProps<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})

  const validateField = (name: string) => {
    try {
      // Tüm formu validate et ama sadece o alanın hatasını al
      schema.parse(values)
      
      // Hata yoksa temizle
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
      
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.issues.find(issue => issue.path[0] === name)
        if (fieldError) {
          setErrors(prev => ({
            ...prev,
            [name]: fieldError.message
          }))
        } else {
          // Bu alan için hata yoksa temizle
          setErrors(prev => {
            const newErrors = { ...prev }
            delete newErrors[name]
            return newErrors
          })
        }
      }
      return false
    }
  }

  const validateForm = () => {
    try {
      schema.parse(values)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: ValidationErrors = {}
        error.issues.forEach((issue) => {
          const path = issue.path[0] as string
          newErrors[path] = issue.message
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const setValue = (name: string, value: any) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }))

    // Eğer alan daha önce dokunulduysa real-time validation yap
    if (touched[name]) {
      // Değeri güncelleyip hemen validate et
      const updatedValues = { ...values, [name]: value }
      try {
        schema.parse(updatedValues)
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors[name]
          return newErrors
        })
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldError = error.issues.find(issue => issue.path[0] === name)
          if (fieldError) {
            setErrors(prev => ({
              ...prev,
              [name]: fieldError.message
            }))
          }
        }
      }
    }
  }

  const setTouchedField = (name: string) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))
  }

  const handleBlur = (name: string) => {
    setTouchedField(name)
    validateField(name)
  }

  const handleChange = (name: string, value: any) => {
    setValue(name, value)
  }

  // Event wrapper functions for React inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    handleChange(name, value)
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    handleBlur(name)
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    handleChange(name, value)
  }

  const handleTextareaBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const { name } = e.target
    handleBlur(name)
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  const isValid = Object.keys(errors).length === 0
  const hasErrors = Object.keys(errors).length > 0

  return {
    values,
    errors,
    touched,
    isValid,
    hasErrors,
    validateForm,
    validateField,
    setValue,
    handleChange,
    handleBlur,
    handleInputChange,
    handleInputBlur,
    handleTextareaChange,
    handleTextareaBlur,
    reset
  }
}