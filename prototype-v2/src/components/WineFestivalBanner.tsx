import { Leaf, Wine } from 'lucide-react'
import { Button, Card } from './ui'

export default function WineFestivalBanner({ fresh = false, onExplore }: {
  fresh?: boolean
  onExplore?: () => void
}) {
  return (
    <Card className={`relative overflow-hidden !border-0 !shadow-cta bg-gradient-to-br from-[#7B2D4E] to-[#3B1526] ${fresh ? 'fresh-promo-banner' : ''}`}>
      <span aria-hidden="true" className="pointer-events-none absolute -right-3 -top-3 text-white opacity-20">
        {fresh ? <Leaf size={86} /> : <Wine size={86} />}
      </span>
      <div className="relative flex items-center justify-between gap-3 p-4 text-white">
        <div className="min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">{fresh ? 'Fresh picks' : 'Wine Festival'}</span>
          <h2 className="mt-0.5 font-display text-[20px] font-bold leading-tight">{fresh ? 'Up to 20% off fresh picks' : '20–40% off wines'}</h2>
          <p className="text-[12px] text-white/80">{fresh ? 'A little more green in your basket' : 'Selected & regional favourites'}</p>
        </div>
        <Button variant="secondary" onClick={onExplore} className="shrink-0 !px-4 !py-2 !text-[13px] !text-[#7B2D4E]">
          Explore
        </Button>
      </div>
    </Card>
  )
}
