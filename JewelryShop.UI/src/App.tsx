import React from 'react'
import HomePage from './pages/HomePage'
import Header from './components/Header'

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <HomePage />
      </main>
    </div>
  )
}
