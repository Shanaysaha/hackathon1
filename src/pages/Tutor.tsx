import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle, Lightbulb, Sparkles, Trophy, RefreshCw, TrendingUp, ArrowLeft, HelpCircle, XCircle } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { spacing, typography, borderRadius } from '@/styles/tokens'

type TutorView = 'setup' | 'lesson' | 'summary'

interface LessonStep {
  id: string
  title: string
  subtitle: string
  definition: string
  formula?: string
  example?: string
  keyPoints: string[]
  checkQuestion?: {
    question: string
    options: string[]
    correctAnswer: number
  }
}

const lessonSteps: LessonStep[] = [
  {
    id: '1',
    title: 'Definition',
    subtitle: 'What is a quadratic equation?',
    definition: 'A quadratic equation is a polynomial equation of degree 2, which means the highest power of the variable is 2.',
    formula: 'ax² + bx + c = 0',
    example: '2x² - 4x + 3 = 0',
    keyPoints: [
      'Highest power of the variable is 2',
      'Can have 0, 1 or 2 real solutions',
      'Can be solved using methods like factorisation, completing the square or quadratic formula',
    ],
    checkQuestion: {
      question: 'Which of the following is a quadratic equation?',
      options: ['2x + 3 = 0', 'x² + 4x + 1 = 0', '3x³ - 5x + 1 = 0', '5x - 7 = 0'],
      correctAnswer: 1,
    },
  },
  {
    id: '2',
    title: 'Standard Form',
    subtitle: 'The standard form of a quadratic equation',
    definition: 'The standard form is ax² + bx + c = 0, where a, b, and c are constants, and a ≠ 0.',
    formula: 'ax² + bx + c = 0  (where a ≠ 0)',
    example: 'In 3x² + 2x - 5 = 0: a = 3, b = 2, c = -5',
    keyPoints: [
      'a is the coefficient of x²',
      'b is the coefficient of x',
      'c is the constant term',
      'a cannot be zero (otherwise it is not quadratic)',
    ],
  },
  {
    id: '3',
    title: 'Types of Solutions',
    subtitle: 'Understanding the discriminant',
    definition: 'The discriminant (b² - 4ac) determines the number and type of solutions a quadratic equation has.',
    formula: 'Discriminant = b² - 4ac',
    example: 'For x² - 5x + 6 = 0: D = 25 - 24 = 1 (> 0, so 2 real solutions)',
    keyPoints: [
      'D > 0: Two distinct real solutions',
      'D = 0: One repeated real solution',
      'D < 0: No real solutions (complex solutions)',
    ],
  },
  {
    id: '4',
    title: 'Methods to Solve',
    subtitle: 'Different ways to solve quadratic equations',
    definition: 'There are three main methods to solve quadratic equations: factorisation, completing the square, and using the quadratic formula.',
    formula: 'x = (-b ± √(b²-4ac)) / 2a',
    example: 'x² - 5x + 6 = 0 → (x-2)(x-3) = 0 → x = 2 or x = 3',
    keyPoints: [
      'Factorisation: Express as product of two binomials',
      'Completing the square: Convert to perfect square form',
      'Quadratic formula: Direct substitution into formula',
    ],
  },
  {
    id: '5',
    title: 'Real Life Examples',
    subtitle: 'Where do quadratic equations appear?',
    definition: 'Quadratic equations appear in many real-world situations including projectile motion, area calculations, and optimization problems.',
    example: 'A ball thrown upward follows a parabolic path: h(t) = -5t² + 20t',
    keyPoints: [
      'Projectile motion: height vs time follows a parabola',
      'Area problems: finding dimensions given area constraints',
      'Business: profit maximization often involves quadratics',
    ],
  },
]

export const Tutor: React.FC = () => {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const [view, setView] = useState<TutorView>('setup')
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedLevel, setSelectedLevel] = useState<string>('new')
  const [selectedFocus, setSelectedFocus] = useState<string>('concept')
  const [checkAnswer, setCheckAnswer] = useState<number | null>(null)
  const [showCheckResult, setShowCheckResult] = useState(false)
  const [understood, setUnderstood] = useState(false)

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } }
  const itemVariants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 18 } } }

  const startLesson = () => {
    setView('lesson')
    setCurrentStep(0)
    setUnderstood(false)
  }

  const handleCheckAnswer = (index: number) => {
    setCheckAnswer(index)
    setShowCheckResult(true)
  }

  const currentStepData = lessonSteps[currentStep]
  const progress = ((currentStep + 1) / lessonSteps.length) * 100

  // ── SETUP VIEW ──
  if (view === 'setup') {
    return (
      <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ padding: spacing[3], position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: spacing[5], width: '100%' }}>

        {/* Header */}
        <motion.div variants={itemVariants}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[2] }}>
            <Sparkles size={16} color={colors.accent} />
            <span style={{ fontSize: typography.sizes.sm, color: colors.accent, fontWeight: typography.weights.medium, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Tutor</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, type: 'spring', stiffness: 120 }} style={{ fontSize: typography.sizes['4xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[2], lineHeight: 1.15, letterSpacing: '-0.5px' }}>
            Let's personalize <span style={{ color: colors.accent }}>your lesson</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} style={{ fontSize: typography.sizes.lg, color: colors.textSecondary }}>
            This helps the tutor explain at the right level for you.
          </motion.p>
        </motion.div>

        {/* Topic card */}
        <motion.div variants={itemVariants}>
          <Card padding={4} style={{ display: 'flex', alignItems: 'center', gap: spacing[3], background: `linear-gradient(135deg, ${colors.surfaceElevated}, ${colors.surface})`, boxShadow: `0 4px 24px ${colors.shadow}, 0 0 0 1px ${colors.borderLight}` }}>
            <motion.div
              whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{ width: 56, height: 56, borderRadius: borderRadius.lg, background: `${colors.accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}
            >
              x²
            </motion.div>
            <div>
              <h3 style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>Quadratic Equations</h3>
              <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>Roots, factorisation, graphs and more</p>
            </div>
          </Card>
        </motion.div>

        {/* Personalization options */}
        <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
          {/* Question 1: Familiarity */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[3] }}>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: colors.accent,
                  color: '#fff',
                  fontSize: typography.sizes.sm,
                  fontWeight: typography.weights.bold,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                1
              </motion.div>
              <span style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>How familiar are you with this topic?</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: spacing[2] }}>
              {[
                { id: 'new', label: "I'm completely new", desc: 'Explain from the basics', icon: '🌱' },
                { id: 'basics', label: 'I know the basics', desc: 'Skip the basics and go deeper', icon: '📗' },
                { id: 'revision', label: 'I need a revision', desc: 'Quick recap and key points', icon: '🔄' },
              ].map((opt) => (
                <motion.div
                  key={opt.id}
                  whileHover={{ y: -3, transition: { type: 'spring', stiffness: 300 } }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedLevel(opt.id)}
                  style={{
                    padding: spacing[3],
                    borderRadius: borderRadius.lg,
                    border: `2px solid ${selectedLevel === opt.id ? colors.accent : colors.border}`,
                    background: selectedLevel === opt.id ? `${colors.accent}12` : colors.surface,
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ fontSize: '28px', marginBottom: spacing[1] }}>{opt.icon}</div>
                  <div style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>{opt.label}</div>
                  <div style={{ fontSize: typography.sizes.xs, color: colors.textMuted, marginTop: 4 }}>{opt.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Question 2: Focus */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[3] }}>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: colors.accent,
                  color: '#fff',
                  fontSize: typography.sizes.sm,
                  fontWeight: typography.weights.bold,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                2
              </motion.div>
              <span style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>What do you want to focus on?</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: spacing[2] }}>
              {[
                { id: 'concept', label: 'Understand the concept', desc: 'Clear explanations with examples', icon: '💡' },
                { id: 'solve', label: 'Learn how to solve', desc: 'Step-by-step problem solving', icon: '🔧' },
                { id: 'exam', label: 'Prepare for an exam', desc: 'Important questions and tips', icon: '📝' },
              ].map((opt) => (
                <motion.div
                  key={opt.id}
                  whileHover={{ y: -3, transition: { type: 'spring', stiffness: 300 } }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedFocus(opt.id)}
                  style={{
                    padding: spacing[3],
                    borderRadius: borderRadius.lg,
                    border: `2px solid ${selectedFocus === opt.id ? colors.accent : colors.border}`,
                    background: selectedFocus === opt.id ? `${colors.accent}12` : colors.surface,
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ fontSize: '28px', marginBottom: spacing[1] }}>{opt.icon}</div>
                  <div style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>{opt.label}</div>
                  <div style={{ fontSize: typography.sizes.xs, color: colors.textMuted, marginTop: 4 }}>{opt.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Question 3: Goal (optional) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[3] }}>
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: colors.surfaceElevated,
                border: `1px solid ${colors.border}`,
                color: colors.textMuted,
                fontSize: typography.sizes.sm,
                fontWeight: typography.weights.medium,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                3
              </div>
              <span style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>Set your goal <span style={{ color: colors.textMuted, fontWeight: typography.weights.normal }}>(optional)</span></span>
            </div>
            <input
              placeholder="e.g. Understand fundamentals, score well in test, complete chapter..."
              style={{
                width: '100%',
                padding: `${spacing[2]} ${spacing[3]}`,
                borderRadius: borderRadius.lg,
                border: `1px solid ${colors.border}`,
                background: colors.inputBg,
                color: colors.textPrimary,
                fontSize: typography.sizes.base,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </motion.div>

        {/* Start button */}
        <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <motion.div
            whileHover={{ scale: 1.03, boxShadow: `0 8px 32px ${colors.accent}35` }}
            whileTap={{ scale: 0.97 }}
          >
            <Button size="lg" onClick={startLesson} style={{ boxShadow: `0 4px 28px ${colors.accent}30`, minWidth: 180 }}>
              Start Learning <ArrowRight size={20} />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

  // ── LESSON VIEW ──
  if (view === 'lesson' && currentStepData) {
    const isLastStep = currentStep === lessonSteps.length - 1
    const isCheckStep = currentStepData.checkQuestion !== undefined

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} style={{ padding: spacing[3], display: 'flex', flexDirection: 'column', gap: spacing[4], position: 'relative', zIndex: 1, width: '100%' }}>

        {/* Top bar */}
        <motion.div initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button variant="primary" size="sm" onClick={() => setView('setup')} style={{ padding: `${spacing[1]} ${spacing[2]}`, gap: spacing[1], background: colors.accent, boxShadow: `0 2px 12px ${colors.accent}40` }}>
            <ArrowLeft size={16} /> Back to Tutor
          </Button>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
            <span style={{ fontSize: typography.sizes.sm, color: colors.textMuted }}>Concept {currentStep + 1} of {lessonSteps.length}</span>
          </div>
        </motion.div>

        {/* Progress bar */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} style={{ height: 6, background: colors.surface, borderRadius: borderRadius.full, overflow: 'hidden', border: `1px solid ${colors.border}` }}>
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            style={{ height: '100%', background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentHover})`, borderRadius: borderRadius.full }}
          />
        </motion.div>

        {/* Main content grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: spacing[4], alignItems: 'start' }}>
          {/* Left: Lesson content */}
          <motion.div
            key={currentStep}
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
            style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}
          >
            {/* Title */}
            <div>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} style={{ fontSize: typography.sizes.sm, color: colors.accent, fontWeight: typography.weights.medium }}>QUADRATIC EQUATIONS</motion.span>
              <h1 style={{ fontSize: typography.sizes['3xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginTop: spacing[1], lineHeight: 1.2, letterSpacing: '-0.5px' }}>
                What is a <span style={{ color: colors.accent }}>{currentStepData.title.toLowerCase()}?</span>
              </h1>
              <p style={{ fontSize: typography.sizes.base, color: colors.textSecondary, marginTop: spacing[2] }}>{currentStepData.subtitle}</p>
            </div>

            {/* Definition + Key Points */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[3] }}>
              {/* Definition card */}
              <Card padding={4} style={{ background: `linear-gradient(135deg, ${colors.surfaceElevated}, ${colors.surface})`, boxShadow: `0 4px 24px ${colors.shadow}, 0 0 0 1px ${colors.borderLight}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[3] }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${colors.accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.bold, color: colors.accent }}>{currentStep + 1}</span>
                  </div>
                  <h3 style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>Definition</h3>
                </div>
                <p style={{ fontSize: typography.sizes.base, color: colors.textSecondary, lineHeight: 1.7, marginBottom: spacing[3] }}>{currentStepData.definition}</p>
                {currentStepData.formula && (
                  <div style={{ padding: spacing[3], background: colors.surface, borderRadius: borderRadius.lg, border: `1px solid ${colors.border}`, fontFamily: 'monospace', fontSize: typography.sizes.lg, color: colors.accent, textAlign: 'center', marginBottom: spacing[3] }}>
                    {currentStepData.formula}
                  </div>
                )}
                {currentStepData.example && (
                  <div>
                    <div style={{ fontSize: typography.sizes.sm, color: colors.textMuted, marginBottom: spacing[1] }}>Example</div>
                    <div style={{ padding: spacing[2], background: colors.inputBg, borderRadius: borderRadius.md, border: `1px solid ${colors.border}`, fontSize: typography.sizes.base, color: colors.textPrimary }}>
                      {currentStepData.example}
                    </div>
                  </div>
                )}
              </Card>

              {/* Key Points card */}
              <Card padding={4} style={{ background: `linear-gradient(135deg, ${colors.surfaceElevated}, ${colors.surface})`, boxShadow: `0 4px 24px ${colors.shadow}, 0 0 0 1px ${colors.borderLight}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[3] }}>
                  <Lightbulb size={18} color={colors.warning} />
                  <h3 style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>Key Points</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
                  {currentStepData.keyPoints.map((point, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.08, type: 'spring', stiffness: 100 }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: spacing[2] }}
                    >
                      <CheckCircle size={16} color={colors.success} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: typography.sizes.sm, color: colors.textSecondary, lineHeight: 1.5 }}>{point}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Check / Understanding */}
            <AnimatePresence mode="wait">
              {isCheckStep && !showCheckResult ? (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                >
                  <Card padding={4} style={{ background: `linear-gradient(135deg, ${colors.surfaceElevated}, ${colors.surface})`, boxShadow: `0 4px 24px ${colors.shadow}, 0 0 0 1px ${colors.borderLight}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[3] }}>
                      <HelpCircle size={20} color={colors.accent} />
                      <h3 style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>Quick Check</h3>
                    </div>
                    <p style={{ fontSize: typography.sizes.base, color: colors.textSecondary, marginBottom: spacing[3] }}>{currentStepData.checkQuestion!.question}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[2] }}>
                      {currentStepData.checkQuestion!.options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCheckAnswer(i)}
                          style={{
                            padding: `${spacing[2]} ${spacing[3]}`,
                            borderRadius: borderRadius.lg,
                            border: `2px solid ${colors.border}`,
                            background: colors.surface,
                            color: colors.textPrimary,
                            fontSize: typography.sizes.sm,
                            cursor: 'pointer',
                            fontFamily: 'monospace',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ) : isCheckStep && showCheckResult ? (
                <motion.div
                  key="check-result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                >
                  <Card padding={4} style={{ background: checkAnswer === currentStepData.checkQuestion!.correctAnswer ? `${colors.success}12` : `${colors.error}12`, border: `1px solid ${checkAnswer === currentStepData.checkQuestion!.correctAnswer ? colors.success : colors.error}30` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[2] }}>
                      {checkAnswer === currentStepData.checkQuestion!.correctAnswer
                        ? <CheckCircle size={22} color={colors.success} />
                        : <XCircle size={22} color={colors.error} />
                      }
                      <span style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>
                        {checkAnswer === currentStepData.checkQuestion!.correctAnswer ? 'Correct! Well done! 🎉' : 'Not quite — keep learning!'}
                      </span>
                    </div>
                    <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>
                      {checkAnswer === currentStepData.checkQuestion!.correctAnswer
                        ? 'You understand this concept well!'
                        : `The correct answer is: ${currentStepData.checkQuestion!.options[currentStepData.checkQuestion!.correctAnswer]}`
                      }
                    </p>
                  </Card>
                </motion.div>
              ) : !isCheckStep && !understood ? (
                <motion.div
                  key="understand"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                >
                  <Card padding={4} style={{ background: `linear-gradient(135deg, ${colors.surfaceElevated}, ${colors.surface})`, boxShadow: `0 4px 24px ${colors.shadow}, 0 0 0 1px ${colors.borderLight}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[3] }}>
                      <Sparkles size={20} color={colors.accent} />
                      <h3 style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>Do you understand this concept?</h3>
                    </div>
                    <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary, marginBottom: spacing[3] }}>This helps me adjust the next explanation for you.</p>
                    <div style={{ display: 'flex', gap: spacing[2], flexWrap: 'wrap' }}>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setUnderstood(true)}
                        style={{
                          padding: `${spacing[2]} ${spacing[3]}`,
                          borderRadius: borderRadius.lg,
                          border: `2px solid ${colors.success}`,
                          background: `${colors.success}12`,
                          color: colors.success,
                          fontSize: typography.sizes.base,
                          fontWeight: typography.weights.semibold,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: spacing[1],
                        }}
                      >
                        <CheckCircle size={18} /> Yes, I understand
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          padding: `${spacing[2]} ${spacing[3]}`,
                          borderRadius: borderRadius.lg,
                          border: `1px solid ${colors.border}`,
                          background: colors.surface,
                          color: colors.textPrimary,
                          fontSize: typography.sizes.base,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: spacing[1],
                        }}
                      >
                        <RefreshCw size={18} /> Explain differently
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          padding: `${spacing[2]} ${spacing[3]}`,
                          borderRadius: borderRadius.lg,
                          border: `1px solid ${colors.border}`,
                          background: colors.surface,
                          color: colors.textPrimary,
                          fontSize: typography.sizes.base,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: spacing[1],
                        }}
                      >
                        <Lightbulb size={18} /> Show another example
                      </motion.button>
                    </div>
                  </Card>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Next button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: understood || isCheckStep ? 1 : 0 }}
              transition={{ delay: 0.3 }}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Button
                size="lg"
                onClick={() => {
                  if (isLastStep) {
                    setView('summary')
                  } else {
                    setCurrentStep(currentStep + 1)
                    setUnderstood(false)
                    setShowCheckResult(false)
                    setCheckAnswer(null)
                  }
                }}
                style={{ boxShadow: `0 4px 28px ${colors.accent}30` }}
                disabled={!understood && !showCheckResult}
              >
                {isLastStep ? 'Finish Lesson' : 'Next Concept'} <ArrowRight size={20} />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Sidebar */}
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
            {/* Progress sidebar */}
            <Card padding={4} style={{ background: `linear-gradient(135deg, ${colors.surfaceElevated}, ${colors.surface})`, boxShadow: `0 4px 24px ${colors.shadow}, 0 0 0 1px ${colors.borderLight}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing[3] }}>
                <h3 style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>Lesson Progress</h3>
                <span style={{ fontSize: typography.sizes.sm, color: colors.textMuted }}>{currentStep + 1} of {lessonSteps.length}</span>
              </div>
              <div style={{ height: 6, background: colors.surface, borderRadius: borderRadius.full, overflow: 'hidden', marginBottom: spacing[3] }}>
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ type: 'spring', stiffness: 100 }}
                  style={{ height: '100%', background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentHover})`, borderRadius: borderRadius.full }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[1] }}>
                {lessonSteps.map((step, i) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing[2],
                      padding: `${spacing[1]} ${spacing[2]}`,
                      borderRadius: borderRadius.md,
                      background: i === currentStep ? `${colors.accent}15` : i < currentStep ? `${colors.success}10` : 'transparent',
                      border: i === currentStep ? `1px solid ${colors.accent}30` : i < currentStep ? `1px solid ${colors.success}20` : '1px solid transparent',
                      cursor: 'pointer',
                    }}
                    onClick={() => { setCurrentStep(i); setUnderstood(false); setShowCheckResult(false); setCheckAnswer(null) }}
                  >
                    <div style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: i < currentStep ? colors.success : i === currentStep ? colors.accent : colors.surfaceElevated,
                      color: i <= currentStep ? '#fff' : colors.textMuted,
                      fontSize: typography.sizes.xs,
                      fontWeight: typography.weights.bold,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {i < currentStep ? <CheckCircle size={14} color="#fff" /> : i + 1}
                    </div>
                    <span style={{
                      fontSize: typography.sizes.sm,
                      color: i === currentStep ? colors.accent : i < currentStep ? colors.success : colors.textMuted,
                      fontWeight: i === currentStep ? typography.weights.semibold : typography.weights.normal,
                    }}>
                      {step.title}
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Help cards */}
            <Card padding={3} style={{ background: `linear-gradient(135deg, ${colors.surfaceElevated}, ${colors.surface})`, boxShadow: `0 4px 24px ${colors.shadow}, 0 0 0 1px ${colors.borderLight}` }}>
              <h4 style={{ fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[2] }}>Need a different explanation?</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[1] }}>
                {[
                  { icon: '🌟', label: 'Explain with a real life example' },
                  { icon: '📊', label: 'Show a visual representation' },
                  { icon: '📝', label: 'Explain in simpler words' },
                ].map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ x: 4, background: colors.surfaceElevated }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing[2],
                      padding: `${spacing[1]} ${spacing[2]}`,
                      borderRadius: borderRadius.md,
                      border: `1px solid ${colors.border}`,
                      background: 'transparent',
                      color: colors.textSecondary,
                      fontSize: typography.sizes.sm,
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span style={{ fontSize: '16px' }}>{opt.icon}</span>
                    <span style={{ flex: 1 }}>{opt.label}</span>
                    <ArrowRight size={14} />
                  </motion.button>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  // ── SUMMARY VIEW ──
  if (view === 'summary') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ padding: spacing[3], display: 'flex', flexDirection: 'column', gap: spacing[4], position: 'relative', zIndex: 1, width: '100%' }}>

        {/* Header */}
        <motion.div initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <Button variant="primary" size="sm" onClick={() => setView('setup')} style={{ padding: `${spacing[1]} ${spacing[2]}`, gap: spacing[1], background: colors.accent, boxShadow: `0 2px 12px ${colors.accent}40` }}>
            <ArrowLeft size={16} /> Back to Tutor
          </Button>
        </motion.div>

        {/* Celebration header */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120, delay: 0.15 }}
          style={{ textAlign: 'center', padding: `${spacing[4]} 0` }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: '64px', marginBottom: spacing[3] }}
          >
            🎉
          </motion.div>
          <h1 style={{ fontSize: typography.sizes['4xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[2], letterSpacing: '-0.5px' }}>
            <span style={{ color: colors.accent }}>Great Job!</span>
          </h1>
          <p style={{ fontSize: typography.sizes.lg, color: colors.textSecondary }}>
            You've completed this lesson. Here's a quick summary of what you learned.
          </p>
        </motion.div>

        {/* Score + Key takeaways */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[4] }}>
          {/* Score card */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.25, type: 'spring', stiffness: 100 }}
          >
            <Card padding={5} style={{ background: `linear-gradient(135deg, ${colors.surfaceElevated}, ${colors.surface})`, boxShadow: `0 8px 40px ${colors.shadow}, 0 0 0 1px ${colors.borderLight}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing[4] }}>
                {/* Score circle */}
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 150, delay: 0.4 }} style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
                  <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="60" cy="60" r="50" fill="none" stroke={colors.surface} strokeWidth="10" />
                    <motion.circle
                      cx="60" cy="60" r="50"
                      fill="none"
                      stroke={colors.accent}
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={2 * Math.PI * 50 * 0.2}
                      initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 50 * 0.2 }}
                      transition={{ duration: 1.5, ease: 'easeOut', delay: 0.6 }}
                    />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9, type: 'spring' }} style={{ fontSize: '32px', fontWeight: typography.weights.bold, color: colors.accent, lineHeight: 1 }}>
                      4/5
                    </motion.div>
                    <div style={{ fontSize: typography.sizes.xs, color: colors.textMuted }}>Correct</div>
                  </div>
                </motion.div>

                {/* Stats */}
                <div style={{ flex: 1 }}>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[2] }}>
                    <Trophy size={20} color={colors.warning} />
                    <span style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>Nice Work!</span>
                  </motion.div>
                  <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary, marginBottom: spacing[3] }}>You've understood the main concepts well.</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[2] }}>
                    <div style={{ padding: spacing[2], background: colors.surface, borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}>
                      <div style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.success }}>80%</div>
                      <div style={{ fontSize: typography.sizes.xs, color: colors.textMuted }}>Accuracy</div>
                    </div>
                    <div style={{ padding: spacing[2], background: colors.surface, borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}>
                      <div style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: colors.info }}>2m 30s</div>
                      <div style={{ fontSize: typography.sizes.xs, color: colors.textMuted }}>Time taken</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Key takeaways */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          >
            <Card padding={4} style={{ background: `linear-gradient(135deg, ${colors.surfaceElevated}, ${colors.surface})`, boxShadow: `0 8px 40px ${colors.shadow}, 0 0 0 1px ${colors.borderLight}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[3] }}>
                <Lightbulb size={20} color={colors.warning} />
                <h3 style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>Key Takeaways</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
                {lessonSteps.slice(0, 4).map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: spacing[2] }}
                  >
                    <div style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: `${colors.accent}18`,
                      color: colors.accent,
                      fontSize: typography.sizes.xs,
                      fontWeight: typography.weights.bold,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: typography.sizes.sm, color: colors.textSecondary, lineHeight: 1.5 }}>{step.keyPoints[0]}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* What's next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card padding={4} style={{ display: 'flex', alignItems: 'center', gap: spacing[4], background: `linear-gradient(135deg, ${colors.surfaceElevated}, ${colors.surface})`, boxShadow: `0 4px 24px ${colors.shadow}, 0 0 0 1px ${colors.borderLight}` }}>
            <div style={{ width: 48, height: 48, borderRadius: borderRadius.lg, background: `${colors.accent}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <TrendingUp size={24} color={colors.accent} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: 4 }}>What's Next?</h3>
              <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary }}>Practice more questions to strengthen your understanding.</p>
            </div>
            <Button variant="outline" size="md" onClick={() => navigate('/solve/practice')}>
              Go to Practice <ArrowRight size={16} />
            </Button>
          </Card>
        </motion.div>

        {/* Bottom actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: spacing[3] }}
        >
          <div style={{ display: 'flex', gap: spacing[2] }}>
            <Button variant="outline" size="md" onClick={() => setView('setup')}>
              <ArrowLeft size={16} /> Review Concepts
            </Button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing[4] }}>
            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing[1] }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                  whileTap={{ scale: 0.9 }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, fontSize: '24px', lineHeight: 1 }}
                >
                  ⭐
                </motion.button>
              ))}
            </div>
            <Button size="md" onClick={() => navigate('/home')} style={{ boxShadow: `0 4px 28px ${colors.accent}30` }}>
              Finish Lesson <ArrowRight size={16} />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return null
}
