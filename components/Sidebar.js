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
  faChartBar
} from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/Sidebar.module.css'

const personalMenuItems = [
  { label: 'Dashboard', path: '/personal/dashboard', icon: faChartLine },
  { label: 'Alunos', path: '/personal/alunos', icon: faUsers },
  { label: 'Treinos', path: '/personal/treinos', icon: faDumbbell },
  { label: 'Dietas', path: '/personal/dietas', icon: faUtensils },
  { label: 'Mensagens', path: '/personal/mensagens', icon: faComments },
  { label: 'Financeiro', path: '/personal/financeiro', icon: faDollarSign },
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

  return (
    <>
      {isMobile && isOpen && (
        <div
          className={styles.backdrop}
          onClick={onClose}
        />
      )}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
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
                <span className={styles.icon}>
                  <FontAwesomeIcon icon={item.icon} />
                </span>
                <span className={styles.label}>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
