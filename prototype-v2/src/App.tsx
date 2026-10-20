import { useEffect, useRef, useState } from 'react'
import { Navigate, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
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
import RunningLowPage from './pages/RunningLowPage'
import FavoriteProductsPage from './pages/FavoriteProductsPage'
import NewProductsPage from './pages/NewProductsPage'
import ProductCategoriesPage from './pages/ProductCategoriesPage'
import RecentOrdersPage from './pages/RecentOrdersPage'
import OrderDetailPage from './pages/OrderDetailPage'
import PromotionsPage from './pages/PromotionsPage'
import CookPage from './pages/CookPage'
import BasketPage from './pages/BasketPage'
import { SAMPLE_RECENT_SEARCHES, type ProductSearchState } from './components/ProductSearch'
import { BasketProvider } from './lib/basket'
import AccountPage from './pages/AccountPage'
import ScratchWinPage from './pages/ScratchWinPage'
import NewsTeaserPage from './pages/NewsTeaserPage'
import { RewardsProvider } from './lib/rewards'

const COOK_TAB_KEY = 'migronline-show-cook-tab'
const SCRATCH_AND_WIN_KEY = 'migronline-show-scratch-and-win'

const TABS: Tab[] = [
  { path: '/', label: 'Discover', Icon: Compass },
  { path: '/products', label: 'Products', Icon: TextSearch },
  { path: '/cook', label: 'Cook', Icon: ChefHat },
  { path: '/promotions', label: 'Promotions', Icon: BadgePercent },
  { path: '/basket', label: 'Basket', Icon: ShoppingBasket },
]

export default function App() {
  const navigate = useNavigate()
  const { pathname, state } = useLocation()
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
  const [showScratchAndWin, setShowScratchAndWin] = useState(() => {
    try {
      return localStorage.getItem(SCRATCH_AND_WIN_KEY) !== 'false'
    } catch {
      return true
    }
  })
  const updateScratchAndWin = (visible: boolean) => {
    setShowScratchAndWin(visible)
    try {
      localStorage.setItem(SCRATCH_AND_WIN_KEY, String(visible))
    } catch {
      // Keep the preference usable for this session if storage is unavailable.
    }
  }
  const shoppingRef = useRef<HTMLDivElement>(null)
  const [productSearch, setProductSearch] = useState<ProductSearchState>({ active: false, query: '' })
  const [recentSearches, setRecentSearches] = useState(SAMPLE_RECENT_SEARCHES)
  const productScrollPositions = useRef({ browse: 0, search: 0 })
  const ordersScrollPosition = useRef(0)
  useEffect(() => {
    // Products restores its browsing/search position when returning to the tab.
    if (pathname === '/products' || pathname === '/products/orders') return
    if (pathname === '/' && state?.newsTeaser) return
    shoppingRef.current?.querySelector<HTMLElement>('.overflow-auto')?.scrollTo({ top: 0 })
  }, [pathname, state])

  return (
    <CustomRecipesProvider>
      <MealPlanProvider>
      <FavoritesProvider>
        <BasketProvider>
        <RewardsProvider>
        <PhoneFrame>
          <div ref={shoppingRef} className="relative h-full">
          <Page className="!bg-transparent">
            <Routes>
              <Route path="/" element={<DiscoverPage showCookTab={showCookTab} showScratchAndWin={showScratchAndWin} />} />
              <Route path="/account" element={<AccountPage showCookTab={showCookTab} onShowCookTabChange={updateCookTab} showScratchAndWin={showScratchAndWin} onShowScratchAndWinChange={updateScratchAndWin} />} />
              <Route path="/scratch-win" element={<ScratchWinPage />} />
              <Route path="/news/:teaserId" element={<NewsTeaserPage />} />
              <Route path="/products" element={<ProductsPage search={productSearch} onSearchChange={setProductSearch} scrollPositions={productScrollPositions} recentSearches={recentSearches} onRecentSearchesChange={setRecentSearches} />} />
              <Route path="/products/top-products" element={<TopProductsPage />} />
              <Route path="/products/running-low" element={<RunningLowPage />} />
              <Route path="/top-products" element={<Navigate to="/products/top-products" replace />} />
              <Route path="/products/favorites" element={<FavoriteProductsPage />} />
              <Route path="/products/new" element={<NewProductsPage />} />
              <Route path="/products/categories" element={<ProductCategoriesPage />} />
              <Route path="/products/orders" element={<RecentOrdersPage scrollPosition={ordersScrollPosition} />} />
              <Route path="/products/orders/:orderId" element={<OrderDetailPage />} />
              <Route path="/promotions" element={<PromotionsPage />} />
              <Route path="/cook" element={<CookPage />} />
              <Route path="/basket" element={<BasketPage showCookTab={showCookTab} />} />
            </Routes>
          </Page>
          </div>
          <GlassTabbar
            tabs={TABS.filter(tab => tab.path !== '/cook' || showCookTab)}
            active={pathname}
            onChange={navigate}
          />
        </PhoneFrame>
        </RewardsProvider>
        </BasketProvider>
      </FavoritesProvider>
      </MealPlanProvider>
    </CustomRecipesProvider>
  )
}
