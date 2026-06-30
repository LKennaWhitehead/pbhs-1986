import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, Users, MapPin } from 'lucide-react'

function FacebookIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}
import CountdownTimer from '../components/CountdownTimer'
import zebraBg from '../assets/zebra_print_background.jpg'
import zebraHeader from '../assets/zebra_header.png'

const FB_URL = 'https://www.facebook.com/share/p/1Csh6ANkvr/'

const previewDays = [
  {
    day: 'Friday',
    date: 'Oct 30',
    teaser:
      'Start the weekend right with our Meet & Greet at PBHS, then head to Friday Night Lights for the football game.',
  },
  {
    day: 'Saturday',
    date: 'Oct 31',
    teaser:
      'Celebrate in style at the Day Party Brunch at Pine Bluff Country Club, then keep the party going with the Blue Jeans & Bling evening event.',
  },
  {
    day: 'Sunday',
    date: 'Nov 1',
    teaser:
      'Close out the reunion with Farewell Fellowship — one last chance to reflect, connect, and celebrate our Zebra spirit.',
  },
]

const registrationSteps = [
  { icon: CalendarDays, text: 'Register for reunion events' },
  { icon: Users, text: 'Order reunion T-shirts' },
  { icon: MapPin, text: 'Make donations or sponsorship contributions' },
]

export default function HomePage() {
  return (
    <div className="pt-16">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{
          backgroundImage: `url(${zebraHeader})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        {/* Layered gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-black/90" />
        {/* Subtle vignette sides */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">

          {/* Badge */}
          <div className="opacity-0 animate-fade-up mb-6" style={{ animationFillMode: 'forwards' }}>
            <span className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-white text-xs font-body font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full">
              <span aria-hidden="true">🦓</span> Class of 1986 · 40th Anniversary Reunion
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-black text-white leading-[1.1] mb-5 opacity-0 animate-fade-up-delay-1"
            style={{ fontSize: 'clamp(2.75rem, 7.5vw, 5.5rem)', animationFillMode: 'forwards' }}
          >
            Welcome Back,{' '}
            <span className="text-accent">Mighty</span>{' '}
            <span className="italic">Zebras!</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-gray-200 font-body text-lg sm:text-xl max-w-lg leading-relaxed mb-2 opacity-0 animate-fade-up-delay-2"
            style={{ animationFillMode: 'forwards' }}
          >
            Celebrating 40 Years of Friendship, Legacy, and Zebra Pride
          </p>
          <p
            className="text-gray-400 font-body text-sm mb-10 opacity-0 animate-fade-up-delay-2"
            style={{ animationFillMode: 'forwards' }}
          >
            October 30 – November 1, 2026 · Pine Bluff, Arkansas
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-3 mb-14 opacity-0 animate-fade-up-delay-3"
            style={{ animationFillMode: 'forwards' }}
          >
            <Link to="/register" className="btn-primary">
              Register Now <ArrowRight size={18} />
            </Link>
            <Link to="/events" className="btn-outline">
              View Weekend Events
            </Link>
          </div>

          {/* Countdown */}
          <div
            className="opacity-0 animate-fade-up-delay-4"
            style={{ animationFillMode: 'forwards' }}
          >
            <p className="text-gray-500 font-body text-[10px] uppercase tracking-[0.2em] mb-3">
              Countdown to Reunion Weekend
            </p>
            <CountdownTimer />
          </div>
        </div>
      </section>

      {/* ── REGISTRATION INTRO ──────────────────────────────── */}
      <div
        className="relative"
        style={{
          backgroundImage: `url(${zebraBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-cream/92" />

        <section className="relative z-10 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="red-divider mb-12" />

            <div className="text-center mb-10">
              <span className="section-badge mb-4 inline-flex">Registration</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary mb-4 mt-3">
                Complete Your Registration
              </h2>
              <p className="text-muted font-body max-w-md mx-auto">
                Secure your spot and help us plan an unforgettable reunion weekend.
              </p>
            </div>

            {/* Step cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {registrationSteps.map(({ icon: Icon, text }, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 shadow-card p-5 flex items-start gap-3"
                >
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mt-0.5">
                    <Icon size={17} className="text-accent" />
                  </div>
                  <p className="text-sm font-body text-primary font-medium leading-snug pt-1.5">{text}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link to="/register" className="btn-primary inline-flex">
                Go to Registration Form <ArrowRight size={18} />
              </Link>
            </div>

            <div className="red-divider mt-12" />
          </div>
        </section>

        {/* ── WEEKEND SNAPSHOT ────────────────────────────────── */}
        <section className="relative z-10 pb-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="section-badge mb-4 inline-flex">Weekend Schedule</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary mb-2 mt-3">
                Weekend Snapshot
              </h2>
              <p className="text-muted font-body text-sm">
                October 30 – November 1, 2026 · Pine Bluff, Arkansas
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {previewDays.map((d, i) => (
                <div
                  key={d.day}
                  className="bg-white rounded-xl border-t-4 border-accent shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 p-6 opacity-0 animate-fade-up"
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <p className="text-xs font-body font-semibold uppercase tracking-widest mb-1 text-accent">
                    {d.day}
                  </p>
                  <p className="text-xs text-muted font-body mb-3 font-medium">{d.date}</p>
                  <p className="text-sm text-muted font-body leading-relaxed mb-5">{d.teaser}</p>
                  <Link
                    to="/events"
                    className="text-sm font-body font-semibold text-accent hover:text-accent-dark transition-colors duration-150 inline-flex items-center gap-1.5 group cursor-pointer"
                  >
                    See Full Schedule
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-150" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ── FACEBOOK BANNER ───────────────────────────────────── */}
      <section className="bg-primary py-16 relative overflow-hidden">
        {/* Subtle zebra texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url(${zebraBg})`,
            backgroundSize: 'cover',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-display font-bold text-2xl sm:text-3xl text-white mb-3">
            Stay connected with your classmates!
          </p>
          <p className="text-gray-400 font-body text-sm mb-8">
            Join hundreds of '86 alumni already in the group
          </p>
          <a
            href={FB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-primary font-body font-semibold px-8 py-3.5 rounded-lg hover:bg-gray-100 transition-all duration-200 text-base shadow-sm hover:shadow-md cursor-pointer"
          >
            <span className="text-[#1877F2]"><FacebookIcon size={20} /></span>
            Join Our Facebook Group
          </a>
        </div>
      </section>
    </div>
  )
}
