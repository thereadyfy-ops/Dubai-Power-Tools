import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Banknote, CheckCircle2, MapPin } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { EMIRATES, AED_VAT_RATE, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from '../data/products'

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [placed, setPlaced] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '+971 ',
    emirate: 'Dubai',
    address: '',
  })

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE
  const vat = Math.round(subtotal * AED_VAT_RATE * 100) / 100
  const total = Math.round((subtotal + shipping + vat) * 100) / 100

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    setPlaced(true)
    clearCart()
  }

  if (placed) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" strokeWidth={1.25} />
        <h1 className="text-2xl font-extrabold text-charcoal">Order Placed Successfully!</h1>
        <p className="text-slate-500 mt-2">
          Thank you, {form.fullName || 'valued customer'}. A confirmation has been sent to {form.email || 'your email'}.
          Payment method: {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Card Payment'}.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-amber hover:bg-amber-dark text-white font-bold px-6 py-3 rounded-lg transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <p className="text-xl font-extrabold text-charcoal">Nothing to check out yet</p>
        <p className="text-slate-500 mt-2">Add products to your cart before checking out.</p>
        <button onClick={() => navigate('/')} className="mt-6 bg-amber hover:bg-amber-dark text-white font-bold px-6 py-3 rounded-lg">
          Go Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-extrabold text-charcoal mb-6">Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="grid md:grid-cols-[1fr_340px] gap-8">
        <div className="space-y-6">
          {/* Shipping details */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-bold text-charcoal mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber" /> Shipping Details
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-500">Full Name</label>
                <input
                  required
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber"
                  placeholder="Ahmed Al Maktoum"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">Phone Number</label>
                <input
                  required
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber font-mono"
                  placeholder="+971 5X XXX XXXX"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500">Emirate</label>
                <select
                  name="emirate"
                  value={form.emirate}
                  onChange={handleChange}
                  className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber"
                >
                  {EMIRATES.map((em) => <option key={em} value={em}>{em}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-500">Area / Street / Villa / Building</label>
                <textarea
                  required
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={2}
                  className="mt-1 w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber"
                  placeholder="Al Barsha 1, Street 12, Villa 7"
                />
              </div>
            </div>
          </div>

          {/* Payment method */}
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <p className="font-bold text-charcoal mb-4">Payment Method</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`flex items-center gap-3 border-2 rounded-lg p-4 text-left transition-colors ${
                  paymentMethod === 'cod' ? 'border-amber bg-amber/5' : 'border-slate-200'
                }`}
              >
                <Banknote className="w-6 h-6 text-charcoal" />
                <div>
                  <p className="text-sm font-bold text-charcoal">Cash on Delivery</p>
                  <p className="text-xs text-slate-500">Pay when your order arrives</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex items-center gap-3 border-2 rounded-lg p-4 text-left transition-colors ${
                  paymentMethod === 'card' ? 'border-amber bg-amber/5' : 'border-slate-200'
                }`}
              >
                <CreditCard className="w-6 h-6 text-charcoal" />
                <div>
                  <p className="text-sm font-bold text-charcoal">Online Card Payment</p>
                  <p className="text-xs text-slate-500">Visa, Mastercard, Tabby, Tamara</p>
                </div>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="mt-4 grid sm:grid-cols-2 gap-4 bg-slate-panel rounded-lg p-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-500">Card Number</label>
                  <input disabled placeholder="4242 4242 4242 4242" className="mt-1 w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500">Expiry</label>
                  <input disabled placeholder="MM/YY" className="mt-1 w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500">CVC</label>
                  <input disabled placeholder="•••" className="mt-1 w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono" />
                </div>
                <p className="sm:col-span-2 text-[11px] text-slate-400">Payment gateway mockup for demo purposes — integrate a real UAE PSP (e.g. Telr, Network International, Tabby, Tamara) in production.</p>
              </div>
            )}
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 h-fit sticky top-24">
          <p className="font-bold text-charcoal mb-4">Order Summary</p>
          <div className="space-y-2 mb-4 max-h-40 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-slate-600 truncate pr-2">{item.name} × {item.quantity}</span>
                <span className="font-semibold text-charcoal shrink-0">{item.price * item.quantity} AED</span>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-200 pt-3 space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span><span className="font-semibold text-charcoal">{subtotal} AED</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span><span className="font-semibold text-charcoal">{shipping === 0 ? 'Free' : `${shipping} AED`}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>VAT (5%)</span><span className="font-semibold text-charcoal">{vat} AED</span>
            </div>
          </div>
          <div className="border-t border-slate-200 mt-3 pt-3 flex justify-between font-extrabold text-charcoal text-lg">
            <span>Total</span><span>{total} AED</span>
          </div>
          <button type="submit" className="mt-5 w-full bg-amber hover:bg-amber-dark text-white font-bold py-3 rounded-lg transition-colors">
            Place Order
          </button>
        </div>
      </form>
    </div>
  )
}
