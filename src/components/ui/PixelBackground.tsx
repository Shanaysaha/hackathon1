import React from 'react'
import { motion } from 'framer-motion'

interface PixelBlock {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  delay: number
}

export const PixelBackground: React.FC = () => {
  const leftPixels: PixelBlock[] = [
    { id: 1, x: 0, y: 0, size: 80, opacity: 0.35, delay: 0 },
    { id: 2, x: 0, y: 140, size: 100, opacity: 0.32, delay: 0.2 },
    { id: 3, x: 0, y: 280, size: 90, opacity: 0.22, delay: 0.3 },
    { id: 4, x: 0, y: 420, size: 75, opacity: 0.35, delay: 0.1 },
    { id: 5, x: 0, y: 550, size: 85, opacity: 0.3, delay: 0.2 },
    { id: 6, x: 0, y: 700, size: 95, opacity: 0.28, delay: 0.15 },
  ]

  const rightPixels: PixelBlock[] = [
    { id: 7, x: 720, y: 0, size: 85, opacity: 0.38, delay: 0.05 },
    { id: 8, x: 650, y: 200, size: 90, opacity: 0.35, delay: 0.3 },
    { id: 9, x: 720, y: 430, size: 80, opacity: 0.38, delay: 0.1 },
    { id: 10, x: 700, y: 580, size: 95, opacity: 0.35, delay: 0.2 },
  ]

  const glowLeft = [
    { id: 'g1', x: -50, y: '20%', size: 250, opacity: 0.15, delay: 0 },
    { id: 'g2', x: 30, y: '60%', size: 180, opacity: 0.12, delay: 2 },
  ]

  const glowRight = [
    { id: 'g3', x: 'calc(100% - 200px)', y: '30%', size: 280, opacity: 0.18, delay: 1 },
    { id: 'g4', x: 'calc(100% - 150px)', y: '70%', size: 200, opacity: 0.14, delay: 3 },
  ]

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {[...glowLeft, ...glowRight].map((g) => (
        <motion.div
          key={g.id}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [g.opacity * 0.7, g.opacity * 1.2, g.opacity * 0.7],
          }}
          transition={{ duration: 6 + g.delay, repeat: Infinity, ease: 'easeInOut', delay: g.delay }}
          style={{
            position: 'absolute',
            left: typeof g.x === 'string' ? g.x : `${g.x}px`,
            top: g.y,
            width: g.size,
            height: g.size,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 107, 53, 0.25) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      ))}

      {leftPixels.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: p.opacity * 0.5 }}
          animate={{
            opacity: [p.opacity * 0.6, p.opacity, p.opacity * 0.6],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 4 + p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: `rgba(255, 107, 53, ${p.opacity})`,
            boxShadow: `0 0 ${p.size * 0.5}px rgba(255, 107, 53, ${p.opacity * 0.5}), inset 0 0 ${p.size * 0.3}px rgba(255, 140, 91, ${p.opacity * 0.3})`,
            borderRadius: 4,
          }}
        />
      ))}

      {rightPixels.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: p.opacity * 0.5 }}
          animate={{
            opacity: [p.opacity * 0.6, p.opacity, p.opacity * 0.6],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 4.5 + p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: `rgba(255, 107, 53, ${p.opacity})`,
            boxShadow: `0 0 ${p.size * 0.5}px rgba(255, 107, 53, ${p.opacity * 0.5}), inset 0 0 ${p.size * 0.3}px rgba(255, 140, 91, ${p.opacity * 0.3})`,
            borderRadius: 4,
          }}
        />
      ))}
    </div>
  )
}
