import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import {
  neueRezepte,
  favoritenRezepte,
  allFavoritenRezepte,
  eigeneRezepte,
  saisonaleRezepte,
  schnelleRezepte,
} from './recipeData'

function getInitialFavorites(): Set<string> {
  const all = [...neueRezepte, ...favoritenRezepte, ...allFavoritenRezepte, ...eigeneRezepte, ...saisonaleRezepte, ...schnelleRezepte]
  const favIds = new Set<string>()
  for (const r of all) if (r.isFavorite) favIds.add(r.id)
  return favIds
}

type FavoritesContextValue = {
  isFavorite: (id: string) => boolean
  toggleFavorite: (id: string) => void
}

const FavoritesContext = createContext<FavoritesContextValue>({
  isFavorite: () => false,
  toggleFavorite: () => {},
})

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState(getInitialFavorites)

  const isFavorite = useCallback((id: string) => favorites.has(id), [favorites])

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  return (
    <FavoritesContext.Provider value={{ isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}
