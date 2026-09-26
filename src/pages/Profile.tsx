import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Calendar, Award, TrendingUp, Edit, MapPin } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { spacing, typography, borderRadius } from '@/styles/tokens'
import { Particles } from '@/components/ui/Particles'
import { useAuthStore } from '@/state/authStore'

const achievements = [
  { title: 'Early Bird', description: 'Solved 5 problems in a week', icon: '🐦', earned: true },
  { title: 'Math Wizard', description: 'Completed 10 math problems', icon: '🧙‍♂️', earned: true },
  { title: 'Quick Learner', description: 'Scored 90%+ five times', icon: '⚡', earned: true },
  { title: 'Consistent', description: '7-day learning streak', icon: '🔥', earned: true },
  { title: 'Explorer', description: 'Try 5 different subjects', icon: '🗺️', earned: false },
  { title: 'Master', description: 'Complete all topics in a subject', icon: '👑', earned: false },
]

const recentActivity = [
  { title: 'Completed Quadratic Equations', time: '2 hours ago', type: 'completion' as const },
  { title: 'Started Trigonometry', time: 'Yesterday', type: 'start' as const },
  { title: 'Earned "Math Wizard" badge', time: '2 days ago', type: 'achievement' as const },
]

export const Profile: React.FC = () => {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)

  const userStats = [
    { label: 'Problems Solved', value: '24', icon: <TrendingUp size={20} />, color: colors.accent },
    { label: 'Learning Streak', value: '7 days', icon: <Calendar size={20} />, color: colors.success },
    { label: 'Achievements', value: '4', icon: <Award size={20} />, color: colors.warning },
    { label: 'Study Time', value: '48 hrs', icon: <Calendar size={20} />, color: colors.info },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ padding: spacing[4], position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', width: '100%' }}>
      <Particles />

      {/* Profile header */}
      <motion.div initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
        <Card padding={5}>
          <div style={{ display: 'flex', gap: spacing[4], alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <motion.div whileHover={{ scale: 1.05, rotate: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Avatar name={user?.name || 'Student User'} size="xl" />
            </motion.div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing[2], flexWrap: 'wrap', gap: spacing[2] }}>
                <div>
                  <h1 style={{ fontSize: typography.sizes['3xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[1] }}>{user?.name || 'Student User'}</h1>
                  <p style={{ fontSize: typography.sizes.base, color: colors.textSecondary, marginBottom: spacing[2] }}>{user?.email || 'student@email.com'}</p>
                  <div style={{ display: 'flex', gap: spacing[2], flexWrap: 'wrap' }}>
                    <Badge variant="accent">Level 5</Badge>
                    <Badge>Mathematics</Badge>
                    <Badge>Science</Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm"><Edit size={16} /> Edit Profile</Button>
              </div>
              <p style={{ fontSize: typography.sizes.base, color: colors.textSecondary }}>🎓 High school student passionate about learning | 📚 Focusing on STEM subjects</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: spacing[3], marginBottom: spacing[5] }}>
        {userStats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 150 }} whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }}>
            <Card padding={4}>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
                <div style={{ width: 44, height: 44, borderRadius: borderRadius.lg, background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color, flexShrink: 0 }}>{stat.icon}</div>
                <div>
                  <div style={{ fontSize: typography.sizes['2xl'], fontWeight: typography.weights.bold, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>{stat.label}</div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: spacing[4] }}>
        {/* Achievements */}
        <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }}>
          <h2 style={{ fontSize: typography.sizes['2xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[3], display: 'flex', alignItems: 'center', gap: spacing[2] }}><Award size={22} color={colors.accent} /> Achievements</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: spacing[3] }}>
            {achievements.map((a, i) => (
              <motion.div key={a.title} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 + i * 0.06 }} whileHover={a.earned ? { y: -4 } : {}}>
                <Card padding={3} style={{ opacity: a.earned ? 1 : 0.45, transition: 'opacity 0.3s ease' }}>
                  <div style={{ fontSize: '36px', marginBottom: spacing[2], filter: a.earned ? 'none' : 'grayscale(1)' }}>{a.icon}</div>
                  <h3 style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: 4 }}>{a.title}</h3>
                  <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>{a.description}</p>
                  {a.earned && <div style={{ marginTop: spacing[2], fontSize: typography.sizes.xs, color: colors.success, fontWeight: typography.weights.medium }}>✓ Earned</div>}
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.45 }}>
          <h2 style={{ fontSize: typography.sizes['2xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[3] }}>Recent Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2], marginBottom: spacing[3] }}>
            {recentActivity.map((activity, i) => (
              <motion.div key={i} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 + i * 0.1 }}>
                <Card padding={3}>
                  <div style={{ fontSize: typography.sizes.base, color: colors.textPrimary, fontWeight: typography.weights.medium, marginBottom: 4 }}>{activity.title}</div>
                  <div style={{ fontSize: typography.sizes.sm, color: colors.textMuted, display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={12} /> {activity.time}</div>
                </Card>
              </motion.div>
            ))}
          </div>
          <Button fullWidth variant="outline" size="lg" onClick={() => navigate('/profile/learning-journey')}><MapPin size={18} /> View Learning Journey</Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
