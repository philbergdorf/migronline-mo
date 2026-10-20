import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import ShoppingProductCard from '../components/ShoppingProductCard'
import { RUNNING_LOW } from '../lib/runningLow'

export default function RunningLowPage() {
  const navigate = useNavigate()
  return <div className="px-4 pt-6 pb-44">
    <div className="flex items-center gap-3">
      <button type="button" aria-label="Back to Products" onClick={() => navigate('/products')}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-hairline bg-surface text-primary">
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <h1 className="font-display text-[28px] font-bold">Running low?</h1>
    </div>
    <p className="mb-5 mt-3 text-sm text-muted">Essentials you may need soon, based on your previous orders.</p>
    <div className="space-y-3">
      {RUNNING_LOW.map(product => <ShoppingProductCard key={product.name} {...product} />)}
    </div>
  </div>
}
