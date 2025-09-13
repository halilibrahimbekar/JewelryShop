import React from 'react'
import type { Product } from '../pages/CatalogPage'

export default function ProductCard({ product }: { product: Product }) {
  const hasDiscount = product.discountPrice && product.discountPrice < product.price

  return (
    <div className="product-card">
      <div className="image-wrap">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <div className="placeholder">No Image</div>
        )}
      </div>
      <div className="info">
        <h3>{product.name}</h3>
        <p className="price">
          {hasDiscount ? (
            <>
              <span className="orig">${product.price.toFixed(2)}</span>
              <span className="disc"> ${product.discountPrice!.toFixed(2)}</span>
            </>
          ) : (
            <span>${product.price.toFixed(2)}</span>
          )}
        </p>
      </div>
    </div>
  )
}
