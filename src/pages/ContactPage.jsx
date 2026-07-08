import { Mail, Phone, User } from 'lucide-react'
import zebraBg from '../assets/zebra_print_background.jpg'
import zebraHeader from '../assets/zebra_header.png'

const GENERAL = {
  email: 'pbhsco1986@gmail.com',
  phone: '(870) 686-2786',
}

const COMMITTEE = [
  { role: 'Committee Chairman', name: 'Elgin Smith', phone: '(281) 685-2818' },
  { role: 'Committee Coordinator', name: 'Katherine Collins', phone: '(870) 692-2379' },
  { role: 'Committee Treasurer', name: 'Rhonda Boyd', phone: '(870) 692-4567' },
  { role: 'Committee Administrator', name: 'Tonya Colen', phone: '(870) 692-4809' },
]

const telHref = (phone) => `tel:+1${phone.replace(/\D/g, '')}`

export default function ContactPage() {
  return (
    <div className="pt-16">
      <Header />

      <section
        className="relative py-16"
        style={{ backgroundImage: `url(${zebraBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-cream/93" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* General contact */}
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 sm:p-8">
            <span className="section-badge mb-4 inline-flex">General Contact</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary mb-6 mt-3">
              Reach the Reunion Committee
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`mailto:${GENERAL.email}`}
                className="group flex items-start gap-4 bg-surface hover:bg-white border border-gray-100 hover:border-accent rounded-xl p-5 transition-all duration-150 cursor-pointer"
              >
                <div className="shrink-0 w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                  <Mail size={20} className="text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-body font-semibold uppercase tracking-widest text-muted mb-1">
                    Email
                  </p>
                  <p className="font-body text-primary font-medium break-all">{GENERAL.email}</p>
                </div>
              </a>

              <a
                href={telHref(GENERAL.phone)}
                className="group flex items-start gap-4 bg-surface hover:bg-white border border-gray-100 hover:border-accent rounded-xl p-5 transition-all duration-150 cursor-pointer"
              >
                <div className="shrink-0 w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                  <Phone size={20} className="text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-body font-semibold uppercase tracking-widest text-muted mb-1">
                    Phone
                  </p>
                  <p className="font-body text-primary font-medium">{GENERAL.phone}</p>
                </div>
              </a>
            </div>
          </div>

          {/* Committee */}
          <div>
            <div className="text-center mb-8">
              <span className="section-badge mb-4 inline-flex">Reunion Committee</span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary mt-3 mb-2">
                Meet the Committee
              </h2>
              <p className="text-muted font-body text-sm max-w-lg mx-auto">
                Have a specific question? Reach out directly to the committee member handling it.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COMMITTEE.map(({ role, name, phone }) => (
                <div
                  key={name}
                  className="bg-white rounded-xl border border-gray-100 shadow-card p-6"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <User size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-[11px] font-body font-semibold uppercase tracking-widest text-accent">
                        {role}
                      </p>
                      <p className="font-display font-bold text-lg text-primary leading-tight mt-0.5">
                        {name}
                      </p>
                    </div>
                  </div>
                  <a
                    href={telHref(phone)}
                    className="inline-flex items-center gap-2 text-sm font-body font-semibold text-primary hover:text-accent transition-colors cursor-pointer"
                  >
                    <Phone size={14} className="text-accent" />
                    {phone}
                  </a>
                </div>
              ))}
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
          Get in Touch
        </span>
        <h1 className="font-display font-black text-white mb-4" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}>
          Contact Us
        </h1>
        <p className="text-gray-300 font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Questions, RSVPs, or ideas? The PBHS Class of '86 Reunion Committee is here to help.
        </p>
        <div className="red-divider mt-8 max-w-xs mx-auto" />
      </div>
    </section>
  )
}
