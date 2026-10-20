import { useEffect, useRef, useState, type ReactNode } from 'react'
import { FilterChips, ListGroup, ProductRow, SectionLabel } from './ui'

export type ProductGroup = { key: string; products: { name: string; sub: string; price: string; badge?: ReactNode }[] }

export default function GroupedProductList({ groups }: { groups: ProductGroup[] }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const sections = useRef<Record<string, HTMLElement | null>>({})
  const scrollerRef = useRef<HTMLElement | null>(null)
  const [active, setActive] = useState(groups[0]?.key ?? '')

  useEffect(() => {
    const scroller = rootRef.current?.closest<HTMLElement>('.overflow-auto')
    if (!scroller) return
    scrollerRef.current = scroller
    const onScroll = () => {
      const threshold = scroller.getBoundingClientRect().top + (navRef.current?.offsetHeight ?? 72) + 12
      let current = groups[0]?.key ?? ''
      for (const group of groups) {
        if ((sections.current[group.key]?.getBoundingClientRect().top ?? Infinity) <= threshold) current = group.key
      }
      if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2) current = groups[groups.length - 1]?.key ?? current
      setActive(current)
    }
    scroller.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => scroller.removeEventListener('scroll', onScroll)
  }, [groups])

  useEffect(() => {
    const rail = navRef.current?.querySelector<HTMLElement>('.no-scrollbar')
    const button = rail?.querySelector<HTMLElement>('button[aria-pressed="true"]')
    if (!rail || !button) return
    const offset = button.getBoundingClientRect().left - rail.getBoundingClientRect().left
    if (offset < 0) rail.scrollLeft += offset - 16
    else if (offset + button.offsetWidth > rail.clientWidth) rail.scrollLeft += offset + button.offsetWidth - rail.clientWidth + 16
  }, [active])

  const jumpTo = (key: string) => {
    const section = sections.current[key]
    const scroller = scrollerRef.current
    if (!section || !scroller) return
    setActive(key)
    const top = scroller.scrollTop + section.getBoundingClientRect().top - scroller.getBoundingClientRect().top - (navRef.current?.offsetHeight ?? 72)
    scroller.scrollTo({ top: Math.max(0, top), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  return <div ref={rootRef}>
    <nav ref={navRef} aria-label="Product categories" className="sticky top-0 z-20 border-b border-hairline bg-cream/95 py-2 backdrop-blur">
      <FilterChips items={groups.map(group => group.key)} value={active} onChange={jumpTo} />
    </nav>
    {groups.map(group => <section key={group.key} aria-label={group.key} ref={el => { sections.current[group.key] = el }}>
      <SectionLabel>{group.key}</SectionLabel>
      <ListGroup>{group.products.map(product => <ProductRow key={product.name} bare {...product} />)}</ListGroup>
    </section>)}
    <div className="h-44" />
  </div>
}
