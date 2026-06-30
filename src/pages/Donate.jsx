import { useEffect, useState } from 'react'
import { Heart, Gavel, Check, AlertTriangle } from 'lucide-react'
import {
  addDoc,
  collection,
  doc,
  increment,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { db, firebaseConfigured } from '../lib/firebase'
import DonorForm, { donorFormValid } from '../components/DonorForm'
import PayPalCheckout from '../components/PayPalCheckout'
import ProgressBar from '../components/ProgressBar'
import zebraBg from '../assets/zebra_print_background.jpg'
import zebraHeader from '../assets/zebra_header.png'

const FUNDRAISER_GOAL = 1986
const PRESETS = [10, 25, 50, 100]

export default function Donate() {
  const [fundraiserTotal, setFundraiserTotal] = useState(0)

  useEffect(() => {
    if (!firebaseConfigured || !db) return
    const unsub = onSnapshot(doc(db, 'stats', 'fundraiser'), (snap) => {
      setFundraiserTotal(snap.exists() ? snap.data().total || 0 : 0)
    })
    return unsub
  }, [])

  return (
    <div className="pt-16">
      <Header />

      <section
        className="relative py-16"
        style={{ backgroundImage: `url(${zebraBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-cream/93" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Section 1 — Fundraiser */}
          <DonationSection
            type="fundraiser"
            badge="Class Fundraiser"
            title="Help us hit $1,986"
            icon={<Heart size={20} className="text-accent" />}
            description="Every dollar covers reunion logistics, the welcome reception, classmate scholarships, and the legacy gift to PBHS. Goal is a nod to our graduating year."
            ctaLabel="Donate"
            paypalDescription={(amt) => `PBHS '86 Reunion fundraiser donation ($${amt.toFixed(2)})`}
            extra={<ProgressBar current={fundraiserTotal} goal={FUNDRAISER_GOAL} label="Updated live as donations come in" />}
            updateAggregate
          />

          {/* Section 2 — Silent Auction */}
          <DonationSection
            type="auction"
            badge="Silent Auction"
            title="Contribute to the silent auction"
            icon={<Gavel size={20} className="text-accent" />}
            description="Bid alongside classmates on themed baskets, Pine Bluff getaways, and Zebra memorabilia. All proceeds support the reunion fund."
            ctaLabel="Contribute to Auction"
            paypalDescription={(amt) => `PBHS '86 Silent Auction contribution ($${amt.toFixed(2)})`}
            requireMessage={false}
          />
        </div>
      </section>
    </div>
  )
}

function DonationSection({
  type,
  badge,
  title,
  icon,
  description,
  ctaLabel,
  paypalDescription,
  extra,
  updateAggregate = false,
}) {
  const [selected, setSelected] = useState(25)
  const [custom, setCustom] = useState('')
  const [donor, setDonor] = useState({ name: '', email: '', phone: '', message: '' })
  const [showCheckout, setShowCheckout] = useState(false)
  const [confirmation, setConfirmation] = useState(null)
  const [submitError, setSubmitError] = useState(null)

  const customAmount = parseFloat(custom)
  const amount = custom ? (Number.isFinite(customAmount) ? customAmount : 0) : selected
  const amountValid = amount > 0
  const formReady = donorFormValid(donor)

  async function handleApprove({ paypalOrderId }) {
    setSubmitError(null)
    const donation = {
      name: donor.name.trim(),
      email: donor.email.trim(),
      phone: donor.phone.trim(),
      message: donor.message?.trim() || '',
      amount,
      type,
      paypalOrderId,
      timestamp: serverTimestamp(),
    }

    if (firebaseConfigured && db) {
      try {
        await addDoc(collection(db, 'donations'), donation)
        if (updateAggregate) {
          await setDoc(
            doc(db, 'stats', 'fundraiser'),
            { total: increment(amount), updatedAt: serverTimestamp() },
            { merge: true },
          )
        }
      } catch (err) {
        setSubmitError(
          'Payment captured, but we could not save your donation. Please email us your PayPal order ID: ' +
            paypalOrderId,
        )
      }
    }
    setConfirmation({ ...donation, paypalOrderId })
  }

  if (confirmation) {
    return (
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-5">
          <Check size={24} className="text-accent" />
        </div>
        <h3 className="font-display font-bold text-2xl text-primary mb-2">Thank you, {confirmation.name.split(' ')[0]}!</h3>
        <p className="font-body text-sm text-muted mb-6">
          Your {type === 'fundraiser' ? 'donation' : 'auction contribution'} of ${confirmation.amount.toFixed(2)} is in. A receipt has been sent to {confirmation.email}.
        </p>
        <dl className="space-y-2 text-sm font-body border-t border-gray-100 pt-5">
          <Row label="PayPal order" value={confirmation.paypalOrderId} mono />
        </dl>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-3">
          {icon}
          <span className="text-xs font-body font-semibold uppercase tracking-widest text-accent">
            {badge}
          </span>
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary mb-3">{title}</h2>
        <p className="font-body text-sm text-muted leading-relaxed mb-6">{description}</p>

        {extra && <div className="mb-6">{extra}</div>}

        {/* Preset + custom amount */}
        <div className="mb-6">
          <p className="block text-xs font-body font-semibold uppercase tracking-widest text-muted mb-3">
            Amount
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {PRESETS.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => {
                  setSelected(amt)
                  setCustom('')
                }}
                className={`px-5 py-2.5 rounded-lg border font-body text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  !custom && selected === amt
                    ? 'bg-accent text-white border-accent shadow-sm'
                    : 'bg-white text-primary border-gray-200 hover:border-accent'
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>
          <div className="relative max-w-xs">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-body text-sm">$</span>
            <input
              type="number"
              min={1}
              step="0.01"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Custom amount"
              className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 bg-white font-body text-sm text-primary placeholder-gray-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-150"
            />
          </div>
        </div>

        {!showCheckout ? (
          <button
            type="button"
            onClick={() => setShowCheckout(true)}
            disabled={!amountValid}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {ctaLabel}
          </button>
        ) : (
          <div className="space-y-6">
            <div className="border-t border-gray-100 pt-6">
              <p className="text-xs font-body font-semibold uppercase tracking-widest text-muted mb-4">
                Your details
              </p>
              <DonorForm
                values={donor}
                onChange={setDonor}
                includeMessage
                idPrefix={`donate-${type}`}
              />
            </div>

            <div className="border-t border-gray-100 pt-6">
              <p className="text-xs font-body font-semibold uppercase tracking-widest text-muted mb-4">
                Payment
              </p>
              <PayPalCheckout
                amount={amount}
                description={paypalDescription(amount)}
                disabled={!formReady || !amountValid}
                disabledMessage="Fill out your details to enable PayPal"
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
          Give Back
        </span>
        <h1 className="font-display font-black text-white mb-4" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}>
          Donate &amp; Sponsor
        </h1>
        <p className="text-gray-300 font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Support the reunion fundraiser and our silent auction. Every contribution helps us celebrate 40 years of Zebra spirit.
        </p>
        <div className="red-divider mt-8 max-w-xs mx-auto" />
      </div>
    </section>
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
