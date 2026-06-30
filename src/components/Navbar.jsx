import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/events', label: 'Events' },
    { to: '/store', label: 'Store' },
    { to: '/donate', label: 'Donate' },
  ]

  const linkClass = ({ isActive }) =>
    `text-sm font-body font-medium uppercase tracking-widest transition-all duration-200 relative pb-0.5 ${
      isActive
        ? 'text-accent font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-accent after:rounded-full'
        : 'text-primary hover:text-accent'
    }`

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/92 backdrop-blur-md border-b border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.07)]'
          : 'bg-off-white border-b border-gray-200'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
            <span className="text-2xl leading-none" aria-hidden="true">🦓</span>
            <div>
              <span className="font-display font-bold text-xl text-primary leading-none block">
                PBHS <span className="text-accent">'86</span>
              </span>
              <span className="text-[10px] font-body font-medium text-muted tracking-[0.18em] uppercase hidden sm:block">
                Class Reunion
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/register"
              className="ml-2 bg-accent text-white text-sm font-body font-semibold uppercase tracking-widest px-5 py-2 rounded-lg hover:bg-accent-dark transition-all duration-200 shadow-sm cursor-pointer"
            >
              Register Now
            </NavLink>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-primary hover:text-accent transition-colors duration-200 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-5 flex flex-col gap-4 shadow-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/register"
            className="bg-accent text-white text-sm font-body font-semibold uppercase tracking-widest px-5 py-3 rounded-lg text-center hover:bg-accent-dark transition-all duration-200 cursor-pointer"
            onClick={() => setMenuOpen(false)}
          >
            Register Now
          </NavLink>
        </div>
      )}
    </nav>
  )
}
