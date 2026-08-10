import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type MagnetProps = {
  children: ReactNode
  padding?: number
  strength?: number
  maxOffset?: number
  activeTransition?: string
  inactiveTransition?: string
  className?: string
}

const clamp = (value: number, max: number) => Math.min(max, Math.max(-max, value))

export default function Magnet({
  children,
  padding = 100,
  strength = 2,
  maxOffset = Infinity,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return

      const { left, top, width, height } = el.getBoundingClientRect()
      const distX = e.clientX - (left + width / 2)
      const distY = e.clientY - (top + height / 2)

      const inRange =
        Math.abs(distX) < width / 2 + padding && Math.abs(distY) < height / 2 + padding

      setActive(inRange)
      // without the cap the pull grows with raw distance, so once the element has
      // scrolled off screen it gets dragged hundreds of px down onto the next section
      setOffset(
        inRange
          ? { x: clamp(distX / strength, maxOffset), y: clamp(distY / strength, maxOffset) }
          : { x: 0, y: 0 },
      )
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [padding, strength, maxOffset])

  return (
    <div ref={ref} className={className}>
      <div
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: active ? activeTransition : inactiveTransition,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  )
}
