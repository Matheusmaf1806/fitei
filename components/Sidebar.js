import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChartLine,
  faUsers,
  faDumbbell,
  faUtensils,
  faComments,
  faDollarSign,
  faHome,
  faPills,
  faChartBar,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/Sidebar.module.css'

const personalMenuItems = [
  { label: 'Dashboard', path: '/personal/dashboard', icon: faChartLine },
  { label: 'Alunos', path: '/personal/alunos', icon: faUsers },
  { label: 'Treinos', path: '/personal/treinos', icon: faDumbbell },
  { label: 'Dietas', path: '/personal/dietas', icon: faUtensils },
  { label: 'Mensagens', path: '/personal/mensagens', icon: faComments },
  { label: 'Financeiro', path: '/personal/financeiro', icon: faDollarSign },
  { label: 'Perfil', path: '/personal/perfil', icon: faUser },
]

const alunoMenuItems = [
  { label: 'Meu Dia', path: '/aluno/home', icon: faHome },
  { label: 'Treino', path: '/aluno/treino', icon: faDumbbell },
  { label: 'Dieta', path: '/aluno/dieta', icon: faUtensils },
  { label: 'Suplementos', path: '/aluno/suplementos', icon: faPills },
  { label: 'Progresso', path: '/aluno/progresso', icon: faChartBar },
  { label: 'Chat', path: '/aluno/chat', icon: faComments },
]

export default function Sidebar({ userType, isOpen, onClose, isMobile }) {
  const router = useRouter()
  const menuItems = userType === 'personal' ? personalMenuItems : alunoMenuItems

  const handleLinkClick = () => {
    if (isMobile && onClose) {
      onClose()
    }
  }

  const userInfo = userType === 'personal'
    ? { name: 'Personal Trainer', initials: 'PT', role: 'Personal' }
    : { name: 'Aluno', initials: 'AL', role: 'Aluno' }

  return (
    <>
      {isMobile && isOpen && (
        <div
          className={styles.backdrop}
          onClick={onClose}
        />
      )}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.avatar}>
            {userInfo.initials}
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{userInfo.name}</div>
            <div className={styles.userRole}>{userInfo.role}</div>
          </div>
        </div>

        <nav className={styles.nav}>
          {menuItems.map((item) => {
            const isActive = router.pathname === item.path
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                onClick={handleLinkClick}
              >
                <div className={styles.navItemContent}>
                  <span className={styles.icon}>
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  <span className={styles.label}>{item.label}</span>
                </div>
                {isActive && <div className={styles.activeIndicator} />}
              </Link>
            )
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.footerBrand}>
            <img
              src="https://image-xi-inky.vercel.app/public/tofitilogohorizontal.png"
              alt="ToFiti Logo"
              className={styles.footerLogo}
            />
          </div>
          <div className={styles.footerVersion}>v1.0.0</div>
        </div>
      </aside>
    </>
  )
}
