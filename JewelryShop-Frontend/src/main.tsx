import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-left"
      toastOptions={{
        duration: 3000,
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
          color: '#ffffff',
          borderRadius: '12px',
          padding: '12px 18px',
          fontWeight: '600',
          fontSize: '14px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(12px)',
          transform: 'translateY(0px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          maxWidth: '300px',
          minHeight: '48px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '80px',
        },
        success: {
          style: {
            background: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)',
            boxShadow: '0 20px 25px -5px rgba(16, 185, 129, 0.25), 0 10px 10px -5px rgba(16, 185, 129, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#10b981',
          },
        },
        error: {
          style: {
            background: 'linear-gradient(135deg, #f87171 0%, #ef4444 50%, #dc2626 100%)',
            boxShadow: '0 20px 25px -5px rgba(239, 68, 68, 0.25), 0 10px 10px -5px rgba(239, 68, 68, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#ef4444',
          },
        },
        loading: {
          style: {
            background: 'linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%)',
            boxShadow: '0 20px 25px -5px rgba(99, 102, 241, 0.25), 0 10px 10px -5px rgba(99, 102, 241, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#6366f1',
          },
        },
      }}
    />
  </StrictMode>,
)
