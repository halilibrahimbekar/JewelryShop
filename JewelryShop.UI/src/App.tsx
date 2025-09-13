import React from 'react'
import CatalogPage from './pages/CatalogPage'

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Jewelry Shop</h1>
      </header>
      <main>
        <CatalogPage />
      </main>
    </div>
  )
}
