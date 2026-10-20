import { Heart } from 'lucide-react'
import { PRODUCT_CATALOG } from '../lib/productCatalog'
import { ProductCardList, ProductSubpageHeader } from '../components/ProductSubpage'

const NAMES = ['Whole Milk', 'Bio Bananas', 'Free-range Eggs', 'Cherry Tomatoes', 'Dark Chocolate', 'Coffee Beans', 'Olive Oil']
const FAVORITES = NAMES.flatMap(name => PRODUCT_CATALOG.filter(product => product.name === name))

export default function FavoriteProductsPage() {
  return <>
    <ProductSubpageHeader title="Favorites" description="The products you’ve saved for quick access." />
    <div className="mx-4 mb-3 flex items-center gap-2 rounded-lg bg-primary/[0.08] px-3 py-2.5 text-[13px] font-semibold text-[#994000]">
      <Heart size={17} fill="currentColor" aria-hidden="true" /> {FAVORITES.length} saved products
    </div>
    <ProductCardList products={FAVORITES} />
    <div className="h-44" />
  </>
}
