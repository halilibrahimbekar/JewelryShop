import React, { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="app-header">
      <div className="header-inner">
        <button
          className={`hamburger ${open ? 'is-open' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setOpen((s) => !s)}
        >
          <span />
          <span />
          <span />
        </button>

        <h1 className="brand">Jewelry Shop</h1>

        <nav className={`nav ${open ? 'open' : ''}`} aria-hidden={!open}>
          <a href="#">Katalog</a>
          <a href="#">Hakkımızda</a>
          <a href="#">İletişim</a>
        </nav>
      </div>
    </header>
  )
}
