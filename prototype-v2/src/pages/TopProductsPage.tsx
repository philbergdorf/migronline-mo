import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { Badge } from '../components/ui'
import GroupedProductList from '../components/GroupedProductList'

const CATEGORIES = [
  {
    key: 'Fruit & Veg',
    products: [
      { name: 'Bio Bananas', sub: '1 kg', price: 'CHF 3.20' },
      { name: 'Apples', sub: '1 kg · Gala', price: 'CHF 3.60' },
      { name: 'Cherry Tomatoes', sub: '250 g', price: 'CHF 2.80' },
      { name: 'Avocado', sub: 'Ripe & ready', price: 'CHF 2.20' },
    ],
  },
  {
    key: 'Dairy',
    products: [
      { name: 'Whole Milk', sub: '1 L · UHT', price: 'CHF 1.60' },
      { name: 'Free-range Eggs', sub: '10 pcs', price: 'CHF 5.90' },
      { name: 'Greek Yoghurt', sub: '500 g', price: 'CHF 2.60' },
      { name: 'Butter', sub: '250 g', price: 'CHF 2.40' },
    ],
  },
  {
    key: 'Bakery',
    products: [
      { name: 'Sourdough Bread', sub: '500 g', price: 'CHF 4.50', badge: <Badge tone="fresh">Fresh</Badge> },
      { name: 'Croissant', sub: '2 pcs', price: 'CHF 2.20' },
      { name: 'Pretzel', sub: '1 pc', price: 'CHF 1.40' },
    ],
  },
  {
    key: 'Pantry',
    products: [
      { name: 'Pasta', sub: 'Penne · 500 g', price: 'CHF 1.80' },
      { name: 'Olive Oil', sub: '500 ml', price: 'CHF 8.50' },
      { name: 'Rice', sub: '1 kg · basmati', price: 'CHF 3.40' },
    ],
  },
  {
    key: 'Drinks',
    products: [
      { name: 'Orange Juice', sub: '1 L', price: 'CHF 2.90' },
      { name: 'Sparkling Water', sub: '6 × 1.5 L', price: 'CHF 4.20' },
      { name: 'Coffee Beans', sub: '500 g', price: 'CHF 6.90' },
    ],
  },
  {
    key: 'Snacks',
    products: [
      { name: 'Dark Chocolate', sub: '100 g · 70%', price: 'CHF 2.40', badge: <Badge tone="sale">15%</Badge> },
      { name: 'Potato Chips', sub: '175 g', price: 'CHF 2.80' },
      { name: 'Almonds', sub: '200 g', price: 'CHF 4.60' },
    ],
  },
]

export default function TopProductsPage() {
  const navigate = useNavigate()

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pb-2 pt-[calc(env(safe-area-inset-top)+1.75rem)]">
        <button
          type="button"
          aria-label="Back to Products"
          onClick={() => navigate('/products')}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-hairline bg-surface text-forest shadow-soft transition active:scale-95"
        >
          <ChevronLeft size={20} strokeWidth={2.2} />
        </button>
        <h1 className="font-display text-[28px] font-bold text-forest">Your regular buys</h1>
      </div>

      <GroupedProductList groups={CATEGORIES} />
    </>
  )
}
