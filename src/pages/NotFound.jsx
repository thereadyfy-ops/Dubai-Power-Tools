import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <p className="font-mono text-6xl font-extrabold text-slate-200">404</p>
      <h1 className="text-2xl font-extrabold text-charcoal mt-2">Page not found</h1>
      <p className="text-slate-500 mt-2">The page you're looking for doesn't exist or has moved.</p>
      <Link to="/" className="inline-block mt-6 bg-amber hover:bg-amber-dark text-white font-bold px-6 py-3 rounded-lg transition-colors">
        Back to Home
      </Link>
    </div>
  )
}
