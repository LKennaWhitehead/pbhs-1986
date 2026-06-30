import { ExternalLink, Ticket, Shirt, Heart, Users } from 'lucide-react'
import zebraBg from '../assets/zebra_print_background.jpg'
import zebraHeader from '../assets/zebra_header.png'

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdIgVAcmLMtPMpgqFYPCauBkQCjJN3TZ4P0ugYodOh6_HCnRA/viewform'
const FB_URL = 'https://www.facebook.com/share/p/1Csh6ANkvr/'

function FacebookIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

const formItems = [
  { icon: <Ticket size={20} className="text-accent" />, label: 'Event Registration' },
  { icon: <Shirt size={20} className="text-accent" />, label: 'T-Shirt Orders' },
  { icon: <Heart size={20} className="text-accent" />, label: 'Donations & Sponsorships' },
  { icon: <Users size={20} className="text-accent" />, label: 'Guest Information' },
]

export default function RegisterPage() {
  return (
    <div className="pt-16">
      {/* Page header */}
      <section
        className="bg-primary py-20 relative overflow-hidden"
        style={{
          backgroundImage: `url(${zebraHeader})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/70" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-white text-xs font-body font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Class of 1986 · 40th Reunion
          </span>
          <h1
            className="font-display font-black text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
          >
            Register for the Reunion
          </h1>
          <p className="text-gray-300 font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Please complete the registration form below. This form will collect your classmate
            information, guest information, event attendance, T-shirt order, donation/sponsorship
            selection, and payment confirmation.
          </p>
          <div className="red-divider mt-8 max-w-xs mx-auto" />
        </div>
      </section>

      <section
        className="relative py-16"
        style={{
          backgroundImage: `url(${zebraBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-cream/93" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Registration card */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 mb-6">
            <h2 className="font-display font-bold text-2xl text-primary mb-2">
              Ready to Join Us?
            </h2>
            <p className="text-muted font-body text-sm mb-6 leading-relaxed">
              Click the button below to open the official registration form. The form opens in a
              new tab and covers everything — event tickets, T-shirts, donations, and guest details.
            </p>

            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-accent text-white font-body font-semibold text-base px-8 py-4 rounded-lg hover:bg-accent-dark transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              Open Registration Form <ExternalLink size={18} />
            </a>

            {/* What the form covers */}
            <div className="mt-8">
              <p className="text-xs font-body font-semibold uppercase tracking-widest text-muted mb-4">
                The form covers
              </p>
              <div className="grid grid-cols-2 gap-3">
                {formItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 bg-surface rounded-xl px-4 py-3 border border-gray-100"
                  >
                    {item.icon}
                    <span className="font-body text-sm font-medium text-primary">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Embedded form */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-100">
              <p className="text-sm font-body font-semibold text-primary">
                Or fill out the form directly below:
              </p>
            </div>
            <iframe
              src={`${FORM_URL}?embedded=true`}
              width="100%"
              height="800"
              frameBorder="0"
              title="PBHS Class of 1986 Reunion Registration Form"
              sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
              className="block"
            >
              Loading…
            </iframe>
          </div>

          {/* Support */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 text-center">
            <p className="font-body text-sm text-muted mb-2">Questions about registration?</p>
            <p className="font-body text-sm text-primary font-medium mb-5">
              Reach out to your classmates and the planning committee on Facebook.
            </p>
            <a
              href={FB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1877F2] text-white font-body font-semibold text-sm px-5 py-3 rounded-lg hover:bg-[#1565C0] transition-all duration-200 cursor-pointer"
            >
              <FacebookIcon size={16} />
              Join Our Facebook Group
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
