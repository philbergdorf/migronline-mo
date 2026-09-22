import { useEffect, useRef, useState, type RefObject } from 'react'
import { ArrowLeft, Search, X } from 'lucide-react'
import { PRODUCT_CATALOG } from '../lib/productCatalog'
import { CUSTOMER_TOP_PRODUCTS } from '../lib/customerTopProducts'
import { productPresentation } from '../lib/productPresentation'
import ShoppingProductCard from './ShoppingProductCard'

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export default function ProductSearch({ background }: {
  background: RefObject<HTMLDivElement>
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const buttonRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const words = normalize(query).trim().split(/\s+/).filter(Boolean)
  const results = words.length
    ? PRODUCT_CATALOG.filter((product) => {
      const title = productPresentation(product.name, product.sub, product.price).title
      const searchable = normalize(`${product.name} ${title} ${product.sub}`)
      return words.every((word) => searchable.includes(word))
    })
    : CUSTOMER_TOP_PRODUCTS

  useEffect(() => {
    if (!open) return
    const content = background.current
    if (content) content.inert = true
    inputRef.current?.focus()
    return () => {
      if (content) content.inert = false
      buttonRef.current?.focus()
    }
  }, [open, background])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Search products"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        hidden={open}
        style={{ bottom: 'calc(max(0.75rem, env(safe-area-inset-bottom)) + 5rem)' }}
        className={`${open ? 'hidden' : 'grid'} absolute right-5 z-40 h-14 w-14 place-items-center rounded-full border-2 border-white bg-primary text-white shadow-[0_6px_24px_rgba(51,51,51,0.28)] transition-transform active:scale-95`}
      >
        <Search size={27} strokeWidth={2.2} />
      </button>

      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-search-title"
          className="absolute inset-0 z-50 flex flex-col bg-cream"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.stopPropagation()
              setOpen(false)
            }
            if (event.key === 'Tab') {
              const controls = dialogRef.current?.querySelectorAll<HTMLElement>('button, input')
              if (!controls?.length) return
              const first = controls[0]
              const last = controls[controls.length - 1]
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault()
                last.focus()
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault()
                first.focus()
              }
            }
          }}
        >
          <div className="shrink-0 border-b border-hairline bg-surface px-4 pb-4 pt-[calc(env(safe-area-inset-top)+2rem)]">
            <div className="mb-4 flex items-center gap-2">
              <button type="button" aria-label="Close search" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full text-ink">
                <ArrowLeft size={23} />
              </button>
              <h2 id="product-search-title" className="font-display text-[26px] font-bold text-ink">Search products</h2>
            </div>
            <div className="flex items-center gap-3 rounded-xl border-2 border-primary bg-white px-3">
              <Search size={21} className="shrink-0 text-label" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                aria-label="Search the product catalogue"
                aria-controls="product-search-results"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Milk, bananas, pasta…"
                className="min-w-0 flex-1 bg-transparent py-3.5 text-base text-ink outline-none focus-visible:outline-none placeholder:text-label [&::-webkit-search-cancel-button]:appearance-none"
              />
              {query && (
                <button type="button" aria-label="Clear search" onClick={() => { setQuery(''); inputRef.current?.focus() }} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-label">
                  <X size={19} />
                </button>
              )}
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-[max(2rem,env(safe-area-inset-bottom))]">
            <p role="status" className="px-1 pb-3 pt-5 text-[13px] font-bold text-label">
              {words.length ? `${results.length} ${results.length === 1 ? 'product' : 'products'} found` : 'Your top products'}
            </p>
            <ul id="product-search-results" className={results.length ? 'space-y-3 pb-2' : 'hidden'}>
              {results.map((product) => (
                <li key={product.name}>
                  <ShoppingProductCard {...product} />
                </li>
              ))}
            </ul>
            {results.length === 0 && (
              <div className="px-5 py-12 text-center">
                <Search size={32} className="mx-auto mb-4 text-label" aria-hidden="true" />
                <h3 className="text-lg font-bold text-ink">No products found</h3>
                <p className="mt-2 text-sm leading-relaxed text-label">Try a different product name, such as milk, bread or tomatoes.</p>
                <button type="button" onClick={() => { setQuery(''); inputRef.current?.focus() }} className="mt-5 rounded-full bg-primary px-5 py-3 text-sm font-bold text-white">Clear search</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
