import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { IconButton } from '@/components/ui/IconButton'
import { Avatar } from '@/components/ui/Avatar'
import { spacing, borderRadius, typography } from '@/styles/tokens'
import { useAuthStore } from '@/state/authStore'

export const TopBar: React.FC = () => {
  const { colors, theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      style={{
        height: '72px',
        padding: `0 ${spacing[4]}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${colors.border}`,
        background: colors.surface,
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Search */}
      <div style={{ flex: 1, maxWidth: '800px' }}>
        <motion.div
          animate={{
            boxShadow: searchFocused
              ? `0 0 0 3px ${colors.accentLight}, 0 2px 12px ${colors.shadow}`
              : 'none',
            borderRadius: searchFocused ? borderRadius.lg : borderRadius.md,
          }}
          transition={{ duration: 0.2 }}
          style={{ position: 'relative' }}
        >
          <div
            style={{
              position: 'absolute',
              left: spacing[2],
              top: '50%',
              transform: 'translateY(-50%)',
              color: searchFocused ? colors.accent : colors.textMuted,
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.2s ease',
            }}
          >
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search concepts, problems, topics..."
            style={{
              width: '100%',
              height: '44px',
              paddingLeft: spacing[5],
              paddingRight: spacing[3],
              background: colors.inputBg,
              border: `1.5px solid ${searchFocused ? colors.accent : colors.border}`,
              borderRadius: searchFocused ? borderRadius.lg : borderRadius.md,
              color: colors.textPrimary,
              fontSize: typography.sizes.base,
              outline: 'none',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              fontFamily: 'inherit',
            }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </motion.div>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
        {/* Theme toggle */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: theme === 'dark' ? 15 : -15 }}
          whileTap={{ scale: 0.9 }}
        >
          <IconButton onClick={toggleTheme}>
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </motion.div>
            </AnimatePresence>
          </IconButton>
        </motion.div>

        {/* Notifications */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <IconButton style={{ position: 'relative' }}>
            <Bell size={20} />
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: 'absolute',
                top: 4,
                right: 4,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: colors.error,
                border: `2px solid ${colors.sidebarBg}`,
              }}
            />
          </IconButton>
        </motion.div>

        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/profile')}
        >
          <Avatar name={user?.name || 'Student'} size="md" />
        </motion.div>
      </div>
    </motion.div>
  )
}
