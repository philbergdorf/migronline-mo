import { createContext, useContext, useState, type ReactNode } from 'react'
import { productPresentation } from './productPresentation'

export type BasketLine = {
  name: string
  unit: number
  qty: number
  meal: string
  saved?: number // savings per unit vs. regular price
}

const INITIAL: BasketLine[] = [
  { name: 'Bio Bananas', unit: 3.2, qty: 2, meal: 'Breakfast', saved: 0.4 },
  { name: 'Whole Milk', unit: 1.6, qty: 1, meal: 'Breakfast' },
  { name: 'Free-range Eggs', unit: 5.9, qty: 1, meal: 'Breakfast' },
  { name: 'Spaghetti', unit: 1.8, qty: 1, meal: 'Pasta Carbonara' },
  { name: 'Pecorino', unit: 4.2, qty: 1, meal: 'Pasta Carbonara', saved: 0.8 },
  { name: 'Guanciale', unit: 5.5, qty: 1, meal: 'Pasta Carbonara' },
  { name: 'Cherry Tomatoes', unit: 2.8, qty: 1, meal: 'Tomato & Basil Salad', saved: 0.6 },
  { name: 'Mozzarella', unit: 2.4, qty: 1, meal: 'Tomato & Basil Salad' },
]

type BasketContextValue = {
  lines: BasketLine[]
  addProduct: (product: { name: string; price: string; discount?: number }) => void
  setQty: (name: string, qty: number) => void
  decrementProduct: (name: string) => void
}
const BasketContext = createContext<BasketContextValue | null>(null)

export function BasketProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState(INITIAL)
  const addProduct: BasketContextValue['addProduct'] = (product) => {
    const unit = Number(product.price.replace('CHF ', ''))
    if (!Number.isFinite(unit) || unit < 0) return
    const regularUnit = productPresentation(product.name, '', product.price, product.discount).regularPrice ?? unit
    setLines((previous) => {
      if (previous.some((line) => line.name === product.name)) {
        return previous.map((line) => {
          if (line.name !== product.name) return line
          const bestUnit = Math.min(line.unit, unit)
          const referenceUnit = Math.max(line.unit + (line.saved ?? 0), regularUnit)
          return { ...line, qty: line.qty + 1, unit: bestUnit,
            saved: Math.round((referenceUnit - bestUnit) * 100) / 100 }
        })
      }
      return [...previous, { name: product.name, unit, qty: 1, meal: 'Other products',
        saved: Math.round((regularUnit - unit) * 100) / 100 }]
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
