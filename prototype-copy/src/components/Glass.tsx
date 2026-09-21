import { LucideIcon } from 'lucide-react'

export type Tab = { path: string; label: string; Icon: LucideIcon }

/**
 * Floating Liquid Glass tab bar — the one place we keep Liquid Glass in the
 * otherwise-opaque Harvest UI. Warm frosted material, forest-green active tint.
 */
export function GlassTabbar({
  tabs,
  active,
  onChange,
}: {
  tabs: Tab[]
  active: string
  onChange: (path: string) => void
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <nav className="glass pointer-events-auto flex items-center gap-0.5 rounded-full p-1.5">
        {tabs.map(({ path, label, Icon }) => {
          const isActive = path === active
          return (
            <button
              key={path}
              type="button"
              onClick={() => onChange(path)}
              className={`flex flex-col items-center justify-center rounded-full px-3 py-1.5 transition ${
                isActive ? 'glass-thin text-forest' : 'text-muted'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.4 : 1.8} />
              <span className="mt-0.5 text-[10px] font-bold">{label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
