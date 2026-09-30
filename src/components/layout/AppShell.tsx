import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { PageContainer } from './PageContainer'
import { Particles } from '@/components/ui/Particles'

export const AppShell: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden', background: 'var(--bg)' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100vh', marginLeft: '260px', background: 'linear-gradient(135deg, rgba(255,107,53,0.03) 0%, transparent 50%, rgba(255,107,53,0.02) 100%)' }}>
        <TopBar />
        <PageContainer>
          <Outlet />
        </PageContainer>
      </div>
      <Particles />
    </div>
  )
}
