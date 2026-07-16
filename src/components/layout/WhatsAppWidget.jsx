import { useState } from 'react'
import { MessageCircle, X, FileText } from 'lucide-react'

const WHATSAPP_NUMBER = '971500000000' // demo number — replace with real business line

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false)

  const waLink = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="bg-white rounded-xl shadow-panel border border-slate-200 p-4 w-64 mb-1">
          <p className="font-bold text-charcoal text-sm mb-1">Need help choosing?</p>
          <p className="text-xs text-slate-500 mb-3">Our team replies within minutes, 7 days a week.</p>
          <a
            href={waLink('Hi, I need help choosing the right tool for my project.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg px-3 py-2 mb-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
          </a>
          <a
            href={waLink('Hi, I would like to request a B2B quote for bulk tools.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-charcoal bg-slate-panel hover:bg-slate-200 rounded-lg px-3 py-2 transition-colors"
          >
            <FileText className="w-4 h-4" /> Request a Quote (B2B)
          </a>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open WhatsApp support"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-panel flex items-center justify-center text-white transition-colors"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  )
}
