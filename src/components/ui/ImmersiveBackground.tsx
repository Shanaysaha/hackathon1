import React, { useRef, useEffect, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  size: number
  opacity: number
  speed: number
  phase: number
}

interface Block {
  x: number
  y: number
  z: number
  size: number
  opacity: number
  delay: number
}

export const ImmersiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const blocksRef = useRef<Block[]>([])
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const animFrameRef = useRef<number>(0)
  const timeRef = useRef<number>(0)

  const initParticles = useCallback((width: number, height: number) => {
    const count = 80
    const particles: Particle[] = []
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 3 + 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.4 + 0.1,
        speed: (Math.random() - 0.5) * 0.5,
        phase: Math.random() * Math.PI * 2,
      })
    }
    return particles
  }, [])

  const initBlocks = useCallback((width: number, height: number) => {
    const blocks: Block[] = []
    const leftSide = width < 800 ? 60 : 120
    const rightSide = width - (width < 800 ? 60 : 120)

    // Left edge blocks - more prominent
    const leftCount = 12
    for (let i = 0; i < leftCount; i++) {
      const size = Math.random() * 70 + 50
      blocks.push({
        x: Math.random() * leftSide * 0.6,
        y: (height / (leftCount + 1)) * (i + 0.5) + (Math.random() - 0.5) * 60,
        z: Math.random() * 1.5 + 0.5,
        size,
        opacity: Math.random() * 0.3 + 0.15,
        delay: Math.random() * 3,
      })
    }

    // Right edge blocks
    const rightCount = 10
    for (let i = 0; i < rightCount; i++) {
      const size = Math.random() * 70 + 50
      blocks.push({
        x: rightSide + Math.random() * leftSide * 0.6,
        y: (height / (rightCount + 1)) * (i + 0.5) + (Math.random() - 0.5) * 60,
        z: Math.random() * 1.5 + 0.5,
        size,
        opacity: Math.random() * 0.3 + 0.15,
        delay: Math.random() * 3,
      })
    }

    // Ambient glow orbs scattered
    for (let i = 0; i < 6; i++) {
      blocks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.5 + 0.2,
        size: Math.random() * 200 + 150,
        opacity: 0.03 + Math.random() * 0.04,
        delay: Math.random() * 5,
      })
    }

    return blocks
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
      particlesRef.current = initParticles(canvas.width, canvas.height)
      blocksRef.current = initBlocks(canvas.width, canvas.height)
    }

    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      timeRef.current += 0.016
      const time = timeRef.current
      const width = canvas.width
      const height = canvas.height
      const mouse = mouseRef.current

      ctx.clearRect(0, 0, width, height)

      // Draw ambient glow orbs (large, soft)
      for (const block of blocksRef.current) {
        if (block.size > 150) {
          const pulse = Math.sin(time * 0.5 + block.delay) * 0.5 + 0.5
          const alpha = block.opacity * (0.7 + pulse * 0.3)

          const gradient = ctx.createRadialGradient(
            block.x, block.y, 0,
            block.x, block.y, block.size
          )
          gradient.addColorStop(0, `rgba(255, 107, 53, ${alpha * 0.5})`)
          gradient.addColorStop(0.5, `rgba(255, 80, 30, ${alpha * 0.2})`)
          gradient.addColorStop(1, 'rgba(255, 50, 10, 0)')

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(block.x, block.y, block.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Draw pixel blocks (medium, glowing squares)
      for (const block of blocksRef.current) {
        if (block.size <= 150) {
          const pulse = Math.sin(time * 0.8 + block.delay) * 0.5 + 0.5
          const alpha = block.opacity * (0.6 + pulse * 0.4)
          const depthScale = 1 + block.z * 0.3
          const depthOffset = block.z * 8

          const parallaxX = (mouse.x - 0.5) * depthOffset * 2
          const parallaxY = (mouse.y - 0.5) * depthOffset * 2

          const drawX = block.x + parallaxX
          const drawY = block.y + parallaxY
          const drawSize = block.size * depthScale

          // Glow layer
          const glowGradient = ctx.createRadialGradient(
            drawX, drawY, 0,
            drawX, drawY, drawSize * 1.5
          )
          glowGradient.addColorStop(0, `rgba(255, 107, 53, ${alpha * 0.4})`)
          glowGradient.addColorStop(0.5, `rgba(255, 107, 53, ${alpha * 0.15})`)
          glowGradient.addColorStop(1, 'rgba(255, 107, 53, 0)')

          ctx.fillStyle = glowGradient
          ctx.beginPath()
          ctx.arc(drawX, drawY, drawSize * 1.5, 0, Math.PI * 2)
          ctx.fill()

          // Block core
          ctx.fillStyle = `rgba(255, 107, 53, ${alpha})`
          ctx.fillRect(
            drawX - drawSize / 2,
            drawY - drawSize / 2,
            drawSize,
            drawSize
          )

          // Inner highlight
          ctx.fillStyle = `rgba(255, 160, 100, ${alpha * 0.5})`
          ctx.fillRect(
            drawX - drawSize / 2 + drawSize * 0.15,
            drawY - drawSize / 2 + drawSize * 0.15,
            drawSize * 0.35,
            drawSize * 0.35
          )
        }
      }

      // Draw floating particles with depth
      for (const p of particlesRef.current) {
        const depthParallax = p.z * 15
        const parallaxX = (mouse.x - 0.5) * depthParallax
        const parallaxY = (mouse.y - 0.5) * depthParallax

        const driftX = Math.sin(time * p.speed + p.phase) * 30
        const driftY = Math.cos(time * p.speed * 0.7 + p.phase) * 20

        const drawX = p.x + driftX + parallaxX
        const drawY = p.y + driftY + parallaxY
        const size = p.size * p.z
        const alpha = p.opacity * p.z / 3

        // Particle glow
        const gradient = ctx.createRadialGradient(
          drawX, drawY, 0,
          drawX, drawY, size * 4
        )
        gradient.addColorStop(0, `rgba(255, 107, 53, ${alpha * 0.6})`)
        gradient.addColorStop(0.5, `rgba(255, 107, 53, ${alpha * 0.2})`)
        gradient.addColorStop(1, 'rgba(255, 107, 53, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(drawX, drawY, size * 4, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.fillStyle = `rgba(255, 140, 90, ${alpha})`
        ctx.beginPath()
        ctx.arc(drawX, drawY, size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Vignette effect for depth
      const vignetteGradient = ctx.createRadialGradient(
        width / 2, height / 2, height * 0.3,
        width / 2, height / 2, height * 0.9
      )
      vignetteGradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
      vignetteGradient.addColorStop(1, 'rgba(0, 0, 0, 0.5)')

      ctx.fillStyle = vignetteGradient
      ctx.fillRect(0, 0, width, height)

      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [initParticles, initBlocks])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
