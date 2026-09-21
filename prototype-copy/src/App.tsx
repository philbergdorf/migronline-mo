import { useRef } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Page } from 'konsta/react'
import { Compass, TextSearch, BadgePercent, ChefHat, ShoppingBasket } from 'lucide-react'
import PhoneFrame from './PhoneFrame'
import { GlassTabbar, Tab } from './components/Glass'
import { FavoritesProvider } from './lib/favorites'
import { CustomRecipesProvider } from './lib/customRecipes'
import { MealPlanProvider } from './lib/mealPlan'
import DiscoverPage from './pages/DiscoverPage'
import ProductsPage from './pages/ProductsPage'
import TopProductsPage from './pages/TopProductsPage'
import PromotionsPage from './pages/PromotionsPage'
import CookPage from './pages/CookPage'
import BasketPage from './pages/BasketPage'
import ProductSearch from './components/ProductSearch'
import { BasketProvider } from './lib/basket'

const TABS: Tab[] = [
  { path: '/', label: 'Discover', Icon: Compass },
  { path: '/products', label: 'Products', Icon: TextSearch },
  { path: '/cook', label: 'Cook', Icon: ChefHat },
  { path: '/promotions', label: 'Promotions', Icon: BadgePercent },
  { path: '/basket', label: 'Basket', Icon: ShoppingBasket },
]

export default function App() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const shoppingRef = useRef<HTMLDivElement>(null)

  return (
    <CustomRecipesProvider>
      <MealPlanProvider>
      <FavoritesProvider>
        <BasketProvider>
        <PhoneFrame>
          <div ref={shoppingRef} className="relative h-full">
          <Page className="!bg-transparent">
            <Routes>
              <Route path="/" element={<DiscoverPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/top-products" element={<TopProductsPage />} />
              <Route path="/promotions" element={<PromotionsPage />} />
              <Route path="/cook" element={<CookPage />} />
              <Route path="/basket" element={<BasketPage />} />
            </Routes>
          </Page>

          <GlassTabbar tabs={TABS} active={pathname} onChange={navigate} />
          </div>
          {pathname !== '/cook' && <ProductSearch key={pathname} background={shoppingRef} basket={pathname === '/basket'} />}
        </PhoneFrame>
        </BasketProvider>
      </FavoritesProvider>
      </MealPlanProvider>
    </CustomRecipesProvider>
  )
}
