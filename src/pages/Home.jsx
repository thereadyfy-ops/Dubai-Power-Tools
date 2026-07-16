import { Link } from 'react-router-dom'
import { Drill, Wrench, Wind, Construction, BatteryCharging, Truck, ShieldCheck, BadgeCheck, Headset, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react'
import { useRef } from 'react'
import { CATEGORIES, PRODUCTS } from '../data/products'
import ProductCard from '../components/shared/ProductCard'

const CATEGORY_ICONS = { Drill, BatteryCharging, Wind, Wrench, Construction }

export default function Home() {
  const scrollerRef = useRef(null)
  const bestSellers = PRODUCTS.filter((p) => p.badge).slice(0, 8)

  const scroll = (dir) => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' })
    }
  }

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-charcoal text-ice">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'repeating-linear-gradient(135deg, #F97316 0px, #F97316 2px, transparent 2px, transparent 24px)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber mb-4">Authorized Distributor · UAE-Wide Delivery</p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight">
              Professional-grade tools, <span className="text-amber">built for the job site.</span>
            </h1>
            <p className="mt-5 text-slate-300 max-w-md">
              Genuine Bosch, Makita, Dewalt & Wadfow equipment — trusted by contractors and
              tradesmen across Dubai, Abu Dhabi & every Emirate.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/category/power-tools"
                className="inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Explore Professional Range <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/971500000000?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20B2B%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/25 hover:border-amber hover:text-amber font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Contact B2B Sales
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {['orange-drill', 'blue-cordless-combi', 'orange-road-cutter', 'chrome-spanner-set'].map((key, i) => (
              <div
                key={key}
                className={`torque-tab rounded-xl overflow-hidden border border-white/10 ${i === 0 ? 'col-span-2 h-40' : 'h-32'}`}
              >
                <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(15,23,42,0.4))' }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <Drill className="w-10 h-10 text-amber/70" strokeWidth={1} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-charcoal">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.icon] || Drill
            return (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="torque-tab group bg-white border border-slate-200 rounded-xl p-5 flex flex-col items-center text-center gap-3 hover:border-amber hover:shadow-panel transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-slate-panel group-hover:bg-amber/10 flex items-center justify-center transition-colors">
                  <Icon className="w-7 h-7 text-charcoal group-hover:text-amber transition-colors" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-bold text-charcoal">{cat.name}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{cat.tagline}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* BEST SELLERS CAROUSEL */}
      <section className="bg-slate-panel py-14">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-extrabold text-charcoal">Best Sellers & Trending</h2>
            <div className="hidden sm:flex gap-2">
              <button onClick={() => scroll(-1)} className="p-2 bg-white border border-slate-200 rounded-full hover:border-amber" aria-label="Scroll left">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => scroll(1)} className="p-2 bg-white border border-slate-200 rounded-full hover:border-amber" aria-label="Scroll right">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div ref={scrollerRef} className="flex gap-4 overflow-x-auto scrollbar-thin pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {bestSellers.map((p) => (
              <div key={p.id} className="min-w-[240px] max-w-[240px] shrink-0">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-extrabold text-charcoal mb-8 text-center">Why Choose Dubai Power Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { Icon: Truck, title: 'Fast UAE Delivery', desc: 'Next-day delivery across all 7 Emirates' },
            { Icon: BadgeCheck, title: 'Authorized Distributor', desc: 'Official partner for leading global brands' },
            { Icon: ShieldCheck, title: 'Genuine Warranty', desc: 'Manufacturer-backed local warranty on every order' },
            { Icon: Headset, title: '24/7 Local Support', desc: 'Real people, real answers, day or night' },
          ].map(({ Icon, title, desc }) => (
            <div key={title} className="text-center p-5">
              <div className="w-12 h-12 mx-auto rounded-lg bg-charcoal flex items-center justify-center mb-3">
                <Icon className="w-6 h-6 text-amber" strokeWidth={1.5} />
              </div>
              <p className="font-bold text-charcoal text-sm">{title}</p>
              <p className="text-xs text-slate-500 mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
