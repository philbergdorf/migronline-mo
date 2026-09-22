import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ShoppingProductCard from './ShoppingProductCard'

export type ProductItem = { name: string; sub: string; price: string; discount?: number }

export function ProductSubpageHeader({ title, description }: { title: string; description?: string }) {
  const navigate = useNavigate()
  return <header className="px-4 pb-3 pt-[calc(env(safe-area-inset-top)+1.75rem)]">
    <div className="flex items-center gap-3">
      <button type="button" aria-label="Back to Products" onClick={() => navigate('/products')} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-hairline bg-surface text-forest shadow-soft active:scale-95">
        <ChevronLeft size={20} strokeWidth={2.2} />
      </button>
      <h1 className="font-display text-[28px] font-bold text-ink">{title}</h1>
    </div>
    {description && <p className="ml-12 mt-1 text-[13px] leading-relaxed text-label">{description}</p>}
  </header>
}

export function ProductCardList({ products }: { products: ProductItem[] }) {
  return <div className="mx-4 space-y-3">
    {products.map(product => <ShoppingProductCard key={product.name} {...product} />)}
  </div>
}
