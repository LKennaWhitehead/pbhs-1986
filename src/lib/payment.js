export const STORE_PAYMENT = {
  cashtag: import.meta.env.VITE_STORE_CASHTAG || 'YourStoreCashTag',
  zelleContact: import.meta.env.VITE_STORE_ZELLE || 'store-zelle@example.com',
  qrUrl: '/cashapp_qr_store.png',
}

export const DONATIONS_PAYMENT = {
  cashtag: import.meta.env.VITE_DONATIONS_CASHTAG || 'pbhsco1986',
  zelleContact: import.meta.env.VITE_DONATIONS_ZELLE || 'pbhsco1986@gmail.com',
  qrUrl: '/cashapp_qr_donations.png',
}

export function cashAppLink(cashtag, amount) {
  const n = Number(amount)
  const suffix = Number.isFinite(n) && n > 0 ? `/${n.toFixed(2)}` : ''
  return `https://cash.app/$${cashtag}${suffix}`
}

export const isEmail = (v) => /\S+@\S+\.\S+/.test(v)
