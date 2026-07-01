import { useState } from 'react'
import { Copy, Check, Mail, Info } from 'lucide-react'
import { ZELLE_CONTACT, zelleIsEmail } from '../lib/payment'

export default function ZellePanel({ instruction }) {
  const [copied, setCopied] = useState(false)

  async function copyContact() {
    try {
      await navigator.clipboard.writeText(ZELLE_CONTACT)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard blocked — user can still select the text manually
    }
  }

  return (
    <div className="bg-surface border border-gray-100 rounded-xl p-5">
      <p className="text-xs font-body font-semibold uppercase tracking-widest text-muted mb-2">
        Send to
      </p>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <p className="font-display font-bold text-xl sm:text-2xl text-primary break-all">
          {ZELLE_CONTACT}
        </p>
        <button
          type="button"
          onClick={copyContact}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-gray-200 text-primary font-body text-xs font-semibold hover:border-accent transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check size={13} className="text-accent" /> Copied
            </>
          ) : (
            <>
              <Copy size={13} /> Copy
            </>
          )}
        </button>
      </div>

      {zelleIsEmail && (
        <div className="mb-4">
          <a
            href={`mailto:${ZELLE_CONTACT}`}
            className="inline-flex items-center gap-2 bg-[#6D1ED4] text-white font-body font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-[#5A18B0] transition-colors cursor-pointer shadow-sm"
          >
            <Mail size={15} /> Open email to {ZELLE_CONTACT}
          </a>
          <div className="flex items-start gap-2 mt-2">
            <Info size={12} className="text-muted shrink-0 mt-0.5" />
            <p className="text-[11px] font-body text-muted leading-snug">
              This opens your mail app for convenience — it does <strong>not</strong> send the payment. Start the Zelle transfer inside your banking or Zelle app.
            </p>
          </div>
        </div>
      )}

      <p className="text-xs font-body text-muted leading-relaxed">{instruction}</p>
    </div>
  )
}
