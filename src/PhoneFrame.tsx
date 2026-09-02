import { ReactNode } from 'react'

/**
 * On wide screens, render the prototype inside an iPhone-like frame so it reads
 * as an app. On a real phone (<= 480px) it fills the screen edge to edge.
 *
 * The inner area is the warm "Harvest" cream canvas the app content sits on.
 */
export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full w-full bg-neutral-300 flex items-center justify-center sm:p-6">
      <div
        className="
          relative bg-black overflow-hidden
          w-full h-[100dvh] rounded-none
          sm:w-[390px] sm:h-[844px] sm:rounded-[3rem] sm:shadow-2xl sm:ring-2 sm:ring-black/10
        "
      >
        <div className="relative h-full w-full overflow-hidden">
          {/* Warm cream canvas with a soft harvest glow at the top */}
          <div className="absolute inset-0 bg-cream" />
          <div className="absolute -top-20 left-1/2 h-64 w-[120%] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

          {/* App content scrolls above the canvas */}
          {children}
        </div>
      </div>
    </div>
  )
}
