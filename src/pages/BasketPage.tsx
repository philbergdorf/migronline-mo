import { useMemo, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { PageTitle, SectionLabel, OrderSummary, ListGroup, HScroll, ProductCard } from '../components/ui'

const MIN_ORDER = 60

type Line = {
  name: string
  unit: number
  emoji: string
  qty: number
  category: string
  meal: string
  saved?: number // savings per unit vs. regular price
}

const INITIAL: Line[] = [
  { name: 'Bio Bananas', unit: 3.2, emoji: '🍌', qty: 2, category: 'Fruit & Veg', meal: 'Breakfast', saved: 0.4 },
  { name: 'Whole Milk', unit: 1.6, emoji: '🥛', qty: 1, category: 'Dairy', meal: 'Breakfast' },
  { name: 'Free-range Eggs', unit: 5.9, emoji: '🥚', qty: 1, category: 'Dairy', meal: 'Breakfast' },
  { name: 'Spaghetti', unit: 1.8, emoji: '🍝', qty: 1, category: 'Pantry', meal: 'Pasta Carbonara' },
  { name: 'Pecorino', unit: 4.2, emoji: '🧀', qty: 1, category: 'Dairy', meal: 'Pasta Carbonara', saved: 0.8 },
  { name: 'Guanciale', unit: 5.5, emoji: '🥓', qty: 1, category: 'Meat', meal: 'Pasta Carbonara' },
  { name: 'Cherry Tomatoes', unit: 2.8, emoji: '🍅', qty: 1, category: 'Fruit & Veg', meal: 'Tomato & Basil Salad', saved: 0.6 },
  { name: 'Mozzarella', unit: 2.4, emoji: '🧀', qty: 1, category: 'Dairy', meal: 'Tomato & Basil Salad' },
]

const FORGOT = [
  { name: 'Sparkling Water', sub: '6 × 1.5 L', price: 'CHF 4.20', emoji: '💧', gradient: 'from-primary/15 to-sand' },
  { name: 'Butter', sub: '250 g', price: 'CHF 2.40', emoji: '🧈', gradient: 'from-citrus/25 to-sand' },
  { name: 'Coffee Beans', sub: '500 g', price: 'CHF 6.90', emoji: '☕', gradient: 'from-berry/15 to-forest/15' },
  { name: 'Olive Oil', sub: '500 ml', price: 'CHF 8.50', emoji: '🫒', gradient: 'from-citrus/25 to-primary/15' },
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
  const [lines, setLines] = useState(INITIAL)
  const [view, setView] = useState<'categories' | 'meals'>('categories')

  const setQty = (name: string, qty: number) =>
    setLines((prev) => prev.map((l) => (l.name === name ? { ...l, qty } : l)))

  const groups = useMemo(() => {
    const key = view === 'categories' ? 'category' : 'meal'
    const map = new Map<string, Line[]>()
    for (const l of lines) {
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
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded bg-sand text-xl">
                  {l.emoji}
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
