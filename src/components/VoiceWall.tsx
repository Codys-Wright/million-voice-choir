import { useEffect, useRef } from 'react'

/**
 * The signature element: a wall of tiny lights, one per voice, glimmering
 * like a stadium crowd holding up phones in the dark. Pure canvas, no deps.
 */
export function VoiceWall({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const CELL = 14 // px between lights
    const DOT = 2.2 // base radius

    let raf = 0
    let lights: Array<{
      x: number
      y: number
      phase: number
      speed: number
      base: number // baseline brightness 0..1
      warm: boolean // a few lights lean ember instead of gold
    }> = []

    function build() {
      if (!canvas || !ctx) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      lights = []
      const cols = Math.ceil(width / CELL)
      const rows = Math.ceil(height / CELL)
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Thin the crowd toward the top so the wall fades into darkness
          const density = 0.25 + 0.65 * (r / rows)
          // Deterministic-ish jitter from grid position, no Math.random storms
          const h = Math.abs(Math.sin(c * 12.9898 + r * 78.233) * 43758.5453) % 1
          if (h > density) continue
          const h2 = Math.abs(Math.sin(c * 39.346 + r * 11.135) * 24634.6345) % 1
          const h3 = Math.abs(Math.sin(c * 4.898 + r * 7.23) * 23421.631) % 1
          lights.push({
            x: c * CELL + (h - 0.5) * 6,
            y: r * CELL + (h2 - 0.5) * 6,
            phase: h3 * Math.PI * 2,
            speed: 0.4 + h2 * 1.1,
            base: 0.12 + h * 0.5,
            warm: h3 > 0.85,
          })
        }
      }
    }

    function draw(t: number) {
      if (!canvas || !ctx) return
      const { width, height } = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)
      const time = t / 1000
      for (const l of lights) {
        const tw = reduced ? 0.5 : 0.5 + 0.5 * Math.sin(l.phase + time * l.speed)
        const a = l.base * (0.35 + 0.65 * tw)
        ctx.beginPath()
        ctx.arc(l.x, l.y, DOT + tw * 0.8, 0, Math.PI * 2)
        ctx.fillStyle = l.warm
          ? `rgba(201, 119, 63, ${a})`
          : `rgba(232, 180, 76, ${a})`
        ctx.fill()
      }
      if (!reduced) raf = requestAnimationFrame(draw)
    }

    build()
    if (reduced) {
      draw(0)
    } else {
      raf = requestAnimationFrame(draw)
    }

    const onResize = () => {
      build()
      if (reduced) draw(0)
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
