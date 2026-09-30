import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  delay: number
}

interface GlowOrb {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  delay: number
}

export const Particles: React.FC = () => {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 2,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4 - 0.08,
        opacity: Math.random() * 0.4 + 0.08,
        delay: Math.random() * 6,
      })),
    []
  )

  const glowOrbs = useMemo<GlowOrb[]>(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i + 100,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
        size: 120 + Math.random() * 200,
        opacity: 0.03 + Math.random() * 0.04,
        delay: Math.random() * 3,
      })),
    []
  )

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Ambient glow orbs for depth */}
      {glowOrbs.map((orb) => (
        <motion.div
          key={orb.id}
          animate={{
            x: [0, Math.sin(orb.delay) * 30, 0],
            y: [0, Math.cos(orb.delay) * 20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 12 + orb.delay * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(255,107,53,${orb.opacity}) 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            x: [0, p.speedX * 250, 0],
            y: [0, p.speedY * 250, 0],
            opacity: [p.opacity * 0.3, p.opacity, p.opacity * 0.3],
          }}
          transition={{
            duration: 10 + Math.random() * 8,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: `rgba(255, 107, 53, ${p.opacity})`,
            boxShadow: `0 0 ${p.size * 3}px rgba(255, 107, 53, ${p.opacity * 0.5})`,
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  )
}
