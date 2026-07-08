import { ExternalLink } from 'lucide-react'
import { paypalMeLink } from '../lib/payment'

export default function PayPalPanel({ handle, amount, instruction }) {
  const validAmount = Number.isFinite(Number(amount)) && Number(amount) > 0
  const link = paypalMeLink(handle, amount)

  return (
    <div className="bg-surface border border-gray-100 rounded-xl p-5">
      <p className="text-xs font-body font-semibold uppercase tracking-widest text-muted mb-2">
        Send with PayPal
      </p>
      <p className="font-display font-bold text-xl sm:text-2xl text-primary mb-4 break-all">
        paypal.me/{handle}
      </p>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-[#0070BA] text-white font-body font-semibold px-6 py-3 rounded-lg text-sm hover:bg-[#005EA6] cursor-pointer shadow-sm hover:shadow-md transition-all duration-200"
      >
        Pay with PayPal
        {validAmount && <span className="opacity-80">${Number(amount).toFixed(2)}</span>}
        <ExternalLink size={14} />
      </a>

      <p className="text-xs font-body text-muted leading-relaxed mt-4">{instruction}</p>
    </div>
  )
}
