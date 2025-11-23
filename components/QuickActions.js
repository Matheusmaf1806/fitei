import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell, faUtensils, faComment, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/QuickActions.module.css'

const actions = [
  { label: 'Novo Treino', icon: faDumbbell, color: 'primary' },
  { label: 'Nova Dieta', icon: faUtensils, color: 'success' },
  { label: 'Enviar Mensagem', icon: faComment, color: 'warning' },
  { label: 'Adicionar Aluno', icon: faUserPlus, color: 'info' },
]

export default function QuickActions() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Ações Rápidas</h3>
      <div className={styles.grid}>
        {actions.map((action, index) => (
          <button
            key={index}
            className={`${styles.action} ${styles[action.color]}`}
          >
            <span className={styles.icon}>
              <FontAwesomeIcon icon={action.icon} />
            </span>
            <span className={styles.label}>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
