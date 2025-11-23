import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMugHot,
  faDumbbell,
  faUtensils,
  faGlassWater,
  faCookie,
  faPills,
  faPersonRunning,
  faBowlFood,
  faCheck
} from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/MyDayBar.module.css'

export default function MyDayBar() {
  const [tasks, setTasks] = useState([
    { id: 1, label: 'Café da manhã', icon: faMugHot, completed: true },
    { id: 2, label: 'Treino matinal', icon: faDumbbell, completed: true },
    { id: 3, label: 'Almoço', icon: faUtensils, completed: false },
    { id: 4, label: '2L de água', icon: faGlassWater, completed: false },
    { id: 5, label: 'Lanche', icon: faCookie, completed: false },
    { id: 6, label: 'Suplemento pré-treino', icon: faPills, completed: false },
    { id: 7, label: 'Treino tarde', icon: faPersonRunning, completed: false },
    { id: 8, label: 'Jantar', icon: faBowlFood, completed: false },
  ])

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const completedCount = tasks.filter(t => t.completed).length
  const percentage = Math.round((completedCount / tasks.length) * 100)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Meu Dia</h2>
          <p className={styles.subtitle}>
            {completedCount} de {tasks.length} tarefas concluídas
          </p>
        </div>
        <div className={styles.progress}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="#f0f0f0"
              strokeWidth="8"
            />
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 36}`}
              strokeDashoffset={`${2 * Math.PI * 36 * (1 - percentage / 100)}`}
              strokeLinecap="round"
              transform="rotate(-90 40 40)"
            />
            <text
              x="40"
              y="45"
              textAnchor="middle"
              fontSize="20"
              fontWeight="700"
              fill="var(--primary)"
            >
              {percentage}%
            </text>
          </svg>
        </div>
      </div>

      <div className={styles.tasks}>
        {tasks.map(task => (
          <button
            key={task.id}
            className={`${styles.task} ${task.completed ? styles.completed : ''}`}
            onClick={() => toggleTask(task.id)}
          >
            <span className={styles.icon}>
              <FontAwesomeIcon icon={task.icon} />
            </span>
            <span className={styles.label}>{task.label}</span>
            <span className={styles.check}>
              {task.completed && <FontAwesomeIcon icon={faCheck} />}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
