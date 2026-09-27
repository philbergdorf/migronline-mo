import { useNavigate } from 'react-router-dom'
import { Gift } from 'lucide-react'
import { useRewards } from '../lib/rewards'
import { PRIZES } from '../lib/rewardRules'

export default function RewardWallet() {
  const { rewards, selectedId, selectReward } = useRewards()
  const navigate = useNavigate()
  return <div className="mx-4 rounded-card border border-hairline bg-surface p-4">
    <div className="flex items-center gap-2 font-bold"><Gift size={20} className="text-primary" /> My rewards</div>
    <p className="mt-1 text-xs text-label">Test rewards · One reward per order</p>
    {rewards.length === 0 ? <p className="mt-4 text-sm text-muted">Your Scratch &amp; Win prizes will appear here.</p> : <ul className="mt-2 divide-y divide-hairline">
      {rewards.map(reward => {
        const expired = reward.expiresAt <= Date.now()
        const prize = PRIZES[reward.kind]
        return <li key={reward.id} className="py-4">
          <p className="font-bold">{prize.title}</p>
          <p className="mt-1 text-sm text-muted">{prize.terms}</p>
          <p className="mt-1 text-xs text-label">{expired ? 'Expired' : 'Expires'} {new Date(reward.expiresAt).toLocaleDateString('en-GB')}</p>
          {!expired && <button className="mt-1 min-h-11 font-bold text-primary" onClick={() => { selectReward(reward.id); navigate('/basket', { state: { showRewards: true } }) }}>{selectedId === reward.id ? 'View in basket' : 'Use reward'}</button>}
        </li>
      })}
    </ul>}
  </div>
}
