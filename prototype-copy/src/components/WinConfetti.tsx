import type { CSSProperties } from 'react'

const COLORS = ['#ff6600', '#ffc94a', '#6b916e', '#b95583', '#ffab76']

export default function WinConfetti() {
  return <div className="scratch-confetti" aria-hidden="true">
    {Array.from({ length: 48 }, (_, index) => {
      const direction = index % 2 === 0 ? -1 : 1
      const drift = direction * (35 + (index * 37) % 210)
      return <span key={index} style={{
        '--confetti-x': `${drift}px`,
        '--confetti-end-x': `${drift * 1.3}px`,
        '--confetti-y': `${-60 - (index * 23) % 150}px`,
        '--confetti-turn': `${direction * (360 + (index * 47) % 540)}deg`,
        backgroundColor: COLORS[index % COLORS.length],
        width: index % 3 === 0 ? 8 : 6,
        height: index % 3 === 0 ? 8 : 13,
        borderRadius: index % 3 === 0 ? '50%' : '2px',
        animationDelay: `${(index % 8) * 25}ms`,
      } as CSSProperties} />
    })}
  </div>
}
