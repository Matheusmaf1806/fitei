import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faMedal, faStar } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/StudentRanking.module.css'

const mockStudents = [
  { name: 'João Silva', adherence: 95, icon: faTrophy, iconColor: '#FFD700' },
  { name: 'Maria Santos', adherence: 92, icon: faMedal, iconColor: '#C0C0C0' },
  { name: 'Pedro Oliveira', adherence: 88, icon: faMedal, iconColor: '#CD7F32' },
  { name: 'Ana Costa', adherence: 85, icon: faStar, iconColor: '#e53a25' },
  { name: 'Carlos Souza', adherence: 82, icon: faStar, iconColor: '#e53a25' },
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
              <span className={styles.avatar} style={{ color: student.iconColor }}>
                <FontAwesomeIcon icon={student.icon} />
              </span>
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
