import { useState, useEffect } from 'react'
import { Truck } from 'lucide-react'

const MESSAGES = [
  'Free Delivery across UAE on orders over 500 AED',
  '100% Genuine Brands · Authorized Distributor',
  'Pay with Tabby or Tamara — 4 interest-free installments',
]

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % MESSAGES.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="bg-charcoal text-ice text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-center">
        <Truck className="w-4 h-4 text-amber shrink-0" />
        <span key={index} className="truncate">{MESSAGES[index]}</span>
      </div>
    </div>
  )
}
