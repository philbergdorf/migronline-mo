import { createContext, useContext, useState, type ReactNode } from 'react'

export type BasketLine = {
  name: string
  unit: number
  qty: number
  category: string
  meal: string
  saved?: number // savings per unit vs. regular price
}

const INITIAL: BasketLine[] = [
  { name: 'Bio Bananas', unit: 3.2, qty: 2, category: 'Fruit & Veg', meal: 'Breakfast', saved: 0.4 },
  { name: 'Whole Milk', unit: 1.6, qty: 1, category: 'Dairy', meal: 'Breakfast' },
  { name: 'Free-range Eggs', unit: 5.9, qty: 1, category: 'Dairy', meal: 'Breakfast' },
  { name: 'Spaghetti', unit: 1.8, qty: 1, category: 'Pantry', meal: 'Pasta Carbonara' },
  { name: 'Pecorino', unit: 4.2, qty: 1, category: 'Dairy', meal: 'Pasta Carbonara', saved: 0.8 },
  { name: 'Guanciale', unit: 5.5, qty: 1, category: 'Meat', meal: 'Pasta Carbonara' },
  { name: 'Cherry Tomatoes', unit: 2.8, qty: 1, category: 'Fruit & Veg', meal: 'Tomato & Basil Salad', saved: 0.6 },
  { name: 'Mozzarella', unit: 2.4, qty: 1, category: 'Dairy', meal: 'Tomato & Basil Salad' },
]


const CATEGORIES: Record<string, string[]> = {
  'Fruit & Veg': ['Bio Bananas', 'Apples', 'Cherry Tomatoes', 'Avocado', 'Grapes', 'Bell Peppers'],
  Dairy: ['Whole Milk', 'Free-range Eggs', 'Greek Yoghurt', 'Butter', 'Gruyère AOP', 'Pecorino', 'Mozzarella'],
  Bakery: ['Sourdough Bread', 'Croissant', 'Pretzel', 'Baguette'],
  Meat: ['Chicken Breast', 'Guanciale'],
  Drinks: ['Orange Juice', 'Sparkling Water', 'Coffee Beans'],
  Wine: ['Rosé de Provence', 'Pinot Noir', 'Chasselas', 'Prosecco'],
  Snacks: ['Dark Chocolate', 'Potato Chips', 'Almonds', 'Salted Nuts'],
  Household: ['Laundry Detergent', 'Toilet Paper', 'Dishwasher Tabs'],
}

type BasketContextValue = {
  lines: BasketLine[]
  addProduct: (product: { name: string; price: string }) => void
  setQty: (name: string, qty: number) => void
  decrementProduct: (name: string) => void
}
const BasketContext = createContext<BasketContextValue | null>(null)

export function BasketProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState(INITIAL)
  const addProduct: BasketContextValue['addProduct'] = (product) => {
    const unit = Number(product.price.replace('CHF ', ''))
    if (!Number.isFinite(unit) || unit < 0) return
    setLines((previous) => {
      if (previous.some((line) => line.name === product.name)) {
        return previous.map((line) => {
          if (line.name !== product.name) return line
          const bestUnit = Math.min(line.unit, unit)
          return { ...line, qty: line.qty + 1, unit: bestUnit,
            saved: Math.round((line.unit + (line.saved ?? 0) - bestUnit) * 100) / 100 }
        })
      }
      const category = Object.entries(CATEGORIES).find(([, names]) => names.includes(product.name))?.[0] ?? 'Pantry'
      return [...previous, { name: product.name, unit, qty: 1, category, meal: 'Other products' }]
    })
  }
  const setQty = (name: string, qty: number) => {
    if (!Number.isFinite(qty)) return
    setLines((previous) => previous.map((line) => line.name === name ? { ...line, qty: Math.max(0, Math.floor(qty)) } : line))
  }
  const decrementProduct = (name: string) => {
    setLines(previous => previous.map(line => line.name === name ? { ...line, qty: Math.max(0, line.qty - 1) } : line))
  }
  return <BasketContext.Provider value={{ lines, addProduct, setQty, decrementProduct }}>{children}</BasketContext.Provider>
}

export function useBasket() {
  const basket = useContext(BasketContext)
  if (!basket) throw new Error('useBasket must be used inside BasketProvider')
  return basket
}
