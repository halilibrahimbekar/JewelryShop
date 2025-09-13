import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../services/api'
import ProductCard from '../components/ProductCard'

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  imageUrl?: string
  discountPrice?: number
}

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="catalog">
      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <div className="grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
