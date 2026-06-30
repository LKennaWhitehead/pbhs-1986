import { MapPin, Clock, Shirt, Star } from 'lucide-react'
import AlertBox from './AlertBox'

const dayBadge = {
  friday: 'bg-accent text-white',
  saturday: 'bg-primary text-white',
  sunday: 'bg-white text-primary border border-gray-300',
}

export default function EventCard({ event, delay = 0 }) {
  const badgeClass = dayBadge[event.day] || dayBadge.friday

  return (
    <article
      className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden opacity-0 animate-fade-up hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {/* Consistent red top bar */}
      <div className="h-1 w-full bg-accent" />

      <div className="p-6">
        {/* Day badge + Coming Soon */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <span className={`text-xs font-body font-semibold uppercase tracking-widest px-3 py-1 rounded-full ${badgeClass}`}>
            {event.dayLabel}
          </span>
          {event.comingSoon && (
            <span className="text-xs font-body font-medium uppercase tracking-widest px-3 py-1 rounded-full bg-surface text-muted border border-gray-200">
              Details Coming Soon
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-xl text-primary mb-4 leading-snug">
          {event.title}
        </h3>

        {/* Meta row */}
        <div className="space-y-2 mb-4">
          {event.location && (
            <div className="flex items-start gap-2 text-sm text-muted font-body">
              <MapPin size={15} className="shrink-0 mt-0.5 text-accent" />
              <span>{event.location}</span>
            </div>
          )}
          {event.time && (
            <div className="flex items-center gap-2 text-sm text-muted font-body">
              <Clock size={15} className="shrink-0 text-accent" />
              <span>{event.time}</span>
            </div>
          )}
          {event.attire && (
            <div className="flex items-center gap-2 text-sm text-muted font-body">
              <Shirt size={15} className="shrink-0 text-accent" />
              <span>
                <strong className="text-primary font-semibold">Attire:</strong> {event.attire}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted font-body leading-relaxed mb-4">
          {event.description}
        </p>

        {/* Highlights */}
        {event.highlights && event.highlights.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-body font-semibold uppercase tracking-widest text-accent mb-2">
              Highlights
            </p>
            <ul className="flex flex-wrap gap-2">
              {event.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-1.5 text-xs font-body font-medium bg-accent/8 text-accent border border-accent/20 px-3 py-1 rounded-full"
                >
                  <Star size={11} />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Alert */}
        {event.alert && (
          <AlertBox type={event.alertType || 'warning'}>
            {event.alert}
          </AlertBox>
        )}
      </div>
    </article>
  )
}
