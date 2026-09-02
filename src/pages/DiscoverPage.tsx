import { useNavigate } from 'react-router-dom'
import { User, ChevronRight } from 'lucide-react'
import {
  SectionLabel,
  Card,
  Button,
  Badge,
  ProductCard,
  RecipeCard,
  DeliverySlotCard,
  HScroll,
} from '../components/ui'

const REGULARS = [
  { name: 'Whole Milk', sub: '1 L · UHT', price: 'CHF 1.60', emoji: '🥛', gradient: 'from-primary/15 to-sand' },
  { name: 'Bio Bananas', sub: '1 kg', price: 'CHF 3.20', emoji: '🍌', gradient: 'from-citrus/30 to-primary/15' },
  { name: 'Free-range Eggs', sub: '10 pcs', price: 'CHF 5.90', emoji: '🥚', gradient: 'from-sand to-citrus/20' },
  { name: 'Sourdough Bread', sub: '500 g', price: 'CHF 4.50', emoji: '🍞', gradient: 'from-citrus/25 to-tomato/15' },
]

const PROMOS = [
  { name: 'Cherry Tomatoes', sub: '250 g', price: 'CHF 2.24', emoji: '🍅', badge: <Badge tone="sale">-20%</Badge>, gradient: 'from-tomato/25 to-berry/15' },
  { name: 'Avocado', sub: 'Ripe & ready', price: 'CHF 1.76', emoji: '🥑', badge: <Badge tone="sale">-20%</Badge>, gradient: 'from-primary/25 to-citrus/20' },
  { name: 'Dark Chocolate', sub: '100 g · 70%', price: 'CHF 2.04', emoji: '🍫', badge: <Badge tone="sale">-15%</Badge>, gradient: 'from-berry/20 to-forest/15' },
]

const RECIPES = [
  { name: 'Summer berry tart', time: '50 min', emoji: '🥧', gradient: 'from-berry/20 to-tomato/15' },
  { name: 'Tomato & basil salad', time: '10 min', emoji: '🥗', gradient: 'from-primary/25 to-citrus/15' },
  { name: 'Rösti with fried egg', time: '25 min', emoji: '🥔', gradient: 'from-citrus/30 to-primary/15' },
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

  return (
    <>
      {/* Wine Festival full-bleed teaser */}
      <div className="relative h-[300px] w-full overflow-hidden bg-gradient-to-br from-[#7B2D4E] to-[#3B1526]">
        <img
          src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&h=760&fit=crop"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/45" />

        {/* Profile */}
        <button
          type="button"
          aria-label="Profile"
          className="absolute right-4 grid h-10 w-10 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md"
          style={{ top: 'calc(env(safe-area-inset-top) + 12px)' }}
        >
          <User size={20} strokeWidth={2} />
        </button>

        {/* Title */}
        <div className="absolute left-5 right-5" style={{ top: 'calc(env(safe-area-inset-top) + 3.25rem)' }}>
          <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/80">Limited time</span>
          <h1 className="mt-1 font-display text-[32px] font-bold leading-tight text-white">Wine Festival</h1>
          <p className="mt-1 text-[14px] font-semibold text-white/85">
            Hand-picked &amp; regional favourites
          </p>
        </div>

        {/* Offer badge */}
        <div className="absolute bottom-4 left-5 rounded-lg bg-citrus px-3.5 py-2 text-center leading-none text-ink shadow-lg">
          <div className="font-display text-[20px] font-bold">20–40%</div>
          <div className="text-[12px] font-bold">off wines</div>
        </div>

        {/* Carousel arrow */}
        <button
          type="button"
          aria-label="See promotions"
          onClick={() => navigate('/promotions')}
          className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-white text-forest shadow-lg transition active:scale-95"
        >
          <ChevronRight size={22} strokeWidth={2.4} />
        </button>
      </div>

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
            <span className="text-5xl" aria-hidden>
              🎟️
            </span>
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

      <div className="h-28" />
    </>
  )
}
