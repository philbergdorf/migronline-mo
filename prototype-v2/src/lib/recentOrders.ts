import { PRODUCT_CATALOG } from './productCatalog'
import { getProductDepartment } from './productCategories'

export type OrderProduct = { name: string; sub: string; price: string; quantity: number }
export type PreviousOrder = { id: string; date: string; totalCents: number; products: OrderProduct[] }

const BASKETS = [
  ['Bio Bananas', 'Apples', 'Cherry Tomatoes', 'Avocado', 'Whole Milk', 'Free-range Eggs', 'Greek Yoghurt', 'Sourdough Bread', 'Pasta', 'Olive Oil', 'Coffee Beans', 'Dark Chocolate', 'Toilet Paper'],
  ['Bell Peppers', 'Grapes', 'Chicken Breast', 'Butter', 'Mozzarella', 'Croissant', 'Rice', 'Sparkling Water', 'Orange Juice', 'Almonds', 'Dishwasher Tabs'],
  ['Bio Bananas', 'Apples', 'Avocado', 'Whole Milk', 'Free-range Eggs', 'Butter', 'Sourdough Bread', 'Pretzel', 'Spaghetti', 'Pecorino', 'Guanciale', 'Coffee Beans', 'Dark Chocolate', 'Laundry Detergent'],
  ['Cherry Tomatoes', 'Bell Peppers', 'Grapes', 'Chicken Breast', 'Gruyère AOP', 'Greek Yoghurt', 'Baguette', 'Pasta', 'Olive Oil', 'Orange Juice', 'Potato Chips', 'Salted Nuts'],
]

// Calendar dates use Switzerland's timezone, independently of the browser's zone.
function swissToday(reference: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Zurich', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(reference)
  const part = (type: string) => Number(parts.find(value => value.type === type)?.value)
  return new Date(Date.UTC(part('year'), part('month') - 1, part('day')))
}
const isoDate = (date: Date) => date.toISOString().slice(0, 10)
export const formatOrderDate = (date: string) => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`))
export const formatOrderMonth = (date: string) => new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`))
export const formatOrderTotal = (cents: number) => `CHF ${(cents / 100).toFixed(2)}`
export const orderItemCount = (order: PreviousOrder) => order.products.reduce((total, product) => total + product.quantity, 0)

export function createOrderHistory(reference = new Date()) {
  const today = swissToday(reference)
  const cutoff = new Date(today)
  cutoff.setUTCDate(1)
  cutoff.setUTCMonth(cutoff.getUTCMonth() - 6)
  const lastDay = new Date(Date.UTC(cutoff.getUTCFullYear(), cutoff.getUTCMonth() + 1, 0)).getUTCDate()
  cutoff.setUTCDate(Math.min(today.getUTCDate(), lastDay))
  const orders: PreviousOrder[] = Array.from({ length: 40 }, (_, index) => {
    const date = new Date(today)
    date.setUTCDate(date.getUTCDate() - 2 - index * 7)
    const products = BASKETS[index % BASKETS.length].map((name, itemIndex) => {
      const product = PRODUCT_CATALOG.find(item => item.name === name)
      if (!product) throw new Error(`Missing order product: ${name}`)
      return { ...product, quantity: (index + itemIndex) % 5 === 0 ? 2 : 1 }
    })
    const subtotal = products.reduce((total, product) => total + Math.round(Number(product.price.replace('CHF ', '')) * 100) * product.quantity, 0)
    return { id: `MO-${28461 - index * 137}`, date: isoDate(date), totalCents: subtotal + 590, products }
  }).filter(order => order.date >= isoDate(cutoff) && order.date <= isoDate(today))
  return { orders, from: isoDate(cutoff), to: isoDate(today) }
}

const DEPARTMENT_LABELS: Record<string, string> = {
  'Fruits & vegetables': 'Fruit & Veg', 'Meat & fish': 'Meat & Fish',
  'Dairy, eggs & fresh convenience food': 'Dairy', 'Bread, pastries & breakfast': 'Bakery',
  'Pasta, condiments & canned food': 'Pantry', 'Drinks, coffee & tea': 'Drinks',
  'Snacks & sweets': 'Snacks', 'Household & cleaning': 'Household',
}
const CATEGORY_ORDER = ['Fruit & Veg', 'Meat & Fish', 'Dairy', 'Bakery', 'Pantry', 'Drinks', 'Snacks', 'Household']
export function groupOrderProducts(products: OrderProduct[]) {
  const groups = new Map<string, OrderProduct[]>()
  for (const product of products) {
    const department = getProductDepartment(product.name)
    const key = DEPARTMENT_LABELS[department] ?? department
    const group = groups.get(key) ?? []
    group.push(product)
    groups.set(key, group)
  }
  const rank = (key: string) => CATEGORY_ORDER.includes(key) ? CATEGORY_ORDER.indexOf(key) : CATEGORY_ORDER.length
  return Array.from(groups, ([key, items]) => ({ key, products: items })).sort((first, second) => rank(first.key) - rank(second.key))
}

export const ORDER_HISTORY = createOrderHistory()
