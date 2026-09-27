import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import assert from 'node:assert/strict'
import ts from 'typescript'

const source = readFileSync(new URL('../src/lib/rewardRules.ts', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } })
const { pickPrize, rewardDiscount } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
const reward = kind => ({ id: 'test', kind, expiresAt: 2000 })

test('random play includes wins and losses, with one-third winning probability', () => {
  assert.equal(pickPrize('random', 0, 0), 'two-off')
  assert.equal(pickPrize('random', 0.32, 0.5), 'delivery')
  assert.equal(pickPrize('random', 1 / 3, 0), null)
  assert.equal(pickPrize('random', 0.99, 0), null)
})

test('test controls reliably force each outcome without depending on chance', () => {
  assert.equal(pickPrize('win', 0.99, 0.99), 'five-off')
  assert.equal(pickPrize('lose', 0, 0), null)
})

test('rewards apply only at their order threshold', () => {
  assert.equal(rewardDiscount(reward('two-off'), 59.99, 1000), 0)
  assert.equal(rewardDiscount(reward('two-off'), 60, 1000), 2)
  assert.equal(rewardDiscount(reward('delivery'), 59.99, 1000), 0)
  assert.equal(rewardDiscount(reward('delivery'), 60, 1000), 5.9)
  assert.equal(rewardDiscount(reward('five-off'), 79.99, 1000), 0)
  assert.equal(rewardDiscount(reward('five-off'), 80, 1000), 5)
})

test('expired and unselected rewards never discount the basket', () => {
  assert.equal(rewardDiscount(undefined, 100, 1000), 0)
  assert.equal(rewardDiscount(reward('delivery'), 100, 2000), 0)
  assert.equal(rewardDiscount(reward('five-off'), 100, 3000), 0)
})
