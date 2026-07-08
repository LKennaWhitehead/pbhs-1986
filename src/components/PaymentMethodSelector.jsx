import { DollarSign, Send, Wallet } from 'lucide-react'

const ICONS = {
  cashapp: DollarSign,
  zelle: Send,
  paypal: Wallet,
}

export default function PaymentMethodSelector({ methods, value, onChange }) {
  return (
    <div>
      <p className="block text-xs font-body font-semibold uppercase tracking-widest text-muted mb-3">
        Payment method
      </p>
      <div
        role="tablist"
        aria-label="Payment method"
        className={`grid grid-cols-${methods.length} gap-2 p-1 bg-surface rounded-xl border border-gray-100`}
        style={{ gridTemplateColumns: `repeat(${methods.length}, minmax(0, 1fr))` }}
      >
        {methods.map(({ id, label }) => {
          const Icon = ICONS[id] || DollarSign
          const active = value === id
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(id)}
              className={`inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-body text-sm font-semibold transition-all duration-150 cursor-pointer ${
                active
                  ? 'bg-white text-primary shadow-sm border border-gray-200'
                  : 'text-muted hover:text-primary'
              }`}
            >
              <Icon size={16} className={active ? 'text-accent' : ''} />
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
