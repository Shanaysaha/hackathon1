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
        backgroundImage: `radial-gradient(ellipse at 30% 20%, rgba(255,107,53,0.05) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(255,107,53,0.03) 0%, transparent 50%)`,
        backgroundBlendMode: 'screen',
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
