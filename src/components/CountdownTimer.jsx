import { useState, useEffect } from 'react'

const TARGET = new Date('2026-10-30T17:30:00')

function pad(n) {
  return String(n).padStart(2, '0')
}

function getTimeLeft() {
  const diff = TARGET - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, minutes, seconds }
}

function Unit({ value, label }) {
  return (
    <div className="flex flex-col items-center glass-dark rounded-xl px-4 sm:px-6 py-3 sm:py-4 min-w-[64px] sm:min-w-[80px]">
      <span
        className="text-white font-display font-bold leading-none tabular-nums"
        style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
      >
        {pad(value)}
      </span>
      <span className="text-accent/80 font-body text-[10px] sm:text-xs uppercase tracking-widest mt-1.5 font-medium">
        {label}
      </span>
    </div>
  )
}

function Colon() {
  return (
    <span
      className="font-display font-bold text-white/40 leading-none pb-5 hidden sm:block select-none"
      style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
      aria-hidden="true"
    >
      :
    </span>
  )
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="inline-flex items-center gap-2 sm:gap-3"
      role="timer"
      aria-label="Countdown to reunion weekend"
    >
      <Unit value={time.days} label="Days" />
      <Colon />
      <Unit value={time.hours} label="Hours" />
      <Colon />
      <Unit value={time.minutes} label="Min" />
      <Colon />
      <Unit value={time.seconds} label="Sec" />
    </div>
  )
}
