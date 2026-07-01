export const CASHTAG = import.meta.env.VITE_CASHAPP_CASHTAG || 'YourCashTag'
export const ZELLE_CONTACT = import.meta.env.VITE_ZELLE_CONTACT || 'zelle@youremail.com'
export const CASHAPP_QR_URL = '/cashapp_qr.png'

export function cashAppLink(amount) {
  const n = Number(amount)
  const suffix = Number.isFinite(n) && n > 0 ? `/${n.toFixed(2)}` : ''
  return `https://cash.app/$${CASHTAG}${suffix}`
}

export const zelleIsEmail = /\S+@\S+\.\S+/.test(ZELLE_CONTACT)
