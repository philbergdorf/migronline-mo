import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function ShowAllCard({ to, title, description, label }: { to: string; title: string; description: string; label: string }) {
  return <Link to={to} aria-label={label}
    className="flex w-40 shrink-0 flex-col justify-center self-stretch rounded-card border border-primary/30 bg-primary/5 p-4 text-left transition-colors hover:bg-primary/10 active:bg-primary/15">
    <span className="font-display text-[18px] font-bold leading-tight text-ink">{title}</span>
    <span className="mt-2 text-[13px] leading-relaxed text-muted">{description}</span>
    <span className="mt-6 flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-3 py-2 text-[14px] font-bold text-white">
      Show all <ArrowRight size={18} aria-hidden="true" />
    </span>
  </Link>
}
