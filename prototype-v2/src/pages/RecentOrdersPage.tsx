import { useState } from 'react'
import { Check, PackageCheck } from 'lucide-react'
import { PRODUCT_CATALOG } from '../lib/productCatalog'
import { useBasket } from '../lib/basket'
import { ProductCardList, ProductSubpageHeader, type ProductItem } from '../components/ProductSubpage'

const find = (names: string[]) => names.flatMap(name => PRODUCT_CATALOG.filter(product => product.name === name))
const ORDERS: { id: string; date: string; total: string; products: ProductItem[] }[] = [
  { id: 'MO-28461', date: '18 September', total: 'CHF 41.20', products: find(['Whole Milk', 'Bio Bananas', 'Free-range Eggs', 'Sourdough Bread']) },
  { id: 'MO-28193', date: '11 September', total: 'CHF 34.30', products: find(['Pasta', 'Olive Oil', 'Cherry Tomatoes', 'Mozzarella']) },
  { id: 'MO-27844', date: '3 September', total: 'CHF 29.70', products: find(['Coffee Beans', 'Dark Chocolate', 'Sparkling Water']) },
]

export default function RecentOrdersPage() {
  const { addProduct } = useBasket()
  const [open, setOpen] = useState(ORDERS[0].id)
  const [message, setMessage] = useState('')
  return <>
    <ProductSubpageHeader title="Recent orders" description="Review previous shops and add them again." />
    <div className="space-y-3 px-4">
      {ORDERS.map(order => <section key={order.id} className="overflow-hidden rounded-xl border border-hairline bg-white shadow-soft">
        <button type="button" aria-expanded={open === order.id} onClick={() => setOpen(open === order.id ? '' : order.id)} className="flex w-full items-center gap-3 p-4 text-left active:bg-sand/40">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/[0.10] text-primary"><PackageCheck size={21} /></span>
          <span className="min-w-0 flex-1"><strong className="block text-[15px] text-ink">{order.date}</strong><span className="text-[12px] text-label">{order.products.length} products · {order.id}</span></span>
          <strong className="text-[14px] text-ink">{order.total}</strong>
        </button>
        {open === order.id && <div className="border-t border-hairline pb-4 pt-3">
          <ProductCardList products={order.products} />
          <div className="px-4 pt-3"><button type="button" onClick={() => {
              order.products.forEach(product => addProduct(product))
              setMessage(`${order.products.length} products from ${order.date} added to basket.`)
            }} className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-[14px] font-bold text-white active:scale-[0.98]">
              <Check size={18} /> Add order to basket
            </button></div>
        </div>}
      </section>)}
    </div>
    <span role="status" className="sr-only">{message}</span>
    <div className="h-44" />
  </>
}
