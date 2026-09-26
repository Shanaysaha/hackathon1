import React from 'react'
import { useTheme } from '@/hooks/useTheme'

interface PageContainerProps {
  children: React.ReactNode
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const { colors } = useTheme()

  return (
    <div
      style={{
        flex: 1,
        background: colors.background,
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <div className="pixelated-gradient" />
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100%' }}>
        {children}
      </div>
    </div>
  )
}
