import { useState, type ReactNode } from 'react'
import { ShoppingBasket } from 'lucide-react'

const PASSWORD = 'migi'
const KEY = 'migronline-auth'

/**
 * Lightweight client-side gate — NOT real security. It only keeps casual
 * visitors out; the password ships in the bundle and can be bypassed.
 */
export default function PasswordGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(KEY) === '1')
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  if (authed) return <>{children}</>

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-cream px-8">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (input === PASSWORD) {
            sessionStorage.setItem(KEY, '1')
            setAuthed(true)
          } else {
            setError(true)
          }
        }}
        className="w-full max-w-[300px]"
      >
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-lg bg-forest text-white">
            <ShoppingBasket size={28} strokeWidth={2} />
          </div>
          <h1 className="font-display text-[24px] font-bold text-forest">Migronline</h1>
          <p className="mt-1 text-[14px] font-semibold text-label">Enter the password to continue</p>
        </div>
        <input
          type="password"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setError(false)
          }}
          placeholder="Password"
          autoFocus
          className="w-full rounded-btn border-2 border-hairline bg-surface px-4 py-3 text-[16px] text-ink outline-none transition-colors placeholder:text-label focus:border-primary"
        />
        {error && <p className="mt-2 text-[13px] font-bold text-tomato">Incorrect password</p>}
        <button
          type="submit"
          className="mt-3 w-full rounded-full bg-forest py-3 text-[15px] font-bold text-white shadow-cta"
        >
          Enter
        </button>
      </form>
    </div>
  )
}
