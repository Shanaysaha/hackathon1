import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Loader2, Brain, CheckCircle, Sparkles } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { spacing, typography, borderRadius } from '@/styles/tokens'
import { Particles } from '@/components/ui/Particles'

const steps = [
  { label: 'Uploading image', duration: 600 },
  { label: 'Extracting text', duration: 800 },
  { label: 'Analyzing problem', duration: 900 },
  { label: 'Generating solution', duration: 700 },
]

export const Analyzing: React.FC = () => {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const [progress, setProgress] = React.useState(0)
  const [activeStep, setActiveStep] = React.useState(0)

  useEffect(() => {
    const total = steps.reduce((a, s) => a + s.duration, 0)
    let elapsed = 0
    const interval = setInterval(() => {
      elapsed += 50
      setProgress(Math.min((elapsed / total) * 100, 100))
      const newActive = steps.findIndex((s) => elapsed < steps.slice(0, s.label === s.label ? steps.indexOf(s) + 1 : 0).reduce((a, x) => a + x.duration, 0))
      if (newActive !== -1 && newActive !== activeStep) setActiveStep(newActive)
    }, 50)
    const timer = setTimeout(() => navigate('/solve/understanding'), total + 300)
    return () => { clearInterval(interval); clearTimeout(timer) }
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ padding: spacing[4], display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 1, gap: spacing[6] }}>
      <Particles />
      <motion.div animate={{ scale: [1, 1.08, 1], rotate: [0, 8, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} style={{ width: 120, height: 120, borderRadius: '50%', background: `linear-gradient(135deg, ${colors.accent}, #FF8A5B)`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 20px 60px ${colors.accent}35, 0 0 0 20px ${colors.accent}10, 0 0 0 40px ${colors.accent}08` }}>
        <Brain size={56} color="#FFFFFF" />
      </motion.div>

      <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <h1 style={{ fontSize: typography.sizes['3xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[2], textAlign: 'center' }}>Analyzing Your Problem</h1>
        <p style={{ fontSize: typography.sizes.base, color: colors.textSecondary, textAlign: 'center' }}>Our AI is working hard to understand your question</p>
      </motion.div>

      <div style={{ width: '100%', maxWidth: 560 }}>
        {steps.map((step, i) => (
          <motion.div key={step.label} initial={{ x: -40, opacity: 0 }} animate={{ x: i <= activeStep ? 0 : 0, opacity: i <= activeStep ? 1 : 0.4 }} transition={{ delay: i * 0.15 }} style={{ display: 'flex', alignItems: 'center', gap: spacing[3], padding: `${spacing[2]} ${spacing[3]}`, marginBottom: spacing[2], background: i <= activeStep ? colors.surface : 'transparent', borderRadius: borderRadius.md, border: `1px solid ${i === activeStep ? colors.accent + '40' : colors.border}` }}>
            {i < activeStep ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                <CheckCircle size={22} color={colors.success} />
              </motion.div>
            ) : i === activeStep ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                <Loader2 size={22} color={colors.accent} />
              </motion.div>
            ) : (
              <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: colors.textMuted }} /></div>
            )}
            <span style={{ fontSize: typography.sizes.base, color: i <= activeStep ? colors.textPrimary : colors.textMuted, fontWeight: i === activeStep ? typography.weights.semibold : typography.weights.normal }}>
              {step.label}
            </span>
            {i < activeStep && <Sparkles size={16} color={colors.success} />}
          </motion.div>
        ))}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ marginTop: spacing[4] }}>
          <div style={{ height: 6, background: colors.surface, borderRadius: '99px', overflow: 'hidden' }}>
            <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.1 }} style={{ height: '100%', background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentHover})`, borderRadius: '99px' }} />
          </div>
          <div style={{ textAlign: 'center', marginTop: spacing[2], fontSize: typography.sizes.sm, color: colors.textMuted }}>{Math.round(progress)}% complete</div>
        </motion.div>
      </div>
    </motion.div>
  )
}
