import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Target, Brain, Sparkles, ChevronRight, Flame, Trophy, Clock } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { spacing, typography, borderRadius } from '@/styles/tokens'
import { Particles } from '@/components/ui/Particles'
import { useAuthStore } from '@/state/authStore'

export const Home: React.FC = () => {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const recentProblems = [
    { id: '1', title: 'Quadratic Equations Problem', subject: 'Mathematics', progress: 75, timestamp: '2 hours ago' },
    { id: '2', title: 'Photosynthesis Explanation', subject: 'Biology', progress: 100, timestamp: 'Yesterday' },
  ]

  const stats = [
    { label: 'Problems Solved', value: '24', icon: <Target size={22} />, color: colors.accent, bg: `${colors.accent}18` },
    { label: 'Learning Streak', value: '7 days', icon: <Flame size={22} />, color: colors.success, bg: `${colors.success}18` },
    { label: 'Concepts Mastered', value: '12', icon: <Brain size={22} />, color: colors.info, bg: `${colors.info}18` },
    { label: 'Practice Score', value: '85%', icon: <Trophy size={22} />, color: colors.warning, bg: `${colors.warning}18` },
  ]

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } }
  const itemVariants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 18 } } }

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <>
      <Particles />
      <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ padding: spacing[3], position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: spacing[5], width: '100%' }}>
        {/* Hero */}
        <motion.div variants={itemVariants} style={{ marginBottom: spacing[6] }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[2] }}>
            <Sparkles size={16} color={colors.accent} />
            <span style={{ fontSize: typography.sizes.sm, color: colors.accent, fontWeight: typography.weights.medium, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Let&apos;s learn today</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, type: 'spring', stiffness: 120 }} style={{ fontSize: typography.sizes['4xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[2], lineHeight: 1.15, letterSpacing: '-0.5px' }}>
            {greeting()}, {user?.name || 'Student'}! 👋
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} style={{ fontSize: typography.sizes.lg, color: colors.textSecondary, marginBottom: spacing[4] }}>
            Ready to solve some doubts and level up your learning?
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button onClick={() => navigate('/solve/upload')} style={{ display: 'inline-flex', alignItems: 'center', gap: spacing[2], height: '52px', padding: `${spacing[2]} ${spacing[4]}`, fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, borderRadius: borderRadius.lg, boxShadow: `0 4px 28px ${colors.accent}35`, letterSpacing: '0.2px' }}>
              Start Solving <ArrowRight size={20} />
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: spacing[3], marginBottom: spacing[6] }}>
          <AnimatePresence>
            {stats.map((stat, i) => (
              <motion.div key={stat.label} layout initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ delay: i * 0.06, type: 'spring', stiffness: 120 }} whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300 } }} onMouseEnter={() => setHoveredCard(stat.label)} onMouseLeave={() => setHoveredCard(null)}>
                <div style={{ background: hoveredCard === stat.label ? colors.surfaceElevated : colors.cardBg, border: `1px solid ${hoveredCard === stat.label ? colors.accent + '40' : colors.border}`, borderRadius: borderRadius.lg, padding: spacing[4], boxShadow: hoveredCard === stat.label ? `0 8px 32px ${colors.shadow}, 0 0 0 1px ${colors.accent}15` : `0 2px 8px ${colors.shadow}`, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'default' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
                    <motion.div animate={hoveredCard === stat.label ? { scale: [1, 1.12, 1], rotate: [0, 6, -6, 0] } : {}} transition={{ duration: 0.6 }} style={{ width: '52px', height: '52px', borderRadius: '14px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
                      {stat.icon}
                    </motion.div>
                    <div>
                      <div style={{ fontSize: typography.sizes['2xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, lineHeight: 1, marginBottom: spacing[1] }}>{stat.value}</div>
                      <div style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>{stat.label}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Recent */}
        <motion.div variants={itemVariants}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing[3] }}>
            <h2 style={{ fontSize: typography.sizes['2xl'], fontWeight: typography.weights.bold, color: colors.textPrimary }}>Continue Learning</h2>
            <motion.button whileHover={{ x: 4 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/history')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: spacing[1], fontSize: typography.sizes.sm, color: colors.accent, fontWeight: typography.weights.medium }}>
              View all <ChevronRight size={16} />
            </motion.button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
            <AnimatePresence>
              {recentProblems.map((problem, i) => (
                <motion.div key={problem.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ delay: i * 0.08, type: 'spring', stiffness: 100 }} whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}>
                  <Card hoverable padding={4} onClick={() => navigate('/solve/discuss')}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing[3] }}>
                      <div>
                        <h3 style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[1] }}>{problem.title}</h3>
                        <div style={{ display: 'flex', gap: spacing[2], alignItems: 'center' }}>
                          <Badge variant="accent">{problem.subject}</Badge>
                          <span style={{ fontSize: typography.sizes.sm, color: colors.textMuted, display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {problem.timestamp}</span>
                        </div>
                      </div>
                      <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowRight size={20} color={colors.textSecondary} /></motion.div>
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing[1] }}>
                        <span style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>Progress</span>
                        <span style={{ fontSize: typography.sizes.sm, color: colors.accent, fontWeight: typography.weights.semibold }}>{problem.progress}%</span>
                      </div>
                      <ProgressBar progress={problem.progress} />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} style={{ marginTop: spacing[6] }}>
          <h2 style={{ fontSize: typography.sizes['2xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[3] }}>Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: spacing[3] }}>
            <AnimatePresence>
              {[
                { label: 'Browse Concepts', path: '/concepts', emoji: '📚', desc: 'Explore topics' },
                { label: 'Practice Questions', path: '/solve/practice', emoji: '💪', desc: 'Test yourself' },
                { label: 'View History', path: '/history', emoji: '📊', desc: 'Track progress' },
                { label: 'Learning Journey', path: '/profile/learning-journey', emoji: '🗺️', desc: 'See your path' },
              ].map((action, i) => (
                <motion.div key={action.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ delay: 0.1 * i, type: 'spring', stiffness: 100 }} whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }} whileTap={{ scale: 0.97 }}>
                  <Card hoverable padding={3} onClick={() => navigate(action.path)}>
                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: spacing[2], minHeight: 120, justifyContent: 'center' }}>
                      <motion.div whileHover={{ scale: 1.2, rotate: [0, -8, 8, 0] }} transition={{ type: 'spring', stiffness: 300 }} style={{ fontSize: '36px' }}>{action.emoji}</motion.div>
                      <div style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>{action.label}</div>
                      <div style={{ fontSize: typography.sizes.sm, color: colors.textMuted }}>{action.desc}</div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}
