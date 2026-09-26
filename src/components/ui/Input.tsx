import React from 'react'
import { useTheme } from '@/hooks/useTheme'
import { spacing, borderRadius, typography } from '@/styles/tokens'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean
  icon?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({
  fullWidth = false,
  icon,
  ...props
}) => {
  const { colors } = useTheme()

  return (
    <div
      style={{
        position: 'relative',
        width: fullWidth ? '100%' : 'auto',
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      {icon && (
        <div
          style={{
            position: 'absolute',
            left: spacing[2],
            display: 'flex',
            alignItems: 'center',
            color: colors.textMuted,
            pointerEvents: 'none',
          }}
        >
          {icon}
        </div>
      )}
      <input
        style={{
          width: '100%',
          height: '40px',
          padding: icon ? `0 ${spacing[2]} 0 ${spacing[5]}` : `0 ${spacing[2]}`,
          background: colors.inputBg,
          border: `1px solid ${colors.border}`,
          borderRadius: borderRadius.md,
          color: colors.textPrimary,
          fontSize: typography.sizes.base,
          outline: 'none',
          transition: 'all 0.2s ease',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = colors.accent
          e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.accentLight}`
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = colors.border
          e.currentTarget.style.boxShadow = 'none'
        }}
        {...props}
      />
    </div>
  )
}
