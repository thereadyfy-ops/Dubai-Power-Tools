import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Zap, MapPin, Mail, CheckCircle2 } from 'lucide-react'
import { EMIRATES, CATEGORIES } from '../../data/products'

export default function Footer() {
  const [emirate, setEmirate] = useState('Dubai')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  return (
    <footer className="bg-charcoal text-ice mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand + emirate */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded bg-amber flex items-center justify-center">
              <Zap className="w-5 h-5 text-charcoal" strokeWidth={2.5} />
            </div>
            <p className="font-extrabold tracking-tight">DUBAI POWER TOOLS</p>
          </div>
          <p className="text-sm text-slate-300 max-w-sm">
            Authorized distributor of Bosch, Makita, Dewalt, Wadfow & more — genuine warranty,
            fast delivery across all seven Emirates, and 24/7 local support.
          </p>

          <div className="mt-5">
            <label className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mb-1.5">
              <MapPin className="w-3.5 h-3.5" /> Delivering to
            </label>
            <select
              value={emirate}
              onChange={(e) => setEmirate(e.target.value)}
              className="bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-sm w-full max-w-[220px] outline-none focus:ring-2 focus:ring-amber"
            >
              {EMIRATES.map((em) => (
                <option key={em} value={em} className="text-charcoal">{em}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Shop links */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-brass mb-3">Shop</p>
          <ul className="space-y-2 text-sm text-slate-300">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link to={`/category/${c.slug}`} className="hover:text-amber transition-colors">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support links */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-brass mb-3">Support</p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><Link to="/cart" className="hover:text-amber transition-colors">Track My Order</Link></li>
            <li><Link to="/" className="hover:text-amber transition-colors">Warranty & Returns</Link></li>
            <li><Link to="/" className="hover:text-amber transition-colors">Shipping Policy</Link></li>
            <li><Link to="/" className="hover:text-amber transition-colors">B2B / Bulk Orders</Link></li>
          </ul>
          <p className="text-xs font-bold uppercase tracking-wider text-brass mt-5 mb-3">Legal</p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><Link to="/" className="hover:text-amber transition-colors">Terms of Service</Link></li>
            <li><Link to="/" className="hover:text-amber transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-brass mb-3">Get 10% Off</p>
          <p className="text-sm text-slate-300 mb-3">Subscribe for exclusive deals & new arrivals.</p>
          {subscribed ? (
            <p className="flex items-center gap-2 text-sm text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" /> You're on the list!
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="w-full bg-white/10 border border-white/15 rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber"
                />
              </div>
              <button type="submit" className="bg-amber hover:bg-amber-dark text-white text-sm font-bold py-2 rounded-lg transition-colors">
                Subscribe & Save 10%
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Payment partners */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} Dubai Power Tools LLC. All rights reserved.</p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {['Visa', 'Mastercard', 'Tabby', 'Tamara', 'Cash on Delivery'].map((p) => (
              <span key={p} className="text-[11px] font-mono bg-white/10 border border-white/15 rounded px-2 py-1 text-slate-200">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
