import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import ts from 'typescript'

function moduleUrl(filename, imports = {}) {
  const source = readFileSync(new URL(`../src/lib/${filename}.ts`, import.meta.url), 'utf8')
  let { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } })
  for (const [name, url] of Object.entries(imports)) outputText = outputText.replace(`from './${name}'`, `from '${url}'`)
  return `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`
}
const history = await import(moduleUrl('recentOrders', { productCatalog: moduleUrl('productCatalog'), productCategories: moduleUrl('productCategories') }))

test('order history covers the complete rolling six-month window in newest-first order', () => {
  const { orders, from, to } = history.createOrderHistory(new Date('2026-10-20T08:00:00Z'))
  assert.equal(from, '2026-04-20')
  assert.equal(to, '2026-10-20')
  assert.equal(orders.length, 26)
  assert.equal(orders[0].date, '2026-10-18')
  assert.equal(orders[orders.length - 1].date, '2026-04-26')
  assert.ok(orders.every((order, index) => order.date >= from && order.date <= to && (!index || order.date < orders[index - 1].date)))
  assert.equal(new Set(orders.map(order => order.id)).size, orders.length)
})

test('six-month boundaries clamp to the last valid day of shorter months', () => {
  assert.equal(history.createOrderHistory(new Date('2026-10-31T12:00:00Z')).from, '2026-04-30')
  assert.equal(history.createOrderHistory(new Date('2024-08-31T12:00:00Z')).from, '2024-02-29')
})

test('the order window follows the Swiss date across UTC midnight and daylight saving', () => {
  assert.equal(history.createOrderHistory(new Date('2026-10-19T22:30:00Z')).to, '2026-10-20')
  assert.equal(history.createOrderHistory(new Date('2026-12-19T23:30:00Z')).to, '2026-12-20')
})

test('every purchased product appears in exactly one category', () => {
  for (const order of history.createOrderHistory(new Date('2026-10-20T08:00:00Z')).orders) {
    const groups = history.groupOrderProducts(order.products)
    const grouped = groups.flatMap(group => group.products)
    assert.deepEqual(grouped.map(product => product.name).sort(), order.products.map(product => product.name).sort())
    assert.ok(groups.every(group => group.products.length > 0))
    assert.ok(!groups.some(group => group.key === 'Special diets' || group.key === 'Other products'))
  }
})

test('historical totals and item counts account for the original quantities', () => {
  for (const order of history.createOrderHistory(new Date('2026-10-20T08:00:00Z')).orders) {
    const itemCount = order.products.reduce((sum, product) => sum + product.quantity, 0)
    const subtotal = order.products.reduce((sum, product) => sum + Math.round(Number(product.price.slice(4)) * 100) * product.quantity, 0)
    assert.equal(history.orderItemCount(order), itemCount)
    assert.equal(order.totalCents, subtotal + 590)
  }
})
