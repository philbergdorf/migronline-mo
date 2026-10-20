import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Recipe, RecipeDetail } from './recipeData'

export type CustomRecipeData = {
  recipe: Recipe
  detail: RecipeDetail
}

type CustomRecipesContextValue = {
  customRecipes: CustomRecipeData[]
  addRecipe: (data: CustomRecipeData) => void
  removeRecipe: (id: string) => void
  getCustomDetail: (id: string) => RecipeDetail | null
}

const CustomRecipesContext = createContext<CustomRecipesContextValue | null>(null)

function loadFromStorage(): CustomRecipeData[] {
  try {
    const raw = localStorage.getItem('migronline-custom-recipes')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CustomRecipesProvider({ children }: { children: ReactNode }) {
  const [recipes, setRecipes] = useState<CustomRecipeData[]>(loadFromStorage)

  const addRecipe = useCallback((data: CustomRecipeData) => {
    setRecipes((prev) => {
      const next = [data, ...prev]
      localStorage.setItem('migronline-custom-recipes', JSON.stringify(next))
      return next
    })
  }, [])

  const removeRecipe = useCallback((id: string) => {
    setRecipes((prev) => {
      const next = prev.filter((r) => r.recipe.id !== id)
      localStorage.setItem('migronline-custom-recipes', JSON.stringify(next))
      return next
    })
  }, [])

  const getCustomDetail = useCallback(
    (id: string) => recipes.find((r) => r.recipe.id === id)?.detail ?? null,
    [recipes],
  )

  return (
    <CustomRecipesContext.Provider value={{ customRecipes: recipes, addRecipe, removeRecipe, getCustomDetail }}>
      {children}
    </CustomRecipesContext.Provider>
  )
}

export function useCustomRecipes() {
  const ctx = useContext(CustomRecipesContext)
  if (!ctx) throw new Error('useCustomRecipes must be used within CustomRecipesProvider')
  return ctx
}
