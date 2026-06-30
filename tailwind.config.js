/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A1A',
        accent: '#C8102E',
        'accent-dark': '#9B0C22',
        'off-white': '#FAFAFA',
        cream: '#FDF8F5',
        muted: '#6B7280',
        surface: '#F5F3F1',
        charcoal: '#0F0F0F',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.88) 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-up-delay-1': 'fade-up 0.6s 0.1s ease-out forwards',
        'fade-up-delay-2': 'fade-up 0.6s 0.2s ease-out forwards',
        'fade-up-delay-3': 'fade-up 0.6s 0.3s ease-out forwards',
        'fade-up-delay-4': 'fade-up 0.6s 0.4s ease-out forwards',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
