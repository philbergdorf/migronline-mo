import { useLayoutEffect, useMemo, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { campaignImage, NEWS_TEASERS, SCRATCH_WIN_TEASER } from '../lib/newsTeasers'

export default function NewsTeaserSlider({ showScratchAndWin }: { showScratchAndWin: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const { state } = useLocation()
  const returnToTeaser = state?.newsTeaser
  const teasers = useMemo(() => showScratchAndWin ? [...NEWS_TEASERS, SCRATCH_WIN_TEASER] : NEWS_TEASERS, [showScratchAndWin])

  useLayoutEffect(() => {
    const index = teasers.findIndex(teaser => teaser.id === returnToTeaser)
    const section = sectionRef.current
    const track = trackRef.current
    const scroller = section?.closest<HTMLElement>('.overflow-auto')
    if (index < 0 || !section || !track || !scroller) return
    const item = track.children[index] as HTMLElement
    track.scrollLeft = item.offsetLeft - 16
    scroller.scrollTop += section.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 16
    item.querySelector('a')?.focus({ preventScroll: true })
  }, [returnToTeaser, teasers])

  return (
    <section ref={sectionRef} aria-labelledby="migros-news-title" className="pt-6">
      <h2 id="migros-news-title" className="px-5 pb-3 font-display text-[24px] font-bold leading-tight text-ink">Worth a look</h2>
      <ul ref={trackRef} className="news-teaser-track no-scrollbar" aria-label="Latest campaigns">
        {teasers.map((teaser, index) => (
          <li key={teaser.id} className="news-teaser">
            <Link
              to={'to' in teaser ? teaser.to : `/news/${teaser.id}`}
              state={{ newsTeaser: teaser.id }}
              aria-labelledby={`news-teaser-${teaser.id}`}
              className="flex h-full flex-col overflow-hidden rounded-[14px] bg-surface text-ink shadow-soft"
              onKeyDown={event => {
                if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
                event.preventDefault()
                const next = Math.min(teasers.length - 1, Math.max(0, index + (event.key === 'ArrowRight' ? 1 : -1)))
                const track = trackRef.current
                const item = track?.children[next] as HTMLElement | undefined
                if (!track || !item) return
                item.querySelector('a')?.focus({ preventScroll: true })
                track.scrollTo({ left: item.offsetLeft - 16, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
              }}
            >
              <div className="relative aspect-video w-full overflow-hidden bg-sand">
                <img src={campaignImage(teaser.image)} alt={teaser.imageAlt} loading="lazy" width={1536} height={864} className="h-full w-full object-cover" />
              </div>
              <div className="flex min-h-28 flex-1 items-center gap-4 p-4">
                <h3 id={`news-teaser-${teaser.id}`} className="min-w-0 flex-1 text-lg font-bold leading-snug">{teaser.title}</h3>
                <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 border-ink"><ArrowRight size={26} strokeWidth={1.8} /></span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
