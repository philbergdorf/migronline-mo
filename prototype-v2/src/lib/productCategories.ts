export type Level2Category = {
  name: string
  level3: string[]
  products?: string[]
  filters?: Record<string, string[]>
}

export type Level1Category = {
  name: string
  groups: Level2Category[]
}

export const CATEGORY_TREE: Level1Category[] = [
  { name: 'Special diets', groups: [
    { name: 'Vegetarian & vegan', level3: ['Vegan', 'Vegetarian', 'Plant-based alternatives'], products: ['Avocado', 'Mozzarella', 'Dark Chocolate'] },
    { name: 'Free from', level3: ['Gluten-free', 'Lactose-free', 'No added sugar'], products: ['Rice', 'Almonds'] },
  ] },
  { name: 'Fruits & vegetables', groups: [
    { name: 'Fruits', level3: ['Apples & pears', 'Citrus fruits', 'Berries', 'Grapes', 'Melons', 'Stone fruit', 'Exotic fruits', 'Bananas'], products: ['Bio Bananas', 'Apples', 'Grapes'], filters: { 'Apples & pears': ['Apples'], Grapes: ['Grapes'], Bananas: ['Bio Bananas'] } },
    { name: 'Vegetables', level3: ['Tomatoes', 'Cucumbers & avocados', 'Courgettes, aubergines & peppers', 'Beans & sweetcorn', 'Cauliflower, broccoli & cabbage', 'Mushrooms', 'Other vegetables'], products: ['Cherry Tomatoes', 'Avocado', 'Bell Peppers'], filters: { Tomatoes: ['Cherry Tomatoes'], 'Cucumbers & avocados': ['Avocado'], 'Courgettes, aubergines & peppers': ['Bell Peppers'] } },
    { name: 'Root vegetables', level3: ['Potatoes', 'Carrots', 'Onions & garlic', 'Other root vegetables'] },
    { name: 'Salad', level3: ['Leaf salads', 'Salad mixes', 'Salad vegetables'] },
    { name: 'Fresh herbs & spices', level3: ['Fresh herbs', 'Chillies', 'Ginger & turmeric'] },
    { name: 'Ready to use', level3: ['Prepared fruit', 'Prepared vegetables', 'Ready-made salads'] },
  ] },
  { name: 'Meat & fish', groups: [
    { name: 'Meat', level3: ['Beef', 'Pork', 'Veal', 'Lamb'] },
    { name: 'Poultry', level3: ['Chicken', 'Turkey', 'Other poultry'], products: ['Chicken Breast'], filters: { Chicken: ['Chicken Breast'] } },
    { name: 'Fish & seafood', level3: ['Fresh fish', 'Smoked fish', 'Shellfish'] },
    { name: 'Cold cuts', level3: ['Ham', 'Salami', 'Bacon & diced meat'], products: ['Guanciale'], filters: { 'Bacon & diced meat': ['Guanciale'] } },
  ] },
  { name: 'Dairy, eggs & fresh convenience food', groups: [
    { name: 'Milk, butter & eggs', level3: ['Milk', 'Butter & margarine', 'Eggs', 'Cream'], products: ['Whole Milk', 'Butter', 'Free-range Eggs'], filters: { Milk: ['Whole Milk'], 'Butter & margarine': ['Butter'], Eggs: ['Free-range Eggs'] } },
    { name: 'Cheese', level3: ['Hard cheese', 'Soft cheese', 'Fresh cheese', 'Grated cheese'], products: ['Gruyère AOP', 'Pecorino', 'Mozzarella'], filters: { 'Hard cheese': ['Gruyère AOP', 'Pecorino'], 'Fresh cheese': ['Mozzarella'] } },
    { name: 'Yoghurt & desserts', level3: ['Yoghurt', 'Quark', 'Desserts'], products: ['Greek Yoghurt'], filters: { Yoghurt: ['Greek Yoghurt'] } },
    { name: 'Fresh convenience food', level3: ['Ready meals', 'Fresh pasta', 'Soups', 'Salads'] },
    { name: 'Vegan dairy alternatives', level3: ['Plant drinks', 'Vegan yoghurt', 'Vegan cheese'] },
  ] },
  { name: 'Bread, pastries & breakfast', groups: [
    { name: 'Bread & rusks', level3: ['Fresh bread', 'Speciality bread', 'Toast & rusks'], products: ['Sourdough Bread', 'Baguette'] },
    { name: 'Pastries', level3: ['Croissants', 'Sweet pastries', 'Savoury pastries'], products: ['Croissant', 'Pretzel'] },
    { name: 'Breakfast', level3: ['Muesli & cereals', 'Spreads', 'Honey & jam'] },
  ] },
  { name: 'Pasta, condiments & canned food', groups: [
    { name: 'Pasta & noodles', level3: ['Italian pasta', 'Asian noodles', 'Fresh pasta'], products: ['Pasta', 'Spaghetti'] },
    { name: 'Rice & grains', level3: ['Rice', 'Couscous & bulgur', 'Quinoa & grains'], products: ['Rice'], filters: { Rice: ['Rice'] } },
    { name: 'Oil & vinegar', level3: ['Olive oil', 'Cooking oil', 'Vinegar'], products: ['Olive Oil'], filters: { 'Olive oil': ['Olive Oil'] } },
    { name: 'Canned food', level3: ['Vegetables', 'Fruit', 'Fish', 'Ready meals'] },
  ] },
  { name: 'Snacks & sweets', groups: [
    { name: 'Chocolate', level3: ['Chocolate bars', 'Chocolate tablets', 'Pralines'], products: ['Dark Chocolate'] },
    { name: 'Salty snacks', level3: ['Crisps', 'Nuts', 'Crackers'], products: ['Potato Chips', 'Salted Nuts', 'Almonds'], filters: { Crisps: ['Potato Chips'], Nuts: ['Salted Nuts', 'Almonds'] } },
    { name: 'Biscuits & cakes', level3: ['Biscuits', 'Cakes', 'Wafers'] },
  ] },
  { name: 'Frozen food', groups: [
    { name: 'Frozen fruit & vegetables', level3: ['Vegetables', 'Fruit', 'Herbs'] },
    { name: 'Pizza & snacks', level3: ['Pizza', 'Savoury snacks', 'Ready meals'] },
    { name: 'Ice cream', level3: ['Tubs', 'Sticks & cones', 'Sorbet'] },
  ] },
  { name: 'Drinks, coffee & tea', groups: [
    { name: 'Soft drinks', level3: ['Cola', 'Lemonades', 'Energy drinks', 'Iced tea'] },
    { name: 'Water', level3: ['Sparkling water', 'Still water', 'Flavoured water'], products: ['Sparkling Water'], filters: { 'Sparkling water': ['Sparkling Water'] } },
    { name: 'Fruit & vegetable juices', level3: ['Orange juice', 'Fruit juice', 'Vegetable juice', 'Smoothies'], products: ['Orange Juice'], filters: { 'Orange juice': ['Orange Juice'] } },
    { name: 'Coffee', level3: ['Coffee beans', 'Ground coffee', 'Capsules', 'Instant coffee'], products: ['Coffee Beans'], filters: { 'Coffee beans': ['Coffee Beans'] } },
    { name: 'Tea', level3: ['Black tea', 'Green tea', 'Herbal tea', 'Fruit tea'] },
    { name: 'Cocoa powder', level3: ['Drinking chocolate', 'Cocoa powder'] },
  ] },
  { name: 'Wine, beer & spirits', groups: [
    { name: 'Wine', level3: ['Red wine', 'White wine', 'Rosé wine'], products: ['Pinot Noir', 'Chasselas', 'Rosé de Provence'], filters: { 'Red wine': ['Pinot Noir'], 'White wine': ['Chasselas'], 'Rosé wine': ['Rosé de Provence'] } },
    { name: 'Sparkling wine', level3: ['Prosecco', 'Champagne', 'Other sparkling wine'], products: ['Prosecco'], filters: { Prosecco: ['Prosecco'] } },
    { name: 'Beer', level3: ['Lager', 'Craft beer', 'Alcohol-free beer'] },
    { name: 'Spirits', level3: ['Gin', 'Whisky', 'Rum', 'Liqueurs'] },
  ] },
  { name: 'Pets', groups: [
    { name: 'Cats', level3: ['Cat food', 'Cat litter', 'Accessories'] },
    { name: 'Dogs', level3: ['Dog food', 'Treats', 'Accessories'] },
  ] },
  { name: 'Baby and kids', groups: [
    { name: 'Baby food', level3: ['Milk formula', 'Baby meals', 'Baby snacks'] },
    { name: 'Nappies & care', level3: ['Nappies', 'Baby care', 'Wipes'] },
  ] },
  { name: 'Beauty & health', groups: [
    { name: 'Body care', level3: ['Shower & bath', 'Body lotion', 'Deodorant'] },
    { name: 'Hair care', level3: ['Shampoo', 'Conditioner', 'Styling'] },
    { name: 'Health', level3: ['Vitamins', 'First aid', 'Wellbeing'] },
  ] },
  { name: 'Household & cleaning', groups: [
    { name: 'Laundry', level3: ['Laundry detergent', 'Fabric softener', 'Stain remover'], products: ['Laundry Detergent'] },
    { name: 'Dishwashing', level3: ['Dishwasher tablets', 'Washing-up liquid', 'Accessories'], products: ['Dishwasher Tabs'] },
    { name: 'Household paper', level3: ['Toilet paper', 'Kitchen roll', 'Tissues'], products: ['Toilet Paper'] },
  ] },
  { name: 'Home & kitchen', groups: [
    { name: 'Kitchen', level3: ['Cookware', 'Tableware', 'Food storage'] },
    { name: 'Home', level3: ['Home textiles', 'Storage', 'Candles'] },
  ] },
  { name: 'Stationery, office & electronics', groups: [
    { name: 'Stationery', level3: ['Writing', 'Paper', 'School supplies'] },
    { name: 'Electronics accessories', level3: ['Batteries', 'Cables', 'Mobile accessories'] },
  ] },
  { name: 'Garden & outdoor living', groups: [
    { name: 'Garden', level3: ['Plants', 'Garden tools', 'Soil & fertiliser'] },
    { name: 'Outdoor living', level3: ['Barbecues', 'Outdoor furniture', 'Picnic'] },
  ] },
  { name: 'Games, hobbies & gifting', groups: [
    { name: 'Games & toys', level3: ['Board games', 'Toys', 'Creative play'] },
    { name: 'Gifts', level3: ['Gift cards', 'Wrapping', 'Seasonal gifts'] },
  ] },
  { name: 'Clothing and accessories', groups: [
    { name: 'Women', level3: ['Clothing', 'Underwear', 'Accessories'] },
    { name: 'Men', level3: ['Clothing', 'Underwear', 'Accessories'] },
    { name: 'Children', level3: ['Clothing', 'Underwear', 'Accessories'] },
  ] },
]

// A small demo selection fills out frequently browsed branches.
const extraAssortment: Record<string, Record<string, string[]>> = {
  Vegetables: { 'Cauliflower, broccoli & cabbage': ['Broccoli'], 'Courgettes, aubergines & peppers': ['Courgettes'], Mushrooms: ['Button Mushrooms'] },
  Fruits: { 'Citrus fruits': ['Oranges'], Berries: ['Strawberries'] },
  'Root vegetables': { Carrots: ['Carrots'], Potatoes: ['Potatoes'] },
  Salad: { 'Leaf salads': ['Lettuce'] },
  'Fresh herbs & spices': { 'Fresh herbs': ['Fresh Basil'] },
  Breakfast: { 'Muesli & cereals': ['Rolled Oats'] },
  'Canned food': { Vegetables: ['Chopped Tomatoes'] },
  'Frozen fruit & vegetables': { Vegetables: ['Frozen Peas'] },
  'Vegan dairy alternatives': { 'Plant drinks': ['Oat Drink'] },
  Tea: { 'Green tea': ['Green Tea'] },
}
for (const department of CATEGORY_TREE) {
  for (const group of department.groups) {
    const additions = extraAssortment[group.name]
    if (!additions) continue
    group.products = [...(group.products ?? []), ...Object.values(additions).flat()]
    for (const [filter, names] of Object.entries(additions)) {
      group.filters = { ...group.filters, [filter]: [...(group.filters?.[filter] ?? []), ...names] }
    }
  }
}

// Special diets is a cross-cutting browsing collection, so use the first
// merchandise department that lists each product for basket grouping.
const productDepartments = new Map<string, string>()
for (const department of CATEGORY_TREE) {
  if (department.name === 'Special diets') continue
  for (const group of department.groups) {
    for (const product of group.products ?? []) {
      if (!productDepartments.has(product)) productDepartments.set(product, department.name)
    }
  }
}

export function getProductDepartment(name: string): string {
  return productDepartments.get(name) ?? 'Other products'
}
