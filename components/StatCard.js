import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/StatCard.module.css'

export default function StatCard({ title, value, icon, trend, color = 'primary' }) {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <span className={styles.icon}>
          <FontAwesomeIcon icon={icon} />
        </span>
      </div>
      <div className={styles.value}>{value}</div>
      {trend && (
        <div className={`${styles.trend} ${trend.positive ? styles.positive : styles.negative}`}>
          <span>
            <FontAwesomeIcon icon={trend.positive ? faArrowUp : faArrowDown} />
          </span>
          <span>{trend.value}</span>
        </div>
      )}
    </div>
  )
}
