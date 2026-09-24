import { useEffect, useRef, useState } from 'react'
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
import FavoriteProductsPage from './pages/FavoriteProductsPage'
import NewProductsPage from './pages/NewProductsPage'
import ProductCategoriesPage from './pages/ProductCategoriesPage'
import RecentOrdersPage from './pages/RecentOrdersPage'
import PromotionsPage from './pages/PromotionsPage'
import CookPage from './pages/CookPage'
import BasketPage from './pages/BasketPage'
import ProductSearch from './components/ProductSearch'
import { BasketProvider } from './lib/basket'
import AccountPage from './pages/AccountPage'

const COOK_TAB_KEY = 'migronline-show-cook-tab'

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
  const [showCookTab, setShowCookTab] = useState(() => {
    try {
      return localStorage.getItem(COOK_TAB_KEY) === 'true'
    } catch {
      return false
    }
  })
  const updateCookTab = (visible: boolean) => {
    setShowCookTab(visible)
    try {
      localStorage.setItem(COOK_TAB_KEY, String(visible))
    } catch {
      // Keep the preference usable for this session if storage is unavailable.
    }
  }
  const shoppingRef = useRef<HTMLDivElement>(null)
  const navigationRef = useRef<HTMLDivElement>(null)
  const searchTriggerRef = useRef<HTMLButtonElement>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  useEffect(() => {
    shoppingRef.current?.querySelector<HTMLElement>('.overflow-auto')?.scrollTo({ top: 0 })
    setSearchOpen(false)
  }, [pathname])

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
              <Route path="/account" element={<AccountPage showCookTab={showCookTab} onShowCookTabChange={updateCookTab} />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/top-products" element={<TopProductsPage />} />
              <Route path="/products/favorites" element={<FavoriteProductsPage />} />
              <Route path="/products/new" element={<NewProductsPage />} />
              <Route path="/products/categories" element={<ProductCategoriesPage />} />
              <Route path="/products/orders" element={<RecentOrdersPage />} />
              <Route path="/promotions" element={<PromotionsPage />} />
              <Route path="/cook" element={<CookPage />} />
              <Route path="/basket" element={<BasketPage showCookTab={showCookTab} />} />
            </Routes>
          </Page>
          </div>
          <GlassTabbar
            containerRef={navigationRef}
            tabs={TABS.filter(tab => tab.path !== '/cook' || showCookTab)}
            active={pathname}
            onChange={(path) => { setSearchOpen(false); navigate(path) }}
            searchAction={!showCookTab ? { onClick: () => setSearchOpen(true), expanded: searchOpen, buttonRef: searchTriggerRef } : undefined}
          />
          {(!showCookTab || (pathname !== '/cook' && pathname !== '/basket' && pathname !== '/account')) && (
            <ProductSearch
              key={pathname}
              background={shoppingRef}
              navigation={navigationRef}
              open={searchOpen}
              onOpenChange={setSearchOpen}
              docked={!showCookTab}
              triggerRef={searchTriggerRef}
            />
          )}
        </PhoneFrame>
        </BasketProvider>
      </FavoritesProvider>
      </MealPlanProvider>
    </CustomRecipesProvider>
  )
}
