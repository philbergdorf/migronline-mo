import { useState } from 'react'
import { Apple, Beef, Coffee, Cookie, Croissant, Milk, Package, SprayCan, Wine, type LucideIcon } from 'lucide-react'
import { PRODUCT_CATALOG } from '../lib/productCatalog'
import { ProductCardList, ProductSubpageHeader } from '../components/ProductSubpage'

type Category = { name: string; icon: LucideIcon; tint: string; products: string[] }
const CATEGORIES: Category[] = [
  { name: 'Fruit & vegetables', icon: Apple, tint: 'bg-[#E8F3DB] text-[#426524]', products: ['Bio Bananas', 'Apples', 'Cherry Tomatoes', 'Avocado', 'Grapes', 'Bell Peppers'] },
  { name: 'Dairy & eggs', icon: Milk, tint: 'bg-[#DEF4FF] text-[#14607F]', products: ['Whole Milk', 'Free-range Eggs', 'Greek Yoghurt', 'Butter', 'Gruyère AOP', 'Pecorino', 'Mozzarella'] },
  { name: 'Bakery', icon: Croissant, tint: 'bg-[#FFF0D8] text-[#8A5700]', products: ['Sourdough Bread', 'Baguette', 'Croissant', 'Pretzel'] },
  { name: 'Meat', icon: Beef, tint: 'bg-[#FCE4E2] text-[#A52723]', products: ['Chicken Breast', 'Guanciale'] },
  { name: 'Pantry', icon: Package, tint: 'bg-[#F2ECE5] text-[#6B513A]', products: ['Pasta', 'Spaghetti', 'Rice', 'Olive Oil'] },
  { name: 'Drinks', icon: Coffee, tint: 'bg-[#E7EEF8] text-[#355A88]', products: ['Orange Juice', 'Sparkling Water', 'Coffee Beans'] },
  { name: 'Wine', icon: Wine, tint: 'bg-[#F0E2E9] text-[#7B2D4E]', products: ['Rosé de Provence', 'Pinot Noir', 'Chasselas', 'Prosecco'] },
  { name: 'Snacks', icon: Cookie, tint: 'bg-[#FFF4C9] text-[#765100]', products: ['Dark Chocolate', 'Potato Chips', 'Almonds', 'Salted Nuts'] },
  { name: 'Household', icon: SprayCan, tint: 'bg-[#E8E8E8] text-[#595959]', products: ['Laundry Detergent', 'Toilet Paper', 'Dishwasher Tabs'] },
]

export default function ProductCategoriesPage() {
  const [selected, setSelected] = useState<Category | null>(null)
  const products = selected ? selected.products.flatMap(name => PRODUCT_CATALOG.filter(product => product.name === name)) : []
  return <>
    <ProductSubpageHeader title="Categories" description={selected ? `${products.length} products in ${selected.name}` : 'Browse the assortment by department.'} />
    {selected ? <>
      <button type="button" onClick={() => setSelected(null)} className="mx-4 mb-3 rounded-full border border-hairline bg-white px-4 py-2 text-[13px] font-bold text-primary active:bg-sand/40">All categories</button>
      <ProductCardList products={products} />
    </> : <div className="grid grid-cols-2 gap-3 px-4">
      {CATEGORIES.map(category => {
        const Icon = category.icon
        return <button key={category.name} type="button" onClick={() => setSelected(category)} className="min-h-[128px] rounded-xl border border-hairline bg-white p-4 text-left shadow-soft active:scale-[0.98]">
          <span className={`grid h-11 w-11 place-items-center rounded-lg ${category.tint}`}><Icon size={23} strokeWidth={2} /></span>
          <strong className="mt-4 block text-[15px] leading-tight text-ink">{category.name}</strong>
          <span className="mt-1 block text-[12px] text-label">{category.products.length} products</span>
        </button>
      })}
    </div>}
    <div className="h-44" />
  </>
}
