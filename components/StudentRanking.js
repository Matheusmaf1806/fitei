import styles from '../styles/StudentRanking.module.css'

const mockStudents = [
  { name: 'João Silva', adherence: 95, avatar: '🏆' },
  { name: 'Maria Santos', adherence: 92, avatar: '🥈' },
  { name: 'Pedro Oliveira', adherence: 88, avatar: '🥉' },
  { name: 'Ana Costa', adherence: 85, avatar: '⭐' },
  { name: 'Carlos Souza', adherence: 82, avatar: '⭐' },
]

export default function StudentRanking() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Ranking de Adesão</h3>
      <div className={styles.list}>
        {mockStudents.map((student, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.left}>
              <span className={styles.rank}>{index + 1}</span>
              <span className={styles.avatar}>{student.avatar}</span>
              <span className={styles.name}>{student.name}</span>
            </div>
            <div className={styles.right}>
              <div className={styles.bar}>
                <div
                  className={styles.fill}
                  style={{ width: `${student.adherence}%` }}
                />
              </div>
              <span className={styles.percentage}>{student.adherence}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
