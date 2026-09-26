import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, CheckCircle, BookOpen, MessageCircle, Target } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { spacing, typography, borderRadius } from '@/styles/tokens'
import { Particles } from '@/components/ui/Particles'

const journeySteps = [
  { id: '1', date: 'Today', title: 'Quadratic Equations Mastered', description: 'Completed all practice questions with 85% score', type: 'concept', icon: <BookOpen size={20} />, color: '#FF6B35' },
  { id: '2', date: 'Yesterday', title: 'Discussion Session', description: 'Had an in-depth discussion about factorization methods', type: 'discussion', icon: <MessageCircle size={20} />, color: '#3B82F6' },
  { id: '3', date: '2 days ago', title: 'Practice Challenge', description: 'Solved 15 trigonometry problems in a row', type: 'practice', icon: <Target size={20} />, color: '#10B981' },
  { id: '4', date: '3 days ago', title: 'Started Algebra Advanced', description: 'Began learning advanced algebraic concepts', type: 'concept', icon: <BookOpen size={20} />, color: '#F59E0B' },
  { id: '5', date: '5 days ago', title: 'Chemistry Lab Completed', description: 'Understood chemical bonding through interactive examples', type: 'concept', icon: <BookOpen size={20} />, color: '#FF6B35' },
]

export const LearningJourney: React.FC = () => {
  const { colors } = useTheme()

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ padding: spacing[4], position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', width: '100%' }}>
      <Particles />

      <motion.div initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
        <h1 style={{ fontSize: typography.sizes['4xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[1], letterSpacing: '-0.5px' }}>Your Learning Journey 🗺️</h1>
        <p style={{ fontSize: typography.sizes.base, color: colors.textSecondary }}>Track your progress and see how far you've come</p>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <Card padding={4}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: spacing[4] }}>
            {[
              { value: '24', label: 'Total Activities', color: colors.accent },
              { value: '7', label: 'Day Streak', color: colors.success },
              { value: '48', label: 'Hours Learned', color: colors.info },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: typography.sizes['3xl'], fontWeight: typography.weights.bold, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: typography.sizes.sm, color: colors.textSecondary, marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Timeline */}
      <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} style={{ position: 'relative', paddingLeft: 48 }}>
        {/* Vertical line */}
        <div style={{ position: 'absolute', left: 15, top: 36, bottom: 36, width: 2, background: `linear-gradient(to bottom, ${colors.accent}, ${colors.border})`, borderRadius: 1 }} />

        {journeySteps.map((step, index) => (
          <motion.div key={step.id} initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 + index * 0.1, type: 'spring', stiffness: 100 }} style={{ position: 'relative', marginBottom: spacing[4] }}>
            {/* Node */}
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 200 }} style={{ position: 'absolute', left: -36, top: 20, width: 32, height: 32, borderRadius: '50%', background: step.color, border: `4px solid ${colors.background}`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, boxShadow: `0 0 0 4px ${step.color}25` }}>
              <CheckCircle size={14} color="#FFFFFF" strokeWidth={3} />
            </motion.div>

            <Card hoverable padding={4}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: spacing[2] }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
                  <div style={{ width: 44, height: 44, borderRadius: borderRadius.md, background: `${step.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: step.color, flexShrink: 0 }}>{step.icon}</div>
                  <div>
                    <h3 style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: 4 }}>{step.title}</h3>
                    <div style={{ display: 'flex', gap: spacing[2], alignItems: 'center', flexWrap: 'wrap' }}>
                      <Badge variant="default">{step.type}</Badge>
                      <span style={{ fontSize: typography.sizes.sm, color: colors.textMuted, display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={12} /> {step.date}</span>
                    </div>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary, marginTop: spacing[2], marginLeft: 0 }}>{step.description}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Milestone */}
      <motion.div initial={{ y: 20, opacity: 0, scale: 0.96 }} animate={{ y: 0, opacity: 1, scale: 1 }} transition={{ delay: 0.9, type: 'spring', stiffness: 120 }}>
        <Card padding={5}>
          <div style={{ textAlign: 'center' }}>
            <motion.div animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.1, 1] }} transition={{ duration: 2.5, repeat: Infinity }} style={{ fontSize: '56px', marginBottom: spacing[3] }}>🎯</motion.div>
            <h2 style={{ fontSize: typography.sizes['2xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[2] }}>Next Milestone: 50 Problems Solved!</h2>
            <p style={{ fontSize: typography.sizes.base, color: colors.textSecondary, marginBottom: spacing[3] }}>You're 26 problems away from your next achievement</p>
            <div style={{ height: 12, background: colors.surface, borderRadius: borderRadius.full, overflow: 'hidden', maxWidth: 500, margin: '0 auto' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: '48%' }} transition={{ duration: 1.5, ease: 'easeOut' }} style={{ height: '100%', background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentHover})`, borderRadius: borderRadius.full }} />
            </div>
            <div style={{ marginTop: spacing[2], fontSize: typography.sizes.sm, color: colors.textMuted }}>24 / 50 problems</div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
