import { useMemo, useState } from 'react'
import { Shirt, Check, AlertTriangle } from 'lucide-react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db, firebaseConfigured } from '../lib/firebase'
import DonorForm, { donorFormValid } from '../components/DonorForm'
import PayPalCheckout from '../components/PayPalCheckout'
import zebraBg from '../assets/zebra_print_background.jpg'
import zebraHeader from '../assets/zebra_header.png'

const SHIRT = {
  name: 'PBHS ’86 Reunion T-Shirt',
  price: 25,
  description:
    'Commemorative 40th anniversary tee — soft cotton blend, zebra-print accent, and the Class of ’86 mark on the back. Limited run for reunion weekend.',
}
const SIZES = ['S', 'M', 'L', 'XL', 'XXL']

export default function Store() {
  const [size, setSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [showCheckout, setShowCheckout] = useState(false)
  const [donor, setDonor] = useState({ name: '', email: '', phone: '' })
  const [confirmation, setConfirmation] = useState(null)
  const [submitError, setSubmitError] = useState(null)

  const total = useMemo(() => SHIRT.price * quantity, [quantity])
  const formReady = donorFormValid(donor)

  async function handleApprove({ paypalOrderId }) {
    setSubmitError(null)
    const order = {
      name: donor.name.trim(),
      email: donor.email.trim(),
      phone: donor.phone.trim(),
      size,
      quantity,
      amount: total,
      paypalOrderId,
      status: 'paid',
      timestamp: serverTimestamp(),
    }

    if (firebaseConfigured && db) {
      try {
        await addDoc(collection(db, 'orders'), order)
      } catch (err) {
        setSubmitError(
          'Payment captured, but we could not save your order. Please email us your PayPal order ID: ' +
            paypalOrderId,
        )
      }
    }

    setConfirmation({ ...order, paypalOrderId })
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

          {/* Product */}
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
                <p className="font-display font-bold text-2xl text-primary mt-4">
                  ${SHIRT.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Order form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 sm:p-8">
              <h3 className="font-display font-bold text-2xl text-primary mb-1">Order details</h3>
              <p className="font-body text-sm text-muted mb-6">Pick a size and quantity, then check out with PayPal.</p>

              {/* Size */}
              <div className="mb-5">
                <p className="block text-xs font-body font-semibold uppercase tracking-widest text-muted mb-3">
                  Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={`min-w-[3rem] px-4 py-2.5 rounded-lg border font-body text-sm font-semibold transition-all duration-150 cursor-pointer ${
                        size === s
                          ? 'bg-accent text-white border-accent shadow-sm'
                          : 'bg-white text-primary border-gray-200 hover:border-accent'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
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

              {!showCheckout ? (
                <button
                  type="button"
                  onClick={() => setShowCheckout(true)}
                  className="btn-primary w-full"
                >
                  Buy Now
                </button>
              ) : (
                <div className="space-y-6">
                  <div className="border-t border-gray-100 pt-6">
                    <p className="text-xs font-body font-semibold uppercase tracking-widest text-muted mb-4">
                      Your details
                    </p>
                    <DonorForm values={donor} onChange={setDonor} idPrefix="store" />
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <p className="text-xs font-body font-semibold uppercase tracking-widest text-muted mb-4">
                      Payment
                    </p>
                    <PayPalCheckout
                      amount={total}
                      description={`PBHS '86 Reunion T-Shirt (${size}) x${quantity}`}
                      disabled={!formReady}
                      disabledMessage="Fill out your details above to enable PayPal"
                      onApprove={handleApprove}
                    />
                  </div>

                  {submitError && (
                    <div className="flex items-start gap-3 bg-accent/5 border border-accent/30 rounded-lg p-4">
                      <AlertTriangle size={18} className="text-accent shrink-0 mt-0.5" />
                      <p className="text-xs font-body text-primary">{submitError}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
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
            <h2 className="font-display font-bold text-2xl text-primary mb-2">Order confirmed</h2>
            <p className="font-body text-sm text-muted mb-6">
              Thank you, {order.name.split(' ')[0]}! Your reunion tee is on its way. A receipt has been sent to {order.email}.
            </p>
            <dl className="space-y-2 text-sm font-body border-t border-gray-100 pt-5">
              <Row label="Item" value={`${SHIRT.name} (${order.size}) × ${order.quantity}`} />
              <Row label="Total" value={`$${order.amount.toFixed(2)}`} />
              <Row label="PayPal order" value={order.paypalOrderId} mono />
            </dl>
          </div>
        </div>
      </section>
    </div>
  )
}

function Row({ label, value, mono = false }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className={`text-primary text-right ${mono ? 'font-mono text-xs break-all' : 'font-medium'}`}>{value}</dd>
    </div>
  )
}
