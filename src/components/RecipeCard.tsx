import { Heart, Clock } from 'lucide-react'
import type { Recipe } from '../lib/recipeData'
import { useFavorites } from '../lib/favorites'

const tagEmoji: Record<string, string> = {
  Quick: '⚡',
  Vegan: '🌱',
  'Gluten-free': '🌾',
  Seasonal: '🍃',
}

function TagChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-sand px-2 py-0.5 text-[11px] font-bold text-muted">
      {tagEmoji[label] && <span className="text-[10px]">{tagEmoji[label]}</span>}
      {label}
    </span>
  )
}

export function RecipeCard({ recipe, onSelect }: { recipe: Recipe; onSelect?: (r: Recipe) => void }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(recipe.id)
  const visibleTags = recipe.tags.slice(0, 2)
  const extra = recipe.tags.length - 2

  return (
    <div
      onClick={() => onSelect?.(recipe)}
      className="flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-hairline bg-surface shadow-soft transition active:scale-[0.98]"
    >
      <div className="relative">
        {recipe.imageUrl ? (
          <img src={recipe.imageUrl} alt={recipe.name} className="aspect-[4/3] w-full object-cover" />
        ) : (
          <div className="grid aspect-[4/3] w-full place-items-center bg-gradient-to-br from-primary/25 to-citrus/25 text-4xl">
            🍽️
          </div>
        )}
        <button
          type="button"
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(recipe.id)
          }}
          className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-surface/85 backdrop-blur-sm"
        >
          <Heart
            size={17}
            strokeWidth={2.2}
            className={fav ? 'fill-tomato text-tomato' : 'text-ink/60'}
          />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="mb-1 line-clamp-2 text-[13px] font-extrabold leading-tight text-ink">{recipe.name}</p>
        {recipe.duration && (
          <p className="mb-1.5 flex items-center gap-1 text-[11px] font-bold text-label">
            <Clock size={12} strokeWidth={2.2} /> {recipe.duration}
          </p>
        )}
        <div className="mt-auto flex flex-wrap gap-1">
          {visibleTags.map((t) => (
            <TagChip key={t} label={t} />
          ))}
          {extra > 0 && <TagChip label={`+${extra}`} />}
        </div>
      </div>
    </div>
  )
}
