import { useNavigate } from 'react-router-dom'
import { CUSTOMER_TOP_PRODUCTS } from '../lib/customerTopProducts'
import ShoppingProductCard from '../components/ShoppingProductCard'
import { Heart, Sparkles, LayoutGrid, Package, ChevronRight } from 'lucide-react'
import {
  PageTitle,
  SectionLabel,
  ListGroup,
  NavRow,
} from '../components/ui'

// Staples only — non-perishable household & pantry items you restock on a cycle.
const RUNNING_LOW = [
  { name: 'Laundry Detergent', sub: 'Last bought 7 weeks ago', price: 'CHF 12.90' },
  { name: 'Toilet Paper', sub: 'Last bought 4 weeks ago', price: 'CHF 4.80' },
  { name: 'Dishwasher Tabs', sub: 'Last bought 6 weeks ago', price: 'CHF 7.40' },
  { name: 'Rice', sub: 'Last bought 5 weeks ago', price: 'CHF 3.40' },
  { name: 'Pasta', sub: 'Last bought 3 weeks ago', price: 'CHF 1.80' },
  { name: 'Olive Oil', sub: 'Last bought 5 weeks ago', price: 'CHF 8.50' },
  { name: 'Coffee Beans', sub: 'Last bought 2 weeks ago', price: 'CHF 6.90' },
]

export default function ProductsPage() {
  const navigate = useNavigate()

  return (
    <>
      <PageTitle>Products</PageTitle>

      {/* Quick entries */}
      <div className="pt-4">
        <ListGroup>
          <NavRow
            icon={<Heart size={18} strokeWidth={2} />}
            tint="bg-tomato/12 text-tomato"
            label="Favorites"
            onClick={() => navigate('/products/favorites')}
          />
          <NavRow
            icon={<Sparkles size={18} strokeWidth={2} />}
            tint="bg-citrus/15 text-citrus"
            label="Newly available"
            onClick={() => navigate('/products/new')}
          />
          <NavRow
            icon={<LayoutGrid size={18} strokeWidth={2} />}
            tint="bg-primary/12 text-forest"
            label="Categories"
            onClick={() => navigate('/products/categories')}
          />
          <NavRow
            icon={<Package size={18} strokeWidth={2} />}
            tint="bg-berry/12 text-berry"
            label="Your recent orders"
            onClick={() => navigate('/products/orders')}
          />
        </ListGroup>
      </div>

      {/* Your top products */}
      <SectionLabel>Your top products</SectionLabel>
      <div className="mx-4 space-y-3">
        {CUSTOMER_TOP_PRODUCTS.map((p) => (
          <ShoppingProductCard key={p.name} {...p} />
        ))}
        <button
          type="button"
          onClick={() => navigate('/top-products')}
          className="flex w-full items-center justify-center gap-1 px-3 py-3.5 text-[15px] font-bold text-forest transition active:bg-sand/60"
        >
          Show all
          <ChevronRight size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* Running low? */}
      <SectionLabel>Running low?</SectionLabel>
      <div className="mx-4 space-y-3">
        {RUNNING_LOW.map((p) => (
          <ShoppingProductCard key={p.name} {...p} />
        ))}
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="flex w-full items-center justify-center gap-1 px-3 py-3.5 text-[15px] font-bold text-forest transition active:bg-sand/60"
        >
          Show all
          <ChevronRight size={16} strokeWidth={2.5} />
        </button>
      </div>

      <div className="h-44" />
    </>
  )
}
