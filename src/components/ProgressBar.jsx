export default function ProgressBar({ current, goal, label }) {
  const pct = goal > 0 ? Math.min(100, Math.round((current / goal) * 100)) : 0

  return (
    <div className="bg-white border border-gray-100 shadow-card rounded-2xl p-6 sm:p-7">
      <div className="flex items-baseline justify-between mb-3 gap-3 flex-wrap">
        <p className="font-display font-bold text-2xl sm:text-3xl text-primary">
          ${current.toLocaleString()}
          <span className="text-muted font-body font-medium text-base sm:text-lg">
            {' '}/ ${goal.toLocaleString()}
          </span>
        </p>
        <p className="text-xs font-body font-semibold uppercase tracking-widest text-accent">
          {pct}% to goal
        </p>
      </div>

      <div
        className="h-4 w-full bg-surface rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Fundraising progress'}
      >
        <div
          className="h-full bg-gradient-to-r from-accent to-accent-dark transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      {label && <p className="text-xs font-body text-muted mt-3">{label}</p>}
    </div>
  )
}
