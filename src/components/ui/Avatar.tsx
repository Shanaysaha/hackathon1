import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { typography } from '@/styles/tokens'

interface AvatarProps {
  src?: string
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
}) => {
  const { colors } = useTheme()

  const sizes = {
    sm: '32px',
    md: '40px',
    lg: '48px',
    xl: '64px',
  }

  const fontSizes = {
    sm: typography.sizes.sm,
    md: typography.sizes.base,
    lg: typography.sizes.lg,
    xl: typography.sizes['2xl'],
  }

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      style={{
        width: sizes[size],
        height: sizes[size],
        borderRadius: '50%',
        background: src ? 'transparent' : colors.accent,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontSize: fontSizes[size],
        fontWeight: typography.weights.semibold,
        color: '#FFFFFF',
      }}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        initials
      )}
    </motion.div>
  )
}
