import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useBasket } from '../lib/basket'

export default function ProductQuantityControl({ name, price, discount, alwaysExpanded = false }: { name: string; price: string; discount?: number; alwaysExpanded?: boolean }) {
  const { lines, addProduct, decrementProduct } = useBasket()
  const quantity = lines.find(line => line.name === name)?.qty ?? 0
  const [announcement, setAnnouncement] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [activity, setActivity] = useState(0)
  const controlRef = useRef<HTMLDivElement>(null)
  const plusRef = useRef<HTMLButtonElement>(null)
  const restoreFocus = useRef(false)
  useLayoutEffect(() => {
    if (restoreFocus.current) { plusRef.current?.focus(); restoreFocus.current = false }
  }, [quantity, expanded])
  useEffect(() => {
    if (alwaysExpanded || !expanded || quantity === 0) return
    const timer = window.setTimeout(() => {
      restoreFocus.current = controlRef.current?.contains(document.activeElement) ?? false
      setExpanded(false)
    }, 4000)
    return () => window.clearTimeout(timer)
  }, [alwaysExpanded, expanded, quantity, activity])

  const add = () => {
    restoreFocus.current = quantity === 0
    setExpanded(true)
    addProduct({ name, price, discount })
    setAnnouncement(`${name}: ${quantity + 1} in basket.`)
  }
  return <div ref={controlRef} className={`product-quantity-control${alwaysExpanded ? ' product-quantity-control--persistent' : ''}`} onPointerDown={() => setActivity(value => value + 1)} onKeyDown={event => {
    setActivity(value => value + 1)
    if (event.key === 'Escape' && expanded && !alwaysExpanded) {
      event.stopPropagation()
      restoreFocus.current = true
      setExpanded(false)
    }
  }}>
    {quantity === 0 ? <button ref={plusRef} type="button" className="product-quantity-add" aria-label={`Add ${name} to basket`} onClick={add}>
      <span><Plus size={21} aria-hidden="true" /></span>
    </button> : !alwaysExpanded && !expanded ? <button ref={plusRef} type="button" className="product-quantity-collapsed" aria-label={`${quantity} ${name} in basket. Change quantity`} aria-expanded={false} onClick={() => {
      restoreFocus.current = true
      setExpanded(true)
    }}><span>{quantity}</span></button> : <div className="product-quantity-stepper" role="group" aria-label={`Quantity of ${name}`}>
      <button type="button" aria-label={quantity === 1 ? `Remove ${name} from basket` : `Decrease ${name}`} onClick={() => {
        restoreFocus.current = quantity === 1
        decrementProduct(name)
        setAnnouncement(quantity === 1 ? `${name} removed from basket.` : `${name}: ${quantity - 1} in basket.`)
      }}>{quantity === 1 ? <Trash2 size={20} aria-hidden="true" /> : <Minus size={20} aria-hidden="true" />}</button>
      <span className="product-quantity-count">{quantity}</span>
      <button ref={plusRef} type="button" aria-label={`Increase ${name}`} onClick={add}><Plus size={20} aria-hidden="true" /></button>
    </div>}
    <span className="sr-only" role="status">{announcement}</span>
  </div>
}
