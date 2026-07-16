import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Heart, ShoppingCart, Menu, X, ChevronDown, Zap } from 'lucide-react'
import { CATEGORIES } from '../../data/products'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useSearch } from '../../context/SearchContext'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const { itemCount } = useCart()
  const { count: wishCount } = useWishlist()
  const { query, setQuery, results } = useSearch()
  const navigate = useNavigate()
  const searchRef = useRef(null)

  useEffect(() => {
    const onClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchFocused(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      setSearchFocused(false)
      navigate(`/category/power-tools?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <header className="sticky top-0 z-30 bg-ice/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded bg-charcoal flex items-center justify-center">
              <Zap className="w-5 h-5 text-amber" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <p className="font-extrabold text-charcoal text-sm tracking-tight">DUBAI POWER TOOLS</p>
              <p className="text-[9px] font-mono uppercase tracking-widest text-brass">Industrial · UAE</p>
            </div>
          </Link>

          {/* Mega-menu trigger (desktop) */}
          <div
            className="relative hidden lg:block"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-semibold text-charcoal hover:text-amber px-3 py-2">
              Categories <ChevronDown className="w-4 h-4" />
            </button>
            {megaOpen && (
              <div className="absolute top-full left-0 bg-white rounded-xl shadow-panel border border-slate-200 p-2 w-72 grid grid-cols-1 gap-1">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/category/${c.slug}`}
                    className="flex flex-col px-3 py-2 rounded-lg hover:bg-slate-panel transition-colors"
                  >
                    <span className="text-sm font-semibold text-charcoal">{c.name}</span>
                    <span className="text-xs text-slate-500">{c.tagline}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Search bar (desktop) */}
          <div className="relative flex-1 max-w-md hidden md:block" ref={searchRef}>
            <form onSubmit={handleSubmit}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                type="text"
                placeholder="Search drills, brands, categories..."
                className="w-full bg-slate-panel rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber"
              />
            </form>
            {searchFocused && results.length > 0 && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-white rounded-xl shadow-panel border border-slate-200 overflow-hidden">
                {results.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.slug}`}
                    onClick={() => setSearchFocused(false)}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-panel text-sm"
                  >
                    <span className="text-charcoal font-medium truncate">{p.name}</span>
                    <span className="text-brass font-bold ml-2 shrink-0">{p.price} AED</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 ml-auto">
            <Link to="/wishlist" className="relative p-2 hover:text-amber" aria-label="Wishlist">
              <Heart className="w-5 h-5" />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-amber text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative p-2 hover:text-amber" aria-label="Cart">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-amber text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button className="lg:hidden p-2" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search tools, brands..."
              className="w-full bg-slate-panel rounded-lg pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber"
            />
          </form>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to={`/category/${c.slug}`}
                onClick={() => setMobileOpen(false)}
                className="px-2 py-2.5 text-sm font-semibold text-charcoal hover:text-amber border-b border-slate-100 last:border-0"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
