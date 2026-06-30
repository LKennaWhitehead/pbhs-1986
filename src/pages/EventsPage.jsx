import { useState } from 'react'
import DayTabs from '../components/DayTabs'
import EventCard from '../components/EventCard'
import { eventsByDay } from '../data/events'
import zebraBg from '../assets/zebra_print_background.jpg'
import zebraHeader from '../assets/zebra_header.png'

export default function EventsPage() {
  const [activeDay, setActiveDay] = useState('friday')
  const currentEvents = eventsByDay[activeDay] || []

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
            Weekend Schedule
          </span>
          <h1 className="font-display font-black text-white mb-4" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}>
            Reunion Weekend Events
          </h1>
          <p className="text-gray-300 font-body text-base sm:text-lg">
            October 30 – November 1, 2026 · Pine Bluff, Arkansas
          </p>
          <div className="red-divider mt-8 max-w-xs mx-auto" />
        </div>
      </section>

      {/* Tabs + cards */}
      <section
        className="relative min-h-screen py-12"
        style={{
          backgroundImage: `url(${zebraBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-cream/93" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <DayTabs active={activeDay} onChange={setActiveDay} />
          <div className="space-y-5">
            {currentEvents.map((event, i) => (
              <EventCard key={event.id} event={event} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
