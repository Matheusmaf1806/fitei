import { useState, useEffect } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import styles from '../styles/Layout.module.css'

export default function Layout({ children, userType = 'personal' }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      if (mobile) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className={styles.layout}>
      <Header
        userType={userType}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className={styles.main}>
        <Sidebar
          userType={userType}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isMobile={isMobile}
        />
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  )
}
