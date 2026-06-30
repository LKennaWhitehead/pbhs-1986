import { CheckCircle2 } from 'lucide-react'

export default function ChecklistItem({ children, color = 'accent' }) {
  const colorMap = {
    accent: 'text-accent',
    gold: 'text-gold',
  }
  return (
    <li className="flex items-start gap-3 font-body text-primary">
      <CheckCircle2 size={20} className={`shrink-0 mt-0.5 ${colorMap[color] || 'text-accent'}`} />
      <span>{children}</span>
    </li>
  )
}
