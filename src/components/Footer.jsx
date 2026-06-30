import { Link } from 'react-router-dom'

const FB_URL = 'https://www.facebook.com/share/p/1Csh6ANkvr/'

function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-primary text-off-white relative overflow-hidden">
      {/* Subtle top accent line */}
      <div className="h-[3px] w-full bg-accent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl leading-none" aria-hidden="true">🦓</span>
              <span className="font-display font-bold text-xl">
                PBHS <span className="text-accent">'86</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-body">
              Celebrating 40 Years of Friendship,<br />Legacy, and Zebra Pride
            </p>
            <p className="text-accent font-body font-semibold text-xs mt-3 tracking-[0.18em] uppercase">
              Class of 1986
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-body font-semibold uppercase tracking-widest text-gray-500 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/events', label: 'Weekend Events' },
                { to: '/register', label: 'Register' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm font-body text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h3 className="text-xs font-body font-semibold uppercase tracking-widest text-gray-500 mb-4">
              Stay Connected
            </h3>
            <a
              href={FB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#1877F2] text-white text-sm font-body font-semibold px-5 py-3 rounded-lg hover:bg-[#1565C0] transition-all duration-200 shadow-sm cursor-pointer"
            >
              <FacebookIcon size={17} />
              Join Our Facebook Group
            </a>
          </div>
        </div>

        <div className="red-divider my-10" />

        <p className="text-center text-xs text-gray-600 font-body">
          © 2026 PBHS Class of 1986 Reunion Committee · Pine Bluff, Arkansas
        </p>
        <p className="text-center text-xs text-gray-700 font-body mt-1.5">
          Designed & developed by L'Kenna Whitehead Jr.
        </p>
      </div>
    </footer>
  )
}
