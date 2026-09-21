import { useNavigate } from 'react-router-dom'
import { useFreshDesign } from '../fresh/context'
import FreshHero from '../fresh/FreshHero'
import { Ticket } from 'lucide-react'
import WineFestivalBanner from '../components/WineFestivalBanner'
import {
  SectionLabel,
  Card,
  Button,
  Badge,
  ProductCard,
  RecipeCard,
  DeliverySlotCard,
  HScroll,
  ProfileButton,
} from '../components/ui'

const REGULARS = [
  { name: 'Whole Milk', sub: '1 L · UHT', price: 'CHF 1.60' },
  { name: 'Bio Bananas', sub: '1 kg', price: 'CHF 3.20' },
  { name: 'Free-range Eggs', sub: '10 pcs', price: 'CHF 5.90' },
  { name: 'Sourdough Bread', sub: '500 g', price: 'CHF 4.50' },
]

const PROMOS = [
  { name: 'Cherry Tomatoes', sub: '250 g', price: 'CHF 2.24', badge: <Badge tone="sale">20%</Badge> },
  { name: 'Avocado', sub: 'Ripe & ready', price: 'CHF 1.76', badge: <Badge tone="sale">20%</Badge> },
  { name: 'Dark Chocolate', sub: '100 g · 70%', price: 'CHF 2.04', badge: <Badge tone="sale">15%</Badge> },
]

const RECIPES = [
  { name: 'Summer berry tart', time: '50 min', image: 'berry-tart' },
  { name: 'Tomato & basil salad', time: '10 min', image: 'tomato-salad' },
  { name: 'Rösti with fried egg', time: '25 min', image: 'rosti-egg' },
]

function SeeAll({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="text-[13px] font-bold text-primary">
      See all
    </button>
  )
}

export default function DiscoverPage() {
  const navigate = useNavigate()
  const fresh = useFreshDesign()

  return (
    <>
      {/* Campaign slot: identical position and destination in each visual direction. */}
      {fresh ? <FreshHero onExplore={() => navigate('/promotions')} /> : (
        <div className="px-4 pt-[calc(env(safe-area-inset-top)+1.25rem)]">
          <div className="mb-3 flex items-center justify-between px-1">
            <h1 className="font-display text-[28px] font-bold text-ink">Discover</h1>
            <ProfileButton />
          </div>
          <WineFestivalBanner onExplore={() => navigate('/promotions')} />
        </div>
      )}

      {/* Delivery slot */}
      <div className="px-4 pt-3 pb-1">
        <DeliverySlotCard />
      </div>

      {/* Your regular buys */}
      <SectionLabel action={<SeeAll onClick={() => navigate('/products')} />}>
        Your regular buys
      </SectionLabel>
      <HScroll>
        {REGULARS.map((p) => (
          <div key={p.name} className="w-40 shrink-0">
            <ProductCard {...p} />
          </div>
        ))}
      </HScroll>

      {/* Promotions for you */}
      <SectionLabel action={<SeeAll onClick={() => navigate('/promotions')} />}>
        Promotions for you
      </SectionLabel>
      <HScroll>
        {PROMOS.map((p) => (
          <div key={p.name} className="w-40 shrink-0">
            <ProductCard {...p} />
          </div>
        ))}
      </HScroll>

      {/* Scratch & Win */}
      <SectionLabel>Scratch &amp; Win</SectionLabel>
      <div className="px-4">
        <Card className="overflow-hidden !border-0 bg-gradient-to-br from-citrus to-berry !shadow-cta">
          <div className="flex items-center gap-4 p-5 text-white">
            <Ticket size={48} className="shrink-0" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-[20px] font-bold">Scratch &amp; Win</h3>
              <p className="text-[14px] text-white/90">
                A prize hides under every card — one free scratch daily.
              </p>
            </div>
          </div>
          <div className="px-5 pb-5">
            <Button variant="secondary" className="!text-berry">
              Scratch now
            </Button>
          </div>
        </Card>
      </div>

      {/* New recipes */}
      <SectionLabel action={<SeeAll onClick={() => navigate('/cook')} />}>
        New recipes
      </SectionLabel>
      <HScroll>
        {RECIPES.map((r) => (
          <div key={r.name} className="w-44 shrink-0">
            <RecipeCard {...r} />
          </div>
        ))}
      </HScroll>

      <div className="h-44" />
    </>
  )
}
