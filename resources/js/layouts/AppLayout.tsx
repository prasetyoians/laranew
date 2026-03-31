import { useState } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex">
      
      <Sidebar collapsed={collapsed} />

      <div className="flex-1">
        <Header 
          collapsed={collapsed} 
          setCollapsed={setCollapsed} 
        />

        <main className="p-4">
          {children}
        </main>
      </div>

    </div>
  )
}