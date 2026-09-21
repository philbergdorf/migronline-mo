import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChefHat, ChevronRight, Clock3, Heart, Home, Leaf, MapPin, Minus, Plus, Search, ShoppingBag, SlidersHorizontal, Sparkles, Truck, X, Utensils, LayoutGrid, Maximize2 } from 'lucide-react'

type Theme = 'daily' | 'market' | 'table' | 'fresh'
type Screen = 'home' | 'shop' | 'cook' | 'basket'
const photo = (id: string, width = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
const images = {
  salad: photo('photo-1512621776951-a57141f2eefd'),
  pasta: photo('photo-1612874742237-6526221588e3'),
  soup: photo('photo-1476718406336-bb5a9690ee2a'),
  curry: photo('photo-1455619452474-d2be8b1e70cd'),
  toast: photo('photo-1525351484163-7529414344d8'),
  bowl: photo('photo-1590301157890-4810ed352733'),
}
const concepts = [
  { id: 'fresh' as Theme, number: '04', name: 'Fresh', tag: 'Fresh identity. Familiar paths.', badge: 'Original architecture', description: 'A brand that looks like what it sells. Deep green, sunlit produce and crisp contemporary typography — with the original app’s structure intact.', principle: 'Freshness you can feel.', color: '#0b5c36', keywords: ['Original navigation', 'Produce-led identity', 'Leaf + lime green'], detail: 'Discover, Products, Cook, Promotions and Basket stay in the same order. The original pages, sections, links and recipe flows are reused directly. Only the visual treatment and seasonal campaign creative change.', tradeoff: 'A stronger fresh-food identity without a new learning curve. Existing prototype interactions and limitations are retained.' },
  { id: 'daily' as Theme, number: '01', name: 'Daily', tag: 'The familiar, made effortless', badge: 'Brand evolution', description: 'Everything you love about Migros, with a little less effort. A clear, confident companion for the everyday shop.', principle: 'Less searching. More living.', color: '#ed650b', keywords: ['Swiss clarity', 'Helpful shortcuts', 'Migros orange'], detail: 'Your usuals come first. Delivery stays visible. One-tap additions and a focused product grid make the weekly shop feel lighter.', tradeoff: 'The strongest continuity with the brand; less expressive than the other two directions.' },
  { id: 'market' as Theme, number: '02', name: 'Market', tag: 'A little discovery, every day', badge: 'Brand reimagined', description: 'The energy of a neighbourhood market, in your pocket. Expressive type, electric colour, and food worth stopping for.', principle: 'Make the ordinary delicious.', color: '#2344dc', keywords: ['Editorial energy', 'Seasonal discovery', 'Electric blue + pink'], detail: 'Seasonal edits replace the promotional carousel. Generous photography and playful headlines make browsing feel like finding something good.', tradeoff: 'The most distinctive brand world; discovery takes priority over maximum product density.' },
  { id: 'table' as Theme, number: '03', name: 'Table', tag: 'Good food starts with a plan', badge: 'Brand reimagined', description: 'A calmer answer to “what’s for dinner?”. A personal kitchen companion that turns a little inspiration into a full basket.', principle: 'From inspiration to dinner.', color: '#533142', keywords: ['Meal-first thinking', 'Quiet confidence', 'Plum + citron'], detail: 'Start with a meal, choose the night, and add its ingredients together. A weekly rhythm connects recipes with the grocery shop.', tradeoff: 'Best for meal-led shopping; habitual shoppers need the direct Shop route.' },
]
const products = [
  { id: 'salad', name: 'Rainbow salad', meta: 'Fresh kitchen · 250 g', price: 5.9, image: images.salad, category: 'Fresh', label: 'Fresh today' },
  { id: 'pasta', name: 'Pasta carbonara', meta: 'Fresh kitchen · 350 g', price: 7.5, image: images.pasta, category: 'Meals', label: 'A little favourite' },
  { id: 'soup', name: 'Pumpkin soup', meta: 'Seasonal kitchen · 500 ml', price: 4.2, image: images.soup, category: 'Meals', label: 'In season' },
  { id: 'curry', name: 'Vegetable curry', meta: 'Plant kitchen · 350 g', price: 6.9, image: images.curry, category: 'Meals', label: 'Plant based' },
  { id: 'toast', name: 'Avocado breakfast', meta: 'Fresh kitchen · 1 portion', price: 6.5, image: images.toast, category: 'Breakfast', label: 'Slow mornings' },
  { id: 'bowl', name: 'Berry breakfast bowl', meta: 'Fresh kitchen · 300 g', price: 5.4, image: images.bowl, category: 'Breakfast', label: 'Your bright start' },
  { id: 'milk', name: 'Organic whole milk', meta: 'Migros Bio · 1 L', price: 1.8, category: 'Usuals', label: '' },
  { id: 'eggs', name: 'Free-range eggs', meta: 'Swiss · 6 pieces', price: 3.9, category: 'Usuals', label: '' },
  { id: 'oats', name: 'Fine rolled oats', meta: 'Migros Bio · 500 g', price: 1.95, category: 'Usuals', label: '' },
  { id: 'spaghetti', name: 'Spaghetti', meta: 'M-Classic · 500 g', price: 1.6, category: 'Ingredients', label: 'Pantry favourite' },
  { id: 'parmesan', name: 'Parmigiano Reggiano', meta: 'Grated · 100 g', price: 3.4, category: 'Ingredients', label: 'The finishing touch' },
  { id: 'pancetta', name: 'Pancetta cubes', meta: '150 g', price: 3.9, category: 'Ingredients', label: 'Italian kitchen' },
  { id: 'quinoa', name: 'Organic quinoa', meta: 'Migros Bio · 300 g', price: 3.2, category: 'Ingredients', label: 'Plant based' },
  { id: 'tomatoes', name: 'Cherry tomatoes', meta: '250 g', price: 2.4, category: 'Ingredients', label: 'Fresh pick' },
  { id: 'greens', name: 'Mixed salad leaves', meta: '150 g', price: 2.1, category: 'Ingredients', label: 'Fresh pick' },
  { id: 'pumpkin', name: 'Organic pumpkin', meta: 'Swiss · approx. 1 kg', price: 4.5, category: 'Ingredients', label: 'In season' },
  { id: 'stock', name: 'Vegetable stock', meta: 'M-Classic · 1 L', price: 1.9, category: 'Ingredients', label: 'Pantry favourite' },
  { id: 'cream', name: 'Single cream', meta: '250 ml', price: 2.2, category: 'Ingredients', label: 'Swiss dairy' },
]
const recipes = [
  { title: 'A very good\npasta night.', short: 'Pasta carbonara', image: images.pasta, time: '25 min', ingredients: ['spaghetti', 'eggs', 'parmesan', 'pancetta'], steps: ['Cook the spaghetti in salted water until al dente. Save a cup of the cooking water.', 'Crisp the pancetta in a pan. Whisk two eggs with the grated parmesan and black pepper.', 'Take the pan off the heat. Toss in the pasta, then the egg mixture. Loosen with cooking water and serve.'] },
  { title: 'Colour outside\nthe lines.', short: 'Rainbow garden bowl', image: images.salad, time: '20 min', ingredients: ['quinoa', 'tomatoes', 'greens'], steps: ['Rinse the quinoa and simmer according to the pack instructions. Let it cool slightly.', 'Halve the tomatoes and wash the salad leaves.', 'Toss everything together with olive oil, lemon juice, salt and pepper.'] },
  { title: 'A bowl of\nsomething cosy.', short: 'Roasted pumpkin soup', image: images.soup, time: '35 min', ingredients: ['pumpkin', 'stock', 'cream'], steps: ['Peel and dice the pumpkin. Roast with a little oil at 200°C for 20 minutes.', 'Transfer to a saucepan, add the stock, and simmer until soft.', 'Blend until smooth, stir in the cream, and season to taste.'] },
]
concepts.sort((a, b) => a.number.localeCompare(b.number))
const money = (n: number) => n.toFixed(2)

function Phone({ theme }: { theme: Theme }) {
  const [screen, setScreen] = useState<Screen>('home')
  const [cart, setCart] = useState<Record<string, number>>({})
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')
  const [savedRecipes, setSavedRecipes] = useState<number[]>([])
  const [recipeIndex, setRecipeIndex] = useState(0)
  const [planned, setPlanned] = useState<Record<string, number>>({})
  const [day, setDay] = useState('Tue')
  const [slot, setSlot] = useState('Today, 17–18')
  const [slotsOpen, setSlotsOpen] = useState(false)
  const [toast, setToast] = useState('')
  const scroller = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const count = Object.values(cart).reduce((a, b) => a + b, 0)
  const total = products.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0)
  const recipe = recipes[recipeIndex]
  const saved = savedRecipes.includes(recipeIndex)
  const toggleSaved = () => setSavedRecipes(current => saved ? current.filter(i => i !== recipeIndex) : [...current, recipeIndex])
  useEffect(() => () => clearTimeout(timer.current), [])
  function notify(message: string) { setToast(message); clearTimeout(timer.current); timer.current = setTimeout(() => setToast(''), 2600) }
  function add(id: string) { setCart(current => ({ ...current, [id]: (current[id] || 0) + 1 })); notify(`${products.find(p => p.id === id)?.name} added`) }
  function go(next: Screen) { setScreen(next); setSlotsOpen(false); scroller.current?.scrollTo({ top: 0, behavior: 'instant' }) }
  function shop(category = 'All') { setFilter(category); setQuery(''); go('shop') }
  function addMeal() { setCart(current => { const next = { ...current }; recipe.ingredients.forEach(id => { next[id] = (next[id] || 0) + 1 }); return next }); notify('Recipe ingredients added to your basket') }
  const filtered = products.filter(p => (filter === 'All' || p.category === filter) && p.name.toLowerCase().includes(query.toLowerCase()))
  const brand = theme === 'daily' ? <span className="daily-logo">M<span>migros online</span></span> : <span className="wordmark">{theme === 'market' ? 'market' : 'table'}<i>by Migros</i></span>
  const heading = (title: string, action: string, onClick: () => void) => <div className="section-heading"><h3>{title}</h3><button onClick={onClick}>{action}<ArrowUpRight size={15} /></button></div>
  const delivery = <button className="delivery" onClick={() => setSlotsOpen(!slotsOpen)}><MapPin size={15}/><span>8005 Zürich</span><span className="delivery-slot">{slot}<ChevronRight size={13}/></span></button>
  function productCard(p: typeof products[number]) { return <article className="product" key={p.id}>{p.image && <div className="product-image"><img src={p.image} alt={p.name} loading="lazy"/><button className="add-product" aria-label={`Add ${p.name}`} onClick={() => add(p.id)}>{cart[p.id] ? <span>{cart[p.id]}</span> : <Plus size={19}/>}</button></div>}<div className="product-copy"><small>{p.label || p.category}</small><h4>{p.name}</h4><p>{p.meta}</p><strong>CHF {money(p.price)}</strong>{!p.image && <button className="add-product" aria-label={`Add ${p.name}`} onClick={() => add(p.id)}><Plus size={18}/></button>}</div></article> }
  const recipeHero = <div className="recipe-hero"><img src={recipe.image} alt={recipe.short}/><div className="recipe-shade"/><button className={`save-recipe ${saved ? 'saved' : ''}`} aria-label={saved ? 'Unsave recipe' : 'Save recipe'} aria-pressed={saved} onClick={toggleSaved}><Heart size={19} fill={saved ? 'currentColor' : 'none'}/></button><div className="recipe-hero-copy"><span className="eyebrow">A LITTLE INSPIRATION FOR TONIGHT</span><h2>{recipe.title}</h2><div className="recipe-meta"><span><Clock3 size={14}/>{recipe.time}</span><span>2 people</span><span>Easy to make</span></div><button className="primary-action" onClick={() => go('cook')}>Let’s make it<ArrowUpRight size={18}/></button></div></div>
  return <div className={`phone ${theme}`}>
    <div className="phone-status"><span>9:41</span><div className="status-right"><span className="signal">▂▄▆</span><span>5G</span><span className="battery"/></div></div>
    <div className="phone-scroll" ref={scroller}>
      <header className="app-header">{brand}<button className="avatar" aria-label="View delivery options" onClick={() => setSlotsOpen(!slotsOpen)}>{theme === 'table' ? <Utensils size={19}/> : 'P'}</button></header>
      {delivery}
      {slotsOpen && <section className="slot-panel"><div className="section-heading"><h3>Your next delivery</h3><button aria-label="Close delivery options" onClick={() => setSlotsOpen(false)}><X size={18}/></button></div>{['Today, 17–18', 'Tomorrow, 9–10', 'Tomorrow, 18–19'].map(s => <button className={s === slot ? 'chosen' : ''} key={s} onClick={() => { setSlot(s); setSlotsOpen(false); notify('Delivery time updated') }}><Truck size={16}/>{s}{s === slot && <Check size={16}/>}</button>)}</section>}
      {screen === 'home' && theme === 'daily' && <>
        <div className="daily-greeting"><span className="eyebrow">GOOD AFTERNOON, PHILIP</span><h2>Your day.<br/>A little easier<span>.</span></h2></div>
        <button className="search-shortcut" onClick={() => shop()}><Search size={19}/><span>What’s on your list?</span><SlidersHorizontal size={17}/></button>
        <div className="daily-shortcuts"><button onClick={() => shop('Usuals')}><ShoppingBag size={21}/><span>My usuals</span></button><button onClick={() => shop('Fresh')}><Leaf size={21}/><span>Fresh food</span></button><button onClick={() => go('cook')}><ChefHat size={21}/><span>Tonight</span></button></div>
        <div className="app-section usuals">{heading('The usual good things', 'All', () => shop('Usuals'))}<p className="section-caption">Your favourites, ready when you are.</p>{products.slice(6, 9).map((p, i) => <div className="usual-row" key={p.id}><span className={`usual-icon usual-${i}`}>{i === 0 ? 'Bio' : i === 1 ? '6' : 'M'}</span><div><h4>{p.name}</h4><small>{p.meta}</small></div><strong>{money(p.price)}</strong><button aria-label={`Add ${p.name}`} onClick={() => add(p.id)}>{cart[p.id] ? <Check size={18}/> : <Plus size={18}/>}</button></div>)}</div>
        <button className="daily-feature" onClick={() => { setRecipeIndex(2); go('cook') }}><div><span className="eyebrow">HELLO, AUTUMN</span><h3>Good food.<br/>Cosy evenings.</h3><span className="feature-link">Find your next favourite <ArrowRight size={16}/></span></div><img src={images.soup} alt="Seasonal pumpkin soup"/></button>
        <div className="app-section">{heading('Fresh ideas for today', 'Explore', () => shop('Fresh'))}<div className="product-grid">{products.slice(0, 2).map(productCard)}</div></div>
      </>}
      {screen === 'home' && theme === 'market' && <>
        <div className="market-intro"><span className="eyebrow">THE DAILY EDIT · Nº 08</span><h2>Oh, what<br/>a <em>fresh</em> day.</h2><button className="round-arrow" aria-label="Explore fresh food" onClick={() => shop('Fresh')}><ArrowDown size={25}/></button></div>
        <button className="market-cover" onClick={() => shop('Fresh')}><img src={images.salad} alt="A colourful garden salad with fresh seasonal vegetables"/><span className="market-sticker">GOOD<br/>MOOD<br/>FOOD<Sparkles size={17}/></span><span className="cover-caption">A FRESH POINT OF VIEW <ArrowUpRight size={18}/></span></button>
        <div className="market-ticker"><span>SEASONAL PICKS</span><span>✳</span><span>BIG LITTLE JOYS</span><span>✳</span></div>
        <div className="app-section market-edit">{heading('Meet your new favourites.', 'Shop the edit', () => shop())}<div className="product-grid">{products.slice(0, 2).map(productCard)}</div></div>
        <button className="market-story" onClick={() => go('cook')}><span className="eyebrow">THE 25-MINUTE DINNER CLUB</span><h3>Less effort.<br/><em>More mmm.</em></h3><ArrowUpRight size={28}/></button>
      </>}
      {screen === 'home' && theme === 'table' && <>
        <div className="table-greeting"><span className="eyebrow">TUESDAY, 8 SEPTEMBER</span><h2>Something good<br/>is on the table.</h2></div>
        <div className="week-strip">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => <button key={d} className={day === d ? 'selected' : ''} onClick={() => setDay(d)}><span>{d}</span><strong>{7 + i}</strong><i className={planned[d] !== undefined ? 'has-meal' : ''}/></button>)}</div>
        {recipeHero}
        <div className="app-section table-plan">{heading('A little room for a plan.', 'Plan a meal', () => go('cook'))}<button className="plan-row" onClick={() => { if (planned[day] !== undefined) setRecipeIndex(planned[day]); go('cook') }}><span className="plan-day">{day}<strong>{7 + ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(day)}</strong></span><span>{planned[day] !== undefined ? recipes[planned[day]].short : 'What sounds good?'}<small>{planned[day] !== undefined ? 'On your menu · 2 people' : 'A recipe, a few ingredients, you’re set.'}</small></span><Plus size={20}/></button></div>
        <div className="table-note"><Leaf size={18}/><span>Good for your week.<br/><strong>A little kinder to your wallet.</strong></span></div>
      </>}
      {screen === 'shop' && <section className="app-section shop-screen"><div className="screen-title"><span className="eyebrow">{theme === 'market' ? 'FIND YOUR NEXT GOOD THING' : 'THE GOOD STUFF, ALL HERE'}</span><h2>{theme === 'market' ? 'Fresh finds.' : 'Your next shop.'}</h2></div><label className="search-shortcut"><Search size={18}/><input autoFocus placeholder="Search food and favourites" value={query} onChange={e => setQuery(e.target.value)}/>{query && <button aria-label="Clear search" onClick={() => setQuery('')}><X size={16}/></button>}</label><div className="filter-chips">{['All', 'Fresh', 'Meals', 'Breakfast', 'Usuals', 'Ingredients'].map(f => <button key={f} aria-pressed={filter === f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}</button>)}</div><p className="result-count">{filtered.length} good things to choose from</p><div className="product-grid">{filtered.map(productCard)}</div>{filtered.length === 0 && <div className="empty"><Search size={30}/><h3>No matches this time.</h3><p>Try “pasta”, or explore another category.</p><button className="primary-action" onClick={() => { setFilter('All'); setQuery('') }}>Show everything<ArrowRight size={18}/></button></div>}</section>}
      {screen === 'cook' && <section className="cook-screen"><div className="app-section screen-title"><span className="eyebrow">{theme === 'table' ? 'YOUR KITCHEN COMPANION' : 'GOOD IDEAS FOR HUNGRY PEOPLE'}</span><h2>{theme === 'market' ? 'Make something\ngood.' : 'What’s for dinner?'}</h2><div className="filter-chips">{recipes.map((r, i) => <button key={r.short} className={recipeIndex === i ? 'active' : ''} onClick={() => setRecipeIndex(i)}>{['Pasta night', 'Something fresh', 'Comfort food'][i]}</button>)}</div></div><div className="recipe-hero detail"><img src={recipe.image} alt={recipe.short}/><div className="recipe-shade"/><div className="recipe-hero-copy"><span className="eyebrow">{recipe.time} · 2 PEOPLE</span><h2>{recipe.title}</h2></div></div><div className="app-section recipe-details"><div className="section-heading"><h3>{recipe.short}</h3><button aria-label="Save recipe" aria-pressed={saved} onClick={toggleSaved}><Heart size={20} fill={saved ? 'currentColor' : 'none'}/></button></div><p>A simple idea for a good evening. Fresh ingredients, a little time, and something delicious to share.</p><h4 className="recipe-subheading">What you’ll need</h4><div className="ingredient-list">{recipe.ingredients.map(id => <span key={id}><Check size={15}/>{products.find(p => p.id === id)?.name}</span>)}</div><p className="pantry-note">Plus your pantry basics: oil, salt and pepper.</p><button className="primary-action" onClick={addMeal}>Add ingredients<ShoppingBag size={18}/></button><p className="demo-note">Whole packs added. Adjust quantities in your basket.</p><button className="secondary-action" onClick={() => { setPlanned(prev => ({ ...prev, [day]: recipeIndex })); notify(`Added to your ${day} menu`) }}>{planned[day] === recipeIndex ? <Check size={17}/> : <Plus size={17}/>}{planned[day] === recipeIndex ? `Planned for ${day}` : `Plan for ${day}`}</button><h4 className="recipe-subheading">Make something good</h4><ol className="recipe-steps">{recipe.steps.map(step => <li key={step}>{step}</li>)}</ol></div></section>}
      {screen === 'basket' && <section className="app-section basket-screen"><div className="screen-title"><span className="eyebrow">{count} GOOD {count === 1 ? 'THING' : 'THINGS'}</span><h2>{theme === 'table' ? 'Good things,\ngathered.' : theme === 'market' ? 'Excellent\nchoices.' : 'Your basket.'}</h2></div>{count ? <><div className="basket-items">{products.filter(p => cart[p.id]).map(p => <div className="basket-item" key={p.id}>{p.image ? <img src={p.image} alt={p.name}/> : <span className="basket-initial">M</span>}<div><h4>{p.name}</h4><small>CHF {money(p.price)}</small><div className="quantity"><button aria-label={`Remove one ${p.name}`} onClick={() => setCart(c => ({ ...c, [p.id]: Math.max(0, c[p.id] - 1) }))}><Minus size={13}/></button><span>{cart[p.id]}</span><button aria-label={`Add one ${p.name}`} onClick={() => add(p.id)}><Plus size={13}/></button></div></div><strong>{money(p.price * cart[p.id])}</strong></div>)}</div><div className="basket-summary"><span>Subtotal<strong>CHF {money(total)}</strong></span><span>Delivery<strong>Selected at checkout</strong></span><p><Truck size={16}/>{slot} · 8005 Zürich</p></div><button className="primary-action" onClick={() => notify('You’ve reached the end of this concept. No order was placed.')}>Continue<ArrowRight size={18}/></button><p className="demo-note">Interactive design concept · No real orders</p><button className="secondary-action" onClick={() => shop()}>Keep exploring<Plus size={16}/></button></> : <div className="empty"><ShoppingBag size={42} strokeWidth={1}/><h3>A little room for good things.</h3><p>Add a favourite or find something new.</p><button className="primary-action" onClick={() => shop()}>Explore the shop<ArrowRight size={18}/></button></div>}</section>}
      <div className="scroll-bottom"/>
    </div>
    {toast && <div role="status" className="app-toast"><Check size={17}/>{toast}</div>}
    <nav className="bottom-nav" aria-label={`${theme} app navigation`}>{([{ id: 'home', name: theme === 'market' ? 'Discover' : theme === 'table' ? 'Today' : 'Home', icon: Home }, { id: 'shop', name: 'Shop', icon: Search }, { id: 'cook', name: theme === 'table' ? 'My kitchen' : 'Cook', icon: ChefHat }, { id: 'basket', name: 'Basket', icon: ShoppingBag }] as const).map(({ id, name, icon: Icon }) => <button key={id} className={screen === id ? 'active' : ''} aria-current={screen === id ? 'page' : undefined} onClick={() => go(id)}><span><Icon size={21} strokeWidth={screen === id ? 2.2 : 1.6}/>{id === 'basket' && count > 0 && <i>{count}</i>}</span><small>{name}</small></button>)}</nav>
    <div className="home-indicator"/>
  </div>
}

export default function Directions() {
  const requestedConcept = new URLSearchParams(window.location.search).get('concept')
  const initialConcept = concepts.find(c => c.id === requestedConcept)?.id
  const [focused, setFocused] = useState<Theme | null>(initialConcept || null)
  const [mobileTheme, setMobileTheme] = useState<Theme>(initialConcept || 'daily')
  const [notes, setNotes] = useState(true)
  return <div className={`design-studio ${focused ? 'is-focused' : ''}`}>
    <header className="studio-header"><a className="studio-brand" href="./" aria-label="Open original prototype"><b>M</b><span>Migros Online<span>Design explorations</span></span></a><div className="studio-header-right"><span className="concept-label">FOUR NEW PERSPECTIVES · 2026</span><a href="./" className="original-link">Original prototype<ArrowUpRight size={15}/></a></div></header>
    <main><section className="studio-intro"><div><span className="studio-kicker">FAMILIAR ROOTS. FRESH POSSIBILITIES.</span><h1>A fresh perspective<span>.</span></h1><p>One brand. Four ways to make everyday food feel better.</p></div><div className="studio-controls"><button onClick={() => setNotes(!notes)} aria-pressed={notes} className={notes ? 'active' : ''}><SlidersHorizontal size={16}/>Design notes</button>{focused && <button onClick={() => setFocused(null)}><LayoutGrid size={16}/>Compare all</button>}<span><span className="live-dot"/>Interactive concepts</span></div></section>
    <div className="mobile-selector" role="tablist" aria-label="Choose design direction">{concepts.map(c => <button key={c.id} role="tab" aria-selected={(focused || mobileTheme) === c.id} className={(focused || mobileTheme) === c.id ? 'selected' : ''} onClick={() => { setMobileTheme(c.id); if (focused) setFocused(c.id) }}><span>{c.number}</span>{c.name}</button>)}</div>
    <section className="concept-grid" aria-label="Four interactive design directions">{concepts.map(c => <article key={c.id} className={`concept-column ${c.id} ${mobileTheme === c.id ? 'mobile-visible' : ''} ${focused === c.id ? 'focused' : ''} ${focused && focused !== c.id ? 'focus-hidden' : ''}`} style={{ '--concept-color': c.color } as CSSProperties}><div className="concept-title"><div><span className="concept-number">{c.number}</span><h2>{c.name}</h2></div><span className="concept-badge">{c.badge}</span><button className="focus-button" aria-label={focused === c.id ? 'Compare all directions' : `Focus on ${c.name}`} onClick={() => { setFocused(focused === c.id ? null : c.id); setMobileTheme(c.id) }}>{focused === c.id ? <ArrowLeft size={17}/> : <Maximize2 size={17}/>}</button></div><p className="concept-tag">{c.tag}</p><div className="concept-body"><>{c.id === 'fresh' ? <div className="phone fresh-phone"><iframe title="Fresh — original Migros Online app in green" src="./fresh.html" /></div> : <Phone theme={c.id}/>}</>{notes && <aside className="design-notes"><div className="color-swatches" aria-label={`${c.name} colour palette`}><i/><i/><i/><i/></div><h3>{c.principle}</h3><p>{c.description}</p><div className="keywords">{c.keywords.map(k => <span key={k}>{k}</span>)}</div><div className="expanded-notes"><span className="studio-kicker">THE EXPERIENCE</span><p>{c.detail}</p><span className="studio-kicker">THE TRADE-OFF</span><p>{c.tradeoff}</p><span className="try-label"><ArrowDown size={15}/>{c.id === 'fresh' ? 'Explore all five original tabs and recipe flows.' : 'Try the tabs, add a favourite, build a basket.'}</span></div></aside>}</div></article>)}</section>
    <footer className="studio-footer"><span><span className="live-dot"/>Made to be explored. Search, shop, plan a meal.</span><span>Concept content & pricing for demonstration.</span></footer></main>
  </div>
}
