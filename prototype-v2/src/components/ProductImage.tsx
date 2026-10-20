import { PRODUCT_IMAGES } from '../lib/productCatalog'
import { Package } from 'lucide-react'

/** One local packshot per product, shared by lists, carousels, search and basket. */
export default function ProductImage({ name, className = '' }: { name: string; className?: string }) {
  if (!PRODUCT_IMAGES[name]) return <div className={`flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg bg-[#f7f6f4] text-[#888] ${className}`} role="img" aria-label={`No photo available for ${name}`}>
    <Package size={28} strokeWidth={1.3} aria-hidden="true" />
    <span className="text-[10px]">Photo coming soon</span>
  </div>
  return (
    <img
      src={`${import.meta.env.BASE_URL}${PRODUCT_IMAGES[name]}`}
      alt={name}
      loading="lazy"
      decoding="async"
      className={`product-photo h-full w-full object-contain ${className}`}
    />
  )
}
