import { useState } from 'react'
import { ExternalLink, QrCode } from 'lucide-react'
import { CASHTAG, CASHAPP_QR_URL, cashAppLink } from '../lib/payment'

export default function CashAppPanel({ amount, instruction }) {
  const [qrFailed, setQrFailed] = useState(false)
  const validAmount = Number.isFinite(Number(amount)) && Number(amount) > 0
  const link = cashAppLink(amount)

  return (
    <div className="bg-surface border border-gray-100 rounded-xl p-5">
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-body font-semibold uppercase tracking-widest text-muted mb-2">
            Send to
          </p>
          <p className="font-display font-bold text-2xl text-primary mb-4 break-all">
            ${CASHTAG}
          </p>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!validAmount}
            onClick={(e) => !validAmount && e.preventDefault()}
            className={`inline-flex items-center justify-center gap-2 bg-[#00D632] text-white font-body font-semibold px-6 py-3 rounded-lg text-sm transition-all duration-200 ${
              validAmount
                ? 'hover:bg-[#00B92C] cursor-pointer shadow-sm hover:shadow-md'
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            Pay with Cash App
            {validAmount && <span className="opacity-80">${Number(amount).toFixed(2)}</span>}
            <ExternalLink size={14} />
          </a>

          <p className="text-xs font-body text-muted leading-relaxed mt-4">{instruction}</p>
        </div>

        <div className="shrink-0">
          <p className="text-xs font-body font-semibold uppercase tracking-widest text-muted mb-2 sm:text-right">
            Or scan
          </p>
          <div className="w-32 h-32 rounded-lg bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
            {qrFailed ? (
              <div className="text-center px-2">
                <QrCode size={28} className="text-muted mx-auto mb-1" />
                <p className="text-[10px] font-body text-muted leading-tight">
                  Add QR at<br />
                  <code className="text-primary">public/cashapp_qr.png</code>
                </p>
              </div>
            ) : (
              <img
                src={CASHAPP_QR_URL}
                alt={`Cash App QR code for $${CASHTAG}`}
                className="w-full h-full object-contain"
                onError={() => setQrFailed(true)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
