import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Sidebar.module.css'

const personalMenuItems = [
  { label: 'Dashboard', path: '/personal/dashboard', icon: '📊' },
  { label: 'Alunos', path: '/personal/alunos', icon: '👥' },
  { label: 'Treinos', path: '/personal/treinos', icon: '💪' },
  { label: 'Dietas', path: '/personal/dietas', icon: '🥗' },
  { label: 'Mensagens', path: '/personal/mensagens', icon: '💬' },
  { label: 'Financeiro', path: '/personal/financeiro', icon: '💰' },
]

const alunoMenuItems = [
  { label: 'Meu Dia', path: '/aluno/home', icon: '🏠' },
  { label: 'Treino', path: '/aluno/treino', icon: '💪' },
  { label: 'Dieta', path: '/aluno/dieta', icon: '🥗' },
  { label: 'Suplementos', path: '/aluno/suplementos', icon: '💊' },
  { label: 'Progresso', path: '/aluno/progresso', icon: '📈' },
  { label: 'Chat', path: '/aluno/chat', icon: '💬' },
]

export default function Sidebar({ userType, isOpen }) {
  const router = useRouter()
  const menuItems = userType === 'personal' ? personalMenuItems : alunoMenuItems

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <nav className={styles.nav}>
        {menuItems.map((item) => {
          const isActive = router.pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
