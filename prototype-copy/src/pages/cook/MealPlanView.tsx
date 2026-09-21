import { useMemo, useState } from 'react'
import { Plus, X, Clock, Search, ShoppingBasket, Check } from 'lucide-react'
import { allRecipes, getRecipeDetail, type Recipe } from '../../lib/recipeData'
import { useCustomRecipes } from '../../lib/customRecipes'
import { useMealPlan, WEEKDAYS, type Weekday } from '../../lib/mealPlan'
import { Card, SectionLabel } from '../../components/ui'

export function MealPlanView({ onOpenRecipe }: { onOpenRecipe: (r: Recipe) => void }) {
  const { plan, setMeal, clearMeal, clearWeek } = useMealPlan()
  const { customRecipes, getCustomDetail } = useCustomRecipes()
  const [pickFor, setPickFor] = useState<Weekday | null>(null)
  const [addedToBasket, setAddedToBasket] = useState(false)

  const recipeMap = useMemo(() => {
    const m = new Map<string, Recipe>()
    for (const r of allRecipes) m.set(r.id, r)
    for (const c of customRecipes) m.set(c.recipe.id, c.recipe)
    return m
  }, [customRecipes])

  const pickable = useMemo(
    () => [...customRecipes.map((c) => c.recipe), ...allRecipes],
    [customRecipes],
  )

  const plannedCount = WEEKDAYS.filter((d) => plan[d]).length
  const ingredientCount = useMemo(() => {
    let n = 0
    for (const d of WEEKDAYS) {
      const id = plan[d]
      if (!id) continue
      const detail = getCustomDetail(id) || getRecipeDetail(id)
      n += detail.ingredients.length
    }
    return n
  }, [plan, getCustomDetail])

  return (
    <>
      {/* Summary */}
      <div className="px-4 pt-4">
        <Card className="flex items-center justify-between gap-3 p-4">
          <div>
            <div className="text-[15px] font-extrabold text-ink">This week</div>
            <div className="text-[13px] font-bold text-label">{plannedCount} of 7 days planned</div>
          </div>
          {plannedCount > 0 && (
            <button
              onClick={() => {
                clearWeek()
                setAddedToBasket(false)
              }}
              className="text-[13px] font-bold text-forest"
            >
              Clear week
            </button>
          )}
        </Card>
      </div>

      {/* Days */}
      <SectionLabel>Your plan</SectionLabel>
      <div className="flex flex-col gap-3 px-4">
        {WEEKDAYS.map((day) => {
          const recipe = plan[day] ? recipeMap.get(plan[day]!) : undefined
          return (
            <div key={day}>
              <div className="mb-1.5 px-1 text-[13px] font-bold text-muted">{day}</div>
              {recipe ? (
                <div className="flex items-center gap-3 overflow-hidden rounded-lg border border-hairline bg-surface p-2 shadow-soft">
                  <button
                    onClick={() => onOpenRecipe(recipe)}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    {recipe.imageUrl ? (
                      <img src={recipe.imageUrl} alt="" className="h-14 w-14 shrink-0 rounded border border-black/10 object-cover" />
                    ) : (
                      <div className="grid h-14 w-14 shrink-0 place-items-center rounded border border-black/10 bg-gradient-to-br from-primary/25 to-citrus/25 text-2xl">🍽️</div>
                    )}
                    <div className="min-w-0">
                      <div className="text-[15px] font-extrabold leading-tight text-ink">{recipe.name}</div>
                      {recipe.duration && (
                        <div className="mt-0.5 flex items-center gap-1 text-[12px] font-bold text-label">
                          <Clock size={12} strokeWidth={2.2} /> {recipe.duration}
                        </div>
                      )}
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      clearMeal(day)
                      setAddedToBasket(false)
                    }}
                    aria-label={`Remove ${day} meal`}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-label transition active:scale-95"
                  >
                    <X size={18} strokeWidth={2.2} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setPickFor(day)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-hairline bg-surface/60 py-4 text-[14px] font-bold text-forest transition active:scale-[0.99]"
                >
                  <Plus size={17} strokeWidth={2.5} /> Add recipe
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Shopping list */}
      <div className="px-4 pb-28 pt-6">
        <button
          disabled={plannedCount === 0}
          onClick={() => setAddedToBasket(true)}
          className={`flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[15px] font-bold transition ${
            plannedCount === 0
              ? 'cursor-not-allowed bg-sand text-muted'
              : addedToBasket
                ? 'bg-primary text-white'
                : 'bg-forest text-white shadow-cta'
          }`}
        >
          {addedToBasket ? (
            <>
              <Check size={18} strokeWidth={2.5} /> Added to your basket
            </>
          ) : (
            <>
              <ShoppingBasket size={18} strokeWidth={2.2} /> Add {ingredientCount} ingredients to basket
            </>
          )}
        </button>
      </div>

      {pickFor && (
        <RecipePicker
          recipes={pickable}
          onPick={(id) => {
            setMeal(pickFor, id)
            setPickFor(null)
            setAddedToBasket(false)
          }}
          onClose={() => setPickFor(null)}
          day={pickFor}
        />
      )}
    </>
  )
}

function RecipePicker({
  recipes,
  day,
  onPick,
  onClose,
}: {
  recipes: Recipe[]
  day: Weekday
  onPick: (id: string) => void
  onClose: () => void
}) {
  const [q, setQ] = useState('')
  const filtered = recipes.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative flex max-h-[80%] w-full flex-col rounded-t-lg bg-cream pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
        <div className="px-4 pt-3">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-hairline" />
          <h2 className="font-display text-[18px] font-bold text-ink">Pick a recipe</h2>
          <p className="mb-3 mt-0.5 text-[13px] font-semibold text-label">For {day}</p>
          <div className="flex items-center gap-2 rounded-btn bg-surface px-[16px] py-[12px] shadow-[inset_0_0_0_1px_#d9d9d9]">
            <Search size={18} className="text-label" strokeWidth={2} />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search recipes"
              className="w-full bg-transparent text-[15px] font-semibold text-ink outline-none placeholder:font-normal placeholder:text-label"
            />
          </div>
        </div>

        <div className="mt-3 flex-1 overflow-y-auto px-4">
          <div className="flex flex-col gap-2 pb-2">
            {filtered.map((r) => (
              <button
                key={r.id}
                onClick={() => onPick(r.id)}
                className="flex items-center gap-3 rounded-lg border border-hairline bg-surface p-2 text-left transition active:scale-[0.99]"
              >
                {r.imageUrl ? (
                  <img src={r.imageUrl} alt="" className="h-12 w-12 shrink-0 rounded border border-black/10 object-cover" />
                ) : (
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded border border-black/10 bg-gradient-to-br from-primary/25 to-citrus/25 text-xl">🍽️</div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[14px] font-extrabold text-ink">{r.name}</div>
                  {r.duration && <div className="text-[12px] font-bold text-label">{r.duration}</div>}
                </div>
                <Plus size={18} strokeWidth={2.4} className="shrink-0 text-forest" />
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="py-8 text-center text-[13px] font-semibold text-label">No recipes found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
