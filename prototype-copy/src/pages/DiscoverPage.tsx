import { useNavigate } from 'react-router-dom'
import { useFreshDesign } from '../fresh/context'
import FreshHero from '../fresh/FreshHero'
import { ChevronRight, Ticket } from 'lucide-react'
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
          <button
            type="button"
            aria-label="Wine Festival: 20–40% off selected wines. See promotions"
            onClick={() => navigate('/promotions')}
            className="campaign-teaser relative block min-h-[164px] w-full overflow-hidden rounded-card border border-hairline bg-surface p-4 text-left shadow-soft transition-shadow active:bg-orange-50"
          >
            <div className="relative z-10 pr-[108px]">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#994000]">Limited time</span>
              <h2 className="mt-1 font-display text-[25px] font-bold leading-tight tracking-[-0.03em] text-ink">Wine Festival</h2>
              <p className="mt-2 text-[14px] font-semibold text-muted">
                <strong className="text-[21px] font-bold tracking-tight text-[#994000]">20–40% off</strong>
                <span className="mt-0.5 block text-[12px] font-normal">Selected favourites</span>
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-bold text-ink">
                Explore wines <ChevronRight size={16} className="text-primary" strokeWidth={2.5} />
              </span>
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-[118px]">
              <div className="absolute -right-9 bottom-0 h-[148px] w-[148px] rounded-full bg-primary/[0.08]" />
              <img src={`${import.meta.env.BASE_URL}images/products/pinot-noir.png`} alt="" className="absolute bottom-4 right-[57px] h-[137px] w-10 -rotate-[9deg] object-contain drop-shadow-md" />
              <img src={`${import.meta.env.BASE_URL}images/products/rose-de-provence.png`} alt="" className="absolute -right-4 bottom-3 h-[146px] w-[108px] rotate-[9deg] object-contain drop-shadow-md" />
            </div>
          </button>
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
