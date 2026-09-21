import { useMemo, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import ProductImage from '../components/ProductImage'
import { useBasket, type BasketLine } from '../lib/basket'
import { PageTitle, SectionLabel, OrderSummary, ListGroup, HScroll, ProductCard } from '../components/ui'

const MIN_ORDER = 60


const FORGOT = [
  { name: 'Sparkling Water', sub: '6 × 1.5 L', price: 'CHF 4.20' },
  { name: 'Butter', sub: '250 g', price: 'CHF 2.40' },
  { name: 'Coffee Beans', sub: '500 g', price: 'CHF 6.90' },
  { name: 'Olive Oil', sub: '500 ml', price: 'CHF 8.50' },
]

const chf = (n: number) => `CHF ${n.toFixed(2)}`

function Stepper({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div className="inline-flex items-center gap-0.5 rounded-full bg-sand p-0.5" role="group" aria-label={label}>
      <button
        type="button"
        aria-label="Decrease"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="grid h-8 w-8 place-items-center rounded-full bg-surface text-forest transition active:scale-95"
      >
        <Minus size={15} strokeWidth={2.5} />
      </button>
      <span className="min-w-[22px] text-center text-[14px] font-extrabold text-ink">{value}</span>
      <button
        type="button"
        aria-label="Increase"
        onClick={() => onChange(value + 1)}
        className="grid h-8 w-8 place-items-center rounded-full bg-primary text-white transition active:scale-95"
      >
        <Plus size={15} strokeWidth={2.5} />
      </button>
    </div>
  )
}

export default function BasketPage() {
  const { lines, setQty } = useBasket()
  const [view, setView] = useState<'categories' | 'meals'>('categories')

  const groups = useMemo(() => {
    const key = view === 'categories' ? 'category' : 'meal'
    const map = new Map<string, BasketLine[]>()
    for (const l of lines) {
      if (l.qty === 0) continue
      const g = l[key]
      if (!map.has(g)) map.set(g, [])
      map.get(g)!.push(l)
    }
    return [...map.entries()].map(([name, items]) => ({ name, items }))
  }, [lines, view])

  const subtotal = lines.reduce((sum, l) => sum + l.unit * l.qty, 0)
  const delivery = 5.9
  const total = subtotal + delivery
  const itemCount = lines.reduce((n, l) => n + l.qty, 0)

  const totalSaved = lines.reduce((sum, l) => sum + (l.saved ?? 0) * l.qty, 0)
  const remaining = Math.max(0, MIN_ORDER - subtotal)
  const belowMin = remaining > 0
  const pct = Math.min(100, (subtotal / MIN_ORDER) * 100)

  return (
    <>
      <PageTitle>Basket</PageTitle>

      {/* Categories / Meals toggle */}
      <div className="px-4">
        <div className="flex rounded-full bg-sand p-1">
          {(['categories', 'meals'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`flex-1 rounded-full py-2 text-[14px] font-bold capitalize transition ${
                view === v ? 'bg-surface text-forest shadow-soft' : 'text-muted'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Grouped, compact item list */}
      {groups.map((g) => (
        <div key={g.name}>
          <SectionLabel>{g.name}</SectionLabel>
          <ListGroup>
            {g.items.map((l) => (
              <div key={l.name} className="flex items-center gap-3 px-3 py-2">
                <div className="h-14 w-12 shrink-0 rounded bg-white p-1">
                  <ProductImage name={l.name} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[14px] font-extrabold text-ink">{l.name}</div>
                  <div className="font-display text-[14px] font-bold text-ink">{chf(l.unit * l.qty)}</div>
                </div>
                <Stepper value={l.qty} onChange={(q) => setQty(l.name, q)} label={`Quantity of ${l.name}`} />
              </div>
            ))}
          </ListGroup>
        </div>
      ))}

      {/* Summary */}
      <SectionLabel>{itemCount} items · Summary</SectionLabel>
      <div className="px-4">
        <OrderSummary
          rows={[
            { label: 'Subtotal', value: chf(subtotal) },
            { label: 'Delivery', value: chf(delivery) },
          ]}
          saved={totalSaved > 0 ? chf(totalSaved) : undefined}
          total={{ label: 'Total', value: chf(total) }}
        />
      </div>

      {/* Did you forget? */}
      <SectionLabel>Did you forget?</SectionLabel>
      <HScroll>
        {FORGOT.map((p) => (
          <div key={p.name} className="w-40 shrink-0">
            <ProductCard {...p} />
          </div>
        ))}
      </HScroll>

      <div className="h-4" />

      {/* Sticky checkout — button doubles as the min-order progress bar */}
      <div className="sticky bottom-0 z-30 border-t border-hairline bg-cream/95 px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+5.5rem)] backdrop-blur">
        <button
          type="button"
          disabled={belowMin}
          className={`relative w-full overflow-hidden rounded-lg py-[18px] font-display text-[17px] font-bold transition ${
            belowMin ? 'cursor-not-allowed bg-primary/15 text-ink' : 'bg-forest text-white shadow-checkout'
          }`}
        >
          {belowMin && (
            <span
              className="absolute inset-y-0 left-0 bg-primary/40 transition-all"
              style={{ width: `${pct}%` }}
              aria-hidden
            />
          )}
          <span className="relative z-10">
            {belowMin ? `${chf(remaining)} to CHF 60.– minimum` : `Checkout · ${chf(total)}`}
          </span>
        </button>
      </div>
    </>
  )
}
