import { Drill, Wrench, Wind, Construction, BatteryCharging, Hammer } from 'lucide-react'

// Since this is a demo build, real product photography is swapped for
// consistent gradient "swatches" + a representative icon. In production,
// replace `imageKey` lookups with real image URLs (e.g. product.imageUrl).
const SWATCHES = {
  'orange-drill': { from: '#F97316', to: '#0F172A', Icon: Drill },
  'blue-grinder': { from: '#0EA5E9', to: '#0F172A', Icon: Wrench },
  'yellow-cordless-drill': { from: '#F59E0B', to: '#1E293B', Icon: BatteryCharging },
  'red-combo-kit': { from: '#EF4444', to: '#1E293B', Icon: BatteryCharging },
  'gray-compressor': { from: '#64748B', to: '#0F172A', Icon: Wind },
  'silver-spray-gun': { from: '#94A3B8', to: '#1E293B', Icon: Wind },
  'chrome-spanner-set': { from: '#CBD5E1', to: '#334155', Icon: Wrench },
  'red-plier-set': { from: '#DC2626', to: '#1E293B', Icon: Wrench },
  'orange-road-cutter': { from: '#F97316', to: '#1E293B', Icon: Construction },
  'gray-vibrator': { from: '#475569', to: '#0F172A', Icon: Construction },
  'blue-cordless-combi': { from: '#2563EB', to: '#0F172A', Icon: BatteryCharging },
  'teal-circular-saw': { from: '#0D9488', to: '#0F172A', Icon: Hammer },
}

export default function ProductImage({ imageKey, className = '' }) {
  const swatch = SWATCHES[imageKey] || { from: '#F97316', to: '#0F172A', Icon: Drill }
  const { from, to, Icon } = swatch
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <Icon className="w-1/3 h-1/3 text-white/90" strokeWidth={1.25} />
    </div>
  )
}
