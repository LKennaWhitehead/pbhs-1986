import { AlertTriangle, Info } from 'lucide-react'

export default function AlertBox({ type = 'warning', children }) {
  const styles = {
    warning: {
      wrapper: 'bg-red-50 border-l-4 border-accent text-red-900',
      icon: <AlertTriangle size={18} className="text-accent shrink-0 mt-0.5" />,
    },
    info: {
      wrapper: 'bg-blue-50 border-l-4 border-blue-400 text-blue-900',
      icon: <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />,
    },
  }

  const { wrapper, icon } = styles[type] || styles.warning

  return (
    <div className={`flex gap-3 p-4 rounded-r-md text-sm font-body leading-relaxed ${wrapper}`}>
      {icon}
      <div>{children}</div>
    </div>
  )
}
