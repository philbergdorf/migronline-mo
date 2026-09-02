import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScanBarcode, Heart, Sparkles, LayoutGrid, Package, ChevronRight } from 'lucide-react'
import {
  PageTitle,
  SectionLabel,
  SearchField,
  ListGroup,
  NavRow,
  ProductRow,
  Badge,
} from '../components/ui'

const TOP_PRODUCTS = [
  { name: 'Whole Milk', sub: '1 L · UHT', price: 'CHF 1.60', emoji: '🥛', gradient: 'from-primary/15 to-sand' },
  { name: 'Bio Bananas', sub: '1 kg', price: 'CHF 3.20', emoji: '🍌', gradient: 'from-citrus/30 to-primary/15' },
  { name: 'Sourdough Bread', sub: '500 g', price: 'CHF 4.50', emoji: '🍞', badge: <Badge tone="fresh">Fresh</Badge>, gradient: 'from-citrus/25 to-tomato/15' },
  { name: 'Free-range Eggs', sub: '10 pcs', price: 'CHF 5.90', emoji: '🥚', gradient: 'from-sand to-citrus/20' },
  { name: 'Cherry Tomatoes', sub: '250 g', price: 'CHF 2.80', emoji: '🍅', gradient: 'from-tomato/25 to-berry/15' },
  { name: 'Greek Yoghurt', sub: '500 g', price: 'CHF 2.60', emoji: '🍦', gradient: 'from-primary/15 to-sand' },
  { name: 'Butter', sub: '250 g', price: 'CHF 2.40', emoji: '🧈', gradient: 'from-citrus/25 to-sand' },
  { name: 'Apples', sub: '1 kg · Gala', price: 'CHF 3.60', emoji: '🍎', gradient: 'from-tomato/20 to-primary/15' },
  { name: 'Chicken Breast', sub: '500 g', price: 'CHF 8.90', emoji: '🍗', gradient: 'from-sand to-tomato/15' },
  { name: 'Pasta', sub: 'Penne · 500 g', price: 'CHF 1.80', emoji: '🍝', gradient: 'from-citrus/30 to-sand' },
  { name: 'Orange Juice', sub: '1 L', price: 'CHF 2.90', emoji: '🧃', gradient: 'from-citrus/30 to-primary/15' },
  { name: 'Dark Chocolate', sub: '100 g · 70%', price: 'CHF 2.40', emoji: '🍫', gradient: 'from-berry/20 to-forest/15' },
]

// Staples only — non-perishable household & pantry items you restock on a cycle.
const RUNNING_LOW = [
  { name: 'Laundry Detergent', sub: 'Last bought 7 weeks ago', price: 'CHF 12.90', emoji: '🧴', gradient: 'from-primary/15 to-sand' },
  { name: 'Toilet Paper', sub: 'Last bought 4 weeks ago', price: 'CHF 4.80', emoji: '🧻', gradient: 'from-primary/12 to-citrus/15' },
  { name: 'Dishwasher Tabs', sub: 'Last bought 6 weeks ago', price: 'CHF 7.40', emoji: '🧼', gradient: 'from-citrus/20 to-sand' },
  { name: 'Rice', sub: 'Last bought 5 weeks ago', price: 'CHF 3.40', emoji: '🍚', gradient: 'from-sand to-primary/12' },
  { name: 'Pasta', sub: 'Last bought 3 weeks ago', price: 'CHF 1.80', emoji: '🍝', gradient: 'from-citrus/30 to-sand' },
  { name: 'Olive Oil', sub: 'Last bought 5 weeks ago', price: 'CHF 8.50', emoji: '🫒', gradient: 'from-citrus/25 to-primary/15' },
  { name: 'Coffee Beans', sub: 'Last bought 2 weeks ago', price: 'CHF 6.90', emoji: '☕', gradient: 'from-berry/15 to-forest/15' },
]

export default function ProductsPage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  return (
    <>
      <PageTitle>Products</PageTitle>

      {/* Search + barcode scan */}
      <div className="flex items-stretch gap-2 px-4">
        <SearchField
          className="flex-1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products"
        />
        <button
          type="button"
          aria-label="Scan barcode"
          className="grid w-[52px] shrink-0 place-items-center rounded-btn bg-surface text-forest shadow-[inset_0_0_0_1px_#d9d9d9] transition active:scale-95"
        >
          <ScanBarcode size={22} strokeWidth={2} />
        </button>
      </div>

      {/* Quick entries */}
      <div className="pt-4">
        <ListGroup>
          <NavRow
            icon={<Heart size={18} strokeWidth={2} />}
            tint="bg-tomato/12 text-tomato"
            label="Favorites"
            onClick={() => navigate('/products')}
          />
          <NavRow
            icon={<Sparkles size={18} strokeWidth={2} />}
            tint="bg-citrus/15 text-citrus"
            label="Newly available"
            onClick={() => navigate('/products')}
          />
          <NavRow
            icon={<LayoutGrid size={18} strokeWidth={2} />}
            tint="bg-primary/12 text-forest"
            label="Categories"
            onClick={() => navigate('/products')}
          />
          <NavRow
            icon={<Package size={18} strokeWidth={2} />}
            tint="bg-berry/12 text-berry"
            label="Your recent orders"
            onClick={() => navigate('/products')}
          />
        </ListGroup>
      </div>

      {/* Your top products */}
      <SectionLabel>Your top products</SectionLabel>
      <ListGroup>
        {TOP_PRODUCTS.map((p) => (
          <ProductRow key={p.name} bare {...p} />
        ))}
        <button
          type="button"
          onClick={() => navigate('/top-products')}
          className="flex w-full items-center justify-center gap-1 px-3 py-3.5 text-[15px] font-bold text-forest transition active:bg-sand/60"
        >
          Show all
          <ChevronRight size={16} strokeWidth={2.5} />
        </button>
      </ListGroup>

      {/* Running low? */}
      <SectionLabel>Running low?</SectionLabel>
      <ListGroup>
        {RUNNING_LOW.map((p) => (
          <ProductRow key={p.name} bare {...p} />
        ))}
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="flex w-full items-center justify-center gap-1 px-3 py-3.5 text-[15px] font-bold text-forest transition active:bg-sand/60"
        >
          Show all
          <ChevronRight size={16} strokeWidth={2.5} />
        </button>
      </ListGroup>

      <div className="h-28" />
    </>
  )
}
