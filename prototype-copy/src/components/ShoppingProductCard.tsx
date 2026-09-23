import { Thermometer } from 'lucide-react'
import ProductImage from './ProductImage'
import ProductQuantityControl from './ProductQuantityControl'
import { productPresentation } from '../lib/productPresentation'

export default function ShoppingProductCard({ name, sub, price, discount }: {
  name: string
  sub: string
  price: string
  discount?: number
}) {
  const product = productPresentation(name, sub, price, discount)
  return (
    <article className="shopping-product" aria-label={name}>
      <div className="shopping-product-layout">
        <div className="shopping-product-image">
          <ProductImage name={name} />
          {product.discount && <span className="shopping-product-discount" aria-label={product.discount + '% off'}>{product.discount}%</span>}
        </div>
        <div className="shopping-product-content">
          <h3 className="shopping-product-title" title={product.title}>{product.title}</h3>
          {(product.swiss || product.chilled || product.organic) && (
            <div className="shopping-product-labels">
              {product.swiss && <svg role="img" aria-label="Swiss origin" viewBox="0 0 24 24" className="h-6 w-6 shrink-0"><path fill="#e30613" d="M0 0h24v24H0z" /><path fill="white" d="M9 4h6v5h5v6h-5v5H9v-5H4V9h5z" /></svg>}
              {product.chilled && <span className="shopping-product-chilled"><Thermometer size={17} aria-hidden="true" />Chilled</span>}
              {product.organic && <span className="shopping-product-organic">Bio</span>}
            </div>
          )}
          <div className="shopping-product-footer">
            <div className="shopping-product-prices">
              <strong aria-label={price}>{product.amount.toFixed(2)}</strong>
              {product.regularPrice && <span className="shopping-product-was">was {product.regularPrice.toFixed(2)}</span>}
            </div>
            <p className="shopping-product-details">{product.packSize}{product.unitPrice && <> · {product.unitPrice}</>}</p>
            {product.restock && <p className="shopping-product-restock">{product.restock}</p>}
            {product.purchaseHistory && <p className="shopping-product-restock">{product.purchaseHistory}</p>}
            <div className="shopping-product-add">
              <ProductQuantityControl name={name} price={price} discount={discount} />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
