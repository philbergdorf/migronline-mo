import { useNavigate } from 'react-router-dom'
import ProductSearch, { type ProductSearchProps } from '../components/ProductSearch'
import { CUSTOMER_TOP_PRODUCTS } from '../lib/customerTopProducts'
import ShowAllCard from '../components/ShowAllCard'
import { RUNNING_LOW } from '../lib/runningLow'
import { Heart, Repeat2, Sparkles, LayoutGrid, Package } from 'lucide-react'
import {
  PageTitle,
  SectionLabel,
  ListGroup,
  NavRow,
  HScroll,
  ProductCard,
} from '../components/ui'

export default function ProductsPage(props: Omit<ProductSearchProps, 'children'>) {
  const navigate = useNavigate()

  return (
    <>
      <PageTitle>Products</PageTitle>
      <ProductSearch {...props}>

        {/* Quick entries */}
        <div className="pt-2">
          <ListGroup>
            <NavRow
              icon={<Heart size={18} strokeWidth={2} />}
              tint="bg-tomato/12 text-tomato"
              label="Favorites"
              onClick={() => navigate('/products/favorites')}
            />
            <NavRow
              icon={<Repeat2 size={18} strokeWidth={2} />}
              tint="bg-primary/12 text-forest"
              label="Your regular buys"
              onClick={() => navigate('/products/top-products')}
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
        <SectionLabel action={<button type="button" aria-label="Show all top products" onClick={() => navigate('/products/top-products')} className="text-[13px] font-bold text-primary">Show all</button>}>Your top products</SectionLabel>
        <HScroll>
          {CUSTOMER_TOP_PRODUCTS.slice(0, 6).map((p) => (
            <div key={p.name} className="w-40 shrink-0"><ProductCard {...p} /></div>
          ))}
          <ShowAllCard to="/products/top-products" title="Your top products" description="Find more of your usual favourites." label="Show all top products" />
        </HScroll>

        {/* Running low? */}
        <SectionLabel action={<button type="button" aria-label="Show all running low products" onClick={() => navigate('/products/running-low')} className="text-[13px] font-bold text-primary">Show all</button>}>Running low?</SectionLabel>
        <HScroll>
          {RUNNING_LOW.slice(0, 4).map((p) => (
            <div key={p.name} className="w-40 shrink-0"><ProductCard {...p} /></div>
          ))}
          <ShowAllCard to="/products/running-low" title="Time to restock?" description="See the essentials you may need soon." label="Show all running low products" />
        </HScroll>

        <div className="h-44" />
      </ProductSearch>
    </>
  )
}
