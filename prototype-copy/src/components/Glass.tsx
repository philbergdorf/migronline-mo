import { type RefObject } from 'react'
import { LucideIcon, Search } from 'lucide-react'

export type Tab = { path: string; label: string; Icon: LucideIcon }

/**
 * Floating Liquid Glass tab bar — the one place we keep Liquid Glass in the
 * otherwise-opaque Harvest UI. Warm frosted material, forest-green active tint.
 */
export function GlassTabbar({
  containerRef,
  tabs,
  active,
  onChange,
  searchAction,
}: {
  containerRef: RefObject<HTMLDivElement>
  tabs: Tab[]
  active: string
  onChange: (path: string) => void
  searchAction?: {
    onClick: () => void
    expanded: boolean
    buttonRef: RefObject<HTMLButtonElement>
  }
}) {
  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <nav className="glass pointer-events-auto flex items-center gap-0.5 rounded-full p-1.5">
        {tabs.map(({ path, label, Icon }, index) => {
          const isActive = !searchAction?.expanded && (path === active || (path === '/products' && active.startsWith('/products/')))
          return (
            <div key={path} className="contents">
              {searchAction && index === 2 && (
                <button
                  ref={searchAction.buttonRef}
                  type="button"
                  aria-label="Search products"
                  aria-haspopup="dialog"
                  aria-expanded={searchAction.expanded}
                  onClick={searchAction.onClick}
                  className={`flex flex-col items-center justify-center rounded-full px-3 py-1.5 transition ${
                    searchAction.expanded ? 'glass-thin text-forest' : 'text-muted'
                  }`}
                >
                  <Search size={22} strokeWidth={searchAction.expanded ? 2.4 : 1.8} />
                  <span className="mt-0.5 text-[10px] font-bold">Search</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => onChange(path)}
                className={`flex flex-col items-center justify-center rounded-full px-3 py-1.5 transition ${
                  isActive ? 'glass-thin text-forest' : 'text-muted'
                }`}
              >
                <Icon size={22} strokeWidth={isActive ? 2.4 : 1.8} />
                <span className="mt-0.5 text-[10px] font-bold">{label}</span>
              </button>
            </div>
          )
        })}
      </nav>
    </div>
  )
}
