import React from 'react'
import CatalogPage from './pages/CatalogPage'
import Header from './components/Header'

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <CatalogPage />
      </main>
    </div>
  )
}
