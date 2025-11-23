import styles from '../styles/Header.module.css'

export default function Header({ userType, toggleSidebar }) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={toggleSidebar}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>💪</span>
          <span className={styles.logoText}>Fitei</span>
        </div>
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2C10 2 8 2 8 4C8 5.886 8 14 8 16C8 18 10 18 10 18C10 18 12 18 12 16C12 14 12 5.886 12 4C12 2 10 2 10 2Z" fill="currentColor"/>
            <path d="M17 9C17 9 18 9 18 10C18 10.943 18 15 18 16C18 17 17 17 17 17H3C3 17 2 17 2 16C2 15 2 10.943 2 10C2 9 3 9 3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <button className={styles.iconBtn}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="10" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M4 17C4 17 5 14 10 14C15 14 16 17 16 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </header>
  )
}
