import { useRef, useState } from 'react'
import { Apple, Beef, Baby, Coffee, Cookie, Croissant, Milk, Package, SprayCan, Wine, Leaf, Snowflake, Cat, Heart, CookingPot, Pencil, Flower2, Gift, Shirt, ChevronDown, ChevronRight } from 'lucide-react'
import { ProductCardList, ProductSubpageHeader, type ProductItem } from '../components/ProductSubpage'
import { PRODUCT_CATALOG } from '../lib/productCatalog'

import { CATEGORY_TREE, type Level1Category, type Level2Category } from '../lib/productCategories'

const productsByName = (names: string[] = []): ProductItem[] =>
  names.flatMap(name => PRODUCT_CATALOG.filter(product => product.name === name))

const departmentIcons = [Leaf, Apple, Beef, Milk, Croissant, Package, Cookie, Snowflake, Coffee, Wine, Cat, Baby, Heart, SprayCan, CookingPot, Pencil, Flower2, Gift, Shirt]

export default function ProductCategoriesPage() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [selection, setSelection] = useState<{ department: Level1Category; group: Level2Category } | null>(null)
  const [level3, setLevel3] = useState('All')
  const savedScroll = useRef(0)

  const openCategory = (department: Level1Category, group: Level2Category) => {
    savedScroll.current = document.querySelector('.overflow-auto')?.scrollTop ?? 0
    setSelection({ department, group })
    setLevel3('All')
    requestAnimationFrame(() => document.querySelector('.overflow-auto')?.scrollTo({ top: 0 }))
  }

  const backToCategories = () => {
    setSelection(null)
    requestAnimationFrame(() => document.querySelector('.overflow-auto')?.scrollTo({ top: savedScroll.current }))
  }

  if (selection) {
    const { department, group } = selection
    const products = productsByName(level3 === 'All' ? group.products : group.filters?.[level3] ?? [])
    return <>
      <ProductSubpageHeader title={group.name} description={department.name} onBack={backToCategories} />
      <div className="category-filter-rail" aria-label="Subcategories">
        {['All', ...group.level3].map(category => <button
          key={category}
          type="button"
          aria-pressed={level3 === category}
          onClick={() => setLevel3(category)}
          className="category-filter"
        >{category}</button>)}
      </div>
      <p className="category-result-count">{products.length} {products.length === 1 ? 'product' : 'products'}</p>
      <ProductCardList products={products} />
      {products.length === 0 && <div className="category-empty">
        <h2>No products here yet</h2>
        <p>Try another category.</p>
        {level3 !== 'All' && <button type="button" onClick={() => setLevel3('All')}>View all {group.name.toLowerCase()}</button>}
      </div>}
      <div className="h-44" />
    </>
  }

  return <>
    <ProductSubpageHeader title="Categories" />
    <section className="category-tree" aria-label="Departments">
      {CATEGORY_TREE.map((department, index) => {
        const isOpen = expanded === department.name
        const Icon = departmentIcons[index]
        return <div key={department.name}>
          <button
            type="button"
            className="category-department"
            aria-expanded={isOpen}
            aria-controls={`department-${index}`}
            onClick={() => setExpanded(isOpen ? null : department.name)}
          >
            <Icon className="category-department-icon" size={25} strokeWidth={1.6} aria-hidden="true" />
            <span>{department.name}</span>
            {isOpen ? <ChevronDown size={21} aria-hidden="true" /> : <ChevronRight size={21} aria-hidden="true" />}
          </button>
          {isOpen && <div id={`department-${index}`} className="category-children">
            {department.groups.map(group => <button key={group.name} type="button" onClick={() => openCategory(department, group)}>
              <span>{group.name}</span>
              <ChevronRight size={20} aria-hidden="true" />
            </button>)}
          </div>}
        </div>
      })}
    </section>
    <div className="h-44" />
  </>
}
