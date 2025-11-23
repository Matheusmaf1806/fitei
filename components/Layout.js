import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import styles from '../styles/Layout.module.css'

export default function Layout({ children, userType = 'personal' }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

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
        />
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  )
}
