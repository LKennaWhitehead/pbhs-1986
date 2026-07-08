export const STORE_PAYMENT = {
  cashtag: import.meta.env.VITE_STORE_CASHTAG || 'PeggyEaster',
  qrUrl: '/cashapp_qr_store.png',
  zelle: {
    recipientName: 'Elgin Smith',
    contact: import.meta.env.VITE_STORE_ZELLE || '(281) 685-2818',
  },
}

export const DONATIONS_PAYMENT = {
  cashtag: import.meta.env.VITE_DONATIONS_CASHTAG || 'pbhsco1986',
  qrUrl: '/cashapp_qr_donations.png',
  paypalMe: import.meta.env.VITE_DONATIONS_PAYPAL_ME || 'pbhsco1986',
}

export function cashAppLink(cashtag, amount) {
  const n = Number(amount)
  const suffix = Number.isFinite(n) && n > 0 ? `/${n.toFixed(2)}` : ''
  return `https://cash.app/$${cashtag}${suffix}`
}

export function paypalMeLink(handle, amount) {
  const n = Number(amount)
  const suffix = Number.isFinite(n) && n > 0 ? `/${n.toFixed(2)}` : ''
  return `https://paypal.me/${handle}${suffix}`
}

export const isEmail = (v) => /\S+@\S+\.\S+/.test(v)
