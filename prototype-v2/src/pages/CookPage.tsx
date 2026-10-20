import { useEffect, useRef, useState } from 'react'
import { Sparkles, Heart, Bookmark, Leaf, Zap, Search, ChevronRight } from 'lucide-react'
import { PageTitle, SectionLabel, Card, Button, HScroll } from '../components/ui'
import { RecipeCard } from '../components/RecipeCard'
import { RecipeListView } from './cook/RecipeListView'
import { RecipeDetailView } from './cook/RecipeDetailView'
import { CreateRecipeView } from './cook/CreateRecipeView'
import { MealPlanView } from './cook/MealPlanView'
import {
  neueRezepte,
  favoritenRezepte,
  eigeneRezepte,
  saisonaleRezepte,
  schnelleRezepte,
  allRecipes,
  type Recipe,
} from '../lib/recipeData'
import { useFavorites } from '../lib/favorites'
import { useCustomRecipes } from '../lib/customRecipes'

type ListKind = 'new' | 'favorites' | 'own' | 'seasonal' | 'quick' | 'search'
type View =
  | { name: 'home' }
  | { name: 'list'; kind: ListKind; search?: string }
  | { name: 'detail'; recipe: Recipe }
  | { name: 'create' }

const ALL_FILTERS = ['Quick', 'Vegan', 'Gluten-free', 'Seasonal', 'Breakfast', 'Main', 'Snack & side']

const DIETARY = [
  { id: 'all', label: 'I eat everything', emoji: '😋' },
  { id: 'vegetarian', label: 'Vegetarian', emoji: '🥬' },
  { id: 'vegan', label: 'Vegan', emoji: '🌱' },
  { id: 'gluten-free', label: 'Gluten-free', emoji: '🌾' },
  { id: 'lactose-free', label: 'Lactose-free', emoji: '🥛' },
  { id: 'high-protein', label: 'High protein', emoji: '💪' },
  { id: 'low-carb', label: 'Low carb', emoji: '🥑' },
  { id: 'no-pork', label: 'No pork', emoji: '🐷' },
  { id: 'no-seafood', label: 'No seafood', emoji: '🦐' },
]

const QUICK_ENTRIES: { kind: ListKind; label: string; Icon: typeof Sparkles }[] = [
  { kind: 'new', label: 'New', Icon: Sparkles },
  { kind: 'favorites', label: 'Favorites', Icon: Heart },
  { kind: 'own', label: 'My recipes', Icon: Bookmark },
  { kind: 'seasonal', label: 'Seasonal', Icon: Leaf },
  { kind: 'quick', label: 'Quick', Icon: Zap },
]

function getScrollParent(node: HTMLElement | null): HTMLElement | null {
  let el = node?.parentElement || null
  while (el) {
    const oy = getComputedStyle(el).overflowY
    if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight) return el
    el = el.parentElement
  }
  return null
}

export default function CookPage() {
  const [view, setView] = useState<View>({ name: 'home' })
  const rootRef = useRef<HTMLDivElement>(null)

  // Reset scroll to top whenever the sub-view changes.
  useEffect(() => {
    const sc = getScrollParent(rootRef.current)
    if (sc) sc.scrollTop = 0
  }, [view])

  const { isFavorite } = useFavorites()
  const { customRecipes } = useCustomRecipes()

  function resolveList(kind: ListKind) {
    switch (kind) {
      case 'new':
        return { title: 'New recipes', recipes: neueRezepte, filters: ['Quick', 'Vegan', 'Gluten-free', 'Seasonal'] }
      case 'favorites':
        return {
          title: 'Favorites',
          recipes: allRecipes.filter((r) => isFavorite(r.id)),
          filters: ALL_FILTERS,
          emptyIcon: '❤️',
          emptyTitle: 'No favorites yet',
          emptyText: 'Tap the heart on a recipe to add it to your favorites.',
        }
      case 'own':
        return {
          title: 'My recipes',
          recipes: [...customRecipes.map((c) => c.recipe), ...eigeneRezepte],
          filters: ALL_FILTERS,
          emptyIcon: '📝',
          emptyTitle: 'No recipes yet',
          emptyText: 'Capture your favorite recipes and always have them at hand.',
        }
      case 'seasonal':
        return { title: 'Seasonal', recipes: saisonaleRezepte, filters: ['Quick', 'Vegan', 'Gluten-free', 'Breakfast', 'Main', 'Snack & side'] }
      case 'quick':
        return { title: 'Quick', recipes: schnelleRezepte, filters: ['Vegan', 'Gluten-free', 'Breakfast', 'Main', 'Snack & side'] }
      case 'search':
        return { title: 'Search', recipes: [...customRecipes.map((c) => c.recipe), ...allRecipes], filters: ALL_FILTERS }
    }
  }

  const openRecipe = (recipe: Recipe) => setView({ name: 'detail', recipe })
  const goHome = () => setView({ name: 'home' })

  if (view.name === 'detail') {
    return (
      <div ref={rootRef}>
        <RecipeDetailView recipe={view.recipe} onBack={goHome} />
      </div>
    )
  }
  if (view.name === 'create') {
    return (
      <div ref={rootRef}>
        <CreateRecipeView onBack={goHome} onSaved={() => setView({ name: 'list', kind: 'own' })} />
      </div>
    )
  }
  if (view.name === 'list') {
    const cfg = resolveList(view.kind)
    return (
      <div ref={rootRef}>
        <RecipeListView {...cfg} onBack={goHome} onSelect={openRecipe} initialSearch={view.search} />
      </div>
    )
  }

  return (
    <div ref={rootRef}>
      <CookHome onOpenList={(kind, search) => setView({ name: 'list', kind, search })} onOpenRecipe={openRecipe} onCreate={() => setView({ name: 'create' })} />
    </div>
  )
}

function CookHome({
  onOpenList,
  onOpenRecipe,
  onCreate,
}: {
  onOpenList: (kind: ListKind, search?: string) => void
  onOpenRecipe: (r: Recipe) => void
  onCreate: () => void
}) {
  const [mealPlan, setMealPlan] = useState(false)
  const [prefsOpen, setPrefsOpen] = useState(false)
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [draft, setDraft] = useState<Set<string>>(new Set())

  function openPrefs() {
    setDraft(new Set(saved))
    setPrefsOpen(true)
  }
  function toggleDraft(id: string) {
    setDraft((prev) => {
      if (id === 'all') return prev.has(id) ? new Set() : new Set(['all'])
      const next = new Set(prev)
      next.delete('all')
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <>
      <PageTitle>Cook</PageTitle>

      {/* Segmented: Recipes / Meal plan */}
      <div className="px-4">
        <div className="flex rounded-full bg-sand p-1">
          {[
            { label: 'Recipes', active: !mealPlan },
            { label: 'Meal plan', active: mealPlan },
          ].map((seg) => (
            <button
              key={seg.label}
              onClick={() => setMealPlan(seg.label === 'Meal plan')}
              className={`flex-1 rounded-full py-2 text-[14px] font-bold transition ${
                seg.active ? 'bg-surface text-forest shadow-soft' : 'text-muted'
              }`}
            >
              {seg.label}
            </button>
          ))}
        </div>
      </div>

      {mealPlan ? (
        <MealPlanView onOpenRecipe={onOpenRecipe} />
      ) : (
        <>
          {/* Search */}
          <div className="px-4 pt-3">
            <button
              onClick={() => onOpenList('search')}
              className="flex w-full items-center gap-2 rounded-btn bg-surface px-[18px] py-[14px] text-left shadow-[inset_0_0_0_1px_#d9d9d9]"
            >
              <Search size={18} className="text-label" strokeWidth={2} />
              <span className="text-[15px] text-label">Search recipes</span>
            </button>
          </div>

          {/* Quick entries */}
          <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pt-3">
            {QUICK_ENTRIES.map(({ kind, label, Icon }) => (
              <button
                key={kind}
                onClick={() => onOpenList(kind)}
                className="flex shrink-0 items-center gap-2 rounded-full bg-surface px-4 py-2.5 shadow-chip"
              >
                <Icon size={18} strokeWidth={2} className="text-forest" />
                <span className="text-[14px] font-bold text-ink">{label}</span>
              </button>
            ))}
          </div>

          {/* Preferences */}
          <div className="px-4 pt-4">
            {saved.size > 0 ? (
              <Card className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[13px] font-extrabold text-ink">Your preferences</span>
                  <button onClick={openPrefs} className="text-[13px] font-bold text-forest">
                    Edit
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {DIETARY.filter((o) => saved.has(o.id)).map((o) => (
                    <span key={o.id} className="inline-flex items-center gap-1 rounded-full bg-sand px-2.5 py-1 text-[12px] font-bold text-muted">
                      <span className="text-[11px]">{o.emoji}</span>
                      {o.label}
                    </span>
                  ))}
                </div>
              </Card>
            ) : (
              <Card className="flex items-center gap-3 !border-0 !bg-primary/10 p-4">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-extrabold text-ink">Vegetarian? Gluten-free? High protein?</p>
                  <p className="mt-0.5 text-[12px] font-semibold text-muted">Tell us what you like and we'll show matching recipes.</p>
                </div>
                <Button variant="primary" className="shrink-0 !px-4 !py-2 !text-[13px]" onClick={openPrefs}>
                  Start
                </Button>
              </Card>
            )}
          </div>

          {/* New recipes */}
          <SectionLabel action={<SeeAll onClick={() => onOpenList('new')} />}>New recipes</SectionLabel>
          <RecipeSlider recipes={neueRezepte} onOpenRecipe={onOpenRecipe} onAll={() => onOpenList('new')} />

          {/* My recipes CTA */}
          <SectionLabel>My recipes</SectionLabel>
          <div className="px-4">
            <Card className="flex items-center gap-4 !border-0 !bg-primary/10 p-5">
              <div className="min-w-0 flex-1">
                <p className="mb-3 text-[14px] font-semibold text-ink">Add your favorite recipes and always have them at hand.</p>
                <Button variant="primary" className="!px-5 !py-2 !text-[13px]" onClick={onCreate}>
                  Add recipe
                </Button>
              </div>
              <span className="shrink-0 text-5xl">👨‍🍳</span>
            </Card>
          </div>

          {/* Favorites */}
          <SectionLabel action={<SeeAll onClick={() => onOpenList('favorites')} />}>Favorites</SectionLabel>
          <RecipeSlider recipes={favoritenRezepte} onOpenRecipe={onOpenRecipe} onAll={() => onOpenList('favorites')} />

          {/* What should I cook */}
          <div className="px-4 pb-28 pt-6">
            <Card className="flex items-center gap-4 !border-0 !bg-primary/10 p-5">
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-extrabold text-ink">What should I cook?</p>
                <p className="mt-0.5 mb-3 text-[12px] font-semibold text-muted">No idea? No problem — get inspired.</p>
                <Button variant="primary" className="!px-5 !py-2 !text-[13px]" onClick={() => onOpenList('new')}>
                  Cooking ideas
                </Button>
              </div>
              <span className="shrink-0 text-5xl">💡</span>
            </Card>
          </div>
        </>
      )}

      {prefsOpen && (
        <PreferenceSheet
          selected={draft}
          onToggle={toggleDraft}
          onClose={() => setPrefsOpen(false)}
          onSave={() => {
            setSaved(new Set(draft))
            setPrefsOpen(false)
          }}
        />
      )}
    </>
  )
}

function SeeAll({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-[13px] font-bold text-primary">
      See all
    </button>
  )
}

function RecipeSlider({ recipes, onOpenRecipe, onAll }: { recipes: Recipe[]; onOpenRecipe: (r: Recipe) => void; onAll: () => void }) {
  return (
    <HScroll>
      {recipes.map((r) => (
        <div key={r.id} className="w-[160px] shrink-0">
          <RecipeCard recipe={r} onSelect={onOpenRecipe} />
        </div>
      ))}
      <button
        onClick={onAll}
        className="flex w-[120px] shrink-0 items-center justify-center gap-1 rounded-lg border border-hairline bg-surface text-[14px] font-bold text-forest shadow-soft"
      >
        See all <ChevronRight size={16} strokeWidth={2.5} />
      </button>
    </HScroll>
  )
}

function PreferenceSheet({
  selected,
  onToggle,
  onSave,
  onClose,
}: {
  selected: Set<string>
  onToggle: (id: string) => void
  onSave: () => void
  onClose: () => void
}) {
  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full rounded-t-lg bg-cream pb-[calc(env(safe-area-inset-bottom)+1rem)]">
        <div className="px-4 pt-3">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-hairline" />
          <h2 className="font-display text-[18px] font-bold text-ink">Your preferences</h2>
          <p className="mb-5 mt-1 text-[13px] font-semibold text-label">Choose what applies to you.</p>

          <div className="mb-5 grid grid-cols-2 gap-2">
            {DIETARY.map((o) => {
              const active = selected.has(o.id)
              return (
                <button
                  key={o.id}
                  onClick={() => onToggle(o.id)}
                  className={`flex items-center gap-2.5 rounded-lg px-3.5 py-3 text-left transition ${
                    active ? 'bg-forest text-white' : 'bg-surface text-ink shadow-chip'
                  }`}
                >
                  <span className="text-[18px]">{o.emoji}</span>
                  <span className="text-[14px] font-bold">{o.label}</span>
                </button>
              )
            })}
          </div>

          <Button variant="checkout" onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
