import React from 'react'
import { motion } from 'framer-motion'
import { Clock, CheckCircle, TrendingUp } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { spacing, typography, borderRadius } from '@/styles/tokens'
import { Particles } from '@/components/ui/Particles'

const historyItems = [
  { id: '1', title: 'Quadratic Equations Problem', subject: 'Mathematics', date: '2 hours ago', status: 'completed', score: 85 },
  { id: '2', title: 'Photosynthesis Explanation', subject: 'Biology', date: 'Yesterday', status: 'completed', score: 92 },
  { id: '3', title: "Newton's Laws of Motion", subject: 'Physics', date: '2 days ago', status: 'completed', score: 78 },
  { id: '4', title: 'Chemical Bonding', subject: 'Chemistry', date: '3 days ago', status: 'in-progress' },
  { id: '5', title: 'Shakespeare Analysis', subject: 'Literature', date: '1 week ago', status: 'completed', score: 88 },
]

export const History: React.FC = () => {
  const { colors } = useTheme()

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ padding: spacing[4], position: 'relative', zIndex: 1, maxWidth: '100%', width: '100%' }}>
      <Particles />

      <motion.div initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
        <h1 style={{ fontSize: typography.sizes['4xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[1], letterSpacing: '-0.5px' }}>Learning History</h1>
        <p style={{ fontSize: typography.sizes.base, color: colors.textSecondary }}>Track your progress and revisit past problems</p>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: spacing[3], marginBottom: spacing[5] }}>
        {[
          { icon: <CheckCircle size={22} />, label: 'Completed', value: '24', color: colors.success, bg: `${colors.success}15` },
          { icon: <Clock size={22} />, label: 'In Progress', value: '3', color: colors.warning, bg: `${colors.warning}15` },
          { icon: <TrendingUp size={22} />, label: 'Avg Score', value: '85%', color: colors.info, bg: `${colors.info}15` },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 150 }} whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }}>
            <Card padding={4} style={{ textAlign: 'center' }}>
              <div style={{ width: 48, height: 48, borderRadius: borderRadius.lg, background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color, margin: '0 auto spacing[2]' }}>{stat.icon}</div>
              <div style={{ fontSize: typography.sizes['3xl'], fontWeight: typography.weights.bold, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
        {historyItems.map((item, i) => (
          <motion.div key={item.id} initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.35 + i * 0.08, type: 'spring', stiffness: 100 }} whileHover={{ x: 4, transition: { duration: 0.2 } }}>
            <Card hoverable padding={4}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: spacing[2], alignItems: 'center', marginBottom: spacing[1], flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>{item.title}</h3>
                    <Badge variant={item.status === 'completed' ? 'success' : 'warning'}>{item.status === 'completed' ? 'Completed' : 'In Progress'}</Badge>
                    <Badge variant="default">{item.subject}</Badge>
                  </div>
                  <span style={{ fontSize: typography.sizes.sm, color: colors.textMuted, display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {item.date}</span>
                </div>
                {item.score != null && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.08, type: 'spring' }} style={{ textAlign: 'right', minWidth: 60 }}>
                    <div style={{ fontSize: typography.sizes['2xl'], fontWeight: typography.weights.bold, color: item.score >= 80 ? colors.success : item.score >= 60 ? colors.warning : colors.error, lineHeight: 1 }}>{item.score}%</div>
                    <div style={{ fontSize: typography.sizes.xs, color: colors.textMuted }}>Score</div>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
