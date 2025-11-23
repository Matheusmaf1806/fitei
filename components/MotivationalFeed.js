import styles from '../styles/MotivationalFeed.module.css'

const messages = [
  {
    id: 1,
    type: 'motivation',
    icon: '💪',
    title: 'Continue assim!',
    message: 'Você está mantendo uma ótima consistência essa semana. Não desista!',
    time: '2h atrás'
  },
  {
    id: 2,
    type: 'achievement',
    icon: '🏆',
    title: 'Meta alcançada!',
    message: 'Parabéns! Você completou 100% dos treinos esta semana.',
    time: '1 dia atrás'
  },
  {
    id: 3,
    type: 'tip',
    icon: '💡',
    title: 'Dica do Personal',
    message: 'Lembre-se de manter a hidratação antes e depois dos treinos.',
    time: '2 dias atrás'
  },
  {
    id: 4,
    type: 'reminder',
    icon: '⏰',
    title: 'Lembrete',
    message: 'Não esqueça de registrar suas refeições de hoje!',
    time: '3 dias atrás'
  }
]

export default function MotivationalFeed() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Feed Motivacional</h3>
      <div className={styles.feed}>
        {messages.map(msg => (
          <div key={msg.id} className={`${styles.message} ${styles[msg.type]}`}>
            <span className={styles.icon}>{msg.icon}</span>
            <div className={styles.content}>
              <div className={styles.messageTitle}>{msg.title}</div>
              <div className={styles.messageText}>{msg.message}</div>
              <div className={styles.messageTime}>{msg.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
