import { PRODUCT_CATALOG } from './productCatalog'

type Presentation = { title?: string; swiss?: boolean; organic?: boolean; chilled?: boolean; regularPrice?: number }
// Pack names match the photography. Reference prices use the prototype's
// existing basket savings and wine offers; they are not live retail prices.
const PRESENTATION: Record<string, Presentation> = {
  'Whole Milk': { title: 'Valflora · Whole milk · UHT, 3.5% fat' },
  'Bio Bananas': { title: 'Migros Bio · Bananas', organic: true, regularPrice: 3.60 },
  'Sourdough Bread': { title: 'From the region · Valais rye bread', swiss: true },
  'Free-range Eggs': { title: 'From the region · Free-range eggs', swiss: true },
  'Cherry Tomatoes': { title: 'Migros · Cherry tomatoes on the vine', regularPrice: 3.40 },
  'Greek Yoghurt': { title: 'Yogos · Natural Greek-style yoghurt', chilled: true },
  Butter: { title: 'Die Butter · Butter', chilled: true },
  Apples: { title: 'Migros · Gala apples' },
  'Chicken Breast': { title: 'Migros · Chicken breast', chilled: true },
  Pasta: { title: 'Migros · Penne' },
  'Orange Juice': { title: 'Migros · Orange juice' },
  'Dark Chocolate': { title: 'Frey · Noir Special dark chocolate' },
  'Laundry Detergent': { title: 'Total · Colour liquid laundry detergent' },
  'Toilet Paper': { title: 'Soft Supreme · White toilet paper, 4-ply' },
  'Dishwasher Tabs': { title: 'L’Arbre Vert · Dishwasher tablets' },
  Rice: { title: 'Migros · Basmati rice' },
  'Olive Oil': { title: 'Don Pablo · Extra virgin olive oil' },
  'Coffee Beans': { title: 'Café Royal · Crema Brasil coffee beans' },
  'Gruyère AOP': { title: 'Le Gruyère AOP · Surchoix', chilled: true, swiss: true },
  Pecorino: { title: 'Pecorino Romano', chilled: true, regularPrice: 5 },
  Guanciale: { title: 'Citterio · Diced guanciale', chilled: true },
  Mozzarella: { title: 'From the region · Mozzarella', chilled: true, swiss: true },
  'Sparkling Water': { title: 'Aproz · Légère sparkling mineral water' },
  'Rosé de Provence': { regularPrice: 12 },
  'Pinot Noir': { regularPrice: 18 },
  Prosecco: { regularPrice: 12 },
}

export function productPresentation(name: string, sub: string, price: string, promotionDiscount?: number) {
  const detail = PRESENTATION[name] ?? {}
  const amount = Number(price.replace('CHF ', ''))
  const catalogueSub = PRODUCT_CATALOG.find((product) => product.name === name)?.sub ?? sub
  const pack = catalogueSub.match(/(?:(\d+)\s*×\s*)?(\d+(?:\.\d+)?)\s*(kg|g|ml|cl|L|pcs|pc)\b/i)
  let unitPrice: string | undefined
  if (pack) {
    const quantity = Number(pack[1] ?? 1) * Number(pack[2])
    const unit = pack[3].toLowerCase()
    const grams = unit === 'kg' ? quantity * 1000 : quantity
    const litres = unit === 'ml' ? quantity / 1000 : unit === 'cl' ? quantity / 100 : quantity
    if (unit === 'g' || unit === 'kg') unitPrice = `${(amount / grams * 100).toFixed(2)}/100 g`
    else if (['ml', 'cl', 'l'].includes(unit)) unitPrice = `${(amount / litres).toFixed(2)}/L`
    else unitPrice = `${(amount / quantity).toFixed(2)}/pc`
  }
  const validPromotion = promotionDiscount !== undefined && promotionDiscount > 0 && promotionDiscount < 100
  // Promotions retain their existing offer percentage; infer the demo reference price.
  const regularPrice = validPromotion ? Math.round(amount / (1 - promotionDiscount / 100) * 100) / 100
    : detail.regularPrice && detail.regularPrice > amount ? detail.regularPrice : undefined
  return { ...detail, title: detail.title ?? name, amount, regularPrice,
    discount: validPromotion ? promotionDiscount : regularPrice ? Math.round((1 - amount / regularPrice) * 100) : undefined,
    packSize: pack?.[0] ?? catalogueSub, unitPrice,
    restock: sub.startsWith('Last bought') ? sub : undefined,
    purchaseHistory: sub.startsWith('Bought ') ? sub : undefined,
  }
}
