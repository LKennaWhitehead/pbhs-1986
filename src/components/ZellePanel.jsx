import { useState } from 'react'
import { Copy, Check, Mail, Info } from 'lucide-react'
import { isEmail } from '../lib/payment'

export default function ZellePanel({ contact, recipientName, instruction }) {
  const [copied, setCopied] = useState(false)
  const contactIsEmail = isEmail(contact)

  async function copyContact() {
    try {
      await navigator.clipboard.writeText(contact)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard blocked — user can still select the text manually
    }
  }

  return (
    <div className="bg-surface border border-gray-100 rounded-xl p-5">
      <p className="text-xs font-body font-semibold uppercase tracking-widest text-muted mb-2">
        Send Zelle to
      </p>

      {recipientName && (
        <p className="font-display font-semibold text-lg text-primary leading-tight mb-1">
          {recipientName}
        </p>
      )}

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <p className="font-display font-bold text-xl sm:text-2xl text-primary break-all">
          {contact}
        </p>
        <button
          type="button"
          onClick={copyContact}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-accent text-white border border-accent font-body text-xs font-semibold hover:bg-accent-dark transition-colors cursor-pointer shadow-sm"
        >
          {copied ? (
            <>
              <Check size={13} /> Copied
            </>
          ) : (
            <>
              <Copy size={13} /> Copy {contactIsEmail ? 'email' : 'number'}
            </>
          )}
        </button>
      </div>

      {contactIsEmail && (
        <div className="mb-4">
          <a
            href={`mailto:${contact}`}
            className="inline-flex items-center gap-2 bg-[#6D1ED4] text-white font-body font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-[#5A18B0] transition-colors cursor-pointer shadow-sm"
          >
            <Mail size={15} /> Open email to {contact}
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
