import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, PageTitle, SectionLabel, Toggle } from '../components/ui'
import RewardWallet from '../components/RewardWallet'

export default function AccountPage({
  showCookTab,
  onShowCookTabChange,
  showScratchAndWin,
  onShowScratchAndWinChange,
}: {
  showCookTab: boolean
  onShowCookTabChange: (visible: boolean) => void
  showScratchAndWin: boolean
  onShowScratchAndWinChange: (visible: boolean) => void
}) {
  const navigate = useNavigate()

  return (
    <>
      <div className="px-4 pt-[calc(env(safe-area-inset-top)+1rem)]">
        <button type="button" onClick={() => navigate('/')} className="flex min-h-11 items-center gap-1 text-[15px] font-semibold text-ink">
          <ChevronLeft size={20} aria-hidden="true" /> Discover
        </button>
      </div>
      <PageTitle>Account</PageTitle>
      <SectionLabel>Preferences</SectionLabel>
      <div className="space-y-3 px-4">
        <Card className="flex items-center justify-between gap-4 p-4">
          <div>
            <p className="text-[16px] font-bold text-ink">Show Cook tab</p>
            <p className="mt-1 text-[13px] text-label">Add Cook to the bottom navigation.</p>
          </div>
          <Toggle label="Show Cook tab" checked={showCookTab} onChange={onShowCookTabChange} />
        </Card>
        <Card className="flex items-center justify-between gap-4 p-4">
          <div>
            <p className="text-[16px] font-bold text-ink">Show Scratch &amp; Win</p>
            <p className="mt-1 text-[13px] text-label">Show the game on Discover.</p>
          </div>
          <Toggle label="Show Scratch & Win" checked={showScratchAndWin} onChange={onShowScratchAndWinChange} />
        </Card>
      </div>
      <SectionLabel>Rewards</SectionLabel>
      <RewardWallet />
      <div className="h-32" />
    </>
  )
}
