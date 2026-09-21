import { PRODUCT_IMAGES } from '../lib/productCatalog'

/** One local packshot per product, shared by lists, carousels, search and basket. */
export default function ProductImage({ name, className = '' }: { name: string; className?: string }) {
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
