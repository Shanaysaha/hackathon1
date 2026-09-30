import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Clock, ArrowRight, CheckCircle, XCircle, Timer, Trophy, Zap, Target, BookOpen, ChevronRight, Play, RotateCcw, Award } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { spacing, typography, borderRadius } from '@/styles/tokens'

interface TestQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface TestConfig {
  id: string
  title: string
  subject: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  questionsCount: number
  duration: number // minutes
  icon: string
  color: string
}

const testConfigs: TestConfig[] = [
  { id: 'math', title: 'Mathematics', subject: 'Algebra & Equations', difficulty: 'Medium', questionsCount: 5, duration: 10, icon: '📐', color: '#FF6B35' },
  { id: 'science', title: 'Science', subject: 'Physics & Chemistry', difficulty: 'Hard', questionsCount: 5, duration: 15, icon: '🔬', color: '#3B82F6' },
  { id: 'english', title: 'English', subject: 'Grammar & Comprehension', difficulty: 'Easy', questionsCount: 5, duration: 8, icon: '📖', color: '#10B981' },
]

const sampleQuestions: Record<string, TestQuestion[]> = {
  math: [
    { id: '1', question: 'What are the solutions to x² - 5x + 6 = 0?', options: ['x = 2, x = 3', 'x = -2, x = -3', 'x = 1, x = 6', 'x = -1, x = -6'], correctAnswer: 0, explanation: 'Factoring: (x-2)(x-3) = 0, so x = 2 or x = 3' },
    { id: '2', question: 'What is the discriminant of 2x² + 3x - 4 = 0?', options: ['5', '41', '-5', '1'], correctAnswer: 1, explanation: 'Discriminant = b² - 4ac = 9 - 4(2)(-4) = 9 + 32 = 41' },
    { id: '3', question: 'Simplify: (x²)³', options: ['x⁵', 'x⁶', 'x⁸', '3x²'], correctAnswer: 1, explanation: 'Using power rule: (x²)³ = x^(2×3) = x⁶' },
    { id: '4', question: 'What is the slope of the line 2x + 3y = 6?', options: ['2/3', '-2/3', '3/2', '-3/2'], correctAnswer: 1, explanation: 'Rewriting: y = -2/3 x + 2, so slope = -2/3' },
    { id: '5', question: 'If log₂(x) = 5, what is x?', options: ['10', '25', '32', '64'], correctAnswer: 2, explanation: 'x = 2⁵ = 32' },
  ],
  science: [
    { id: '1', question: 'What is the chemical formula for water?', options: ['H₂O', 'CO₂', 'NaCl', 'O₂'], correctAnswer: 0, explanation: 'Water consists of 2 hydrogen atoms and 1 oxygen atom' },
    { id: '2', question: 'What is the speed of light approximately?', options: ['3 × 10⁶ m/s', '3 × 10⁸ m/s', '3 × 10¹⁰ m/s', '3 × 10³ m/s'], correctAnswer: 1, explanation: 'Speed of light ≈ 3 × 10⁸ meters per second' },
    { id: '3', question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Jupiter', 'Mars', 'Saturn'], correctAnswer: 2, explanation: 'Mars appears red due to iron oxide on its surface' },
    { id: '4', question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi body'], correctAnswer: 2, explanation: 'Mitochondria generate most of the cell\'s energy (ATP)' },
    { id: '5', question: 'What gas do plants absorb during photosynthesis?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correctAnswer: 2, explanation: 'Plants absorb CO₂ and release O₂ during photosynthesis' },
  ],
  english: [
    { id: '1', question: 'Choose the correct sentence:', options: ['Their going to the store.', "They're going to the store.", 'There going to the store.', 'Theyre going to the store.'], correctAnswer: 1, explanation: "'They're' is the contraction of 'they are'" },
    { id: '2', question: 'What is the past tense of "run"?', options: ['Runned', 'Ran', 'Running', 'Runs'], correctAnswer: 1, explanation: '"Run" is an irregular verb; past tense is "ran"' },
    { id: '3', question: 'Which word is a synonym for "happy"?', options: ['Sad', 'Angry', 'Joyful', 'Tired'], correctAnswer: 2, explanation: '"Joyful" means full of joy, similar to happy' },
    { id: '4', question: '"The quick brown fox" is an example of a:', options: ['Metaphor', 'Alliteration', 'Hyperbole', 'Simile'], correctAnswer: 1, explanation: 'Alliteration is the repetition of initial consonant sounds' },
    { id: '5', question: 'Identify the noun: "She quickly finished her homework"', options: ['quickly', 'finished', 'homework', 'She'], correctAnswer: 2, explanation: '"Homework" is the noun (thing being acted upon)' },
  ],
}

type TestView = 'select' | 'taking' | 'results'

export const Test: React.FC = () => {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const [view, setView] = useState<TestView>('select')
  const [selectedTest, setSelectedTest] = useState<TestConfig | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [isStarted, setIsStarted] = useState(false)

  const questions = selectedTest ? sampleQuestions[selectedTest.id] : []

  const startTest = (test: TestConfig) => {
    setSelectedTest(test)
    setTimeLeft(test.duration * 60)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setAnswers([])
    setIsStarted(true)
    setView('taking')
  }

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    setShowExplanation(true)
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
    setAnswers([...answers, index])
  }

  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setView('results')
    }
  }, [currentQuestion, questions.length])

  // Timer
  useEffect(() => {
    if (view !== 'taking' || !isStarted) return
    if (timeLeft <= 0) {
      setView('results')
      return
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [view, timeLeft, isStarted])

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } }
  const itemVariants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 18 } } }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  // ── SELECT VIEW ──
  if (view === 'select') {
    return (
      <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ padding: spacing[3], position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: spacing[5], width: '100%' }}>

        {/* Header */}
        <motion.div variants={itemVariants}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[2] }}>
            <BookOpen size={16} color={colors.accent} />
            <span style={{ fontSize: typography.sizes.sm, color: colors.accent, fontWeight: typography.weights.medium, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Assessment</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, type: 'spring', stiffness: 120 }} style={{ fontSize: typography.sizes['4xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[2], lineHeight: 1.15, letterSpacing: '-0.5px' }}>
            Take a Test
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} style={{ fontSize: typography.sizes.lg, color: colors.textSecondary }}>
            Choose a subject and challenge yourself
          </motion.p>
        </motion.div>

        {/* Test Cards */}
        <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
          <h2 style={{ fontSize: typography.sizes.xl, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[1] }}>Available Tests</h2>
          <AnimatePresence>
            {testConfigs.map((test, i) => (
              <motion.div
                key={test.id}
                variants={itemVariants}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ delay: 0.1 * i, type: 'spring', stiffness: 100 }}
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  hoverable
                  padding={4}
                  onClick={() => startTest(test)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing[4],
                    cursor: 'pointer',
                    background: `linear-gradient(135deg, ${colors.surfaceElevated}, ${colors.surface})`,
                    boxShadow: `0 4px 24px ${colors.shadow}, 0 0 0 1px ${colors.borderLight}`,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  {/* Accent stripe */}
                  <motion.div
                    style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: test.color }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: borderRadius.lg,
                      background: `${test.color}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px',
                      flexShrink: 0,
                    }}
                  >
                    {test.icon}
                  </motion.div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[1] }}>
                      <h3 style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: colors.textPrimary }}>{test.title}</h3>
                      <span style={{
                        fontSize: typography.sizes.xs,
                        fontWeight: typography.weights.medium,
                        padding: '3px 10px',
                        borderRadius: borderRadius.full,
                        background: test.difficulty === 'Easy' ? `${colors.success}18` : test.difficulty === 'Medium' ? `${colors.warning}18` : `${colors.error}18`,
                        color: test.difficulty === 'Easy' ? colors.success : test.difficulty === 'Medium' ? colors.warning : colors.error,
                        border: `1px solid ${test.difficulty === 'Easy' ? colors.success : test.difficulty === 'Medium' ? colors.warning : colors.error}30`,
                      }}>
                        {test.difficulty}
                      </span>
                    </div>
                    <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary, marginBottom: spacing[2] }}>{test.subject}</p>
                    <div style={{ display: 'flex', gap: spacing[3] }}>
                      <span style={{ fontSize: typography.sizes.xs, color: colors.textMuted, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Target size={12} /> {test.questionsCount} questions
                      </span>
                      <span style={{ fontSize: typography.sizes.xs, color: colors.textMuted, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={12} /> {test.duration} min
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ color: test.color, flexShrink: 0 }}
                  >
                    <ArrowRight size={24} />
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: spacing[3], marginTop: spacing[2] }}>
          {[
            { label: 'Tests Completed', value: '0', icon: <Trophy size={20} />, color: colors.accent, bg: `${colors.accent}18` },
            { label: 'Avg. Score', value: '—', icon: <Target size={20} />, color: colors.success, bg: `${colors.success}18` },
            { label: 'Best Streak', value: '0', icon: <Zap size={20} />, color: colors.warning, bg: `${colors.warning}18` },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -3 }}
            >
              <Card padding={3} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: spacing[2] }}>
                <div style={{ width: 44, height: 44, borderRadius: borderRadius.md, background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>{stat.icon}</div>
                <div>
                  <div style={{ fontSize: typography.sizes['2xl'], fontWeight: typography.weights.bold, color: colors.textPrimary }}>{stat.value}</div>
                  <div style={{ fontSize: typography.sizes.xs, color: colors.textMuted }}>{stat.label}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    )
  }

  // ── TAKING VIEW ──
  if (view === 'taking' && selectedTest && questions.length > 0) {
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} style={{ padding: spacing[3], display: 'flex', flexDirection: 'column', gap: spacing[4], position: 'relative', zIndex: 1, width: '100%' }}>

        {/* Top bar */}
        <motion.div initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} style={{ fontSize: typography.sizes.sm, color: colors.accent, fontWeight: typography.weights.medium }}>{selectedTest.title}</motion.span>
            <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, letterSpacing: '-0.5px' }}>Question {currentQuestion + 1}</h1>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
              padding: `${spacing[2]} ${spacing[3]}`,
              background: timeLeft < 60 ? `${colors.error}18` : colors.surface,
              borderRadius: borderRadius.lg,
              border: `1px solid ${timeLeft < 60 ? colors.error + '30' : colors.border}`,
            }}
          >
            <motion.div
              animate={timeLeft < 60 ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <Timer size={18} color={timeLeft < 60 ? colors.error : colors.textSecondary} />
            </motion.div>
            <span style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.bold, color: timeLeft < 60 ? colors.error : colors.textPrimary, fontVariantNumeric: 'tabular-nums' }}>
              {formatTime(timeLeft)}
            </span>
          </motion.div>
        </motion.div>

        {/* Progress */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} style={{ display: 'flex', gap: spacing[1] }}>
          {questions.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                background: i < currentQuestion
                  ? answers[i] === questions[i].correctAnswer ? colors.success : colors.error
                  : i === currentQuestion ? colors.accent : colors.border,
                scale: i === currentQuestion ? 1.2 : 1,
              }}
              transition={{ type: 'spring', stiffness: 300 }}
              style={{
                flex: 1,
                height: 5,
                borderRadius: borderRadius.full,
                background: colors.border,
              }}
            />
          ))}
        </motion.div>

        {/* Question card */}
        <motion.div
          key={currentQuestion}
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        >
          <Card padding={5} style={{ boxShadow: `0 8px 40px ${colors.shadow}, 0 0 0 1px ${colors.borderLight}`, maxWidth: 860, margin: '0 auto', width: '100%' }}>
            {/* Question number badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: spacing[1], padding: `${spacing[1]} ${spacing[2]}`, background: `${colors.accent}18`, borderRadius: borderRadius.full, marginBottom: spacing[3] }}
            >
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: colors.accent, color: '#fff', fontSize: typography.sizes.xs, fontWeight: typography.weights.bold, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {currentQuestion + 1}
              </span>
              <span style={{ fontSize: typography.sizes.sm, color: colors.accent, fontWeight: typography.weights.medium }}>Question</span>
            </motion.div>

            <h2 style={{ fontSize: typography.sizes['2xl'], fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[4], lineHeight: 1.4 }}>
              {questions[currentQuestion].question}
            </h2>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
              {questions[currentQuestion].options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrect = index === questions[currentQuestion].correctAnswer
                const showCorrect = showExplanation && isCorrect
                const showWrong = showExplanation && isSelected && !isCorrect

                return (
                  <motion.button
                    key={index}
                    whileHover={!showExplanation ? { scale: 1.015, x: 6 } : {}}
                    whileTap={!showExplanation ? { scale: 0.985 } : {}}
                    onClick={() => !showExplanation && handleAnswer(index)}
                    disabled={showExplanation}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, type: 'spring', stiffness: 100 }}
                    style={{
                      padding: `${spacing[3]} ${spacing[4]}`,
                      borderRadius: borderRadius.lg,
                      border: `2px solid ${showCorrect ? colors.success : showWrong ? colors.error : isSelected ? colors.accent : colors.border}`,
                      background: showCorrect ? `${colors.success}15` : showWrong ? `${colors.error}15` : isSelected ? colors.accentLight : colors.surface,
                      color: colors.textPrimary,
                      fontSize: typography.sizes.base,
                      textAlign: 'left',
                      cursor: showExplanation ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: spacing[3],
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <span style={{
                      width: 32,
                      height: 32,
                      borderRadius: borderRadius.md,
                      background: showCorrect ? colors.success : showWrong ? colors.error : isSelected ? colors.accent : colors.surfaceElevated,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: typography.sizes.sm,
                      fontWeight: typography.weights.bold,
                      color: '#fff',
                      flexShrink: 0,
                      transition: 'all 0.2s ease',
                    }}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span style={{ flex: 1 }}>{option}</span>
                    {showCorrect && <CheckCircle size={20} color={colors.success} />}
                    {showWrong && <XCircle size={20} color={colors.error} />}
                  </motion.button>
                )
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  style={{ marginTop: spacing[4], overflow: 'hidden' }}
                >
                  <div style={{
                    padding: spacing[3],
                    borderRadius: borderRadius.lg,
                    background: isCorrect ? `${colors.success}12` : `${colors.error}12`,
                    border: `1px solid ${isCorrect ? colors.success : colors.error}30`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: spacing[2],
                    marginBottom: spacing[3],
                  }}>
                    <motion.div
                      animate={isCorrect ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      {isCorrect ? <CheckCircle size={22} color={colors.success} /> : <XCircle size={22} color={colors.error} />}
                    </motion.div>
                    <div>
                      <div style={{ fontSize: typography.sizes.base, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[1] }}>
                        {isCorrect ? 'Correct! 🎉' : 'Not quite!'}
                      </div>
                      <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary, lineHeight: 1.6 }}>{questions[currentQuestion].explanation}</p>
                    </div>
                  </div>
                  <Button fullWidth size="lg" onClick={handleNext} style={{ boxShadow: `0 4px 20px ${colors.accent}25` }}>
                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Test'} <ArrowRight size={20} />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* Question dots navigation */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ display: 'flex', justifyContent: 'center', gap: spacing[2] }}>
          {questions.map((_, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => { setCurrentQuestion(i); setSelectedAnswer(null); setShowExplanation(false) }}
              animate={{
                background: i < currentQuestion
                  ? answers[i] === questions[i].correctAnswer ? colors.success : colors.error
                  : i === currentQuestion ? colors.accent : colors.surfaceElevated,
                scale: i === currentQuestion ? 1.4 : 1,
              }}
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    )
  }

  // ── RESULTS VIEW ──
  if (view === 'results' && selectedTest) {
    const percentage = Math.round((score / questions.length) * 100)
    const timeTaken = selectedTest.duration * 60 - timeLeft

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ padding: spacing[3], display: 'flex', flexDirection: 'column', gap: spacing[4], position: 'relative', zIndex: 1, width: '100%' }}>

        {/* Score circle + summary */}
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 120, delay: 0.1 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[4], alignItems: 'stretch' }}>
          {/* Left: Score */}
          <Card padding={5} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${colors.surfaceElevated}, ${colors.surface})`, boxShadow: `0 8px 40px ${colors.shadow}, 0 0 0 1px ${colors.borderLight}` }}>
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} style={{ fontSize: '56px', marginBottom: spacing[3] }}>🏆</motion.div>
            <h2 style={{ fontSize: typography.sizes['3xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[2] }}>
              {percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good Job!' : 'Keep Practicing!'}
            </h2>
            <p style={{ fontSize: typography.sizes.base, color: colors.textSecondary, marginBottom: spacing[4], textAlign: 'center' }}>
              You scored {score} out of {questions.length}
            </p>

            {/* SVG Score Circle */}
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 150, delay: 0.3 }} style={{ position: 'relative', width: 160, height: 160, marginBottom: spacing[4] }}>
              <svg width="160" height="160" viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="80" cy="80" r="65" fill="none" stroke={colors.surface} strokeWidth="12" />
                <motion.circle
                  cx="80" cy="80" r="65"
                  fill="none"
                  stroke={percentage >= 80 ? colors.success : percentage >= 60 ? colors.warning : colors.error}
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 65}`}
                  strokeDashoffset={2 * Math.PI * 65 * (1 - percentage / 100)}
                  initial={{ strokeDashoffset: 2 * Math.PI * 65 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 65 * (1 - percentage / 100) }}
                  transition={{ duration: 1.8, ease: 'easeOut', delay: 0.5 }}
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8, type: 'spring' }} style={{ fontSize: typography.sizes['3xl'], fontWeight: typography.weights.bold, color: percentage >= 80 ? colors.success : percentage >= 60 ? colors.warning : colors.error, lineHeight: 1 }}>
                  {percentage}%
                </motion.div>
                <div style={{ fontSize: typography.sizes.xs, color: colors.textMuted, marginTop: 2 }}>Score</div>
              </div>
            </motion.div>
          </Card>

          {/* Right: Stats */}
          <Card padding={5} style={{ display: 'flex', flexDirection: 'column', gap: spacing[3], background: `linear-gradient(135deg, ${colors.surfaceElevated}, ${colors.surface})`, boxShadow: `0 8px 40px ${colors.shadow}, 0 0 0 1px ${colors.borderLight}` }}>
            <h3 style={{ fontSize: typography.sizes.xl, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[1] }}>Test Summary</h3>
            {[
              { label: 'Correct Answers', value: `${score}/${questions.length}`, icon: <CheckCircle size={20} />, color: colors.success, bg: `${colors.success}18` },
              { label: 'Time Taken', value: formatTime(timeTaken), icon: <Clock size={20} />, color: colors.info, bg: `${colors.info}18` },
              { label: 'Test', value: selectedTest.title, icon: <BookOpen size={20} />, color: colors.accent, bg: `${colors.accent}18` },
              { label: 'Difficulty', value: selectedTest.difficulty, icon: <Target size={20} />, color: colors.warning, bg: `${colors.warning}18` },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08, type: 'spring', stiffness: 100 }}
                style={{ display: 'flex', alignItems: 'center', gap: spacing[3], padding: `${spacing[2]} ${spacing[3]}`, borderRadius: borderRadius.lg, background: colors.surface, border: `1px solid ${colors.border}` }}
              >
                <div style={{ width: 40, height: 40, borderRadius: borderRadius.md, background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>{stat.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: typography.sizes.xs, color: colors.textMuted }}>{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </Card>
        </motion.div>

        {/* Answer review */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ maxWidth: 860, margin: '0 auto', width: '100%' }}>
          <h3 style={{ fontSize: typography.sizes.xl, fontWeight: typography.weights.semibold, color: colors.textPrimary, marginBottom: spacing[3], display: 'flex', alignItems: 'center', gap: spacing[2] }}>
            <Award size={22} color={colors.accent} /> Answer Review
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
            {questions.map((q, i) => {
              const userAnswer = answers[i]
              const wasCorrect = userAnswer === q.correctAnswer
              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.06, type: 'spring', stiffness: 100 }}
                >
                  <Card padding={3} style={{ display: 'flex', alignItems: 'center', gap: spacing[3], borderLeft: `4px solid ${wasCorrect ? colors.success : colors.error}` }}>
                    <motion.div
                      animate={wasCorrect ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      {wasCorrect ? <CheckCircle size={22} color={colors.success} /> : <XCircle size={22} color={colors.error} />}
                    </motion.div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: typography.sizes.sm, color: colors.textSecondary, marginBottom: 2 }}>Q{i + 1}</div>
                      <div style={{ fontSize: typography.sizes.base, color: colors.textPrimary }}>{q.question}</div>
                      {!wasCorrect && (
                        <div style={{ fontSize: typography.sizes.sm, color: colors.success, marginTop: 2 }}>
                          Correct: {q.options[q.correctAnswer]}
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: typography.sizes.sm, color: colors.textMuted }}>{q.explanation}</span>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} style={{ display: 'flex', justifyContent: 'center', gap: spacing[3], flexWrap: 'wrap' }}>
          <Button variant="outline" size="lg" onClick={() => { setView('select'); setSelectedTest(null); setIsStarted(false) }}>
            <RotateCcw size={18} /> Retake Test
          </Button>
          <Button size="lg" onClick={() => navigate('/home')}>
            Back to Home <ChevronRight size={18} />
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  // ── WELCOME / PRE-TEST VIEW ──
  if (view === 'taking' && isStarted && selectedTest) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ padding: spacing[3], display: 'flex', flexDirection: 'column', gap: spacing[4], position: 'relative', zIndex: 1, width: '100%' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 120, delay: 0.1 }}
          style={{ maxWidth: 600, margin: '0 auto', width: '100%' }}
        >
          <Card padding={5} style={{ background: `linear-gradient(135deg, ${colors.surfaceElevated}, ${colors.surface})`, boxShadow: `0 8px 40px ${colors.shadow}, 0 0 0 1px ${colors.borderLight}`, textAlign: 'center' }}>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: '72px', marginBottom: spacing[3] }}
            >
              {selectedTest.icon}
            </motion.div>
            <h1 style={{ fontSize: typography.sizes['3xl'], fontWeight: typography.weights.bold, color: colors.textPrimary, marginBottom: spacing[2] }}>
              {selectedTest.title}
            </h1>
            <p style={{ fontSize: typography.sizes.base, color: colors.textSecondary, marginBottom: spacing[4] }}>
              {selectedTest.subject}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: spacing[3], marginBottom: spacing[4] }}>
              {[
                { label: 'Questions', value: selectedTest.questionsCount.toString(), icon: <BookOpen size={20} /> },
                { label: 'Duration', value: `${selectedTest.duration} min`, icon: <Clock size={20} /> },
                { label: 'Difficulty', value: selectedTest.difficulty, icon: <Target size={20} /> },
              ].map((info) => (
                <div key={info.label} style={{ padding: spacing[3], background: colors.surface, borderRadius: borderRadius.lg, border: `1px solid ${colors.border}` }}>
                  <div style={{ color: colors.accent, marginBottom: spacing[1], display: 'flex', justifyContent: 'center' }}>{info.icon}</div>
                  <div style={{ fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, color: colors.textPrimary }}>{info.value}</div>
                  <div style={{ fontSize: typography.sizes.xs, color: colors.textMuted }}>{info.label}</div>
                </div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setIsStarted(true); setView('taking') }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Button size="lg" style={{ boxShadow: `0 4px 28px ${colors.accent}35`, minWidth: 200 }}>
                <Play size={20} fill="currentColor" /> Start Test
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    )
  }

  return null
}
