import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'

export default function Cart() {
  const { state, updateQuantity, removeItem, closeCart } = useCart()

  const handleQuantityChange = (id: string, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change
    if (newQuantity <= 0) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  return (
    <>
      {/* Backdrop */}
      {state.isOpen && (
        <div 
          className={`fixed inset-0  transition-opacity duration-300 z-40 ${
            state.isOpen ? 'bg-opacity-50' : 'bg-opacity-0'
          }`}
          onClick={closeCart}
        />
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          state.isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6" />
            <span>Sepetim ({state.itemCount})</span>
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col flex-1 min-h-0">
          {state.items.length === 0 ? (
            /* Empty Cart */
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Sepetiniz boş
              </h3>
              <p className="text-gray-500 mb-6">
                Henüz sepetinize ürün eklemediniz. Alışverişe başlamak için ürünlerimizi inceleyin.
              </p>
              <Link
                to="/products"
                onClick={closeCart}
                className="btn-primary inline-flex items-center space-x-2"
              >
                <span>Alışverişe Başla</span>
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {state.items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-16 h-16 bg-white rounded-lg overflow-hidden">
                      <img
                        src={item.images[0] || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.category}
                        {item.size && (
                          <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                            {item.size}
                          </span>
                        )}
                      </p>
                      <p className="text-sm font-semibold text-purple-600 mt-1">
                        ₺{item.price.toLocaleString('tr-TR')}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 hover:bg-red-100 text-red-500 rounded transition-colors"
                        title="Sepetten Kaldır"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary - Sticky Bottom */}
              <div className="bg-white border-t shadow-lg flex-shrink-0">
                <div className="p-6 space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <span>Ara Toplam</span>
                    <span>₺{state.total.toLocaleString('tr-TR')}</span>
                  </div>
                  
                  {/* Shipping */}
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Kargo</span>
                    <span className="text-green-600 font-medium">Ücretsiz</span>
                  </div>
                  
                  {/* Total */}
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                    <span>Toplam</span>
                    <span>₺{state.total.toLocaleString('tr-TR')}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-2">
                    <Link
                      to="/checkout"
                      onClick={closeCart}
                      className="w-full btn-primary text-center py-3 text-lg mr-2"
                    >
                      Satın Al
                    </Link>
                    <Link
                      to="/products"
                      onClick={closeCart}
                      className="w-full btn-secondary text-center py-3"
                    >
                      Alışverişe Devam Et
                    </Link>
                  </div>

                  {/* Benefits */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>✓ Ücretsiz Kargo</span>
                      <span>✓ Güvenli Ödeme</span>
                      <span>✓ 30 Gün İade</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}