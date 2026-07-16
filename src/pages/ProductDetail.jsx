import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart, Minus, Plus, ShoppingCart, MessageCircle, ShieldCheck, Star, ChevronRight } from 'lucide-react'
import { getProductBySlug, getRelatedProducts, AED_VAT_RATE } from '../data/products'
import ProductImage from '../components/shared/ProductImage'
import ProductCard from '../components/shared/ProductCard'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const WHATSAPP_NUMBER = '971500000000'
const TABS = ['Technical Specifications', 'Description & Features', 'Included Accessories']

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const { addItem } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState(0)
  const [activeThumb, setActiveThumb] = useState(0)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <p className="text-2xl font-extrabold text-charcoal">Product not found</p>
        <Link to="/" className="text-amber font-semibold mt-3 inline-block">Return to Home</Link>
      </div>
    )
  }

  const related = getRelatedProducts(product)
  const vat = Math.round(product.price * AED_VAT_RATE * 100) / 100
  const wishlisted = isWishlisted(product.id)

  const handleAddToCart = () => {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const waMessage = `Hi, I'd like to order: ${product.name} (${product.brand}, SKU: ${product.sku}) — Qty: ${qty}`
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <Link to="/" className="hover:text-amber">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/category/${product.category}`} className="hover:text-amber capitalize">{product.category.replace('-', ' ')}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-charcoal font-medium truncate">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Gallery */}
        <div>
          <div className="torque-tab rounded-xl overflow-hidden border border-slate-200">
            <ProductImage imageKey={product.image} className="h-80 md:h-[420px] w-full" />
          </div>
          <div className="flex gap-2 mt-3">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setActiveThumb(i)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${activeThumb === i ? 'border-amber' : 'border-slate-200'}`}
              >
                <ProductImage imageKey={product.image} className="w-full h-full" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-brass font-semibold">{product.brand} · Origin: {product.origin}</p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-charcoal mt-1">{product.name}</h1>

          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-brass text-brass" />
              <span className="text-sm text-slate-600">{product.rating} ({product.reviews} reviews)</span>
            </div>
            <span className="text-slate-300">|</span>
            <span className="text-xs text-slate-500 font-mono">SKU: {product.sku}</span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-charcoal">{product.price} <span className="text-base font-bold">AED</span></span>
            {product.originalPrice > product.price && (
              <span className="text-lg text-slate-400 line-through">{product.originalPrice} AED</span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">VAT Included (5%) · approx. {vat} AED</p>

          <p className={`mt-3 inline-flex items-center gap-1.5 text-sm font-semibold ${product.inStock ? 'text-emerald-600' : 'text-red-500'}`}>
            <span className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-red-500'}`} />
            {product.inStock ? 'In Stock — Ships from Dubai' : 'Out of Stock'}
          </p>

          {/* Quantity + actions */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center border border-slate-200 rounded-lg">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2.5 hover:bg-slate-panel" aria-label="Decrease quantity">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-2.5 hover:bg-slate-panel" aria-label="Increase quantity">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              disabled={!product.inStock}
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-charcoal disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-amber text-ice font-bold py-3 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-4 h-4" /> {added ? 'Added!' : 'Add to Cart'}
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
              className="p-3 border border-slate-200 rounded-lg hover:border-amber"
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-amber text-amber' : 'text-charcoal'}`} />
            </button>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Direct WhatsApp Order
          </a>

          <div className="mt-5 flex items-center gap-2 text-xs text-slate-500 bg-slate-panel rounded-lg p-3">
            <ShieldCheck className="w-4 h-4 text-brass shrink-0" />
            Genuine manufacturer warranty · {product.specs.Warranty || 'Local coverage'}
          </div>

          {/* Tabs */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <div className="flex gap-4 border-b border-slate-200 overflow-x-auto">
              {TABS.map((t, i) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(i)}
                  className={`pb-3 text-sm font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors ${
                    activeTab === i ? 'border-amber text-amber' : 'border-transparent text-slate-500 hover:text-charcoal'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="pt-5">
              {activeTab === 0 && (
                <dl className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="text-slate-500">{k}</dt>
                      <dd className="font-semibold text-charcoal">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {activeTab === 1 && (
                <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                  {product.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
              )}
              {activeTab === 2 && (
                <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                  {product.accessories.map((a) => <li key={a}>{a}</li>)}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-extrabold text-charcoal mb-5">You Might Also Need</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
