import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
          color: '#ffffff',
          borderRadius: '12px',
          padding: '16px 24px',
          fontWeight: '500',
          fontSize: '14px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(8px)',
        },
        success: {
          style: {
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#10b981',
          },
        },
        error: {
          style: {
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#ef4444',
          },
        },
        loading: {
          style: {
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
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
