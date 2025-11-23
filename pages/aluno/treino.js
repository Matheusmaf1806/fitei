import Layout from '../../components/Layout'
import styles from '../../styles/AlunoTreino.module.css'

const workouts = [
  {
    id: 1,
    name: 'Treino A - Peito/Tríceps',
    active: true,
    completed: 5,
    total: 8,
    exercises: [
      { name: 'Supino Reto', sets: '4x12', weight: '60kg', video: true },
      { name: 'Supino Inclinado', sets: '4x12', weight: '50kg', video: true },
      { name: 'Crucifixo', sets: '3x15', weight: '30kg', video: false },
      { name: 'Tríceps Testa', sets: '4x12', weight: '25kg', video: true },
      { name: 'Tríceps Corda', sets: '3x15', weight: '20kg', video: false },
    ]
  },
  {
    id: 2,
    name: 'Treino B - Costas/Bíceps',
    active: false,
    completed: 0,
    total: 0,
    exercises: [
      { name: 'Puxada Frente', sets: '4x12', weight: '50kg', video: true },
      { name: 'Remada Curvada', sets: '4x10', weight: '60kg', video: true },
      { name: 'Remada Cavalinho', sets: '3x12', weight: '40kg', video: false },
      { name: 'Rosca Direta', sets: '4x12', weight: '20kg', video: true },
      { name: 'Rosca Martelo', sets: '3x15', weight: '15kg', video: false },
    ]
  },
  {
    id: 3,
    name: 'Treino C - Pernas',
    active: false,
    completed: 0,
    total: 0,
    exercises: [
      { name: 'Agachamento', sets: '4x12', weight: '80kg', video: true },
      { name: 'Leg Press', sets: '4x15', weight: '120kg', video: true },
      { name: 'Cadeira Extensora', sets: '3x15', weight: '40kg', video: false },
      { name: 'Mesa Flexora', sets: '3x15', weight: '35kg', video: false },
      { name: 'Panturrilha', sets: '4x20', weight: '60kg', video: false },
    ]
  }
]

export default function AlunoTreino() {
  return (
    <Layout userType="aluno">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Meus Treinos</h1>
          <p className={styles.subtitle}>Confira seus treinos e acompanhe seu progresso</p>
        </div>

        <div className={styles.workouts}>
          {workouts.map(workout => (
            <div key={workout.id} className={`${styles.workout} ${workout.active ? styles.active : ''}`}>
              <div className={styles.workoutHeader}>
                <div>
                  <h3 className={styles.workoutName}>{workout.name}</h3>
                  {workout.active && (
                    <span className={styles.todayBadge}>Hoje 🎯</span>
                  )}
                </div>
                {workout.completed > 0 && (
                  <div className={styles.progress}>
                    <span className={styles.progressText}>{workout.completed}/{workout.total} treinos</span>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${(workout.completed / workout.total) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.exercises}>
                {workout.exercises.map((exercise, index) => (
                  <div key={index} className={styles.exercise}>
                    <div className={styles.exerciseInfo}>
                      <span className={styles.exerciseNumber}>{index + 1}</span>
                      <div className={styles.exerciseDetails}>
                        <div className={styles.exerciseName}>
                          {exercise.name}
                          {exercise.video && <span className={styles.videoIcon}>📹</span>}
                        </div>
                        <div className={styles.exerciseSets}>
                          {exercise.sets} - {exercise.weight}
                        </div>
                      </div>
                    </div>
                    <button className={styles.exerciseBtn}>
                      Ver
                    </button>
                  </div>
                ))}
              </div>

              {workout.active && (
                <button className={styles.startBtn}>
                  Iniciar Treino Completo
                </button>
              )}
            </div>
          ))}
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>💪</span>
            <div>
              <div className={styles.statValue}>15</div>
              <div className={styles.statLabel}>Treinos este mês</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>🔥</span>
            <div>
              <div className={styles.statValue}>5</div>
              <div className={styles.statLabel}>Dias seguidos</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>📊</span>
            <div>
              <div className={styles.statValue}>87%</div>
              <div className={styles.statLabel}>Taxa de adesão</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>⏱️</span>
            <div>
              <div className={styles.statValue}>45min</div>
              <div className={styles.statLabel}>Tempo médio</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
