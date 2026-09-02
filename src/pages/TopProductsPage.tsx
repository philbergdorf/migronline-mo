import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { SectionLabel, ListGroup, ProductRow, FilterChips, Badge } from '../components/ui'

const CATEGORIES = [
  {
    key: 'Fruit & Veg',
    products: [
      { name: 'Bio Bananas', sub: '1 kg', price: 'CHF 3.20', emoji: '🍌', gradient: 'from-citrus/30 to-primary/15' },
      { name: 'Apples', sub: '1 kg · Gala', price: 'CHF 3.60', emoji: '🍎', gradient: 'from-tomato/20 to-primary/15' },
      { name: 'Cherry Tomatoes', sub: '250 g', price: 'CHF 2.80', emoji: '🍅', gradient: 'from-tomato/25 to-berry/15' },
      { name: 'Avocado', sub: 'Ripe & ready', price: 'CHF 2.20', emoji: '🥑', gradient: 'from-primary/25 to-citrus/20' },
    ],
  },
  {
    key: 'Dairy',
    products: [
      { name: 'Whole Milk', sub: '1 L · UHT', price: 'CHF 1.60', emoji: '🥛', gradient: 'from-primary/15 to-sand' },
      { name: 'Free-range Eggs', sub: '10 pcs', price: 'CHF 5.90', emoji: '🥚', gradient: 'from-sand to-citrus/20' },
      { name: 'Greek Yoghurt', sub: '500 g', price: 'CHF 2.60', emoji: '🍦', gradient: 'from-primary/15 to-sand' },
      { name: 'Butter', sub: '250 g', price: 'CHF 2.40', emoji: '🧈', gradient: 'from-citrus/25 to-sand' },
    ],
  },
  {
    key: 'Bakery',
    products: [
      { name: 'Sourdough Bread', sub: '500 g', price: 'CHF 4.50', emoji: '🍞', badge: <Badge tone="fresh">Fresh</Badge>, gradient: 'from-citrus/25 to-tomato/15' },
      { name: 'Croissant', sub: '2 pcs', price: 'CHF 2.20', emoji: '🥐', gradient: 'from-citrus/30 to-sand' },
      { name: 'Pretzel', sub: '1 pc', price: 'CHF 1.40', emoji: '🥨', gradient: 'from-sand to-tomato/15' },
    ],
  },
  {
    key: 'Pantry',
    products: [
      { name: 'Pasta', sub: 'Penne · 500 g', price: 'CHF 1.80', emoji: '🍝', gradient: 'from-citrus/30 to-sand' },
      { name: 'Olive Oil', sub: '500 ml', price: 'CHF 8.50', emoji: '🫒', gradient: 'from-citrus/25 to-primary/15' },
      { name: 'Rice', sub: '1 kg · basmati', price: 'CHF 3.40', emoji: '🍚', gradient: 'from-sand to-primary/12' },
    ],
  },
  {
    key: 'Drinks',
    products: [
      { name: 'Orange Juice', sub: '1 L', price: 'CHF 2.90', emoji: '🧃', gradient: 'from-citrus/30 to-primary/15' },
      { name: 'Sparkling Water', sub: '6 × 1.5 L', price: 'CHF 4.20', emoji: '💧', gradient: 'from-primary/15 to-sand' },
      { name: 'Coffee Beans', sub: '500 g', price: 'CHF 6.90', emoji: '☕', gradient: 'from-berry/15 to-forest/15' },
    ],
  },
  {
    key: 'Snacks',
    products: [
      { name: 'Dark Chocolate', sub: '100 g · 70%', price: 'CHF 2.40', emoji: '🍫', badge: <Badge tone="sale">-15%</Badge>, gradient: 'from-berry/20 to-forest/15' },
      { name: 'Potato Chips', sub: '175 g', price: 'CHF 2.80', emoji: '🥔', gradient: 'from-citrus/30 to-tomato/15' },
      { name: 'Almonds', sub: '200 g', price: 'CHF 4.60', emoji: '🥜', gradient: 'from-sand to-citrus/20' },
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

export default function TopProductsPage() {
  const navigate = useNavigate()
  const rootRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLElement | null>(null)
  const sectionEls = useRef<Record<string, HTMLDivElement | null>>({})
  const programmatic = useRef(false)
  const [active, setActive] = useState(CATEGORIES[0].key)

  useEffect(() => {
    const scroller = getScrollParent(rootRef.current)
    scrollerRef.current = scroller
    if (!scroller) return
    scroller.scrollTop = 0
    const onScroll = () => {
      if (programmatic.current) return
      const threshold = scroller.getBoundingClientRect().top + 88
      let current = CATEGORIES[0].key
      for (const c of CATEGORIES) {
        const el = sectionEls.current[c.key]
        if (el && el.getBoundingClientRect().top <= threshold) current = c.key
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
    const target =
      scroller.scrollTop + el.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 72
    scroller.scrollTo({ top: Math.max(0, target), behavior: 'smooth' })
    window.setTimeout(() => {
      programmatic.current = false
    }, 700)
  }

  return (
    <div ref={rootRef}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pb-2 pt-[calc(env(safe-area-inset-top)+1.75rem)]">
        <button
          type="button"
          aria-label="Back"
          onClick={() => navigate(-1)}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-hairline bg-surface text-forest shadow-soft transition active:scale-95"
        >
          <ChevronLeft size={20} strokeWidth={2.2} />
        </button>
        <h1 className="font-display text-[28px] font-bold text-forest">Top products</h1>
      </div>

      {/* Sticky scroll-spy */}
      <div className="sticky top-0 z-20 border-b border-hairline bg-cream/90 py-2 backdrop-blur">
        <FilterChips items={CATEGORIES.map((c) => c.key)} value={active} onChange={jumpTo} />
      </div>

      {CATEGORIES.map((c) => (
        <div
          key={c.key}
          ref={(el) => {
            sectionEls.current[c.key] = el
          }}
        >
          <SectionLabel>{c.key}</SectionLabel>
          <ListGroup>
            {c.products.map((p) => (
              <ProductRow key={p.name} bare {...p} />
            ))}
          </ListGroup>
        </div>
      ))}

      <div className="h-28" />
    </div>
  )
}
