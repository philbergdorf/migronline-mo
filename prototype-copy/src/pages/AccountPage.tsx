import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, PageTitle, SectionLabel, Toggle } from '../components/ui'

export default function AccountPage({
  showCookTab,
  onShowCookTabChange,
}: {
  showCookTab: boolean
  onShowCookTabChange: (visible: boolean) => void
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
      <div className="px-4">
        <Card className="flex items-center justify-between gap-4 p-4">
          <div>
            <p className="text-[16px] font-bold text-ink">Show Cook tab</p>
            <p className="mt-1 text-[13px] text-label">Add Cook to the bottom navigation.</p>
          </div>
          <Toggle label="Show Cook tab" checked={showCookTab} onChange={onShowCookTabChange} />
        </Card>
      </div>
      <div className="h-32" />
    </>
  )
}
