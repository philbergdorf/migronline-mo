import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

export const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const
export type Weekday = (typeof WEEKDAYS)[number]

type Plan = Partial<Record<Weekday, string>> // day -> recipeId

type MealPlanContextValue = {
  plan: Plan
  setMeal: (day: Weekday, recipeId: string) => void
  clearMeal: (day: Weekday) => void
  clearWeek: () => void
}

const MealPlanContext = createContext<MealPlanContextValue | null>(null)
const KEY = 'migronline-meal-plan'

function load(): Plan {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function MealPlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Plan>(load)

  const persist = (next: Plan) => {
    localStorage.setItem(KEY, JSON.stringify(next))
    return next
  }

  const setMeal = useCallback((day: Weekday, recipeId: string) => {
    setPlan((prev) => persist({ ...prev, [day]: recipeId }))
  }, [])

  const clearMeal = useCallback((day: Weekday) => {
    setPlan((prev) => {
      const next = { ...prev }
      delete next[day]
      return persist(next)
    })
  }, [])

  const clearWeek = useCallback(() => setPlan(persist({})), [])

  return (
    <MealPlanContext.Provider value={{ plan, setMeal, clearMeal, clearWeek }}>
      {children}
    </MealPlanContext.Provider>
  )
}

export function useMealPlan() {
  const ctx = useContext(MealPlanContext)
  if (!ctx) throw new Error('useMealPlan must be used within MealPlanProvider')
  return ctx
}
