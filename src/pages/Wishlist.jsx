import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { PRODUCTS } from '../data/products'
import ProductCard from '../components/shared/ProductCard'

export default function Wishlist() {
  const { ids } = useWishlist()
  const wishlisted = PRODUCTS.filter((p) => ids.includes(p.id))

  if (wishlisted.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <Heart className="w-14 h-14 text-slate-300 mx-auto mb-4" strokeWidth={1} />
        <p className="text-2xl font-extrabold text-charcoal">Your wishlist is empty</p>
        <p className="text-slate-500 mt-1">Tap the heart icon on any product to save it here.</p>
        <Link to="/" className="inline-block mt-6 bg-amber hover:bg-amber-dark text-white font-bold px-6 py-3 rounded-lg transition-colors">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-extrabold text-charcoal mb-6">Your Wishlist ({wishlisted.length})</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
        {wishlisted.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
