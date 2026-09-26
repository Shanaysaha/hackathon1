import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import { spacing, typography, borderRadius } from '@/styles/tokens'

interface SidebarItemProps {
  to: string
  icon: React.ReactNode
  label: string
  active?: boolean
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label, active = false }) => {
  const { colors } = useTheme()
  const navigate = useNavigate()

  return (
    <motion.div
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(to)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing[3],
        padding: `${spacing[2]} ${spacing[4]}`,
        margin: '0 10px',
        borderRadius: borderRadius.md,
        background: active ? colors.accentLight : 'transparent',
        color: active ? colors.accent : colors.textSecondary,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: active ? `1px solid ${colors.accent}25` : '1px solid transparent',
        fontSize: typography.sizes.base,
        fontWeight: active ? typography.weights.semibold : typography.weights.medium,
      }}
    >
      <motion.span
        animate={active ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        {icon}
      </motion.span>
      <span>{label}</span>
      {active && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 'auto', opacity: 1 }}
          style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: colors.accent }}
        />
      )}
    </motion.div>
  )
}
