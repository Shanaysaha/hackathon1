import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { spacing, borderRadius } from '@/styles/tokens'

interface CardProps {
  children: React.ReactNode
  hoverable?: boolean
  padding?: keyof typeof spacing | number
  className?: string
  onClick?: () => void
  style?: React.CSSProperties
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  padding = 3,
  className = '',
  onClick,
  style,
}) => {
  const { colors } = useTheme()

  return (
    <motion.div
      whileHover={hoverable ? { scale: 1.02, y: -4 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.border}`,
        borderRadius: borderRadius.lg,
        padding: typeof padding === 'number' ? spacing[padding as keyof typeof spacing] : spacing[padding],
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: `0 2px 8px ${colors.shadow}`,
        ...style,
      }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
