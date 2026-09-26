import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Lightbulb, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { spacing, typography, borderRadius } from '@/styles/tokens'

interface Message { id: string; role: 'tutor' | 'student'; content: string; timestamp: Date }

const tutorResponses = [
  "Great question! Let's break this down. The key insight is that we're looking for two numbers that multiply to 6 and add to -5.",
  "Exactly! Those numbers are -2 and -3. So we can write: x² - 5x + 6 = (x-2)(x-3)",
  "Perfect! Setting each factor to zero gives us x = 2 or x = 3. These are our solutions! 🎉",
  "You're doing amazing! Want to try another problem to practice this concept?",
]

export const Discuss: React.FC = () => {
  const { colors } = useTheme()
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'tutor', content: "Hi! I'm here to help you solve x² - 5x + 6 = 0. Let's break this down step by step. First, can you identify what type of equation this is?", timestamp: new Date() },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const responseIndex = useRef(0)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return
    const newMsg: Message = { id: Date.now().toString(), role: 'student', content: inputValue, timestamp: new Date() }
    setMessages((prev) => [...prev, newMsg])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const response: Message = { id: (Date.now() + 1).toString(), role: 'tutor', content: tutorResponses[responseIndex.current % tutorResponses.length], timestamp: new Date() }
      responseIndex.current++
      setIsTyping(false)
      setMessages((prev) => [...prev, response])
    }, 1200)
  }

  const hints = ['Try factoring the equation', 'Use the quadratic formula', 'Complete the square']

  return (
    <div style={{ display: 'flex', height: '100%', gap: spacing[4], padding: spacing[4], position: 'relative', zIndex: 1 }}>
      {/* Chat */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Card padding={0} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: `0 4px 24px ${colors.shadow}` }}>
          {/* Header */}
          <div style={{ padding: `${spacing[3]} ${spacing[4]}`, borderBottom: `1px solid ${colors.border}`, background: colors.surface, display: 'flex', alignItems: 'center', gap: spacing[3] }}>
            <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity }} style={{ fontSize: 28 }}>🤖</motion.div>
            <div>
              <h2 style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>AI Tutor</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing[1], fontSize: typography.sizes.sm, color: colors.success }}>
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 8, height: 8, borderRadius: '50%', background: colors.success, display: 'inline-block' }} />
                Online
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: spacing[4], display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 16, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: i * 0.05, type: 'spring', stiffness: 200 }} style={{ display: 'flex', justifyContent: msg.role === 'student' ? 'flex-end' : 'flex-start' }}>
                  {msg.role === 'tutor' && (
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentHover})`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: spacing[2], flexShrink: 0, fontSize: 14 }}>💡</div>
                  )}
                  <div style={{ maxWidth: '75%', padding: `${spacing[2]} ${spacing[3]}`, borderRadius: msg.role === 'student' ? `${borderRadius.lg} ${borderRadius.lg} 4px ${borderRadius.lg}` : `${borderRadius.lg} ${borderRadius.lg} ${borderRadius.lg} 4px`, background: msg.role === 'tutor' ? colors.surface : `linear-gradient(135deg, ${colors.accent}, ${colors.accentHover})`, color: msg.role === 'tutor' ? colors.textPrimary : '#FFFFFF', border: msg.role === 'tutor' ? `1px solid ${colors.border}` : 'none', boxShadow: msg.role === 'student' ? `0 2px 12px ${colors.accent}20` : 'none' }}>
                    {msg.role === 'tutor' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: spacing[1], marginBottom: spacing[1], fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.accent }}>
                        <Lightbulb size={14} /> AI Tutor
                      </div>
                    )}
                    <p style={{ fontSize: typography.sizes.base, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                    {msg.role === 'tutor' && (
                      <div style={{ display: 'flex', gap: spacing[2], marginTop: spacing[2] }}>
                        <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} style={{ background: 'transparent', border: 'none', color: colors.textMuted, cursor: 'pointer', padding: 4 }}><ThumbsUp size={15} /></motion.button>
                        <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} style={{ background: 'transparent', border: 'none', color: colors.textMuted, cursor: 'pointer', padding: 4 }}><ThumbsDown size={15} /></motion.button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentHover})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>💡</div>
                <div style={{ padding: `${spacing[2]} ${spacing[3]}`, borderRadius: `${borderRadius.lg} ${borderRadius.lg} ${borderRadius.lg} 4px`, background: colors.surface, border: `1px solid ${colors.border}`, display: 'flex', gap: spacing[1], alignItems: 'center' }}>
                  {[0, 1, 2].map((i) => (
                    <motion.div key={i} animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }} style={{ width: 8, height: 8, borderRadius: '50%', background: colors.accent, opacity: 0.6 }} />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: spacing[3], borderTop: `1px solid ${colors.border}`, background: colors.surface }}>
            <div style={{ display: 'flex', gap: spacing[2] }}>
              <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Type your answer or question..." fullWidth />
              <Button onClick={handleSend} style={{ flexShrink: 0, padding: `0 ${spacing[3]}` }}><Send size={20} /></Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Sidebar */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} style={{ width: 300, display: 'flex', flexDirection: 'column', gap: spacing[3], flexShrink: 0 }}>
        <Card padding={3}>
          <h3 style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[2], display: 'flex', alignItems: 'center', gap: spacing[1] }}><Sparkles size={14} color={colors.accent} /> Problem</h3>
          <p style={{ fontSize: typography.sizes.base, color: colors.textSecondary, padding: spacing[2], background: colors.surface, borderRadius: borderRadius.md, textAlign: 'center', fontFamily: 'monospace', fontWeight: 500 }}>x² - 5x + 6 = 0</p>
        </Card>
        <Card padding={3}>
          <h3 style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[2] }}>💡 Hints</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
            {hints.map((hint, i) => (
              <motion.button key={i} whileHover={{ scale: 1.02, x: 4 }} whileTap={{ scale: 0.98 }} style={{ padding: spacing[2], background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: borderRadius.md, color: colors.textPrimary, fontSize: typography.sizes.sm, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.accent; e.currentTarget.style.background = colors.accentLight }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.background = colors.surface }}
              >{hint}</motion.button>
            ))}
          </div>
        </Card>
        <Card padding={3}>
          <h3 style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[2] }}>📊 Progress</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing[2] }}>
            <span style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>Understanding</span>
            <span style={{ fontSize: typography.sizes.sm, color: colors.accent, fontWeight: typography.weights.semibold }}>75%</span>
          </div>
          <div style={{ height: 8, background: colors.surface, borderRadius: borderRadius.full, overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: '75%' }} transition={{ duration: 1.2, ease: 'easeOut' }} style={{ height: '100%', background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentHover})`, borderRadius: borderRadius.full }} />
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
