import { PRODUCT_CATALOG } from './productCatalog'

// The prototype customer's top products, in the same order across shopping screens.
const TOP_PRODUCT_NAMES = [
  'Whole Milk', 'Bio Bananas', 'Sourdough Bread', 'Free-range Eggs',
  'Cherry Tomatoes', 'Greek Yoghurt', 'Butter', 'Apples',
  'Chicken Breast', 'Pasta', 'Orange Juice', 'Dark Chocolate',
]

export const CUSTOMER_TOP_PRODUCTS = TOP_PRODUCT_NAMES.flatMap((name) =>
  PRODUCT_CATALOG.filter((product) => product.name === name),
)
