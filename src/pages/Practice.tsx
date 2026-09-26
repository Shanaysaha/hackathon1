import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle, ArrowRight, Trophy, Star, Zap } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { spacing, typography, borderRadius } from '@/styles/tokens'
import { Particles } from '@/components/ui/Particles'

interface Question { id: string; question: string; options: string[]; correctAnswer: number }

const questions: Question[] = [
  { id: '1', question: 'What are the solutions to x² - 5x + 6 = 0?', options: ['x = 2, x = 3', 'x = -2, x = -3', 'x = 1, x = 6', 'x = -1, x = -6'], correctAnswer: 0 },
  { id: '2', question: 'Which method did we use to solve this equation?', options: ['Quadratic Formula', 'Factorization', 'Completing the Square', 'Graphing'], correctAnswer: 1 },
  { id: '3', question: 'What is the discriminant of this equation?', options: ['1', '25', '49', '0'], correctAnswer: 0 },
]

export const Practice: React.FC = () => {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    setShowResult(true)
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
      const newStreak = streak + 1
      setStreak(newStreak)
      setBestStreak(Math.max(bestStreak, newStreak))
    } else {
      setStreak(0)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      navigate('/solve/review')
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ padding: spacing[4], display: 'flex', flexDirection: 'column', gap: spacing[5], position: 'relative', zIndex: 1, width: '100%' }}>
      <Particles />

      {/* Header */}
      <motion.div initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing[3] }}>
          <div>
            <h1 style={{ fontSize: typography.sizes['3xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, letterSpacing: '-0.5px' }}>Practice Questions</h1>
            <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>Test your understanding</p>
          </div>
          <div style={{ display: 'flex', gap: spacing[3] }}>
            {streak >= 2 && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: `${colors.warning}18`, borderRadius: borderRadius.full, border: `1px solid ${colors.warning}30` }}>
                <Zap size={16} color={colors.warning} />
                <span style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.warning }}>{streak} streak</span>
              </motion.div>
            )}
            <div style={{ padding: '6px 16px', background: colors.surface, borderRadius: borderRadius.full, border: `1px solid ${colors.border}`, fontSize: typography.sizes.sm, color: colors.textSecondary }}>
              <span style={{ color: colors.textPrimary, fontWeight: typography.weights.semibold }}>{currentQuestion + 1}</span> / {questions.length}
            </div>
          </div>
        </div>
        <div style={{ height: 8, background: colors.surface, borderRadius: borderRadius.full, overflow: 'hidden', border: `1px solid ${colors.border}` }}>
          <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.5, type: 'spring' }} style={{ height: '100%', background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentHover})`, borderRadius: borderRadius.full }} />
        </div>
      </motion.div>

      {/* Question */}
      <motion.div key={currentQuestion} initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -60, opacity: 0 }} transition={{ type: 'spring', stiffness: 100, damping: 20 }}>
        <Card padding={5} style={{ boxShadow: `0 8px 40px ${colors.shadow}, 0 0 0 1px ${colors.borderLight}`, maxWidth: 900, margin: '0 auto', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[3] }}>
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} style={{ fontSize: 24 }}>❓</motion.div>
            <span style={{ fontSize: typography.sizes.sm, color: colors.textMuted, fontWeight: typography.weights.medium }}>Question {currentQuestion + 1}</span>
          </div>
          <h2 style={{ fontSize: typography.sizes['2xl'], fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[4], lineHeight: 1.4 }}>{questions[currentQuestion].question}</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
            {questions[currentQuestion].options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === questions[currentQuestion].correctAnswer
              const showCorrect = showResult && isCorrect
              const showWrong = showResult && isSelected && !isCorrect

              return (
                <motion.button key={index} whileHover={!showResult ? { scale: 1.015, x: 6 } : {}} whileTap={!showResult ? { scale: 0.985 } : {}} onClick={() => !showResult && handleAnswer(index)} disabled={showResult}
                  style={{ padding: `${spacing[3]} ${spacing[4]}`, borderRadius: borderRadius.lg, border: `2px solid ${showCorrect ? colors.success : showWrong ? colors.error : isSelected ? colors.accent : colors.border}`, background: showCorrect ? `${colors.success}15` : showWrong ? `${colors.error}15` : isSelected ? colors.accentLight : colors.surface, color: colors.textPrimary, fontSize: typography.sizes.base, textAlign: 'left', cursor: showResult ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.25s ease', minWidth: 0 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3], minWidth: 0 }}>
                    <span style={{ width: 28, height: 28, borderRadius: borderRadius.md, background: showCorrect ? colors.success : showWrong ? colors.error : isSelected ? colors.accent : colors.border, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: '#fff', flexShrink: 0, transition: 'all 0.2s ease' }}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{option}</span>
                  </div>
                  {showCorrect && <CheckCircle size={22} color={colors.success} />}
                  {showWrong && <XCircle size={22} color={colors.error} />}
                </motion.button>
              )
            })}
          </div>

          {showResult && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 200 }} style={{ marginTop: spacing[4] }}>
              <div style={{ padding: spacing[3], borderRadius: borderRadius.lg, background: isCorrect ? `${colors.success}12` : `${colors.error}12`, border: `1px solid ${isCorrect ? colors.success : colors.error}30`, marginBottom: spacing[3], display: 'flex', alignItems: 'center', gap: spacing[2] }}>
                <motion.div animate={isCorrect ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.4 }}>
                  {isCorrect ? <CheckCircle size={24} color={colors.success} /> : <XCircle size={24} color={colors.error} />}
                </motion.div>
                <p style={{ fontSize: typography.sizes.base, color: colors.textPrimary, fontWeight: typography.weights.medium }}>
                  {isCorrect ? 'Correct! Excellent work! 🎉' : `Not quite. The correct answer is: ${questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}`}
                </p>
              </div>
              <Button fullWidth size="lg" onClick={handleNext} style={{ boxShadow: `0 4px 20px ${colors.accent}25` }}>
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'} <ArrowRight size={20} />
              </Button>
            </motion.div>
          )}
        </Card>
      </motion.div>

      {/* Score bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ display: 'flex', justifyContent: 'center', gap: spacing[5] }}>
        {[
          { label: 'Score', value: `${score}/${currentQuestion + (showResult ? 1 : 0)}`, icon: <Trophy size={16} />, color: colors.accent },
          { label: 'Streak', value: `${bestStreak}`, icon: <Star size={16} />, color: colors.warning },
          { label: 'Accuracy', value: currentQuestion > 0 ? `${Math.round((score / currentQuestion) * 100)}%` : '—', icon: <Zap size={16} />, color: colors.success },
        ].map((stat) => (
          <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: spacing[2], padding: `${spacing[2]} ${spacing[3]}`, background: colors.surface, borderRadius: borderRadius.lg, border: `1px solid ${colors.border}` }}>
            <span style={{ color: stat.color }}>{stat.icon}</span>
            <div>
              <div style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: typography.sizes.xs, color: colors.textMuted }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}
