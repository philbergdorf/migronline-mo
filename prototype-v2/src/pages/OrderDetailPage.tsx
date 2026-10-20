import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Check, Plus } from 'lucide-react'
import { useBasket } from '../lib/basket'
import { ORDER_HISTORY, formatOrderDate, formatOrderTotal, groupOrderProducts, orderItemCount } from '../lib/recentOrders'
import { ProductSubpageHeader } from '../components/ProductSubpage'
import GroupedProductList from '../components/GroupedProductList'

export default function OrderDetailPage() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const { addProduct } = useBasket()
  const [message, setMessage] = useState('')
  const order = ORDER_HISTORY.orders.find(item => item.id === orderId)
  const groups = useMemo(() => order ? groupOrderProducts(order.products).map(group => ({ ...group, products: group.products.map(product => ({ ...product, sub: `${product.quantity} × ${product.sub}` })) })) : [], [order])
  if (!order) return <>
    <ProductSubpageHeader title="Order not found" description="This order is not in your recent order history." onBack={() => navigate('/products/orders')} />
  </>

  return <>
    <ProductSubpageHeader title={formatOrderDate(order.date)} description={`${order.id} · Delivered`} onBack={() => navigate('/products/orders')} />
    <div className="px-5 pb-4">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted">
        <span>{order.products.length} products · {orderItemCount(order)} items</span>
        <strong className="text-lg text-ink">{formatOrderTotal(order.totalCents)}</strong>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-muted">Order total includes CHF 5.90 delivery. Product quantities show what you ordered.</p>
      <button type="button" className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-3 text-sm font-bold text-white" onClick={() => {
        for (const product of order.products) for (let index = 0; index < product.quantity; index++) addProduct(product)
        setMessage(`${orderItemCount(order)} items added to your basket.`)
      }}><Plus size={18} aria-hidden="true" /> Add order to basket</button>
      <p role="status" className="mt-2 flex items-center gap-2 text-sm text-muted">{message && <><Check size={16} aria-hidden="true" />{message}</>}</p>
    </div>
    <GroupedProductList groups={groups} />
  </>
}
