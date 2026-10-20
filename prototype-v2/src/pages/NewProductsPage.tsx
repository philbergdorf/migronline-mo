import { Sparkles } from 'lucide-react'
import { PRODUCT_CATALOG } from '../lib/productCatalog'
import { ProductCardList, ProductSubpageHeader } from '../components/ProductSubpage'

const NAMES = ['Croissant', 'Pretzel', 'Grapes', 'Bell Peppers', 'Chasselas', 'Prosecco', 'Salted Nuts', 'Coffee Beans']
const NEW_PRODUCTS = NAMES.flatMap(name => PRODUCT_CATALOG.filter(product => product.name === name))

export default function NewProductsPage() {
  return <>
    <ProductSubpageHeader title="Newly available" description="Fresh additions to the Migros Online assortment." />
    <div className="mx-4 mb-3 flex items-center gap-2 rounded-lg bg-citrus/20 px-3 py-2.5 text-[13px] font-semibold text-[#765100]">
      <Sparkles size={17} aria-hidden="true" /> Added in the last 14 days
    </div>
    <ProductCardList products={NEW_PRODUCTS} />
    <div className="h-44" />
  </>
}
