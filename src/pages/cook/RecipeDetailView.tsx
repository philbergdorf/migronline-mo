import { ChevronLeft, Heart, Clock } from 'lucide-react'
import type { Recipe } from '../../lib/recipeData'
import { getRecipeDetail } from '../../lib/recipeData'
import { useFavorites } from '../../lib/favorites'
import { useCustomRecipes } from '../../lib/customRecipes'

const tagEmoji: Record<string, string> = {
  Quick: '⚡',
  Vegan: '🌱',
  'Gluten-free': '🌾',
  Seasonal: '🍃',
}

export function RecipeDetailView({ recipe, onBack }: { recipe: Recipe; onBack: () => void }) {
  const { getCustomDetail } = useCustomRecipes()
  const detail = getCustomDetail(recipe.id) || getRecipeDetail(recipe.id)
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(recipe.id)

  return (
    <div>
      {/* Hero */}
      <div className="relative">
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl.replace('w=400&h=300', 'w=800&h=600')}
            alt={recipe.name}
            className="aspect-[4/3] w-full object-cover"
          />
        ) : (
          <div className="grid aspect-[4/3] w-full place-items-center bg-gradient-to-br from-primary/25 to-citrus/25 text-6xl">
            🍽️
          </div>
        )}

        <button
          onClick={onBack}
          aria-label="Back"
          className="absolute left-3 grid h-9 w-9 place-items-center rounded-full bg-surface/85 text-forest backdrop-blur-sm"
          style={{ top: 'calc(env(safe-area-inset-top) + 12px)' }}
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>

        <button
          onClick={() => toggleFavorite(recipe.id)}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute right-3 grid h-9 w-9 place-items-center rounded-full bg-surface/85 backdrop-blur-sm"
          style={{ top: 'calc(env(safe-area-inset-top) + 12px)' }}
        >
          <Heart size={19} strokeWidth={2.2} className={fav ? 'fill-tomato text-tomato' : 'text-ink/70'} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-28 pt-5">
        <h1 className="font-display text-[24px] font-bold text-ink">{recipe.name}</h1>

        <div className="mt-2 flex items-center gap-4 text-[13px] font-bold text-label">
          {recipe.duration && (
            <span className="flex items-center gap-1">
              <Clock size={14} strokeWidth={2.2} /> {recipe.duration}
            </span>
          )}
          <span>{detail.servings}</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {recipe.tags.map((t) => (
            <span key={t} className="inline-flex items-center gap-1 rounded-full bg-sand px-2.5 py-1 text-[12px] font-bold text-muted">
              {tagEmoji[t] && <span className="text-[10px]">{tagEmoji[t]}</span>}
              {t}
            </span>
          ))}
          {recipe.category && (
            <span className="rounded-full bg-sand px-2.5 py-1 text-[12px] font-bold text-muted">{recipe.category}</span>
          )}
        </div>

        <h2 className="mb-3 mt-6 font-display text-[17px] font-bold text-ink">Ingredients</h2>
        <ul className="space-y-2">
          {detail.ingredients.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] font-medium text-ink/80">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mb-3 mt-6 font-display text-[17px] font-bold text-ink">Preparation</h2>
        <ol className="space-y-4">
          {detail.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-forest text-[13px] font-bold text-white">
                {i + 1}
              </span>
              <p className="text-[15px] font-medium leading-relaxed text-ink/80">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
