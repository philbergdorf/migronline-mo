import { useEffect, useRef, useState } from 'react'
import { Leaf, Wine } from 'lucide-react'
import { useFreshDesign } from '../fresh/context'
import ShoppingProductCard from '../components/ShoppingProductCard'
import { PageTitle, SectionLabel, Card, Button, FilterChips } from '../components/ui'

const SECTIONS = [
  {
    key: 'Top deals',
    deals: [
      { name: 'Rosé de Provence', sub: '75 cl', price: 'CHF 7.20', discount: 40 },
      { name: 'Greek Yoghurt', sub: '500 g', price: 'CHF 2.60', discount: 30 },
      { name: 'Salted Nuts', sub: '200 g', price: 'CHF 3.20', discount: 30 },
      { name: 'Pinot Noir', sub: '75 cl · AOC', price: 'CHF 12.60', discount: 30 },
    ],
  },
  {
    key: 'Your promotions',
    deals: [
      { name: 'Whole Milk', sub: 'Bought 6× before', price: 'CHF 1.36', discount: 15 },
      { name: 'Bio Bananas', sub: 'Bought 4× before', price: 'CHF 2.56', discount: 20 },
      { name: 'Dark Chocolate', sub: 'Bought 3× before', price: 'CHF 2.04', discount: 15 },
      { name: 'Sourdough Bread', sub: 'Bought 2× before', price: 'CHF 4.05', discount: 10 },
    ],
  },
  {
    key: 'Wine',
    deals: [
      { name: 'Pinot Noir', sub: '75 cl · AOC', price: 'CHF 12.60', discount: 30 },
      { name: 'Rosé de Provence', sub: '75 cl', price: 'CHF 7.20', discount: 40 },
      { name: 'Chasselas', sub: '75 cl · white', price: 'CHF 8.90', discount: 25 },
      { name: 'Prosecco', sub: '75 cl · brut', price: 'CHF 9.60', discount: 20 },
    ],
  },
  {
    key: 'Fruit & Veg',
    deals: [
      { name: 'Cherry Tomatoes', sub: '250 g', price: 'CHF 2.24', discount: 20 },
      { name: 'Avocado', sub: 'Ripe & ready', price: 'CHF 1.76', discount: 20 },
      { name: 'Grapes', sub: '500 g', price: 'CHF 3.00', discount: 25 },
      { name: 'Bell Peppers', sub: '3 pcs', price: 'CHF 2.80', discount: 15 },
    ],
  },
  {
    key: 'Dairy',
    deals: [
      { name: 'Greek Yoghurt', sub: '500 g', price: 'CHF 2.60', discount: 30 },
      { name: 'Gruyère AOP', sub: '200 g', price: 'CHF 5.10', discount: 15 },
    ],
  },
  {
    key: 'Bakery',
    deals: [
      { name: 'Baguette', sub: 'fresh', price: 'CHF 1.20', discount: 20 },
      { name: 'Croissant', sub: '2 pcs', price: 'CHF 1.65', discount: 25 },
    ],
  },
  {
    key: 'Snacks',
    deals: [
      { name: 'Dark Chocolate', sub: '100 g · 70%', price: 'CHF 2.04', discount: 15 },
      { name: 'Potato Chips', sub: '175 g', price: 'CHF 2.24', discount: 20 },
      { name: 'Salted Nuts', sub: '200 g', price: 'CHF 3.20', discount: 30 },
    ],
  },
]

function getScrollParent(node: HTMLElement | null): HTMLElement | null {
  let el = node?.parentElement || null
  while (el) {
    const oy = getComputedStyle(el).overflowY
    if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight) return el
    el = el.parentElement
  }
  return null
}

export default function PromotionsPage() {
  const fresh = useFreshDesign()
  const rootRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLElement | null>(null)
  const sectionEls = useRef<Record<string, HTMLDivElement | null>>({})
  const programmatic = useRef(false)
  const [active, setActive] = useState(SECTIONS[0].key)

  useEffect(() => {
    const scroller = getScrollParent(rootRef.current)
    scrollerRef.current = scroller
    if (!scroller) return
    const onScroll = () => {
      if (programmatic.current) return
      const threshold = scroller.getBoundingClientRect().top + 88
      let current = SECTIONS[0].key
      for (const s of SECTIONS) {
        const el = sectionEls.current[s.key]
        if (el && el.getBoundingClientRect().top <= threshold) current = s.key
      }
      setActive(current)
    }
    scroller.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => scroller.removeEventListener('scroll', onScroll)
  }, [])

  const jumpTo = (key: string) => {
    setActive(key)
    const el = sectionEls.current[key]
    const scroller = scrollerRef.current
    if (!el || !scroller) return
    programmatic.current = true
    const target = scroller.scrollTop + el.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 72
    scroller.scrollTo({ top: Math.max(0, target), behavior: 'smooth' })
    window.setTimeout(() => {
      programmatic.current = false
    }, 700)
  }

  return (
    <div ref={rootRef}>
      <PageTitle>Promotions</PageTitle>

      {/* Category scroll-spy */}
      <div className="sticky top-0 z-20 border-b border-hairline bg-cream/90 py-2 backdrop-blur">
        <FilterChips items={SECTIONS.map((s) => s.key)} value={active} onChange={jumpTo} />
      </div>

      {/* Wine Festival banner (compact) */}
      <div className="px-4 pt-3">
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
            <Button variant="secondary" onClick={fresh ? () => jumpTo('Fruit & Veg') : undefined} className="shrink-0 !px-4 !py-2 !text-[13px] !text-[#7B2D4E]">
              Explore
            </Button>
          </div>
        </Card>
      </div>

      {/* Sections */}
      {SECTIONS.map((s) => (
        <div
          key={s.key}
          ref={(el) => {
            sectionEls.current[s.key] = el
          }}
        >
          <SectionLabel>{s.key}</SectionLabel>
          <div className="mx-4 space-y-3">
            {s.deals.map((d) => (
              <ShoppingProductCard key={d.name} {...d} />
            ))}
          </div>
        </div>
      ))}

      <div className="h-44" />
    </div>
  )
}
