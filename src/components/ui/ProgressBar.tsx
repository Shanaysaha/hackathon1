import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import { spacing, borderRadius } from '@/styles/tokens'

interface ProgressBarProps {
  progress: number
  height?: string
  showLabel?: boolean
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = '8px',
  showLabel = false,
}) => {
  const { colors } = useTheme()

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          width: '100%',
          height,
          background: colors.surface,
          borderRadius: borderRadius.full,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentHover})`,
            borderRadius: borderRadius.full,
          }}
        />
      </div>
      {showLabel && (
        <div
          style={{
            marginTop: spacing[1],
            fontSize: '12px',
            color: colors.textSecondary,
            textAlign: 'right',
          }}
        >
          {progress}%
        </div>
      )}
    </div>
  )
}
