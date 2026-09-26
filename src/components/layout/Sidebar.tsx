import React from 'react'
import { motion } from 'framer-motion'
import { Home, Lightbulb, History, BookOpen, Dumbbell, LogOut } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import { SidebarItem } from './SidebarItem'
import { spacing, typography, borderRadius } from '@/styles/tokens'
import { useAuthStore } from '@/state/authStore'

const navItems = [
  { to: '/home', icon: <Home size={20} />, label: 'Home' },
  { to: '/solve/upload', icon: <Lightbulb size={20} />, label: 'Solve' },
  { to: '/solve/practice', icon: <Dumbbell size={20} />, label: 'Practice' },
  { to: '/history', icon: <History size={20} />, label: 'History' },
  { to: '/concepts', icon: <BookOpen size={20} />, label: 'Concepts' },
]

export const Sidebar: React.FC = () => {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const isActive = (path: string) => {
    if (path === '/home') return location.pathname === '/home'
    return location.pathname.startsWith(path)
  }

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 60, damping: 20 }}
      style={{
        width: '260px',
        height: '100vh',
        background: colors.sidebarBg,
        borderRight: `1px solid ${colors.sidebarBorder}`,
        display: 'flex',
        flexDirection: 'column',
        padding: `${spacing[3]} 0`,
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
        boxShadow: '4px 0 24px rgba(0,0,0,0.08)',
      }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[2],
          padding: `0 ${spacing[4]}`,
          marginBottom: spacing[4],
        }}
      >
        <motion.div
          whileHover={{ rotate: -12, scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          style={{
            width: '42px',
            height: '42px',
            background: `linear-gradient(135deg, ${colors.accent}, #FF8A5B)`,
            borderRadius: borderRadius.md,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            boxShadow: `0 4px 20px ${colors.accent}35`,
            flexShrink: 0,
          }}
        >
          💡
        </motion.div>
        <div>
          <div
            style={{
              fontSize: typography.sizes.xl,
              fontWeight: typography.weights.bold,
              color: colors.textPrimary,
              lineHeight: 1.15,
            }}
          >
            Doubt Solver
          </div>
          <div
            style={{
              fontSize: typography.sizes.xs,
              color: colors.textMuted,
              fontWeight: typography.weights.medium,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            AI Tutor
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {navItems.map((item, i) => (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.06 }}
          >
            <SidebarItem
              to={item.to}
              icon={item.icon}
              label={item.label}
              active={isActive(item.to)}
            />
          </motion.div>
        ))}
      </nav>

      {/* Bottom section */}
      <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: spacing[3] }}>
        {/* Profile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            padding: `0 ${spacing[4]}`,
            marginBottom: spacing[2],
            display: 'flex',
            alignItems: 'center',
            gap: spacing[2],
            cursor: 'pointer',
          }}
          onClick={() => navigate('/profile')}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: 38,
              height: 38,
              borderRadius: borderRadius.full,
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.info})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: typography.sizes.sm,
              fontWeight: typography.weights.semibold,
              flexShrink: 0,
              boxShadow: `0 2px 12px ${colors.accent}30`,
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </motion.div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: typography.sizes.sm,
                fontWeight: typography.weights.semibold,
                color: colors.textPrimary,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user?.name || 'Student'}
            </div>
            <div
              style={{
                fontSize: typography.sizes.xs,
                color: colors.textMuted,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user?.email || ''}
            </div>
          </div>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          style={{ padding: `0 ${spacing[4]}` }}
        >
          <motion.button
            whileHover={{ x: 4, background: `${colors.error}12` }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              logout()
              navigate('/login', { replace: true })
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
              padding: `${spacing[2]} ${spacing[3]}`,
              borderRadius: borderRadius.md,
              background: 'transparent',
              color: colors.textMuted,
              fontSize: typography.sizes.sm,
              fontWeight: typography.weights.medium,
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.aside>
  )
}
