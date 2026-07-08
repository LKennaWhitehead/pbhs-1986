import { useState } from 'react'
import { Heart, Gavel, Target } from 'lucide-react'
import PaymentMethodSelector from '../components/PaymentMethodSelector'
import CashAppPanel from '../components/CashAppPanel'
import PayPalPanel from '../components/PayPalPanel'
import { DONATIONS_PAYMENT } from '../lib/payment'
import zebraBg from '../assets/zebra_print_background.jpg'
import zebraHeader from '../assets/zebra_header.png'

const FUNDRAISER_GOAL = 1986

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
            badge="Class Fundraiser"
            title="Help us hit $1,986"
            icon={<Heart size={20} className="text-accent" />}
            description="Every dollar covers reunion logistics, the welcome reception, classmate scholarships, and the legacy gift to PBHS. Goal is a nod to our graduating year."
            memo="Include your name in the memo and note that it's for the class fundraiser."
            extra={<GoalCard goal={FUNDRAISER_GOAL} />}
          />

          <DonationSection
            badge="Silent Auction"
            title="Contribute to the silent auction"
            icon={<Gavel size={20} className="text-accent" />}
            description="Bid alongside classmates on themed baskets, Pine Bluff getaways, and Zebra memorabilia. All proceeds support the reunion fund."
            memo="Include your name in the memo and note that it's for the silent auction."
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

function DonationSection({ badge, title, icon, description, memo, extra }) {
  const [paymentMethod, setPaymentMethod] = useState('cashapp')

  return (
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

      <div className="mb-5">
        <PaymentMethodSelector
          methods={DONATE_METHODS}
          value={paymentMethod}
          onChange={setPaymentMethod}
        />
      </div>

      <div>
        {paymentMethod === 'cashapp' ? (
          <CashAppPanel
            cashtag={DONATIONS_PAYMENT.cashtag}
            qrUrl={DONATIONS_PAYMENT.qrUrl}
            instruction={`Enter your donation amount in Cash App. ${memo}`}
          />
        ) : (
          <PayPalPanel
            handle={DONATIONS_PAYMENT.paypalMe}
            instruction={`The button opens paypal.me — enter your donation amount there. ${memo}`}
          />
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
