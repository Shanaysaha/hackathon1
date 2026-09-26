import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { spacing, typography, borderRadius } from '@/styles/tokens'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  disabled,
  ...props
}) => {
  const { colors } = useTheme()

  const variants = {
    primary: {
      background: colors.accent,
      color: '#FFFFFF',
      border: 'none',
      hover: {
        background: colors.accentHover,
      },
    },
    secondary: {
      background: colors.surface,
      color: colors.textPrimary,
      border: `1px solid ${colors.border}`,
      hover: {
        background: colors.surfaceElevated,
      },
    },
    ghost: {
      background: 'transparent',
      color: colors.textPrimary,
      border: 'none',
      hover: {
        background: colors.surface,
      },
    },
    outline: {
      background: 'transparent',
      color: colors.accent,
      border: `1px solid ${colors.accent}`,
      hover: {
        background: colors.accentLight,
      },
    },
  }

  const sizes = {
    sm: {
      padding: `${spacing[1]} ${spacing[2]}`,
      fontSize: typography.sizes.sm,
      height: '32px',
    },
    md: {
      padding: `${spacing[2]} ${spacing[3]}`,
      fontSize: typography.sizes.base,
      height: '40px',
    },
    lg: {
      padding: `${spacing[2]} ${spacing[4]}`,
      fontSize: typography.sizes.lg,
      height: '48px',
    },
  }

  const style = variants[variant]
  const sizeStyle = sizes[size]

  return (
    // @ts-ignore
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{
        background: style.background,
        color: style.color,
        border: style.border,
        padding: sizeStyle.padding,
        fontSize: sizeStyle.fontSize,
        height: sizeStyle.height,
        borderRadius: borderRadius.md,
        fontWeight: typography.weights.medium,
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing[1],
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  )
}
