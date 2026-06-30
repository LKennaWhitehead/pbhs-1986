const tabs = [
  { key: 'friday', label: 'Friday', date: 'Oct 30' },
  { key: 'saturday', label: 'Saturday', date: 'Oct 31' },
  { key: 'sunday', label: 'Sunday', date: 'Nov 1' },
]

export default function DayTabs({ active, onChange }) {
  return (
    <div className="flex border-b border-gray-200 mb-8" role="tablist">
      {tabs.map((tab) => {
        const isActive = active === tab.key
        return (
          <button
            key={tab.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.key)}
            className={`flex-1 sm:flex-none px-4 sm:px-8 py-3 text-sm font-body font-semibold transition-all duration-200 border-b-2 -mb-px cursor-pointer ${
              isActive
                ? 'text-accent border-accent bg-white'
                : 'text-muted border-transparent hover:text-primary hover:border-gray-300'
            }`}
          >
            <span className="block">{tab.label}</span>
            <span className="block text-xs font-normal opacity-70">{tab.date}</span>
          </button>
        )
      })}
    </div>
  )
}
