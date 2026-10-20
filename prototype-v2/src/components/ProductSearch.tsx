import { useLayoutEffect, useRef, type MutableRefObject, type ReactNode } from 'react'
import { Clock, Search, X } from 'lucide-react'
import { PRODUCT_CATALOG } from '../lib/productCatalog'
import { productPresentation } from '../lib/productPresentation'
import ShoppingProductCard from './ShoppingProductCard'

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
const RECENT_SEARCH_LIMIT = 15
const cleanQuery = (value: string) => value.trim().replace(/\s+/g, ' ')
export const SAMPLE_RECENT_SEARCHES = [
  'milk', 'bananas', 'sourdough bread', 'eggs', 'cherry tomatoes',
  'greek yoghurt', 'coffee beans', 'avocado', 'pasta', 'apples',
  'orange juice', 'butter', 'dark chocolate', 'rice', 'olive oil',
]

export type ProductSearchState = { active: boolean; query: string }
export type ProductSearchProps = {
  search: ProductSearchState
  onSearchChange: (search: ProductSearchState) => void
  scrollPositions: MutableRefObject<{ browse: number; search: number }>
  recentSearches: string[]
  onRecentSearchesChange: (queries: string[]) => void
  children: ReactNode
}

export default function ProductSearch({ search, onSearchChange, scrollPositions, recentSearches, onRecentSearchesChange, children }: ProductSearchProps) {
  const { active, query } = search
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const words = normalize(query).trim().split(/\s+/).filter(Boolean)
  const results = words.length
    ? PRODUCT_CATALOG.filter((product) => {
      const title = productPresentation(product.name, product.sub, product.price).title
      const searchable = normalize(`${product.name} ${title} ${product.sub}`)
      return words.every((word) => searchable.includes(word))
    })
    : []

  const rememberSearch = (value: string) => {
    const term = cleanQuery(value)
    if (!term) return
    onRecentSearchesChange([term, ...recentSearches.filter(item => normalize(item) !== normalize(term))].slice(0, RECENT_SEARCH_LIMIT))
  }

  useLayoutEffect(() => {
    const scroller = containerRef.current?.closest<HTMLElement>('.overflow-auto')
    if (!scroller) return
    const mode = active ? 'search' : 'browse'
    scroller.scrollTop = scrollPositions.current[mode]
    const savePosition = () => { scrollPositions.current[mode] = scroller.scrollTop }
    scroller.addEventListener('scroll', savePosition, { passive: true })
    return () => { scroller.removeEventListener('scroll', savePosition) }
  }, [active, scrollPositions])

  const updateQuery = (value: string) => {
    scrollPositions.current.search = 0
    containerRef.current?.closest<HTMLElement>('.overflow-auto')?.scrollTo({ top: 0 })
    onSearchChange({ active: true, query: value })
  }
  const beginSearch = () => {
    if (active) return
    const scroller = containerRef.current?.closest<HTMLElement>('.overflow-auto')
    if (scroller) scrollPositions.current.browse = scroller.scrollTop
    onSearchChange({ active: true, query })
  }
  const cancelSearch = () => {
    rememberSearch(query)
    scrollPositions.current.search = 0
    // Move focus outside the input to dismiss the keyboard without restarting search.
    containerRef.current?.focus({ preventScroll: true })
    onSearchChange({ active: false, query: '' })
  }

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      role="region"
      aria-label="Products"
      className="min-h-full focus:outline-none"
      onKeyDown={(event) => {
        if (active && event.key === 'Escape') {
          event.preventDefault()
          event.stopPropagation()
          cancelSearch()
        }
      }}
    >
      <form
        role="search"
        aria-label="Product catalogue"
        className="sticky top-0 z-20 flex items-center gap-2 bg-cream px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]"
        onSubmit={(event) => { event.preventDefault(); rememberSearch(query); inputRef.current?.blur() }}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-hairline bg-surface pl-3 pr-1 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
          <Search size={20} className="shrink-0 text-label" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            aria-label="Search products"
            aria-controls={active ? 'product-search-results' : undefined}
            value={query}
            onFocus={beginSearch}
            onBlur={() => rememberSearch(query)}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder="Search products"
            className="min-w-0 flex-1 bg-transparent py-3.5 text-base text-ink outline-none focus-visible:outline-none placeholder:text-label [&::-webkit-search-cancel-button]:appearance-none"
          />
          {query && (
            <button type="button" aria-label="Clear search" onClick={() => { updateQuery(''); inputRef.current?.focus() }} className="grid h-11 w-11 shrink-0 place-items-center rounded-lg text-label">
              <X size={19} aria-hidden="true" />
            </button>
          )}
        </div>
        {active && <button type="button" onClick={cancelSearch} className="min-h-11 shrink-0 rounded-lg px-1 text-[14px] font-semibold text-ink">Cancel</button>}
      </form>

      {active ? (
        <section aria-label="Product search results" className="px-4 pb-[calc(7rem+env(safe-area-inset-bottom))]">
          {words.length ? <p role="status" aria-atomic="true" className="px-1 pb-3 pt-3 text-[13px] font-bold text-label">
            {`${results.length} ${results.length === 1 ? 'product' : 'products'} found`}
          </p> : <h2 id="recent-searches-title" className="px-1 pb-3 pt-3 text-[13px] font-bold text-label">Your recent searches</h2>}
          <div id="product-search-results">
            {words.length ? <ul className="space-y-3">
              {results.map((product) => (
                <li key={product.name}><ShoppingProductCard {...product} /></li>
              ))}
            </ul> : recentSearches.length ? <ul aria-labelledby="recent-searches-title" className="divide-y divide-hairline">
              {recentSearches.map(term => (
                <li key={term} className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label={`Search again for ${term}`}
                    onClick={() => { rememberSearch(term); updateQuery(term) }}
                    className="flex min-h-14 min-w-0 flex-1 items-center gap-3 rounded-lg px-1 py-3 text-left text-ink transition-colors active:bg-sand"
                  >
                    <Clock size={19} className="shrink-0 text-label" aria-hidden="true" />
                    <span className="min-w-0 flex-1 break-words text-[16px]">{term}</span>
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete recent search ${term}`}
                    onClick={() => onRecentSearchesChange(recentSearches.filter(item => item !== term))}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-lg text-label transition-colors active:bg-sand"
                  >
                    <X size={19} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul> : <div className="px-1 py-5 text-sm leading-relaxed text-label">
              <p>No recent searches yet.</p>
              <p className="mt-1">Search for a product and find it here next time.</p>
            </div>}
          </div>
          {words.length > 0 && results.length === 0 && (
            <div className="px-5 py-12 text-center">
              <Search size={32} className="mx-auto mb-4 text-label" aria-hidden="true" />
              <h2 className="text-lg font-bold text-ink">No products found</h2>
              <p className="mt-2 text-sm leading-relaxed text-label">Try a different product name, such as milk, bread or tomatoes.</p>
              <button type="button" onClick={() => { updateQuery(''); inputRef.current?.focus() }} className="mt-5 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white">Clear search</button>
            </div>
          )}
        </section>
      ) : children}
    </div>
  )
}
