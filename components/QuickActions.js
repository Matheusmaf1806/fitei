import styles from '../styles/QuickActions.module.css'

const actions = [
  { label: 'Novo Treino', icon: '💪', color: 'primary' },
  { label: 'Nova Dieta', icon: '🥗', color: 'success' },
  { label: 'Enviar Mensagem', icon: '💬', color: 'warning' },
  { label: 'Adicionar Aluno', icon: '👤', color: 'info' },
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
            <span className={styles.icon}>{action.icon}</span>
            <span className={styles.label}>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
