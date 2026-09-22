import { useEffect, useState } from 'react'
import { ChevronDown, ChevronRight, PackageOpen } from 'lucide-react'
import { ProductCardList, ProductSubpageHeader, type ProductItem } from '../components/ProductSubpage'
import { PRODUCT_CATALOG } from '../lib/productCatalog'

type Level2Category = {
  name: string
  level3: string[]
  products?: string[]
  filters?: Record<string, string[]>
}

type Level1Category = {
  name: string
  groups: Level2Category[]
}

const CATEGORY_TREE: Level1Category[] = [
  { name: 'Special diets', groups: [
    { name: 'Vegetarian & vegan', level3: ['Vegan', 'Vegetarian', 'Plant-based alternatives'], products: ['Avocado', 'Mozzarella', 'Dark Chocolate'] },
    { name: 'Free from', level3: ['Gluten-free', 'Lactose-free', 'No added sugar'], products: ['Rice', 'Almonds'] },
  ] },
  { name: 'Fruits & vegetables', groups: [
    { name: 'Fruits', level3: ['Apples & pears', 'Citrus fruits', 'Berries', 'Grapes', 'Melons', 'Stone fruit', 'Exotic fruits', 'Bananas'], products: ['Bio Bananas', 'Apples', 'Grapes'], filters: { 'Apples & pears': ['Apples'], Grapes: ['Grapes'], Bananas: ['Bio Bananas'] } },
    { name: 'Vegetables', level3: ['Tomatoes', 'Cucumbers & avocados', 'Courgettes, aubergines & peppers', 'Beans & sweetcorn', 'Cauliflower, broccoli & cabbage', 'Mushrooms', 'Other vegetables'], products: ['Cherry Tomatoes', 'Avocado', 'Bell Peppers'], filters: { Tomatoes: ['Cherry Tomatoes'], 'Cucumbers & avocados': ['Avocado'], 'Courgettes, aubergines & peppers': ['Bell Peppers'] } },
    { name: 'Root vegetables', level3: ['Potatoes', 'Carrots', 'Onions & garlic', 'Other root vegetables'] },
    { name: 'Salad', level3: ['Leaf salads', 'Salad mixes', 'Salad vegetables'] },
    { name: 'Fresh herbs & spices', level3: ['Fresh herbs', 'Chillies', 'Ginger & turmeric'] },
    { name: 'Ready to use', level3: ['Prepared fruit', 'Prepared vegetables', 'Ready-made salads'] },
  ] },
  { name: 'Meat & fish', groups: [
    { name: 'Meat', level3: ['Beef', 'Pork', 'Veal', 'Lamb'] },
    { name: 'Poultry', level3: ['Chicken', 'Turkey', 'Other poultry'], products: ['Chicken Breast'], filters: { Chicken: ['Chicken Breast'] } },
    { name: 'Fish & seafood', level3: ['Fresh fish', 'Smoked fish', 'Shellfish'] },
    { name: 'Cold cuts', level3: ['Ham', 'Salami', 'Bacon & diced meat'], products: ['Guanciale'], filters: { 'Bacon & diced meat': ['Guanciale'] } },
  ] },
  { name: 'Dairy, eggs & fresh convenience food', groups: [
    { name: 'Milk, butter & eggs', level3: ['Milk', 'Butter & margarine', 'Eggs', 'Cream'], products: ['Whole Milk', 'Butter', 'Free-range Eggs'], filters: { Milk: ['Whole Milk'], 'Butter & margarine': ['Butter'], Eggs: ['Free-range Eggs'] } },
    { name: 'Cheese', level3: ['Hard cheese', 'Soft cheese', 'Fresh cheese', 'Grated cheese'], products: ['Gruyère AOP', 'Pecorino', 'Mozzarella'], filters: { 'Hard cheese': ['Gruyère AOP', 'Pecorino'], 'Fresh cheese': ['Mozzarella'] } },
    { name: 'Yoghurt & desserts', level3: ['Yoghurt', 'Quark', 'Desserts'], products: ['Greek Yoghurt'], filters: { Yoghurt: ['Greek Yoghurt'] } },
    { name: 'Fresh convenience food', level3: ['Ready meals', 'Fresh pasta', 'Soups', 'Salads'] },
    { name: 'Vegan dairy alternatives', level3: ['Plant drinks', 'Vegan yoghurt', 'Vegan cheese'] },
  ] },
  { name: 'Bread, pastries & breakfast', groups: [
    { name: 'Bread & rusks', level3: ['Fresh bread', 'Speciality bread', 'Toast & rusks'], products: ['Sourdough Bread', 'Baguette'] },
    { name: 'Pastries', level3: ['Croissants', 'Sweet pastries', 'Savoury pastries'], products: ['Croissant', 'Pretzel'] },
    { name: 'Breakfast', level3: ['Muesli & cereals', 'Spreads', 'Honey & jam'] },
  ] },
  { name: 'Pasta, condiments & canned food', groups: [
    { name: 'Pasta & noodles', level3: ['Italian pasta', 'Asian noodles', 'Fresh pasta'], products: ['Pasta', 'Spaghetti'] },
    { name: 'Rice & grains', level3: ['Rice', 'Couscous & bulgur', 'Quinoa & grains'], products: ['Rice'], filters: { Rice: ['Rice'] } },
    { name: 'Oil & vinegar', level3: ['Olive oil', 'Cooking oil', 'Vinegar'], products: ['Olive Oil'], filters: { 'Olive oil': ['Olive Oil'] } },
    { name: 'Canned food', level3: ['Vegetables', 'Fruit', 'Fish', 'Ready meals'] },
  ] },
  { name: 'Snacks & sweets', groups: [
    { name: 'Chocolate', level3: ['Chocolate bars', 'Chocolate tablets', 'Pralines'], products: ['Dark Chocolate'] },
    { name: 'Salty snacks', level3: ['Crisps', 'Nuts', 'Crackers'], products: ['Potato Chips', 'Salted Nuts', 'Almonds'], filters: { Crisps: ['Potato Chips'], Nuts: ['Salted Nuts', 'Almonds'] } },
    { name: 'Biscuits & cakes', level3: ['Biscuits', 'Cakes', 'Wafers'] },
  ] },
  { name: 'Frozen food', groups: [
    { name: 'Frozen fruit & vegetables', level3: ['Vegetables', 'Fruit', 'Herbs'] },
    { name: 'Pizza & snacks', level3: ['Pizza', 'Savoury snacks', 'Ready meals'] },
    { name: 'Ice cream', level3: ['Tubs', 'Sticks & cones', 'Sorbet'] },
  ] },
  { name: 'Drinks, coffee & tea', groups: [
    { name: 'Soft drinks', level3: ['Cola', 'Lemonades', 'Energy drinks', 'Iced tea'] },
    { name: 'Water', level3: ['Sparkling water', 'Still water', 'Flavoured water'], products: ['Sparkling Water'], filters: { 'Sparkling water': ['Sparkling Water'] } },
    { name: 'Fruit & vegetable juices', level3: ['Orange juice', 'Fruit juice', 'Vegetable juice', 'Smoothies'], products: ['Orange Juice'], filters: { 'Orange juice': ['Orange Juice'] } },
    { name: 'Coffee', level3: ['Coffee beans', 'Ground coffee', 'Capsules', 'Instant coffee'], products: ['Coffee Beans'], filters: { 'Coffee beans': ['Coffee Beans'] } },
    { name: 'Tea', level3: ['Black tea', 'Green tea', 'Herbal tea', 'Fruit tea'] },
    { name: 'Cocoa powder', level3: ['Drinking chocolate', 'Cocoa powder'] },
  ] },
  { name: 'Wine, beer & spirits', groups: [
    { name: 'Wine', level3: ['Red wine', 'White wine', 'Rosé wine'], products: ['Pinot Noir', 'Chasselas', 'Rosé de Provence'], filters: { 'Red wine': ['Pinot Noir'], 'White wine': ['Chasselas'], 'Rosé wine': ['Rosé de Provence'] } },
    { name: 'Sparkling wine', level3: ['Prosecco', 'Champagne', 'Other sparkling wine'], products: ['Prosecco'], filters: { Prosecco: ['Prosecco'] } },
    { name: 'Beer', level3: ['Lager', 'Craft beer', 'Alcohol-free beer'] },
    { name: 'Spirits', level3: ['Gin', 'Whisky', 'Rum', 'Liqueurs'] },
  ] },
  { name: 'Pets', groups: [
    { name: 'Cats', level3: ['Cat food', 'Cat litter', 'Accessories'] },
    { name: 'Dogs', level3: ['Dog food', 'Treats', 'Accessories'] },
  ] },
  { name: 'Baby and kids', groups: [
    { name: 'Baby food', level3: ['Milk formula', 'Baby meals', 'Baby snacks'] },
    { name: 'Nappies & care', level3: ['Nappies', 'Baby care', 'Wipes'] },
  ] },
  { name: 'Beauty & health', groups: [
    { name: 'Body care', level3: ['Shower & bath', 'Body lotion', 'Deodorant'] },
    { name: 'Hair care', level3: ['Shampoo', 'Conditioner', 'Styling'] },
    { name: 'Health', level3: ['Vitamins', 'First aid', 'Wellbeing'] },
  ] },
  { name: 'Household & cleaning', groups: [
    { name: 'Laundry', level3: ['Laundry detergent', 'Fabric softener', 'Stain remover'], products: ['Laundry Detergent'] },
    { name: 'Dishwashing', level3: ['Dishwasher tablets', 'Washing-up liquid', 'Accessories'], products: ['Dishwasher Tabs'] },
    { name: 'Household paper', level3: ['Toilet paper', 'Kitchen roll', 'Tissues'], products: ['Toilet Paper'] },
  ] },
  { name: 'Home & kitchen', groups: [
    { name: 'Kitchen', level3: ['Cookware', 'Tableware', 'Food storage'] },
    { name: 'Home', level3: ['Home textiles', 'Storage', 'Candles'] },
  ] },
  { name: 'Stationery, office & electronics', groups: [
    { name: 'Stationery', level3: ['Writing', 'Paper', 'School supplies'] },
    { name: 'Electronics accessories', level3: ['Batteries', 'Cables', 'Mobile accessories'] },
  ] },
  { name: 'Garden & outdoor living', groups: [
    { name: 'Garden', level3: ['Plants', 'Garden tools', 'Soil & fertiliser'] },
    { name: 'Outdoor living', level3: ['Barbecues', 'Outdoor furniture', 'Picnic'] },
  ] },
  { name: 'Games, hobbies & gifting', groups: [
    { name: 'Games & toys', level3: ['Board games', 'Toys', 'Creative play'] },
    { name: 'Gifts', level3: ['Gift cards', 'Wrapping', 'Seasonal gifts'] },
  ] },
  { name: 'Clothing and accessories', groups: [
    { name: 'Women', level3: ['Clothing', 'Underwear', 'Accessories'] },
    { name: 'Men', level3: ['Clothing', 'Underwear', 'Accessories'] },
    { name: 'Children', level3: ['Clothing', 'Underwear', 'Accessories'] },
  ] },
]

const productsByName = (names: string[] = []): ProductItem[] =>
  names.flatMap(name => PRODUCT_CATALOG.filter(product => product.name === name))

export default function ProductCategoriesPage() {
  const [level1, setLevel1] = useState(CATEGORY_TREE[1])
  const [expanded, setExpanded] = useState(CATEGORY_TREE[1].groups[0].name)
  const [level2, setLevel2] = useState<Level2Category | null>(null)
  const [level3, setLevel3] = useState('All')

  useEffect(() => {
    setExpanded(level1.groups[0]?.name ?? '')
  }, [level1])

  const openLevel2 = (group: Level2Category) => {
    setLevel2(group)
    setLevel3('All')
    requestAnimationFrame(() => document.querySelector('.overflow-auto')?.scrollTo({ top: 0, behavior: 'smooth' }))
  }

  if (level2) {
    const allProducts = productsByName(level2.products)
    const filteredNames = level3 === 'All' ? level2.products : level2.filters?.[level3]
    const products = productsByName(filteredNames ?? level2.products)

    return <>
      <ProductSubpageHeader
        title={level2.name}
        description={`${level1.name} · ${allProducts.length} ${allProducts.length === 1 ? 'product' : 'products'}`}
        onBack={() => setLevel2(null)}
      />
      <div className="mb-5 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-2">
          {['All', ...level2.level3].map(category => <button
            key={category}
            type="button"
            onClick={() => setLevel3(category)}
            className={`min-h-10 rounded-full border px-4 text-[13px] font-bold active:scale-[0.97] ${level3 === category ? 'border-primary bg-primary text-white' : 'border-hairline bg-white text-ink'}`}
          >{category}</button>)}
        </div>
      </div>
      {products.length > 0 ? <ProductCardList products={products} /> : <div className="mx-4 rounded-2xl border border-hairline bg-white px-6 py-10 text-center shadow-soft">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-sand text-primary"><PackageOpen size={23} /></span>
        <h2 className="mt-4 text-[17px] font-bold text-ink">Products coming soon</h2>
        <p className="mx-auto mt-1 max-w-[260px] text-[13px] leading-relaxed text-label">This category is part of the full Migros assortment. The prototype does not contain matching products yet.</p>
      </div>}
      <div className="h-44" />
    </>
  }

  return <>
    <ProductSubpageHeader title="Categories" description="Browse the Migros assortment by department." />
    <div className="overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max gap-2">
        {CATEGORY_TREE.map(category => <button
          key={category.name}
          type="button"
          onClick={() => setLevel1(category)}
          className={`min-h-11 rounded-full border px-4 text-[13px] font-bold active:scale-[0.97] ${level1.name === category.name ? 'border-primary bg-primary text-white shadow-soft' : 'border-hairline bg-white text-ink'}`}
        >{category.name}</button>)}
      </div>
    </div>

    <section className="mx-4 overflow-hidden rounded-2xl border border-hairline bg-white shadow-soft">
      <div className="border-b border-hairline bg-[#FFF7EE] px-4 py-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">Department</p>
        <h2 className="mt-0.5 text-[20px] font-bold text-ink">{level1.name}</h2>
      </div>
      {level1.groups.map((group, index) => {
        const isOpen = expanded === group.name
        return <div key={group.name} className={index ? 'border-t border-hairline' : ''}>
          <button
            type="button"
            aria-expanded={isOpen}
            onClick={() => setExpanded(isOpen ? '' : group.name)}
            className="flex min-h-[58px] w-full items-center justify-between gap-3 px-4 py-3 text-left active:bg-sand/50"
          >
            <span>
              <strong className="block text-[15px] text-ink">{group.name}</strong>
              <span className="mt-0.5 block text-[12px] text-label">{group.level3.length} categories</span>
            </span>
            <ChevronDown size={20} className={`shrink-0 text-label transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          {isOpen && <div className="border-t border-hairline bg-[#FFFCF8] px-4 pb-4 pt-3">
            <div className="flex flex-wrap gap-2">
              {group.level3.map(category => <span key={category} className="rounded-full bg-sand px-3 py-1.5 text-[12px] font-semibold text-ink">{category}</span>)}
            </div>
            <button type="button" onClick={() => openLevel2(group)} className="mt-4 flex min-h-11 w-full items-center justify-between rounded-xl bg-primary px-4 text-[14px] font-bold text-white active:scale-[0.99]">
              <span>Browse {group.name}</span>
              <ChevronRight size={19} />
            </button>
          </div>}
        </div>
      })}
    </section>
    <div className="h-44" />
  </>
}
