import { useMemo, useState } from 'react'
import { Shirt, Check, AlertTriangle } from 'lucide-react'
import ContactForm, { contactFormValid } from '../components/ContactForm'
import PaymentMethodSelector from '../components/PaymentMethodSelector'
import CashAppPanel from '../components/CashAppPanel'
import ZellePanel from '../components/ZellePanel'
import { STORE_PAYMENT } from '../lib/payment'
import { submitNetlifyForm } from '../lib/netlifyForm'
import zebraBg from '../assets/zebra_print_background.jpg'
import zebraHeader from '../assets/zebra_header.png'

const SHIRT = {
  name: 'PBHS ’86 Reunion T-Shirt',
  description:
    'Commemorative 40th anniversary tee — soft cotton blend, zebra-print accent, and the Class of ’86 mark on the back. Limited run for reunion weekend.',
}
const SIZES = [
  { size: 'S', price: 25 },
  { size: 'M', price: 25 },
  { size: 'L', price: 25 },
  { size: 'XL', price: 25 },
  { size: 'XXL', price: 30 },
  { size: '3XL', price: 30 },
]
const priceFor = (s) => SIZES.find((x) => x.size === s)?.price ?? 25

const STORE_METHODS = [
  { id: 'cashapp', label: 'Cash App' },
  { id: 'zelle', label: 'Zelle' },
]

export default function Store() {
  const [size, setSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('cashapp')
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [confirmation, setConfirmation] = useState(null)

  const unitPrice = priceFor(size)
  const total = useMemo(() => unitPrice * quantity, [unitPrice, quantity])
  const formReady = contactFormValid(contact)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!formReady || submitting) return
    setSubmitting(true)
    setSubmitError(null)

    const order = {
      name: contact.name.trim(),
      email: contact.email.trim(),
      phone: contact.phone.trim(),
      size,
      quantity,
      amount: total,
      paymentMethod,
    }

    try {
      await submitNetlifyForm('tshirt-orders', order)
      setConfirmation(order)
    } catch (err) {
      setSubmitError(err?.message || 'Could not submit your order. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (confirmation) return <Confirmation order={confirmation} />

  return (
    <div className="pt-16">
      <Header />

      <section
        className="relative py-16"
        style={{ backgroundImage: `url(${zebraBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-cream/93" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-8">

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-primary to-charcoal flex items-center justify-center">
                <div className="text-center text-white/80 p-8">
                  <Shirt size={72} className="mx-auto mb-4 text-accent" />
                  <p className="font-display font-bold text-2xl">PBHS '86</p>
                  <p className="font-body text-xs uppercase tracking-widest text-white/60 mt-1">
                    40th Reunion Tee
                  </p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs font-body font-semibold uppercase tracking-widest text-accent mb-1">
                  Limited Edition
                </p>
                <h2 className="font-display font-bold text-xl text-primary mb-2">{SHIRT.name}</h2>
                <p className="font-body text-sm text-muted leading-relaxed">{SHIRT.description}</p>
                <div className="mt-4 space-y-0.5">
                  <p className="font-display font-bold text-2xl text-primary">$25 – $30</p>
                  <p className="text-xs font-body text-muted">$25 for S–XL · $30 for XXL & 3XL</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 sm:p-8"
            >
              <h3 className="font-display font-bold text-2xl text-primary mb-1">Order details</h3>
              <p className="font-body text-sm text-muted mb-6">
                Pick a size and quantity, send payment, then submit the confirmation below.
              </p>

              <div className="mb-5">
                <p className="block text-xs font-body font-semibold uppercase tracking-widest text-muted mb-3">
                  Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map(({ size: s, price }) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`min-w-[3rem] px-4 py-2.5 rounded-lg border font-body text-sm font-semibold transition-all duration-150 cursor-pointer flex flex-col items-center leading-tight ${
                        size === s
                          ? 'bg-accent text-white border-accent shadow-sm'
                          : 'bg-white text-primary border-gray-200 hover:border-accent'
                      }`}
                    >
                      <span>{s}</span>
                      <span className={`text-[10px] font-body font-medium ${size === s ? 'text-white/80' : 'text-muted'}`}>
                        ${price}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="qty" className="block text-xs font-body font-semibold uppercase tracking-widest text-muted mb-3">
                  Quantity
                </label>
                <div className="inline-flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-2.5 text-primary hover:bg-surface transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <input
                    id="qty"
                    type="number"
                    min={1}
                    max={20}
                    value={quantity}
                    onChange={(e) => {
                      const n = parseInt(e.target.value, 10)
                      setQuantity(Number.isFinite(n) && n > 0 ? Math.min(20, n) : 1)
                    }}
                    className="w-14 py-2.5 text-center font-body text-sm font-semibold text-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                    className="px-4 py-2.5 text-primary hover:bg-surface transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-baseline justify-between border-t border-gray-100 pt-5 mb-6">
                <span className="font-body text-sm text-muted">Total</span>
                <span className="font-display font-bold text-2xl text-primary">${total.toFixed(2)}</span>
              </div>

              <div className="mb-5">
                <PaymentMethodSelector
                  methods={STORE_METHODS}
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                />
              </div>

              <div className="mb-6">
                {paymentMethod === 'cashapp' ? (
                  <CashAppPanel
                    cashtag={STORE_PAYMENT.cashtag}
                    qrUrl={STORE_PAYMENT.qrUrl}
                    amount={total}
                    instruction="After sending payment, complete the form below to confirm your order."
                  />
                ) : (
                  <ZellePanel
                    recipientName={STORE_PAYMENT.zelle.recipientName}
                    contact={STORE_PAYMENT.zelle.contact}
                    instruction={`Open your banking app or Zelle app, tap "Send", then paste this phone number as the recipient. Send $${total.toFixed(2)}, then complete the form below to confirm your order.`}
                  />
                )}
              </div>

              <div className="border-t border-gray-100 pt-6 mb-6">
                <p className="text-xs font-body font-semibold uppercase tracking-widest text-muted mb-4">
                  Confirm your order
                </p>
                <ContactForm
                  values={contact}
                  onChange={setContact}
                  includeConfirmationNote={false}
                  idPrefix="store"
                />
              </div>

              {submitError && (
                <div className="flex items-start gap-3 bg-accent/5 border border-accent/30 rounded-lg p-4 mb-4">
                  <AlertTriangle size={18} className="text-accent shrink-0 mt-0.5" />
                  <p className="text-xs font-body text-primary">{submitError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={!formReady || submitting}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting…' : 'Submit Order'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

function Header() {
  return (
    <section
      className="bg-primary py-20 relative overflow-hidden"
      style={{ backgroundImage: `url(${zebraHeader})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/70" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-white text-xs font-body font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
          Reunion Store
        </span>
        <h1 className="font-display font-black text-white mb-4" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}>
          Reunion T-Shirts
        </h1>
        <p className="text-gray-300 font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Wear your Zebra pride. Order your commemorative tee for reunion weekend.
        </p>
        <div className="red-divider mt-8 max-w-xs mx-auto" />
      </div>
    </section>
  )
}

function Confirmation({ order }) {
  return (
    <div className="pt-16">
      <Header />
      <section
        className="relative py-16"
        style={{ backgroundImage: `url(${zebraBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-cream/93" />
        <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-5">
              <Check size={24} className="text-accent" />
            </div>
            <h2 className="font-display font-bold text-2xl text-primary mb-2">
              Thanks, {order.name.split(' ')[0]}!
            </h2>
            <p className="font-body text-sm text-muted mb-6 leading-relaxed">
              Your order has been submitted. We'll confirm once we verify your{' '}
              {order.paymentMethod === 'cashapp' ? 'Cash App' : 'Zelle'} payment. A follow-up will be sent to {order.email}.
            </p>
            <dl className="space-y-2 text-sm font-body border-t border-gray-100 pt-5">
              <Row label="Item" value={`${SHIRT.name} (${order.size}) × ${order.quantity}`} />
              <Row label="Total" value={`$${order.amount.toFixed(2)}`} />
              <Row label="Payment" value={order.paymentMethod === 'cashapp' ? 'Cash App' : 'Zelle'} />
            </dl>
          </div>
        </div>
      </section>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="text-primary text-right font-medium">{value}</dd>
    </div>
  )
}
