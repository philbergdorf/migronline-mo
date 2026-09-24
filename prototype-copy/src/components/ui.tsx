import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { Search, Plus, Minus, Check, User, Clock, ChevronRight } from 'lucide-react'
import ProductImage from './ProductImage'
import ProductQuantityControl from './ProductQuantityControl'

/* ---------------------------------------------------------------------------
   Layout / typography
--------------------------------------------------------------------------- */

/** Large display page title (Fredoka), with an optional trailing action. */
export function PageTitle({
  children,
  action,
}: {
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="ui-page-title flex items-center justify-between gap-3 px-5 pb-1 pt-[calc(env(safe-area-inset-top)+2.75rem)]">
      <h1 className="font-display text-[32px] font-extrabold leading-tight text-ink">
        {children}
      </h1>
      {action}
    </div>
  )
}

/** Circular profile button for a page header's top-right corner. */
export function ProfileButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-label="Account"
      onClick={onClick}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-hairline bg-surface text-forest shadow-soft transition-transform duration-150 ease-bounce active:scale-95"
    >
      <User size={22} strokeWidth={2} />
    </button>
  )
}

/** Uppercase section label, with an optional trailing action (e.g. "See all"). */
export function SectionLabel({
  children,
  action,
}: {
  children: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="ui-section-label flex items-center justify-between gap-3 px-5 pb-2 pt-6">
      <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-label">
        {children}
      </span>
      {action}
    </div>
  )
}

/** Generic Harvest surface card. */
export function Card({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`ui-card rounded-card border border-hairline bg-surface shadow-soft ${className}`}
    >
      {children}
    </div>
  )
}

/** Delivery slot summary with a "Change" action. */
export function DeliverySlotCard({ onChange }: { onChange?: () => void }) {
  return (
    <Card className="flex items-center justify-between gap-3 p-4">
      <p className="text-[14px] font-bold text-muted">
        Delivery to 8005 Zürich
        <br />
        <span className="font-semibold text-label">Today 17:00–18:00</span>
      </p>
      <Button variant="outline" onClick={onChange}>
        Change
      </Button>
    </Card>
  )
}

/** Horizontal, edge-to-edge scrolling row (e.g. product/recipe sliders). */
export function HScroll({ children }: { children: ReactNode }) {
  return (
    <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-4 pt-1">{children}</div>
  )
}

/** Grouped list container — rounded surface card with divided rows. */
export function ListGroup({ children }: { children: ReactNode }) {
  return (
    <div className="ui-list mx-4 divide-y divide-hairline overflow-hidden rounded-lg border border-hairline bg-surface shadow-soft">
      {children}
    </div>
  )
}

/** A navigational list row: leading icon tile, label, trailing chevron. */
export function NavRow({
  icon,
  label,
  tint = 'bg-primary/12 text-forest',
  onClick,
}: {
  icon: ReactNode
  label: ReactNode
  tint?: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition active:bg-sand/60"
    >
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded ${tint}`}>
        {icon}
      </span>
      <span className="flex-1 text-[16px] font-bold text-ink">{label}</span>
      <ChevronRight size={18} className="shrink-0 text-black/25" />
    </button>
  )
}

/* ---------------------------------------------------------------------------
   Buttons
--------------------------------------------------------------------------- */

type Variant = 'primary' | 'secondary' | 'outline' | 'checkout' | 'disabled'

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-forest text-white shadow-cta px-[26px] py-[14px] text-[15px]',
  secondary:
    'bg-surface text-forest shadow-soft px-[26px] py-[14px] text-[15px]',
  outline:
    'bg-transparent text-primary border-2 border-primary px-[24px] py-[12px] text-[15px]',
  checkout:
    'w-full bg-forest text-white shadow-checkout py-[18px] text-[18px] !rounded-lg',
  disabled: 'bg-sand text-muted px-[26px] py-[14px] text-[15px] cursor-not-allowed',
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: {
  variant?: Variant
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      disabled={variant === 'disabled'}
      className={`inline-flex items-center justify-center gap-2 rounded-btn font-display font-bold transition-transform duration-150 ease-bounce ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

/** Compact 32px visual button with a comfortable 44px tap target. */
export function AddButton({
  label,
  onClick,
}: {
  label: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-lg text-white transition-transform duration-150 ease-bounce active:scale-95"
    >
      <span className="grid h-8 w-8 place-items-center rounded bg-primary">
        <Plus size={18} strokeWidth={2.5} />
      </span>
    </button>
  )
}

/* ---------------------------------------------------------------------------
   Badges & chips
--------------------------------------------------------------------------- */

const BADGE_TONES = {
  sale: 'bg-primary text-white',
  fresh: 'bg-forest text-white',
  citrus: 'bg-citrus text-ink',
  berry: 'bg-berry text-white',
} as const

export function Badge({
  tone = 'fresh',
  children,
}: {
  tone?: keyof typeof BADGE_TONES
  children: ReactNode
}) {
  return (
    <span
      className={`inline-block rounded px-[10px] py-[5px] text-[11px] font-extrabold ${BADGE_TONES[tone]}`}
    >
      {children}
    </span>
  )
}

export function FilterChips({
  items,
  value,
  onChange,
}: {
  items: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-1">
      {items.map((item) => {
        const selected = item === value
        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={`shrink-0 rounded-chip px-[18px] py-[9px] text-[14px] font-bold transition ${
              selected
                ? 'bg-forest text-white'
                : 'bg-surface text-ink shadow-chip'
            }`}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}

/* ---------------------------------------------------------------------------
   Inputs & controls
--------------------------------------------------------------------------- */

export function SearchField({
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className={`flex items-center gap-2 rounded-btn bg-surface px-[18px] py-[14px] shadow-[inset_0_0_0_1px_#d9d9d9] ${className}`}
    >
      <Search size={18} className="shrink-0 text-label" strokeWidth={2} />
      <input
        className="w-full bg-transparent text-[15px] font-semibold text-ink outline-none placeholder:font-normal placeholder:text-label"
        {...props}
      />
    </div>
  )
}

export function TextInput({
  label,
  ...props
}: { label?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-[13px] font-bold text-muted">{label}</span>
      )}
      <input
        className="w-full rounded-btn border-2 border-hairline bg-surface px-[18px] py-[14px] text-[15px] font-semibold text-ink outline-none transition-colors placeholder:font-normal placeholder:text-label focus:border-primary"
        {...props}
      />
    </label>
  )
}

export function QuantityStepper({
  value,
  onChange,
  min = 0,
  label = 'Quantity',
}: {
  value: number
  onChange: (v: number) => void
  min?: number
  label?: string
}) {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-lg bg-surface p-1 shadow-[inset_0_0_0_1px_#d9d9d9]"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        aria-label="Decrease"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="grid h-11 w-11 place-items-center rounded bg-sand text-forest transition active:scale-95"
      >
        <Minus size={18} strokeWidth={2.5} />
      </button>
      <span className="min-w-[44px] text-center text-[18px] font-extrabold text-ink">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase"
        onClick={() => onChange(value + 1)}
        className="grid h-11 w-11 place-items-center rounded bg-primary text-white transition active:scale-95"
      >
        <Plus size={18} strokeWidth={2.5} />
      </button>
    </div>
  )
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-[30px] w-[52px] shrink-0 rounded-full transition-colors ${
        checked ? 'bg-primary' : 'bg-sand'
      }`}
    >
      <span
        className={`absolute top-[3px] grid h-6 w-6 place-items-center rounded-full bg-white shadow transition-all ${
          checked ? 'left-[25px]' : 'left-[3px]'
        }`}
      >
        {checked && <Check size={14} strokeWidth={3} className="text-primary" />}
      </span>
    </button>
  )
}

export function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <span
        className={`grid h-[26px] w-[26px] place-items-center rounded border-2 transition ${
          checked ? 'border-primary bg-primary' : 'border-hairline bg-surface'
        }`}
      >
        {checked && <Check size={16} strokeWidth={3} className="text-white" />}
      </span>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-[15px] font-semibold text-ink">{label}</span>
    </label>
  )
}

/* ---------------------------------------------------------------------------
   Cards
--------------------------------------------------------------------------- */

export function ProductCard({
  name,
  sub,
  price,
  badge,
}: {
  name: string
  sub: string
  price: string
  badge?: ReactNode
}) {
  return (
    <div className="ui-product-card rounded-card border border-hairline bg-surface p-3">
      <div
        className="relative mb-3 h-[120px] rounded-lg bg-white p-2"
      >
        <ProductImage name={name} />
        {badge && <div className="absolute left-0 top-0">{badge}</div>}
      </div>
      <div className="text-[15px] font-extrabold text-ink">{name}</div>
      <div className="text-[12px] font-bold text-label">{sub}</div>
      <div className="product-card-purchase mt-2 flex flex-wrap items-center justify-between gap-2">
        <span className="font-display text-[18px] font-bold text-ink">{price}</span>
        <ProductQuantityControl name={name} price={price} />
      </div>
    </div>
  )
}

/**
 * Horizontal product card — image tile left, details + add button right.
 * `bare` drops the card chrome so it can sit inside a ListGroup with dividers.
 */
export function ProductRow({
  name,
  sub,
  price,
  badge,
  bare = false,
}: {
  name: string
  sub: string
  price: string
  badge?: ReactNode
  bare?: boolean
}) {
  return (
    <div
      className={
        bare
          ? 'ui-product-row flex items-center gap-3 px-3 py-2.5'
          : 'ui-product-row flex items-center gap-3 rounded-lg border border-hairline bg-surface px-3 py-2.5'
      }
    >
      <div
        className="relative h-[88px] w-[76px] shrink-0 rounded-lg bg-white p-2"
      >
        <ProductImage name={name} />
        {badge && <div className="absolute -left-1 -top-1">{badge}</div>}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-extrabold leading-tight text-ink">{name}</div>
        <div className="mt-0.5 text-[12px] font-bold leading-snug text-label">{sub}</div>
        <div className="mt-2 font-display text-[16px] font-bold text-ink">{price}</div>
        <div className="mt-2 flex justify-end"><ProductQuantityControl name={name} price={price} /></div>
      </div>
    </div>
  )
}

export function RecipeCard({
  name,
  time,
  image,
}: {
  name: string
  time: string
  image: string
}) {
  return (
    <div className="ui-product-card rounded-card border border-hairline bg-surface p-3">
      <img src={`${import.meta.env.BASE_URL}images/recipes/${image}.jpg`} alt={name} loading="lazy" className="mb-3 h-[110px] w-full rounded-lg object-cover" />
      <div className="text-[15px] font-extrabold leading-tight text-ink">{name}</div>
      <div className="mt-1.5 flex items-center gap-1 text-[13px] font-bold text-label">
        <Clock size={14} strokeWidth={2.2} /> {time}
      </div>
    </div>
  )
}

export function OrderSummary({
  title = 'Order summary',
  rows,
  total,
  saved,
}: {
  title?: string
  rows: { label: string; value: string }[]
  total: { label: string; value: string }
  saved?: string
}) {
  return (
    <div className="rounded-card bg-surface p-[18px] shadow-[inset_0_0_0_1px_#d9d9d9]">
      <h3 className="font-display text-[16px] font-bold text-ink">{title}</h3>
      <div className="mt-3 space-y-2">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between text-[14px] font-bold text-muted">
            <span>{r.label}</span>
            <span>{r.value}</span>
          </div>
        ))}
        {saved && (
          <div className="flex justify-between text-[14px] font-bold text-primary">
            <span>You saved</span>
            <span>−{saved}</span>
          </div>
        )}
      </div>
      <div className="my-3 border-t border-dashed border-hairline" />
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-extrabold text-ink">{total.label}</span>
        <span className="font-display text-[20px] font-bold text-ink">{total.value}</span>
      </div>
    </div>
  )
}
