import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { campaignImage, NEWS_TEASERS } from '../lib/newsTeasers'

export default function NewsTeaserPage() {
  const { teaserId } = useParams()
  const teaser = NEWS_TEASERS.find(item => item.id === teaserId)
  if (!teaser) return <Navigate to="/" replace />

  return (
    <article className="pb-[calc(7rem+env(safe-area-inset-bottom))]">
      <header className="px-4 pb-4 pt-[calc(env(safe-area-inset-top)+1.75rem)]">
        <Link to="/" state={{ newsTeaser: teaser.id }} aria-label="Back to Discover" className="inline-flex min-h-11 items-center gap-2 rounded-lg pr-3 text-sm font-semibold text-ink">
          <ArrowLeft size={21} aria-hidden="true" /> Back to Discover
        </Link>
      </header>
      <img src={campaignImage(teaser.image)} alt={teaser.imageAlt} width={1536} height={864} className="aspect-video w-full object-cover" />
      <div className="px-5 pt-5">
        <p className="text-sm font-semibold text-muted">{teaser.label}</p>
        <h1 className="mt-2 font-display text-[28px] font-bold leading-tight text-ink">{teaser.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">{teaser.introduction}</p>
        <h2 className="mt-6 text-xl font-bold leading-snug text-ink">{teaser.heading}</h2>
        <p className="mt-3 text-base leading-relaxed text-muted">{teaser.description}</p>
        {'note' in teaser && <p className="mt-4 rounded-lg bg-sand/40 p-3 text-sm leading-relaxed text-muted">{teaser.note}</p>}
        <Link to={teaser.destination} className="mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-ink px-4 py-3 text-base font-bold text-white">
          {teaser.action}<ArrowRight size={20} className="shrink-0" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
