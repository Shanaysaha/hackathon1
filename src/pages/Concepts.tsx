import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, CheckCircle, Lock } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'
import { spacing, typography, borderRadius } from '@/styles/tokens'
import { Particles } from '@/components/ui/Particles'

const concepts = [
  { id: '1', title: 'Quadratic Equations', category: 'Algebra', progress: 85, topicsCount: 12, completedTopics: 10, color: '#FF6B35', icon: '📐', status: 'in-progress' as const },
  { id: '2', title: 'Trigonometry', category: 'Mathematics', progress: 60, topicsCount: 15, completedTopics: 9, color: '#3B82F6', icon: '📊', status: 'in-progress' },
  { id: '3', title: 'Chemical Reactions', category: 'Chemistry', progress: 100, topicsCount: 8, completedTopics: 8, color: '#10B981', icon: '🧪', status: 'completed' },
  { id: '4', title: "Newton's Laws", category: 'Physics', progress: 45, topicsCount: 10, completedTopics: 4, color: '#F59E0B', icon: '⚡', status: 'in-progress' },
  { id: '5', title: 'Cell Biology', category: 'Biology', progress: 0, topicsCount: 20, completedTopics: 0, color: '#6B7280', icon: '🔬', status: 'locked' },
  { id: '6', title: 'Literary Analysis', category: 'Literature', progress: 30, topicsCount: 12, completedTopics: 3, color: '#8B5CF6', icon: '📚', status: 'in-progress' },
]

export const Concepts: React.FC = () => {
  const { colors } = useTheme()
  const categories = Array.from(new Set(concepts.map(c => c.category)))

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ padding: spacing[3], position: 'relative', zIndex: 1, width: '100%' }}>
      <Particles />

      <motion.div initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
        <h1 style={{ fontSize: typography.sizes['4xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[1], letterSpacing: '-0.5px' }}>Concepts Library</h1>
        <p style={{ fontSize: typography.sizes.base, color: colors.textSecondary }}>Master key concepts across all subjects</p>
      </motion.div>

      {/* Categories */}
      <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} style={{ display: 'flex', gap: spacing[2], marginBottom: spacing[4], flexWrap: 'wrap' }}>
        {['All', ...categories].map((cat, i) => (
          <motion.button key={cat} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ padding: `6px ${spacing[3]}`, background: i === 0 ? colors.accentLight : colors.surface, border: `1px solid ${i === 0 ? colors.accent + '40' : colors.border}`, borderRadius: borderRadius.full, color: i === 0 ? colors.accent : colors.textSecondary, fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, cursor: 'pointer' }}>{cat}</motion.button>
        ))}
      </motion.div>

      {/* Overall progress */}
      <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}>
        <Card padding={4} style={{ marginBottom: spacing[5] }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing[3], flexWrap: 'wrap', gap: spacing[2] }}>
            <div>
              <h2 style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>Overall Progress</h2>
              <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>You're making great progress! Keep learning.</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: typography.sizes['3xl'], fontWeight: typography.weights.bold, color: colors.accent }}>64%</div>
              <div style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>Complete</div>
            </div>
          </div>
          <ProgressBar progress={64} height="10px" />
        </Card>
      </motion.div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: spacing[3] }}>
        {concepts.map((concept, index) => (
          <motion.div key={concept.id} initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 + index * 0.08, type: 'spring', stiffness: 120 }} whileHover={concept.status !== 'locked' ? { y: -6, transition: { type: 'spring', stiffness: 300 } } : {}}>
            <Card hoverable={concept.status !== 'locked'} padding={4} style={{ position: 'relative', opacity: concept.status === 'locked' ? 0.55 : 1, overflow: 'hidden' }}>
              {/* Top accent line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: concept.status === 'locked' ? colors.border : `linear-gradient(90deg, ${concept.color}, transparent)`, opacity: concept.status !== 'locked' ? 0.7 : 0.3 }} />

              {/* Status icon */}
              <div style={{ position: 'absolute', top: spacing[3], right: spacing[3] }}>
                {concept.status === 'completed' && <div style={{ width: 30, height: 30, borderRadius: '50%', background: `${colors.success}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.success }}><CheckCircle size={18} /></div>}
                {concept.status === 'locked' && <div style={{ width: 30, height: 30, borderRadius: '50%', background: colors.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textMuted }}><Lock size={16} /></div>}
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing[3] }}>
                <div style={{ width: 56, height: 56, borderRadius: borderRadius.lg, background: `${concept.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>{concept.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: 4 }}>{concept.title}</h3>
                  <Badge variant="default">{concept.category}</Badge>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing[1] }}>
                    <span style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>{concept.completedTopics} / {concept.topicsCount} topics</span>
                    <span style={{ fontSize: typography.sizes.sm, color: concept.color, fontWeight: typography.weights.semibold }}>{concept.progress}%</span>
                  </div>
                  <ProgressBar progress={concept.progress} height="6px" />
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing[1], marginTop: spacing[2], color: concept.status === 'locked' ? colors.textMuted : concept.color, fontSize: typography.sizes.sm, fontWeight: typography.weights.medium }}>
                    {concept.status === 'locked' ? <><Lock size={14} /> Complete previous concepts</> : concept.status === 'completed' ? <><CheckCircle size={14} /> Review</> : <><BookOpen size={14} /> Continue Learning</>}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
