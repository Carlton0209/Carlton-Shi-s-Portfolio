import { type CSSProperties, useEffect, useRef, useState } from 'react'

type TrailMark = {
  id: number
  x: number
  y: number
  dx: number
  dy: number
  size: number
  rotate: number
  spin: number
  duration: number
  dragging: boolean
}

type TrailStyle = CSSProperties & {
  '--size': string
  '--dx': string
  '--dy': string
  '--rotate': string
  '--spin': string
  '--duration': string
}

const interactiveSelector = 'a, button, input, textarea, select, [role="button"], [data-cursor-interactive]'
const editableSelector = 'input, textarea, select, [contenteditable="true"]'

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

export function DragCursorEffect() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [interactive, setInteractive] = useState(false)
  const [marks, setMarks] = useState<TrailMark[]>([])

  const cursorRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number>()
  const timeoutRefs = useRef<number[]>([])
  const markIdRef = useRef(0)
  const pointerRef = useRef({
    x: -100,
    y: -100,
    targetX: -100,
    targetY: -100,
    lastSpawnX: -100,
    lastSpawnY: -100,
    lastSpawnAt: 0,
    isDragging: false,
  })

  useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const syncEnabled = () => {
      setEnabled(pointerQuery.matches && !motionQuery.matches)
    }

    syncEnabled()
    pointerQuery.addEventListener('change', syncEnabled)
    motionQuery.addEventListener('change', syncEnabled)

    return () => {
      pointerQuery.removeEventListener('change', syncEnabled)
      motionQuery.removeEventListener('change', syncEnabled)
    }
  }, [])

  useEffect(() => {
    if (!enabled) {
      setVisible(false)
      setDragging(false)
      setInteractive(false)
      setMarks([])
      return
    }

    const pointer = pointerRef.current

    const removeMarkLater = (id: number, duration: number) => {
      const timeoutId = window.setTimeout(() => {
        setMarks(previous => previous.filter(mark => mark.id !== id))
      }, duration)

      timeoutRefs.current.push(timeoutId)
    }

    const spawnTrail = (x: number, y: number, isDragging: boolean, force = false) => {
      const now = performance.now()
      const distance = Math.hypot(x - pointer.lastSpawnX, y - pointer.lastSpawnY)
      const minDistance = isDragging ? 10 : 28
      const minTime = isDragging ? 18 : 42

      if (!force && distance < minDistance && now - pointer.lastSpawnAt < minTime) {
        return
      }

      const angle = Math.atan2(y - pointer.lastSpawnY, x - pointer.lastSpawnX)
      const normal = angle + Math.PI / 2 + randomBetween(-0.55, 0.55)
      const drift = isDragging ? randomBetween(30, 58) : randomBetween(14, 28)
      const id = markIdRef.current++
      const duration = isDragging ? Math.round(randomBetween(660, 880)) : Math.round(randomBetween(420, 560))

      pointer.lastSpawnX = x
      pointer.lastSpawnY = y
      pointer.lastSpawnAt = now

      const mark: TrailMark = {
        id,
        x,
        y,
        dx: Math.cos(normal) * drift,
        dy: Math.sin(normal) * drift,
        size: isDragging ? randomBetween(11, 20) : randomBetween(5, 9),
        rotate: Number.isFinite(angle) ? (angle * 180) / Math.PI : 0,
        spin: randomBetween(-42, 42),
        duration,
        dragging: isDragging,
      }

      setMarks(previous => [...previous.slice(-28), mark])
      removeMarkLater(id, duration)
    }

    const animateCursor = () => {
      pointer.x += (pointer.targetX - pointer.x) * (pointer.isDragging ? 0.32 : 0.22)
      pointer.y += (pointer.targetY - pointer.y) * (pointer.isDragging ? 0.32 : 0.22)

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`
      }

      frameRef.current = window.requestAnimationFrame(animateCursor)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') {
        return
      }

      pointer.targetX = event.clientX
      pointer.targetY = event.clientY

      if (pointer.isDragging) {
        window.getSelection()?.removeAllRanges()
      }

      setVisible(true)
      setInteractive(Boolean((event.target as Element | null)?.closest(interactiveSelector)))
      spawnTrail(event.clientX, event.clientY, pointer.isDragging)
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) {
        return
      }

      const target = event.target as Element | null
      if (target?.closest(editableSelector)) {
        return
      }

      pointer.targetX = event.clientX
      pointer.targetY = event.clientY
      pointer.isDragging = true
      document.documentElement.classList.add('drag-cursor-dragging')
      document.body.classList.add('drag-cursor-dragging')
      window.getSelection()?.removeAllRanges()

      setVisible(true)
      setDragging(true)
      spawnTrail(event.clientX, event.clientY, true, true)
    }

    const onPointerUp = (event: PointerEvent) => {
      pointer.targetX = event.clientX
      pointer.targetY = event.clientY
      pointer.isDragging = false
      document.documentElement.classList.remove('drag-cursor-dragging')
      document.body.classList.remove('drag-cursor-dragging')

      setDragging(false)
      spawnTrail(event.clientX, event.clientY, false, true)
    }

    const hideCursor = () => {
      pointer.isDragging = false
      document.documentElement.classList.remove('drag-cursor-dragging')
      document.body.classList.remove('drag-cursor-dragging')
      setVisible(false)
      setDragging(false)
      setInteractive(false)
    }

    frameRef.current = window.requestAnimationFrame(animateCursor)

    document.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerdown', onPointerDown, { passive: true })
    document.addEventListener('pointerup', onPointerUp, { passive: true })
    document.addEventListener('pointerleave', hideCursor)
    window.addEventListener('blur', hideCursor)

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current)
      }

      timeoutRefs.current.forEach(timeoutId => window.clearTimeout(timeoutId))
      timeoutRefs.current = []

      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('pointerup', onPointerUp)
      document.removeEventListener('pointerleave', hideCursor)
      window.removeEventListener('blur', hideCursor)
      document.documentElement.classList.remove('drag-cursor-dragging')
      document.body.classList.remove('drag-cursor-dragging')
    }
  }, [enabled])

  if (!enabled) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className="drag-cursor-effect"
      data-dragging={dragging ? 'true' : 'false'}
      data-interactive={interactive ? 'true' : 'false'}
      data-visible={visible ? 'true' : 'false'}
    >
      <div ref={cursorRef} className="drag-cursor-orbit">
        <span className="drag-cursor-ring" />
        <span className="drag-cursor-dot" />
      </div>

      {marks.map(mark => {
        const style: TrailStyle = {
          left: mark.x,
          top: mark.y,
          '--size': `${mark.size}px`,
          '--dx': `${mark.dx}px`,
          '--dy': `${mark.dy}px`,
          '--rotate': `${mark.rotate}deg`,
          '--spin': `${mark.spin}deg`,
          '--duration': `${mark.duration}ms`,
        }

        return (
          <span
            key={mark.id}
            className={`drag-trail-mark${mark.dragging ? ' is-dragging' : ''}`}
            style={style}
          />
        )
      })}
    </div>
  )
}
