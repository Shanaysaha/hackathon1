import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { PageContainer } from './PageContainer'
import { ImmersiveBackground } from '@/components/ui/ImmersiveBackground'
import { Particles } from '@/components/ui/Particles'

export const AppShell: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden', background: '#000000' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100vh', marginLeft: '260px', position: 'relative' }}>
        <TopBar />
        <PageContainer>
          <ImmersiveBackground />
          <Outlet />
        </PageContainer>
      </div>
      <Particles />
    </div>
  )
}
