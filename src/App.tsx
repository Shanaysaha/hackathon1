import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useThemeStore } from '@/state/themeStore'
import { useAuthStore } from '@/state/authStore'
import { AppShell } from '@/components/layout/AppShell'
import { Home } from '@/pages/Home'
import { Upload } from '@/pages/Upload'
import { Analyzing } from '@/pages/Analyzing'
import { Understanding } from '@/pages/Understanding'
import { Discuss } from '@/pages/Discuss'
import { Practice } from '@/pages/Practice'
import { Review } from '@/pages/Review'
import { History } from '@/pages/History'
import { Concepts } from '@/pages/Concepts'
import { Profile } from '@/pages/Profile'
import { LearningJourney } from '@/pages/LearningJourney'
import { Login } from '@/pages/Login'
import '@/styles/globals.css'

function RequireAuth({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function AnimatedPage({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{
          opacity: { duration: 0.25 },
          y: { duration: 0.4, cubicBezier: [0.16, 1, 0.3, 1] },
          scale: { duration: 0.4, cubicBezier: [0.16, 1, 0.3, 1] },
        }}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <AppShell />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="solve">
          <Route path="upload" element={<AnimatedPage><Upload /></AnimatedPage>} />
          <Route path="analyzing" element={<AnimatedPage><Analyzing /></AnimatedPage>} />
          <Route path="understanding" element={<AnimatedPage><Understanding /></AnimatedPage>} />
          <Route path="discuss" element={<AnimatedPage><Discuss /></AnimatedPage>} />
          <Route path="practice" element={<AnimatedPage><Practice /></AnimatedPage>} />
          <Route path="review" element={<AnimatedPage><Review /></AnimatedPage>} />
        </Route>
        <Route path="history" element={<AnimatedPage><History /></AnimatedPage>} />
        <Route path="concepts" element={<AnimatedPage><Concepts /></AnimatedPage>} />
        <Route path="profile" element={<AnimatedPage><Profile /></AnimatedPage>} />
        <Route path="profile/learning-journey" element={<AnimatedPage><LearningJourney /></AnimatedPage>} />
      </Route>
    </Routes>
  )
}

function App() {
  const theme = useThemeStore((state) => state.theme)

  return (
    <div data-theme={theme} style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <AppRoutes />
    </div>
  )
}

export default App
