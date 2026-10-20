import { useLayoutEffect, useRef, type MutableRefObject } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, PackageCheck } from 'lucide-react'
import { ORDER_HISTORY, formatOrderDate, formatOrderMonth, formatOrderTotal, orderItemCount, type PreviousOrder } from '../lib/recentOrders'
import { ProductSubpageHeader } from '../components/ProductSubpage'

const MONTHS = Array.from(ORDER_HISTORY.orders.reduce((months, order) => {
  const key = order.date.slice(0, 7)
  months.set(key, [...(months.get(key) ?? []), order])
  return months
}, new Map<string, PreviousOrder[]>()))

export default function RecentOrdersPage({ scrollPosition }: { scrollPosition: MutableRefObject<number> }) {
  const rootRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const scroller = rootRef.current?.closest<HTMLElement>('.overflow-auto')
    if (!scroller) return
    scroller.scrollTop = scrollPosition.current
    const save = () => { scrollPosition.current = scroller.scrollTop }
    scroller.addEventListener('scroll', save, { passive: true })
    return () => scroller.removeEventListener('scroll', save)
  }, [scrollPosition])

  return <div ref={rootRef}>
    <ProductSubpageHeader title="Recent orders" description="All your orders from the last 6 months." />
    <p className="px-5 pb-1 text-sm text-muted">{ORDER_HISTORY.orders.length} orders · {formatOrderDate(ORDER_HISTORY.from)} – {formatOrderDate(ORDER_HISTORY.to)}</p>
    {MONTHS.map(([month, orders]) => <section key={month} aria-labelledby={`orders-${month}`} className="px-4 pt-5">
      <h2 id={`orders-${month}`} className="px-1 pb-3 text-base font-bold text-ink">{formatOrderMonth(orders[0].date)}</h2>
      <ul className="space-y-3">
        {orders.map(order => <li key={order.id}>
          <Link to={`/products/orders/${order.id}`} aria-label={`Order ${order.id}, ${formatOrderDate(order.date)}, ${formatOrderTotal(order.totalCents)}`} className="flex items-center gap-3 rounded-xl border border-hairline bg-surface px-3 py-4 text-ink shadow-soft active:bg-sand/40">
            <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><PackageCheck size={20} /></span>
            <span className="min-w-0 flex-1"><strong className="block text-[15px] leading-snug">{formatOrderDate(order.date)}</strong><span className="mt-1 block text-xs leading-relaxed text-muted">{orderItemCount(order)} items · {order.id}</span></span>
            <strong className="shrink-0 whitespace-nowrap text-sm">{formatOrderTotal(order.totalCents)}</strong>
            <ChevronRight size={17} className="shrink-0 text-muted" aria-hidden="true" />
          </Link>
        </li>)}
      </ul>
    </section>)}
    <div className="h-44" />
  </div>
}
