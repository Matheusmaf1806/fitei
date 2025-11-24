import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faUser } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/Header.module.css'

export default function Header({ userType, toggleSidebar }) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className={styles.logo}>
          <img
            src="https://image-xi-inky.vercel.app/public/tofitilogohorizontal.png"
            alt="ToFiti Logo"
            className={styles.logoImage}
          />
        </div>
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn}>
          <FontAwesomeIcon icon={faBell} />
        </button>
        <button className={styles.iconBtn}>
          <FontAwesomeIcon icon={faUser} />
        </button>
      </div>
    </header>
  )
}
