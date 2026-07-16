import { useState, useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { getCategoryBySlug, getProductsByCategory, PRODUCTS, BRANDS } from '../data/products'
import ProductCard from '../components/shared/ProductCard'

const POWER_SOURCES = ['Corded', 'Cordless', 'Pneumatic']

export default function Category() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q')?.toLowerCase() || ''

  const category = getCategoryBySlug(slug)
  const baseProducts = q ? PRODUCTS : getProductsByCategory(slug)

  const [maxPrice, setMaxPrice] = useState(3000)
  const [selectedBrands, setSelectedBrands] = useState([])
  const [availability, setAvailability] = useState('all')
  const [powerSources, setPowerSources] = useState([])
  const [sortBy, setSortBy] = useState('popularity')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const toggleBrand = (b) => setSelectedBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]))
  const togglePower = (p) => setPowerSources((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]))

  const filtered = useMemo(() => {
    let list = baseProducts.filter((p) => p.price <= maxPrice)
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
    if (selectedBrands.length) list = list.filter((p) => selectedBrands.includes(p.brand))
    if (availability !== 'all') list = list.filter((p) => (availability === 'in' ? p.inStock : !p.inStock))
    if (powerSources.length) list = list.filter((p) => powerSources.includes(p.powerSource))

    const sorted = [...list]
    if (sortBy === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    else if (sortBy === 'newest') sorted.sort((a, b) => (a.badge === 'New Arrival' ? -1 : 1))
    else sorted.sort((a, b) => b.reviews - a.reviews)
    return sorted
  }, [baseProducts, maxPrice, selectedBrands, availability, powerSources, sortBy, q])

  const FiltersPanel = () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold text-charcoal mb-3">Price Range (AED)</p>
        <input
          type="range"
          min="50"
          max="3000"
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>50 AED</span>
          <span className="font-semibold text-charcoal">Up to {maxPrice} AED</span>
        </div>
      </div>

      <div>
        <p className="text-sm font-bold text-charcoal mb-3">Brand</p>
        <div className="space-y-2">
          {BRANDS.map((b) => (
            <label key={b} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} className="accent-amber w-4 h-4" />
              {b}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-bold text-charcoal mb-3">Availability</p>
        <div className="space-y-2">
          {[{ v: 'all', l: 'All' }, { v: 'in', l: 'In Stock' }, { v: 'out', l: 'Out of Stock' }].map((o) => (
            <label key={o.v} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input type="radio" name="availability" checked={availability === o.v} onChange={() => setAvailability(o.v)} className="accent-amber w-4 h-4" />
              {o.l}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-bold text-charcoal mb-3">Power Source</p>
        <div className="space-y-2">
          {POWER_SOURCES.map((p) => (
            <label key={p} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input type="checkbox" checked={powerSources.includes(p)} onChange={() => togglePower(p)} className="accent-amber w-4 h-4" />
              {p}
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6">
        <p className="text-xs font-mono uppercase tracking-widest text-brass">{q ? 'Search Results' : 'Catalog'}</p>
        <h1 className="text-3xl font-extrabold text-charcoal">
          {q ? `Results for "${q}"` : category ? category.name : 'Products'}
        </h1>
        {category && <p className="text-slate-500 mt-1">{category.tagline}</p>}
      </div>

      <div className="grid md:grid-cols-[240px_1fr] gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden md:block bg-white border border-slate-200 rounded-xl p-5 h-fit sticky top-24">
          <FiltersPanel />
        </aside>

        <div>
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={() => setFiltersOpen(true)}
              className="md:hidden flex items-center gap-2 text-sm font-semibold border border-slate-200 rounded-lg px-3 py-2"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <p className="text-sm text-slate-500">{filtered.length} products</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber"
            >
              <option value="popularity">Sort: Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white border border-slate-200 rounded-xl">
              <p className="font-bold text-charcoal">No products match those filters</p>
              <p className="text-sm text-slate-500 mt-1">Try widening your price range or clearing a filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-charcoal/50" onClick={() => setFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85%] bg-white p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <p className="font-bold text-charcoal">Filters</p>
              <button onClick={() => setFiltersOpen(false)} aria-label="Close filters"><X className="w-5 h-5" /></button>
            </div>
            <FiltersPanel />
          </div>
        </div>
      )}
    </div>
  )
}
