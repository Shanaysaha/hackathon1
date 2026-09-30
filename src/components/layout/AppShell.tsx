import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { PageContainer } from './PageContainer'
import { Particles } from '@/components/ui/Particles'

export const AppShell: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden', background: '#0A0A0A' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100vh', marginLeft: '260px' }}>
        <TopBar />
        <PageContainer>
          <Outlet />
        </PageContainer>
      </div>
      <Particles />
    </div>
  )
}
