import React from 'react'
import { useTheme } from '@/hooks/useTheme'
import { spacing, borderRadius, typography } from '@/styles/tokens'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'accent'
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
}) => {
  const { colors } = useTheme()

  const variants = {
    default: {
      background: colors.surface,
      color: colors.textSecondary,
    },
    success: {
      background: 'rgba(16, 185, 129, 0.15)',
      color: colors.success,
    },
    warning: {
      background: 'rgba(245, 158, 11, 0.15)',
      color: colors.warning,
    },
    error: {
      background: 'rgba(239, 68, 68, 0.15)',
      color: colors.error,
    },
    accent: {
      background: colors.accentLight,
      color: colors.accent,
    },
  }

  const variantStyle = variants[variant]

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: `4px ${spacing[2]}`,
        background: variantStyle.background,
        color: variantStyle.color,
        borderRadius: borderRadius.md,
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.medium,
      }}
    >
      {children}
    </span>
  )
}
