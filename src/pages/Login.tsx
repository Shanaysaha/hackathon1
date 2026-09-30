import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, GraduationCap, Sparkles, ArrowRight } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/components/ui/Button'
import { spacing, typography, borderRadius } from '@/styles/tokens'
import { useAuthStore } from '@/state/authStore'
import { Particles } from '@/components/ui/Particles'

export const Login: React.FC = () => {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const isLoading = useAuthStore((state) => state.isLoading)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Please fill in all fields'); return }
    const success = await login(email, password)
    if (success) navigate('/home', { replace: true })
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    height: '50px',
    padding: focusedField === field ? `0 ${spacing[3]} 0 ${spacing[5]}` : `0 ${spacing[2]} 0 ${spacing[5]}`,
    background: colors.inputBg,
    border: `1.5px solid ${focusedField === field ? colors.accent : colors.border}`,
    borderRadius: borderRadius.lg,
    color: colors.textPrimary,
    fontSize: typography.sizes.base,
    outline: 'none',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: focusedField === field ? `0 0 0 4px ${colors.accentLight}, 0 2px 12px ${colors.shadow}` : 'none',
  })

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000000', position: 'relative', overflow: 'hidden', padding: spacing[4] }}>
      <Particles />

      {/* Floating orbs */}
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: '-10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${colors.accent}22, transparent 65%)`, filter: 'blur(60px)', pointerEvents: 'none' }} />
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }} style={{ position: 'absolute', bottom: '-15%', left: '-8%', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${colors.info}18, transparent 65%)`, filter: 'blur(80px)', pointerEvents: 'none' }} />
      <motion.div animate={{ x: [0, 50, 0], y: [0, -40, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3 }} style={{ position: 'absolute', top: '20%', left: '5%', width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${colors.success}15, transparent 70%)`, filter: 'blur(40px)', pointerEvents: 'none' }} />

      <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, cubicBezier: [0.16, 1, 0.3, 1] }} style={{ width: '100%', maxWidth: 480, position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ textAlign: 'center', marginBottom: spacing[5] }}>
          <motion.div whileHover={{ scale: 1.05, rotate: -5 }} whileTap={{ scale: 0.95 }} style={{ width: 76, height: 76, borderRadius: '20px', background: `linear-gradient(135deg, ${colors.accent}, #FF8A5B, ${colors.info})`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: spacing[3], boxShadow: `0 12px 40px ${colors.accent}30, 0 4px 16px ${colors.shadow}`, position: 'relative', overflow: 'hidden' }}>
            <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }} style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)' }} />
            <GraduationCap size={38} color="#FFFFFF" />
          </motion.div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: spacing[2] }}>
            <h1 style={{ fontSize: typography.sizes['3xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, letterSpacing: '-0.5px' }}>Doubt Solver</h1>
            <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity }}><Sparkles size={18} color={colors.accent} /></motion.div>
          </div>
          <p style={{ fontSize: typography.sizes.base, color: colors.textSecondary, marginTop: spacing[1] }}>Your AI-powered learning companion</p>
        </motion.div>

        {/* Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <div style={{ background: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: borderRadius.xl, padding: spacing[5], boxShadow: `0 24px 80px ${colors.shadow}, 0 0 0 1px ${colors.borderLight}`, backdropFilter: 'blur(12px)' }}>
            <h2 style={{ fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[1] }}>Welcome back</h2>
            <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary, marginBottom: spacing[4] }}>Sign in to continue your learning journey</p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: spacing[3] }}>
                <label style={{ display: 'block', fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.textPrimary, marginBottom: spacing[1] }}>Email</label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: spacing[2], top: '50%', transform: 'translateY(-50%)', color: focusedField === 'email' ? colors.accent : colors.textMuted, transition: 'color 0.2s ease', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}><Mail size={16} /></div>
                  <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} style={inputStyle('email')} />
                </div>
              </div>
              <div style={{ marginBottom: spacing[4] }}>
                <label style={{ display: 'block', fontSize: typography.sizes.sm, fontWeight: typography.weights.medium, color: colors.textPrimary, marginBottom: spacing[1] }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: spacing[2], top: '50%', transform: 'translateY(-50%)', color: focusedField === 'password' ? colors.accent : colors.textMuted, transition: 'color 0.2s ease', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}><Lock size={16} /></div>
                  <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField(null)} style={{ ...inputStyle('password'), paddingRight: spacing[5] }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: spacing[2], top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: focusedField === 'password' ? colors.accent : colors.textMuted, padding: spacing[1], display: 'flex', alignItems: 'center', borderRadius: borderRadius.sm, transition: 'color 0.2s ease' }}>
                    <AnimatePresence mode="wait">
                      <motion.div key={showPassword ? 'off' : 'on'} initial={{ opacity: 0, y: -6, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.8 }} transition={{ duration: 0.15 }}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</motion.div>
                    </AnimatePresence>
                  </button>
                </div>
              </div>
              <AnimatePresence>
                {error && (
                  <motion.p initial={{ opacity: 0, height: 0, y: -6 }} animate={{ opacity: 1, height: 'auto', y: 0 }} exit={{ opacity: 0, height: 0, y: -6 }} style={{ fontSize: typography.sizes.sm, color: colors.error, marginBottom: spacing[3], display: 'flex', alignItems: 'center', gap: spacing[1] }}>
                    <span style={{ display: 'inline-block', width: 4, height: 4, borderRadius: '50%', background: colors.error }} />{error}
                  </motion.p>
                )}
              </AnimatePresence>
              <motion.div whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }} transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
                <Button type="submit" fullWidth size="lg" disabled={isLoading} style={{ height: '52px', fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, borderRadius: borderRadius.lg, boxShadow: `0 4px 24px ${colors.accent}30` }}>
                  {isLoading ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>Signing in…</motion.div> : 'Sign In'}
                </Button>
              </motion.div>
            </form>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ display: 'flex', alignItems: 'center', gap: spacing[3], margin: `${spacing[4]} 0` }}>
              <div style={{ flex: 1, height: 1, background: colors.border, borderRadius: '99px' }} />
              <span style={{ fontSize: typography.sizes.sm, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>or</span>
              <div style={{ flex: 1, height: 1, background: colors.border, borderRadius: '99px' }} />
            </motion.div>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Button variant="outline" fullWidth size="lg" onClick={() => { login('guest@doubtsolver.app', 'guest'); navigate('/home', { replace: true }) }} disabled={isLoading} style={{ height: '48px', borderRadius: borderRadius.lg }}>
                Continue as Guest <ArrowRight size={18} />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ textAlign: 'center', marginTop: spacing[4], fontSize: typography.sizes.sm, color: colors.textMuted }}>
          By continuing, you agree to our{' '}<a href="#" style={{ color: colors.accent, fontWeight: 500, textDecoration: 'none' }}>Terms</a>{' '}and{' '}<a href="#" style={{ color: colors.accent, fontWeight: 500, textDecoration: 'none' }}>Privacy Policy</a>
        </motion.p>
      </motion.div>
    </div>
  )
}
