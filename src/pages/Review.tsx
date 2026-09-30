import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Trophy, Target, TrendingUp, ArrowRight, Home as HomeIcon, Sparkles, CheckCircle } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { spacing, typography, borderRadius } from '@/styles/tokens'
import { Particles } from '@/components/ui/Particles'

export const Review: React.FC = () => {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const score = 85
  const correct = 2
  const total = 3

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
  const itemVariants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 18 } } }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ padding: spacing[3], display: 'flex', flexDirection: 'column', gap: spacing[4], position: 'relative', zIndex: 1, width: '100%', minHeight: '100%' }}>
      <Particles />

      {/* Top section: celebration + score */}
      <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[4], alignItems: 'stretch' }}>
        {/* Left: Celebration */}
        <Card padding={5} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: `linear-gradient(135deg, ${colors.surfaceElevated}, ${colors.surface})`, boxShadow: `0 8px 40px ${colors.shadow}, 0 0 0 1px ${colors.borderLight}` }}>
          <motion.div animate={{ scale: [1, 1.12, 1], rotate: [0, 6, -6, 0] }} transition={{ duration: 2.5, repeat: Infinity }} style={{ fontSize: '80px', marginBottom: spacing[3], textAlign: 'center' }}>🏆</motion.div>
          <motion.h1 variants={itemVariants} style={{ fontSize: typography.sizes['4xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[2], letterSpacing: '-0.5px', textAlign: 'center' }}>Great Job!</motion.h1>
          <motion.p style={{ fontSize: typography.sizes.lg, color: colors.textSecondary, textAlign: 'center', marginBottom: spacing[4] }}>You've completed your practice session</motion.p>
          <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center', gap: spacing[5] }}>
            {[
              { label: 'Answered', value: `${total}`, sub: 'questions', color: colors.textPrimary },
              { label: 'Correct', value: `${correct}`, sub: 'right', color: colors.success },
              { label: 'Time', value: '3m', sub: 'elapsed', color: colors.info },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: typography.sizes['2xl'], fontWeight: typography.weights.bold, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: typography.sizes.xs, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.sub}</div>
                <div style={{ fontSize: typography.sizes.xs, color: colors.textMuted }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </Card>

        {/* Right: Score circle */}
        <Card padding={5} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${colors.surfaceElevated}, ${colors.surface})`, boxShadow: `0 8px 40px ${colors.shadow}, 0 0 0 1px ${colors.borderLight}` }}>
          <motion.h2 style={{ fontSize: typography.sizes.xl, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[4], alignSelf: 'flex-start' }}>Your Performance</motion.h2>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 150, delay: 0.4 }} style={{ position: 'relative', width: 180, height: 180, marginBottom: spacing[4] }}>
            <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="90" cy="90" r="75" fill="none" stroke={colors.surface} strokeWidth="14" />
              <motion.circle cx="90" cy="90" r="75" fill="none" stroke={colors.accent} strokeWidth="14" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 75}`} strokeDashoffset={2 * Math.PI * 75 * (1 - score / 100)} initial={{ strokeDashoffset: 2 * Math.PI * 75 }} animate={{ strokeDashoffset: 2 * Math.PI * 75 * (1 - score / 100) }} transition={{ duration: 1.5, ease: 'easeOut', delay: 0.7 }} />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: 'spring' }} style={{ fontSize: typography.sizes['4xl'], fontWeight: typography.weights.bold, color: colors.accent, lineHeight: 1 }}>{score}%</motion.div>
              <div style={{ fontSize: typography.sizes.sm, color: colors.textMuted, marginTop: 4 }}>Score</div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} style={{ display: 'flex', alignItems: 'center', gap: spacing[2], padding: `${spacing[2]} ${spacing[3]}`, borderRadius: borderRadius.full, background: score >= 80 ? `${colors.success}15` : `${colors.warning}15`, border: `1px solid ${score >= 80 ? colors.success : colors.warning}30` }}>
            <CheckCircle size={18} color={score >= 80 ? colors.success : colors.warning} />
            <span style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: score >= 80 ? colors.success : colors.warning }}>
              {score >= 80 ? 'Excellent work! Keep it up!' : 'Good effort! Practice more!'}
            </span>
          </motion.div>
        </Card>
      </motion.div>

      {/* Achievements row */}
      <motion.div variants={itemVariants}>
        <h2 style={{ fontSize: typography.sizes['2xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[3], display: 'flex', alignItems: 'center', gap: spacing[2] }}>
          <Sparkles size={22} color={colors.accent} /> Achievements Unlocked
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: spacing[3] }}>
          {[
            { icon: <Trophy size={32} />, label: 'Problem Solver', desc: 'Completed your first practice', color: colors.accent },
            { icon: <Target size={32} />, label: 'Quick Learner', desc: 'Finished in under 5 minutes', color: colors.success },
            { icon: <TrendingUp size={32} />, label: 'Consistent', desc: 'Maintained a good streak', color: colors.info },
          ].map((achievement, i) => (
            <motion.div key={achievement.label} initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200, delay: 0.6 + i * 0.12 }}>
              <Card hoverable padding={4} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: spacing[2], minHeight: 130 }}>
                <motion.div whileHover={{ rotate: 12, scale: 1.15 }} transition={{ type: 'spring', stiffness: 300 }} style={{ width: 64, height: 64, borderRadius: '50%', background: `${achievement.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: achievement.color }}>
                  {achievement.icon}
                </motion.div>
                <div>
                  <div style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>{achievement.label}</div>
                  <div style={{ fontSize: typography.sizes.sm, color: colors.textMuted, marginTop: 4 }}>{achievement.desc}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom actions */}
      <motion.div variants={itemVariants}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: spacing[3] }}>
          {[
            { label: 'Practice More', path: '/solve/practice', emoji: '💪', desc: 'Keep building streaks' },
            { label: 'Explore Concepts', path: '/concepts', emoji: '📚', desc: 'Review topics' },
            { label: 'Solve New Problem', path: '/solve/upload', emoji: '🎯', desc: 'Try something new' },
          ].map((step) => (
            <motion.div key={step.label} whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }} whileTap={{ scale: 0.97 }}>
              <Card hoverable padding={4} onClick={() => navigate(step.path)} style={{ cursor: 'pointer', textAlign: 'center', height: '100%' }}>
                <div style={{ fontSize: '36px', marginBottom: spacing[2] }}>{step.emoji}</div>
                <div style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>{step.label}</div>
                <div style={{ fontSize: typography.sizes.sm, color: colors.textMuted, marginTop: 4 }}>{step.desc}</div>
              </Card>
            </motion.div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: spacing[3], marginTop: spacing[4] }}>
          <Button variant="outline" size="lg" onClick={() => navigate('/home')}><HomeIcon size={18} /> Back to Home</Button>
          <Button size="lg" onClick={() => navigate('/solve/upload')}>Solve Another <ArrowRight size={18} /></Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
