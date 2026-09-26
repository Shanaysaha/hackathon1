import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { borderRadius } from '@/styles/tokens'

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  size = 'md',
  ...props
}) => {
  const { colors } = useTheme()

  const sizes = {
    sm: '32px',
    md: '40px',
    lg: '48px',
  }

  return (
    // @ts-ignore
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{
        width: sizes[size],
        height: sizes[size],
        borderRadius: borderRadius.md,
        background: 'transparent',
        color: colors.textSecondary,
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
