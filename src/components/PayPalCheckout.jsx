import { useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

const CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'sb'

export default function PayPalCheckout({
  amount,
  description,
  disabled = false,
  disabledMessage = 'Complete required fields to enable checkout',
  onApprove,
  onCancel,
  onError,
}) {
  const [status, setStatus] = useState(null)
  const numericAmount = Number(amount)
  const validAmount = Number.isFinite(numericAmount) && numericAmount > 0

  if (disabled || !validAmount) {
    return (
      <div className="bg-surface border border-dashed border-gray-300 rounded-lg px-4 py-6 text-center">
        <p className="text-sm font-body text-muted">{disabledMessage}</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <PayPalScriptProvider options={{ 'client-id': CLIENT_ID, currency: 'USD', intent: 'capture' }}>
        <PayPalButtons
          style={{ layout: 'vertical', shape: 'rect', label: 'pay' }}
          forceReRender={[numericAmount, description]}
          createOrder={(_, actions) =>
            actions.order.create({
              purchase_units: [
                {
                  description,
                  amount: { value: numericAmount.toFixed(2), currency_code: 'USD' },
                },
              ],
            })
          }
          onApprove={async (_, actions) => {
            try {
              setStatus({ kind: 'processing' })
              const details = await actions.order.capture()
              await onApprove?.({ paypalOrderId: details.id, details })
              setStatus({ kind: 'success' })
            } catch (err) {
              setStatus({ kind: 'error', message: err?.message || 'Payment capture failed' })
            }
          }}
          onCancel={() => {
            setStatus({ kind: 'cancelled' })
            onCancel?.()
          }}
          onError={(err) => {
            setStatus({ kind: 'error', message: err?.message || 'PayPal error' })
            onError?.(err)
          }}
        />
      </PayPalScriptProvider>

      {status?.kind === 'processing' && (
        <p className="text-xs font-body text-muted text-center">Processing payment…</p>
      )}
      {status?.kind === 'cancelled' && (
        <p className="text-xs font-body text-muted text-center">Payment cancelled. You can try again.</p>
      )}
      {status?.kind === 'error' && (
        <p className="text-xs font-body text-accent text-center">Error: {status.message}</p>
      )}
    </div>
  )
}
