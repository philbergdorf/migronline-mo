import { useState, useMemo } from 'react'
import { ChevronLeft } from 'lucide-react'
import type { Recipe } from '../../lib/recipeData'
import { SearchField } from '../../components/ui'
import { RecipeCard } from '../../components/RecipeCard'

export function RecipeListView({
  title,
  recipes,
  filters,
  onBack,
  onSelect,
  emptyIcon = '🔍',
  emptyTitle = 'No recipes found',
  emptyText = 'Try different filters or another search term.',
  initialSearch = '',
}: {
  title: string
  recipes: Recipe[]
  filters: string[]
  onBack: () => void
  onSelect: (r: Recipe) => void
  emptyIcon?: string
  emptyTitle?: string
  emptyText?: string
  initialSearch?: string
}) {
  const [search, setSearch] = useState(initialSearch)
  const [active, setActive] = useState<Set<string>>(new Set())

  function toggle(value: string) {
    setActive((prev) => {
      const next = new Set(prev)
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return next
    })
  }

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false
      if (active.size > 0) {
        const matchesTag = r.tags.some((t) => active.has(t))
        const matchesCat = r.category ? active.has(r.category) : false
        if (!matchesTag && !matchesCat) return false
      }
      return true
    })
  }, [recipes, search, active])

  const hasActive = search !== '' || active.size > 0

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-30 bg-cream/90 backdrop-blur">
        <div className="relative flex h-11 items-center justify-center pt-[env(safe-area-inset-top)]">
          <button
            onClick={onBack}
            className="absolute left-2 flex items-center gap-0.5 font-semibold text-forest"
          >
            <ChevronLeft size={22} strokeWidth={2.4} />
            <span className="text-[16px]">Cook</span>
          </button>
          <span className="font-display text-[17px] font-bold text-ink">{title}</span>
        </div>
      </div>

      <div className="px-4 pt-3">
        <SearchField value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search recipes" />
      </div>

      {filters.length > 0 && (
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pt-3">
          {filters.map((f) => {
            const on = active.has(f)
            return (
              <button
                key={f}
                onClick={() => toggle(f)}
                className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-bold transition ${
                  on ? 'bg-forest text-white' : 'bg-surface text-ink shadow-chip'
                }`}
              >
                {f}
              </button>
            )
          })}
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 px-4 pt-4 pb-28">
          {filtered.map((r) => (
            <RecipeCard key={r.id} recipe={r} onSelect={onSelect} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center px-8 pb-28 pt-16 text-center">
          <span className="mb-3 text-5xl">{emptyIcon}</span>
          <p className="text-[15px] font-extrabold text-ink">{emptyTitle}</p>
          <p className="mt-1 text-[13px] font-semibold text-label">{emptyText}</p>
          {hasActive && (
            <button
              onClick={() => {
                setSearch('')
                setActive(new Set())
              }}
              className="mt-4 rounded-full bg-forest px-5 py-2 text-[13px] font-bold text-white"
            >
              Reset filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}
