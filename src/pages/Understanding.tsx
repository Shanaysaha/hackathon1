import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Lightbulb, BookOpen, MessageCircle } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { spacing, typography, borderRadius } from '@/styles/tokens'

export const Understanding: React.FC = () => {
  const { colors } = useTheme()
  const navigate = useNavigate()

  const problem = { title: 'Solve the quadratic equation: x² - 5x + 6 = 0', subject: 'Mathematics', difficulty: 'Medium', topics: ['Quadratic Equations', 'Factorization', 'Algebra'] }

  const nextSteps = [
    { icon: <MessageCircle size={28} />, title: 'Discuss with Tutor', description: 'Get step-by-step guidance', path: '/solve/discuss', color: colors.accent },
    { icon: <BookOpen size={28} />, title: 'Practice Questions', description: 'Test your understanding', path: '/solve/practice', color: colors.info },
    { icon: <Lightbulb size={28} />, title: 'Related Concepts', description: 'Learn more about this topic', path: '/concepts', color: colors.success },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ padding: spacing[3], position: 'relative', zIndex: 1, width: '100%' }}>
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }} style={{ marginBottom: spacing[5] }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} style={{ fontSize: '48px', marginBottom: spacing[3] }}>🎯</motion.div>
        <h1 style={{ fontSize: typography.sizes['4xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[2], letterSpacing: '-0.5px' }}>We understand your problem!</h1>
        <p style={{ fontSize: typography.sizes.lg, color: colors.textSecondary }}>Here&apos;s what we found. Choose how you&apos;d like to proceed.</p>
      </motion.div>

      {/* Problem card */}
      <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 120 }} style={{ marginBottom: spacing[5] }}>
        <Card padding={5}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing[4] }}>
            <motion.div whileHover={{ rotate: 10, scale: 1.1 }} style={{ width: 64, height: 64, borderRadius: borderRadius.lg, background: `linear-gradient(135deg, ${colors.accent}, #FF8A5B)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 8px 24px ${colors.accent}30` }}>
              <Lightbulb size={30} color="#FFFFFF" />
            </motion.div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: spacing[2], marginBottom: spacing[2], flexWrap: 'wrap' }}>
                <span style={{ padding: `4px ${spacing[2]}`, background: colors.accentLight, color: colors.accent, borderRadius: borderRadius.md, fontSize: typography.sizes.sm, fontWeight: typography.weights.medium }}>{problem.subject}</span>
                <span style={{ padding: `4px ${spacing[2]}`, background: colors.surface, color: colors.textSecondary, borderRadius: borderRadius.md, fontSize: typography.sizes.sm, fontWeight: typography.weights.medium }}>{problem.difficulty}</span>
              </div>
              <h2 style={{ fontSize: typography.sizes['2xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[3] }}>{problem.title}</h2>
              <div>
                <div style={{ fontSize: typography.sizes.sm, color: colors.textSecondary, marginBottom: spacing[1] }}>Related Topics:</div>
                <div style={{ display: 'flex', gap: spacing[1], flexWrap: 'wrap' }}>
                  {problem.topics.map((topic) => (
                    <span key={topic} style={{ padding: `4px ${spacing[2]}`, background: colors.surface, color: colors.textPrimary, borderRadius: borderRadius.md, fontSize: typography.sizes.sm, border: `1px solid ${colors.border}` }}>{topic}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Next steps */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
        <h2 style={{ fontSize: typography.sizes['2xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[3] }}>What would you like to do?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: spacing[3] }}>
          {nextSteps.map((step, index) => (
            <motion.div key={step.title} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 + index * 0.1 }} whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }} whileTap={{ scale: 0.98 }}>
              <Card hoverable padding={4} onClick={() => navigate(step.path)} style={{ cursor: 'pointer', transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden' }}>
                <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${step.color}, transparent)`, opacity: 0.6 }} />
                <div style={{ width: 56, height: 56, borderRadius: borderRadius.lg, background: `${step.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: step.color, marginBottom: spacing[3] }}>
                  {step.icon}
                </div>
                <h3 style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[1] }}>{step.title}</h3>
                <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary, marginBottom: spacing[3] }}>{step.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: spacing[1], color: step.color, fontSize: typography.sizes.sm, fontWeight: typography.weights.medium }}>
                  Continue <ArrowRight size={14} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }} style={{ marginTop: spacing[5], textAlign: 'center' }}>
        <Button size="lg" onClick={() => navigate('/solve/discuss')} style={{ display: 'inline-flex', alignItems: 'center', gap: spacing[2], boxShadow: `0 4px 28px ${colors.accent}30` }}>
          Start Learning <ArrowRight size={20} />
        </Button>
      </motion.div>
    </motion.div>
  )
}
