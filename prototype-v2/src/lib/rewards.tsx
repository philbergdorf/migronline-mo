import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { pickPrize, PRIZES, type OutcomeMode, type Reward, type Round } from './rewardRules'

type RewardState = { rewards: Reward[]; selectedId: string | null; round: Round | null }
const KEY = 'migronline-scratch-rewards-v1'
const empty: RewardState = { rewards: [], selectedId: null, round: null }
const validKind = (kind: unknown): kind is Reward['kind'] => typeof kind === 'string' && Object.hasOwnProperty.call(PRIZES, kind)

function restore(): RewardState {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? 'null')
    if (!saved || !Array.isArray(saved.rewards)) return empty
    const rewards = saved.rewards.filter((r: Reward) => r && typeof r.id === 'string' && validKind(r.kind) && Number.isFinite(r.expiresAt))
    const round = saved.round
    return {
      rewards,
      selectedId: typeof saved.selectedId === 'string' ? saved.selectedId : null,
      round: round && typeof round.id === 'string' && typeof round.revealed === 'boolean' && (round.prize === null || validKind(round.prize)) ? round : null,
    }
  } catch { return empty }
}

type RewardsContextValue = RewardState & {
  startRound: (mode?: OutcomeMode) => void
  revealRound: () => void
  selectReward: (id: string | null) => void
}
const RewardsContext = createContext<RewardsContextValue | null>(null)

export function RewardsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(restore)
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* Continue in memory when storage is unavailable. */ }
  }, [state])

  const startRound = (mode: OutcomeMode = 'random') => {
    const round = { id: crypto.randomUUID(), prize: pickPrize(mode), revealed: false }
    setState(previous => ({ ...previous, round }))
  }
  const revealRound = () => {
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000
    setState(previous => {
      if (!previous.round || previous.round.revealed) return previous
      const { id, prize } = previous.round
      return {
        ...previous,
        round: { ...previous.round, revealed: true },
        rewards: prize && !previous.rewards.some(reward => reward.id === id)
          ? [{ id, kind: prize, expiresAt }, ...previous.rewards] : previous.rewards,
      }
    })
  }
  const selectReward = (id: string | null) => setState(previous => ({ ...previous, selectedId: id }))
  return <RewardsContext.Provider value={{ ...state, startRound, revealRound, selectReward }}>{children}</RewardsContext.Provider>
}

export function useRewards() {
  const value = useContext(RewardsContext)
  if (!value) throw new Error('useRewards must be used inside RewardsProvider')
  return value
}
