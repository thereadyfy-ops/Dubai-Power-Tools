import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck } from 'lucide-react'
import { useCart } from '../context/CartContext'
import ProductImage from '../components/shared/ProductImage'
import { FREE_SHIPPING_THRESHOLD } from '../data/products'

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal } = useCart()
  const navigate = useNavigate()

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const progressPct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <ShoppingBag className="w-14 h-14 text-slate-300 mx-auto mb-4" strokeWidth={1} />
        <p className="text-2xl font-extrabold text-charcoal">Your cart is empty</p>
        <p className="text-slate-500 mt-1">Browse our catalog and add some tools to get started.</p>
        <Link to="/" className="inline-block mt-6 bg-amber hover:bg-amber-dark text-white font-bold px-6 py-3 rounded-lg transition-colors">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-extrabold text-charcoal mb-6">Your Cart ({items.length})</h1>

      {/* Free shipping progress */}
      <div className="bg-slate-panel rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-2">
          <Truck className="w-4 h-4 text-amber" />
          {remaining > 0 ? `Add ${remaining} AED more for free delivery` : "You've unlocked free delivery!"}
        </div>
        <div className="h-2 bg-white rounded-full overflow-hidden">
          <div className="h-full bg-amber transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_320px] gap-8">
        {/* Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-3">
              <Link to={`/product/${item.slug}`} className="shrink-0">
                <ProductImage imageKey={item.image} className="w-20 h-20 rounded-lg" />
              </Link>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-mono uppercase text-brass font-semibold">{item.brand}</p>
                <Link to={`/product/${item.slug}`} className="font-semibold text-charcoal text-sm hover:text-amber truncate block">
                  {item.name}
                </Link>
                <p className="text-sm font-bold text-charcoal mt-1">{item.price} AED</p>
              </div>
              <div className="flex items-center border border-slate-200 rounded-lg">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-slate-panel" aria-label="Decrease quantity">
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-slate-panel" aria-label="Increase quantity">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="w-20 text-right font-bold text-charcoal hidden sm:block">{item.price * item.quantity} AED</p>
              <button onClick={() => removeItem(item.id)} aria-label="Remove item" className="p-2 text-slate-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 h-fit sticky top-24">
          <p className="font-bold text-charcoal mb-4">Order Summary</p>
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span>Subtotal</span>
            <span className="font-semibold text-charcoal">{subtotal} AED</span>
          </div>
          <div className="flex justify-between text-sm text-slate-600 mb-4">
            <span>Delivery</span>
            <span className="font-semibold text-charcoal">{remaining > 0 ? 'Calculated at checkout' : 'Free'}</span>
          </div>
          <div className="border-t border-slate-200 pt-4 flex justify-between font-bold text-charcoal">
            <span>Estimated Total</span>
            <span>{subtotal} AED</span>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="mt-5 w-full flex items-center justify-center gap-2 bg-charcoal hover:bg-amber text-ice font-bold py-3 rounded-lg transition-colors"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
