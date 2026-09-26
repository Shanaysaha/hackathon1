import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Trophy, Target, TrendingUp, ArrowRight, Home as HomeIcon, Sparkles } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { spacing, typography } from '@/styles/tokens'
import { Particles } from '@/components/ui/Particles'

export const Review: React.FC = () => {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const score = 85
  const correct = 2
  const total = 3

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ padding: spacing[4], display: 'flex', flexDirection: 'column', alignItems: 'center', gap: spacing[5], position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', width: '100%' }}>
      <Particles />

      {/* Celebration */}
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 150, delay: 0.1 }} style={{ textAlign: 'center' }}>
        <motion.div animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: '72px', marginBottom: spacing[3] }}>🏆</motion.div>
        <h1 style={{ fontSize: typography.sizes['4xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[1], letterSpacing: '-0.5px' }}>Great Job!</h1>
        <p style={{ fontSize: typography.sizes.base, color: colors.textSecondary }}>You've completed your practice session</p>
      </motion.div>

      {/* Score circle */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}>
        <Card padding={5} style={{ textAlign: 'center', boxShadow: `0 8px 40px ${colors.shadow}` }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 150, delay: 0.5 }} style={{ position: 'relative', width: 140, height: 140, margin: '0 auto spacing[3]' }}>
            <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="70" cy="70" r="60" fill="none" stroke={colors.surface} strokeWidth="10" />
              <motion.circle cx="70" cy="70" r="60" fill="none" stroke={colors.accent} strokeWidth="10" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 60}`} strokeDashoffset={2 * Math.PI * 60 * (1 - score / 100)} initial={{ strokeDashoffset: 2 * Math.PI * 60 }} animate={{ strokeDashoffset: 2 * Math.PI * 60 * (1 - score / 100) }} transition={{ duration: 1.5, ease: 'easeOut', delay: 0.8 }} />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: 'spring' }} style={{ fontSize: typography.sizes['3xl'], fontWeight: typography.weights.bold, color: colors.accent }}>{score}%</motion.div>
              <div style={{ fontSize: typography.sizes.xs, color: colors.textMuted }}>Score</div>
            </div>
          </motion.div>
          <h2 style={{ fontSize: typography.sizes.xl, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[3] }}>Your Performance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: spacing[3] }}>
            {[
              { label: 'Answered', value: total, color: colors.textPrimary },
              { label: 'Correct', value: correct, color: colors.success },
              { label: 'Time', value: '3m', color: colors.info },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: typography.sizes['2xl'], fontWeight: typography.weights.bold, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Achievements */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
        <h2 style={{ fontSize: typography.sizes['2xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[3], display: 'flex', alignItems: 'center', gap: spacing[2] }}>
          <Sparkles size={22} color={colors.accent} /> Achievements Unlocked
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: spacing[3] }}>
          {[
            { icon: <Trophy size={28} />, label: 'Problem Solver', color: colors.accent },
            { icon: <Target size={28} />, label: 'Quick Learner', color: colors.success },
            { icon: <TrendingUp size={28} />, label: 'Consistent', color: colors.info },
          ].map((achievement, i) => (
            <motion.div key={achievement.label} initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200, delay: 0.6 + i * 0.1 }}>
              <Card padding={3}>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: spacing[2] }}>
                  <motion.div whileHover={{ rotate: 10, scale: 1.1 }} style={{ width: 56, height: 56, borderRadius: '50%', background: `${achievement.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: achievement.color }}>{achievement.icon}</motion.div>
                  <div style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>{achievement.label}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Next steps */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: spacing[3] }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: spacing[3], width: '100%' }}>
          {[
            { label: 'Practice More', path: '/solve/practice', emoji: '💪' },
            { label: 'Explore Concepts', path: '/concepts', emoji: '📚' },
            { label: 'Solve New Problem', path: '/solve/upload', emoji: '🎯' },
          ].map((step) => (
            <motion.div key={step.label} whileHover={{ y: -5, transition: { type: 'spring', stiffness: 300 } }} whileTap={{ scale: 0.97 }}>
              <Card hoverable padding={3} onClick={() => navigate(step.path)} style={{ cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ fontSize: '36px', marginBottom: spacing[2] }}>{step.emoji}</div>
                <div style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>{step.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: spacing[3] }}>
          <Button variant="outline" size="lg" onClick={() => navigate('/home')}><HomeIcon size={18} /> Back to Home</Button>
          <Button size="lg" onClick={() => navigate('/solve/upload')}>Solve Another <ArrowRight size={18} /></Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
