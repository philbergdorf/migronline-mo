import { useEffect, useRef, type PointerEvent } from 'react'

// The canvas contains only the removable coating. The result is rendered separately.
export default function ScratchCard({ onReveal }: { onReveal: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lastPoint = useRef<{ x: number; y: number } | null>(null)
  const completed = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const gradient = ctx.createLinearGradient(0, 0, 640, 420)
    gradient.addColorStop(0, '#edeee9')
    gradient.addColorStop(0.5, '#c9d1c7')
    gradient.addColorStop(1, '#e5e8e0')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 640, 420)
    ctx.strokeStyle = '#ffffff55'
    for (let x = -420; x < 640; x += 32) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + 420, 420); ctx.stroke()
    }
    ctx.fillStyle = '#344b3c'
    ctx.textAlign = 'center'
    ctx.font = 'bold 42px sans-serif'
    ctx.fillText('A little surprise?', 320, 190)
    ctx.font = '26px sans-serif'
    ctx.fillText('Scratch here to find out', 320, 242)
  }, [])

  const scratch = (event: PointerEvent<HTMLCanvasElement>) => {
    if (completed.current) return
    const canvas = event.currentTarget
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return
    const rect = canvas.getBoundingClientRect()
    const point = { x: (event.clientX - rect.left) * 640 / rect.width, y: (event.clientY - rect.top) * 420 / rect.height }
    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineWidth = 76
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(lastPoint.current?.x ?? point.x, lastPoint.current?.y ?? point.y)
    ctx.lineTo(point.x, point.y)
    ctx.stroke()
    ctx.beginPath(); ctx.arc(point.x, point.y, 38, 0, Math.PI * 2); ctx.fill()
    lastPoint.current = point
  }
  const finishStroke = () => {
    lastPoint.current = null
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx || completed.current) return
    const pixels = ctx.getImageData(0, 0, 640, 420).data
    let cleared = 0
    let sampled = 0
    for (let i = 3; i < pixels.length; i += 64) { sampled++; if (pixels[i] < 128) cleared++ }
    if (cleared / sampled >= 0.5) { completed.current = true; onReveal() }
  }

  return <canvas ref={canvasRef} width={640} height={420} aria-hidden="true"
    className="absolute inset-0 h-full w-full touch-none cursor-crosshair"
    onPointerDown={event => { if (event.button !== 0) return; event.currentTarget.setPointerCapture(event.pointerId); scratch(event) }}
    onPointerMove={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) scratch(event) }}
    onPointerUp={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); finishStroke() }}
    onPointerCancel={finishStroke}
  />
}
