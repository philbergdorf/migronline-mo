import { useState } from 'react'
import { ChevronLeft, X, Plus } from 'lucide-react'
import { useCustomRecipes } from '../../lib/customRecipes'

const categories = ['Breakfast', 'Main', 'Snack & side']
const tagOptions = ['Quick', 'Vegan', 'Gluten-free', 'Seasonal']

const inputCls =
  'w-full rounded-lg border border-hairline bg-surface px-3 py-2.5 text-[15px] font-semibold text-ink outline-none transition-colors placeholder:font-normal placeholder:text-label focus:border-primary'

export function CreateRecipeView({ onBack, onSaved }: { onBack: () => void; onSaved: () => void }) {
  const { addRecipe } = useCustomRecipes()

  const [name, setName] = useState('')
  const [duration, setDuration] = useState('')
  const [servings, setServings] = useState('4 Portionen')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<Set<string>>(new Set())
  const [ingredients, setIngredients] = useState([''])
  const [steps, setSteps] = useState([''])
  const [imageUrl, setImageUrl] = useState('')

  function toggleTag(t: string) {
    setTags((prev) => {
      const next = new Set(prev)
      if (next.has(t)) next.delete(t)
      else next.add(t)
      return next
    })
  }

  const canSave = name.trim() !== ''

  function save() {
    if (!canSave) return
    addRecipe({
      recipe: {
        id: `custom-${Date.now()}`,
        name: name.trim(),
        imageUrl: imageUrl.trim() || null,
        tags: Array.from(tags),
        isFavorite: false,
        duration: duration.trim() || undefined,
        category: category || undefined,
      },
      detail: {
        servings: servings.trim() || '4 Portionen',
        ingredients: ingredients.filter((s) => s.trim()),
        steps: steps.filter((s) => s.trim()),
      },
    })
    onSaved()
  }

  const chip = (active: boolean) =>
    `rounded-full px-4 py-2 text-[13px] font-bold transition ${active ? 'bg-forest text-white' : 'bg-surface text-ink shadow-chip'}`

  return (
    <div>
      <div className="sticky top-0 z-30 bg-cream/90 backdrop-blur">
        <div className="relative flex h-11 items-center justify-center pt-[env(safe-area-inset-top)]">
          <button onClick={onBack} className="absolute left-2 flex items-center gap-0.5 font-semibold text-forest">
            <ChevronLeft size={22} strokeWidth={2.4} />
            <span className="text-[16px]">Back</span>
          </button>
          <span className="font-display text-[17px] font-bold text-ink">New recipe</span>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-4 pb-28 pt-4">
        <div>
          <label className="mb-1.5 block text-[13px] font-bold text-ink">Name *</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Pasta Arrabiata" className={inputCls} />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="mb-1.5 block text-[13px] font-bold text-ink">Time</label>
            <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 25 min" className={inputCls} />
          </div>
          <div className="flex-1">
            <label className="mb-1.5 block text-[13px] font-bold text-ink">Servings</label>
            <input value={servings} onChange={(e) => setServings(e.target.value)} placeholder="e.g. 4 Portionen" className={inputCls} />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] font-bold text-ink">Category</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setCategory(category === c ? '' : c)} className={chip(category === c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] font-bold text-ink">Tags</label>
          <div className="flex flex-wrap gap-2">
            {tagOptions.map((t) => (
              <button key={t} onClick={() => toggleTag(t)} className={chip(tags.has(t))}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] font-bold text-ink">Ingredients</label>
          <div className="flex flex-col gap-2">
            {ingredients.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={item}
                  onChange={(e) => setIngredients((p) => p.map((v, idx) => (idx === i ? e.target.value : v)))}
                  placeholder={`Ingredient ${i + 1}`}
                  className={inputCls}
                />
                <button
                  onClick={() => setIngredients((p) => (p.length === 1 ? [''] : p.filter((_, idx) => idx !== i)))}
                  aria-label="Remove ingredient"
                  className="grid h-8 w-8 shrink-0 place-items-center text-label"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
            <button onClick={() => setIngredients((p) => [...p, ''])} className="flex items-center gap-1 self-start text-[14px] font-bold text-forest">
              <Plus size={16} strokeWidth={2.5} /> Add ingredient
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] font-bold text-ink">Preparation</label>
          <div className="flex flex-col gap-2">
            {steps.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-2.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-forest text-[12px] font-bold text-white">
                  {i + 1}
                </span>
                <textarea
                  value={item}
                  onChange={(e) => setSteps((p) => p.map((v, idx) => (idx === i ? e.target.value : v)))}
                  placeholder={`Step ${i + 1}`}
                  rows={2}
                  className={`${inputCls} resize-none`}
                />
                <button
                  onClick={() => setSteps((p) => (p.length === 1 ? [''] : p.filter((_, idx) => idx !== i)))}
                  aria-label="Remove step"
                  className="mt-1.5 grid h-8 w-8 shrink-0 place-items-center text-label"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
            <button onClick={() => setSteps((p) => [...p, ''])} className="flex items-center gap-1 self-start text-[14px] font-bold text-forest">
              <Plus size={16} strokeWidth={2.5} /> Add step
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] font-bold text-ink">Image URL (optional)</label>
          <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." className={inputCls} />
        </div>

        <button
          onClick={save}
          disabled={!canSave}
          className={`w-full rounded-full py-3 text-[15px] font-bold transition ${
            canSave ? 'bg-forest text-white shadow-cta' : 'cursor-not-allowed bg-sand text-muted'
          }`}
        >
          Save recipe
        </button>
      </div>
    </div>
  )
}
