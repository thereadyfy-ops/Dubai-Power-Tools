import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import ProductImage from './ProductImage'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(product.id)
  const discountPct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <div className="torque-tab group relative bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-panel transition-shadow duration-300">
      {product.badge && (
        <span className="absolute top-2 left-2 z-20 bg-charcoal text-ice text-[10px] font-bold tracking-wide uppercase px-2 py-1 rounded">
          {product.badge}
        </span>
      )}
      <button
        onClick={(e) => {
          e.preventDefault()
          toggleWishlist(product.id)
        }}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        className="absolute top-2 right-2 z-20 bg-white/90 backdrop-blur rounded-full p-1.5 hover:bg-white transition-colors"
      >
        <Heart className={`w-4 h-4 ${wishlisted ? 'fill-amber text-amber' : 'text-charcoal'}`} />
      </button>

      <Link to={`/product/${product.slug}`} className="block">
        <ProductImage imageKey={product.image} className="h-44 w-full" />
      </Link>

      <div className="p-4">
        <p className="text-[11px] font-mono uppercase tracking-wider text-brass font-semibold">{product.brand}</p>
        <Link to={`/product/${product.slug}`}>
          <h3 className="mt-1 text-sm font-semibold text-charcoal leading-snug line-clamp-2 hover:text-amber transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-1.5">
          <Star className="w-3.5 h-3.5 fill-brass text-brass" />
          <span className="text-xs text-slate-500">{product.rating} ({product.reviews})</span>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-charcoal">{product.price} <span className="text-xs font-semibold">AED</span></span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-slate-400 line-through">{product.originalPrice} AED</span>
          )}
          {discountPct > 0 && (
            <span className="text-[10px] font-bold text-amber-dark">-{discountPct}%</span>
          )}
        </div>

        <p className={`mt-1 text-[11px] font-medium ${product.inStock ? 'text-emerald-600' : 'text-red-500'}`}>
          {product.inStock ? 'In Stock · Ships from Dubai' : 'Out of Stock'}
        </p>

        <button
          disabled={!product.inStock}
          onClick={() => addItem(product, 1)}
          className="mt-3 w-full flex items-center justify-center gap-2 bg-charcoal disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-amber text-ice text-sm font-semibold py-2.5 rounded-lg transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  )
}
