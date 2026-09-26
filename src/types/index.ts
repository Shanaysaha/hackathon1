export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  learningStreak: number
  joinedDate: string
}

export interface Problem {
  id: string
  title: string
  description: string
  imageUrl?: string
  subject: string
  difficulty: 'easy' | 'medium' | 'hard'
  timestamp: Date
  status: 'analyzing' | 'understanding' | 'discussing' | 'practicing' | 'completed'
}

export interface SolutionStep {
  id: string
  title: string
  content: string
  explanation: string
  completed: boolean
}

export interface Message {
  id: string
  role: 'tutor' | 'student'
  content: string
  timestamp: Date
  type?: 'text' | 'hint' | 'explanation'
}

export interface Concept {
  id: string
  title: string
  description: string
  category: string
  progress: number
  topicsCount: number
  icon?: string
}

export interface PracticeQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface HistoryItem {
  id: string
  title: string
  subject: string
  date: Date
  status: 'completed' | 'in-progress'
  score?: number
}

export interface LearningStep {
  id: string
  title: string
  description: string
  date: Date
  type: 'concept' | 'practice' | 'discussion'
  completed: boolean
}
