import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faDumbbell,
  faFire,
  faChartBar,
  faClock,
  faVideo,
  faPlay,
  faCheck,
  faTimes,
  faBullseye
} from '@fortawesome/free-solid-svg-icons'
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
  const [workoutInProgress, setWorkoutInProgress] = useState(null)
  const [completedExercises, setCompletedExercises] = useState([])
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    let interval
    if (workoutInProgress) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [workoutInProgress])

  const startWorkout = (workout) => {
    setWorkoutInProgress(workout)
    setCompletedExercises([])
    setElapsedTime(0)
  }

  const toggleExercise = (index) => {
    if (completedExercises.includes(index)) {
      setCompletedExercises(completedExercises.filter(i => i !== index))
    } else {
      setCompletedExercises([...completedExercises, index])
    }
  }

  const finishWorkout = () => {
    const allCompleted = completedExercises.length === workoutInProgress.exercises.length
    if (allCompleted || confirm('Você não completou todos os exercícios. Deseja finalizar mesmo assim?')) {
      alert(`Treino finalizado! Tempo: ${formatTime(elapsedTime)}`)
      setWorkoutInProgress(null)
      setCompletedExercises([])
      setElapsedTime(0)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

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
                    <span className={styles.todayBadge}>
                      Hoje <FontAwesomeIcon icon={faBullseye} />
                    </span>
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
                          {exercise.video && (
                            <span className={styles.videoIcon}>
                              <FontAwesomeIcon icon={faVideo} />
                            </span>
                          )}
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
                <button
                  className={styles.startBtn}
                  onClick={() => startWorkout(workout)}
                >
                  <FontAwesomeIcon icon={faPlay} /> Iniciar Treino Completo
                </button>
              )}
            </div>
          ))}
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>
              <FontAwesomeIcon icon={faDumbbell} />
            </span>
            <div>
              <div className={styles.statValue}>15</div>
              <div className={styles.statLabel}>Treinos este mês</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>
              <FontAwesomeIcon icon={faFire} />
            </span>
            <div>
              <div className={styles.statValue}>5</div>
              <div className={styles.statLabel}>Dias seguidos</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>
              <FontAwesomeIcon icon={faChartBar} />
            </span>
            <div>
              <div className={styles.statValue}>87%</div>
              <div className={styles.statLabel}>Taxa de adesão</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>
              <FontAwesomeIcon icon={faClock} />
            </span>
            <div>
              <div className={styles.statValue}>45min</div>
              <div className={styles.statLabel}>Tempo médio</div>
            </div>
          </div>
        </div>

        {/* Modal de Treino Ativo */}
        {workoutInProgress && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <div>
                  <h2 className={styles.modalTitle}>{workoutInProgress.name}</h2>
                  <p className={styles.modalSubtitle}>
                    {completedExercises.length} de {workoutInProgress.exercises.length} exercícios completos
                  </p>
                </div>
                <div className={styles.timer}>
                  <FontAwesomeIcon icon={faClock} />
                  <span>{formatTime(elapsedTime)}</span>
                </div>
              </div>

              <div className={styles.progressBarContainer}>
                <div
                  className={styles.progressBarFill}
                  style={{
                    width: `${(completedExercises.length / workoutInProgress.exercises.length) * 100}%`
                  }}
                />
              </div>

              <div className={styles.modalExercises}>
                {workoutInProgress.exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className={`${styles.modalExercise} ${
                      completedExercises.includes(index) ? styles.completed : ''
                    }`}
                    onClick={() => toggleExercise(index)}
                  >
                    <div className={styles.modalExerciseLeft}>
                      <span className={styles.modalExerciseNumber}>{index + 1}</span>
                      <div>
                        <div className={styles.modalExerciseName}>{exercise.name}</div>
                        <div className={styles.modalExerciseSets}>
                          {exercise.sets} - {exercise.weight}
                        </div>
                      </div>
                    </div>
                    <div className={styles.modalExerciseCheck}>
                      {completedExercises.includes(index) && (
                        <FontAwesomeIcon icon={faCheck} />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.modalActions}>
                <button
                  className={styles.modalBtnCancel}
                  onClick={() => {
                    if (confirm('Deseja cancelar o treino?')) {
                      setWorkoutInProgress(null)
                      setCompletedExercises([])
                      setElapsedTime(0)
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} /> Cancelar
                </button>
                <button
                  className={styles.modalBtnFinish}
                  onClick={finishWorkout}
                >
                  <FontAwesomeIcon icon={faCheck} /> Finalizar Treino
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
