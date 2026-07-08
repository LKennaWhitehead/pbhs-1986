import { useState } from 'react'
import { Heart, Gavel, Check, AlertTriangle, Target } from 'lucide-react'
import ContactForm, { contactFormValid } from '../components/ContactForm'
import PaymentMethodSelector from '../components/PaymentMethodSelector'
import CashAppPanel from '../components/CashAppPanel'
import PayPalPanel from '../components/PayPalPanel'
import { DONATIONS_PAYMENT } from '../lib/payment'
import { submitNetlifyForm } from '../lib/netlifyForm'
import zebraBg from '../assets/zebra_print_background.jpg'
import zebraHeader from '../assets/zebra_header.png'

const FUNDRAISER_GOAL = 1986
const PRESETS = [10, 25, 50, 100]

const DONATE_METHODS = [
  { id: 'cashapp', label: 'Cash App' },
  { id: 'paypal', label: 'PayPal' },
]

export default function Donate() {
  return (
    <div className="pt-16">
      <Header />

      <section
        className="relative py-16"
        style={{ backgroundImage: `url(${zebraBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-cream/93" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          <DonationSection
            type="fundraiser"
            badge="Class Fundraiser"
            title="Help us hit $1,986"
            icon={<Heart size={20} className="text-accent" />}
            description="Every dollar covers reunion logistics, the welcome reception, classmate scholarships, and the legacy gift to PBHS. Goal is a nod to our graduating year."
            ctaLabel="Submit Donation"
            extra={<GoalCard goal={FUNDRAISER_GOAL} />}
          />

          <DonationSection
            type="auction"
            badge="Silent Auction"
            title="Contribute to the silent auction"
            icon={<Gavel size={20} className="text-accent" />}
            description="Bid alongside classmates on themed baskets, Pine Bluff getaways, and Zebra memorabilia. All proceeds support the reunion fund."
            ctaLabel="Submit Contribution"
          />
        </div>
      </section>
    </div>
  )
}

function GoalCard({ goal }) {
  return (
    <div className="bg-white border border-gray-100 shadow-card rounded-2xl p-6 sm:p-7 flex items-center gap-4">
      <div className="shrink-0 w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center">
        <Target size={22} className="text-accent" />
      </div>
      <div>
        <p className="text-xs font-body font-semibold uppercase tracking-widest text-accent mb-1">
          Fundraising Goal
        </p>
        <p className="font-display font-bold text-2xl sm:text-3xl text-primary">
          ${goal.toLocaleString()}
        </p>
        <p className="text-xs font-body text-muted">A nod to the Class of '86</p>
      </div>
    </div>
  )
}

function DonationSection({ type, badge, title, icon, description, ctaLabel, extra }) {
  const [selected, setSelected] = useState(25)
  const [custom, setCustom] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cashapp')
  const [donor, setDonor] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    confirmationNote: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [confirmation, setConfirmation] = useState(null)

  const customAmount = parseFloat(custom)
  const amount = custom ? (Number.isFinite(customAmount) ? customAmount : 0) : selected
  const amountValid = amount > 0
  const formReady = contactFormValid(donor)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!formReady || !amountValid || submitting) return
    setSubmitting(true)
    setSubmitError(null)

    const donation = {
      name: donor.name.trim(),
      email: donor.email.trim(),
      phone: donor.phone.trim(),
      message: donor.message?.trim() || '',
      amount,
      type,
      paymentMethod,
      confirmationNote: donor.confirmationNote?.trim() || '',
    }

    try {
      await submitNetlifyForm('donations', donation)
      setConfirmation(donation)
    } catch (err) {
      setSubmitError(err?.message || 'Could not submit your donation. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (confirmation) {
    return (
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-5">
          <Check size={24} className="text-accent" />
        </div>
        <h3 className="font-display font-bold text-2xl text-primary mb-2">
          Thank you, {confirmation.name.split(' ')[0]}!
        </h3>
        <p className="font-body text-sm text-muted mb-2 leading-relaxed">
          Your {type === 'fundraiser' ? 'donation' : 'auction contribution'} of{' '}
          <span className="font-semibold text-primary">${confirmation.amount.toFixed(2)}</span> has been submitted.
        </p>
        <p className="font-body text-sm text-muted leading-relaxed">
          We'll confirm once we verify your{' '}
          {confirmation.paymentMethod === 'cashapp' ? 'Cash App' : 'PayPal'} payment.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <span className="text-xs font-body font-semibold uppercase tracking-widest text-accent">
          {badge}
        </span>
      </div>
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary mb-3">{title}</h2>
      <p className="font-body text-sm text-muted leading-relaxed mb-6">{description}</p>

      {extra && <div className="mb-6">{extra}</div>}

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

      <div className="mb-5">
        <PaymentMethodSelector
          methods={DONATE_METHODS}
          value={paymentMethod}
          onChange={setPaymentMethod}
        />
      </div>

      <div className="mb-6">
        {paymentMethod === 'cashapp' ? (
          <CashAppPanel
            cashtag={DONATIONS_PAYMENT.cashtag}
            qrUrl={DONATIONS_PAYMENT.qrUrl}
            amount={amount}
            instruction="After sending payment, complete the form below to confirm your donation."
          />
        ) : (
          <PayPalPanel
            handle={DONATIONS_PAYMENT.paypalMe}
            amount={amount}
            instruction="The button opens paypal.me with the amount prefilled. After paying, complete the form below to confirm your donation."
          />
        )}
      </div>

      <div className="border-t border-gray-100 pt-6 mb-6">
        <p className="text-xs font-body font-semibold uppercase tracking-widest text-muted mb-4">
          Confirm your donation
        </p>
        <ContactForm
          values={donor}
          onChange={setDonor}
          includeMessage
          idPrefix={`donate-${type}`}
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
        disabled={!formReady || !amountValid || submitting}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Submitting…' : ctaLabel}
      </button>
    </form>
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
