export type PrizeKind = 'two-off' | 'delivery' | 'five-off'
export type Reward = { id: string; kind: PrizeKind; expiresAt: number }
export type Round = { id: string; prize: PrizeKind | null; revealed: boolean }
export type OutcomeMode = 'random' | 'win' | 'lose'

export const PRIZES: Record<PrizeKind, { title: string; terms: string; minimum: number }> = {
  'two-off': { title: 'CHF 2 off your order', terms: 'On orders of CHF 60 or more.', minimum: 60 },
  delivery: { title: 'Free delivery', terms: 'On orders of CHF 60 or more. Saves CHF 5.90.', minimum: 60 },
  'five-off': { title: 'CHF 5 off your order', terms: 'On orders of CHF 80 or more.', minimum: 80 },
}

export function pickPrize(mode: OutcomeMode, chance = Math.random(), choice = Math.random()): PrizeKind | null {
  if (mode === 'lose' || (mode === 'random' && chance >= 1 / 3)) return null
  return (['two-off', 'delivery', 'five-off'] as const)[Math.min(2, Math.floor(choice * 3))]
}

export function rewardDiscount(reward: Reward | undefined, subtotal: number, now = Date.now()): number {
  if (!reward || reward.expiresAt <= now || Math.round(subtotal * 100) < PRIZES[reward.kind].minimum * 100) return 0
  return reward.kind === 'delivery' ? 5.9 : reward.kind === 'five-off' ? 5 : 2
}
