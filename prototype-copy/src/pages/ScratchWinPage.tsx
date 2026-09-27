import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Gift, Sparkles, Ticket } from 'lucide-react'
import { Button } from '../components/ui'
import ScratchCard from '../components/ScratchCard'
import WinConfetti from '../components/WinConfetti'
import { useRewards } from '../lib/rewards'
import { PRIZES, type OutcomeMode } from '../lib/rewardRules'

export default function ScratchWinPage() {
  const navigate = useNavigate()
  const { round, rewards, startRound, revealRound, selectReward } = useRewards()
  const [mode, setMode] = useState<OutcomeMode>('random')
  const [confettiRound, setConfettiRound] = useState<string | null>(null)
  useEffect(() => {
    if (!confettiRound) return
    const timer = window.setTimeout(() => setConfettiRound(null), 2600)
    return () => window.clearTimeout(timer)
  }, [confettiRound])
  const reveal = () => {
    if (round?.prize && !round.revealed) setConfettiRound(round.id)
    revealRound()
  }
  const cardRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLHeadingElement>(null)
  const previousRound = useRef(round?.id)
  useEffect(() => { if (!round) startRound() }, [round, startRound])
  useEffect(() => {
    if (round?.id && previousRound.current && previousRound.current !== round.id) {
      cardRef.current?.focus({ preventScroll: true })
      cardRef.current?.scrollIntoView({ block: 'center' })
    }
    previousRound.current = round?.id
  }, [round?.id])
  useEffect(() => { if (round?.revealed) resultRef.current?.focus({ preventScroll: true }) }, [round?.revealed])
  const prize = round?.prize ? PRIZES[round.prize] : null
  const reward = rewards.find(item => item.id === round?.id)
  const expired = !!reward && reward.expiresAt <= Date.now()

  return <div className="px-4 pt-5 pb-32">
    <button className="flex min-h-11 items-center gap-2 text-[15px] font-semibold" onClick={() => navigate('/')}><ArrowLeft size={18} /> Discover</button>
    <div className="mb-6 mt-5 text-center">
      <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-bold text-forest">A LITTLE EXTRA FOR YOUR SHOP</span>
      <h1 className="mt-4 font-display text-[32px] font-bold">Scratch &amp; Win</h1>
      <p className="mt-2 text-[15px] text-muted">A chance to win something lovely.<br />Scratch, reveal, and play again anytime.</p>
    </div>
    {round && <>
      <div ref={cardRef} tabIndex={-1} aria-label="Your scratch card" className="relative overflow-hidden rounded-[24px] border border-hairline bg-white p-3 shadow-soft">
        <div className="flex items-center justify-between px-2 pb-3 pt-1 text-xs font-bold tracking-widest text-forest"><Ticket size={20} /> YOUR LUCKY CARD <Sparkles size={20} /></div>
        <div className="relative aspect-[640/420] overflow-hidden rounded-[16px] bg-forest/5">
          <div aria-hidden={!round.revealed} className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
            <Gift size={38} className="mb-3 text-primary" />
            <p className="font-display text-[24px] font-bold leading-tight">{prize ? prize.title : 'No prize this time'}</p>
            <p className="mt-2 text-sm text-muted">{prize ? 'A little treat, on us.' : 'Another card, another chance.'}</p>
          </div>
          {!round.revealed && <ScratchCard key={round.id} onReveal={reveal} />}
        </div>
        {round.revealed && round.prize && confettiRound === round.id && <WinConfetti key={round.id} />}
      </div>
      <div className="mt-5 text-center" aria-live="polite" aria-atomic="true">
        {!round.revealed ? <>
          <p className="text-sm text-muted">Rub the silver area with your finger or mouse.</p>
          <button onClick={reveal} className="mt-2 min-h-11 px-4 text-sm font-bold text-primary underline underline-offset-4">Reveal result</button>
        </> : <>
          <h2 ref={resultRef} tabIndex={-1} className="font-display text-xl font-bold">{prize ? 'You won! Saved to your rewards.' : 'No prize this time. Fancy another go?'}</h2>
          {prize && reward && <p className="mt-2 text-sm text-muted">{prize.terms}<br />{expired ? 'Expired' : 'Expires'} {new Date(reward.expiresAt).toLocaleDateString('en-GB')}. One reward per order.</p>}
          <div className="mt-5 flex flex-col gap-3">
            {prize && !expired && <Button className="w-full" onClick={() => { selectReward(round.id); navigate('/basket', { state: { showRewards: true } }) }}>Use reward</Button>}
            <Button variant={prize ? 'secondary' : 'primary'} className="w-full" onClick={() => startRound(mode)}>Play again</Button>
          </div>
        </>}
      </div>
    </>}
    <button className="mt-5 min-h-11 w-full text-sm font-bold text-forest" onClick={() => navigate('/account')}>View my rewards</button>
    <p className="mt-2 text-center text-xs leading-relaxed text-label">Prototype game · Test rewards only<br />Unlimited plays. Around 1 in 3 cards wins.</p>
    <details className="mt-6 rounded-xl border border-hairline p-3 text-sm text-muted">
      <summary className="cursor-pointer font-semibold">Prototype controls</summary>
      <label className="mt-3 block" htmlFor="scratch-outcome">Next card outcome</label>
      <select id="scratch-outcome" value={mode} onChange={event => setMode(event.target.value as OutcomeMode)} className="mt-2 min-h-11 w-full rounded-lg border border-hairline bg-white px-3">
        <option value="random">Random — 1 in 3 wins</option><option value="win">Always win</option><option value="lose">Always lose</option>
      </select>
      <button className="mt-2 min-h-11 font-bold text-primary" onClick={() => startRound(mode)}>Start test card</button>
    </details>
  </div>
}
