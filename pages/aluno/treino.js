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
  faBullseye,
  faPause,
  faForward,
  faBackward,
  faTrophy,
  faBolt
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
      { name: 'Supino Reto', sets: 4, reps: 12, weight: '60kg', rest: 90, video: true },
      { name: 'Supino Inclinado', sets: 4, reps: 12, weight: '50kg', rest: 90, video: true },
      { name: 'Crucifixo', sets: 3, reps: 15, weight: '30kg', rest: 60, video: false },
      { name: 'Tríceps Testa', sets: 4, reps: 12, weight: '25kg', rest: 60, video: true },
      { name: 'Tríceps Corda', sets: 3, reps: 15, weight: '20kg', rest: 60, video: false },
    ]
  },
  {
    id: 2,
    name: 'Treino B - Costas/Bíceps',
    active: false,
    completed: 0,
    total: 0,
    exercises: [
      { name: 'Puxada Frente', sets: 4, reps: 12, weight: '50kg', rest: 90, video: true },
      { name: 'Remada Curvada', sets: 4, reps: 10, weight: '60kg', rest: 90, video: true },
      { name: 'Remada Cavalinho', sets: 3, reps: 12, weight: '40kg', rest: 60, video: false },
      { name: 'Rosca Direta', sets: 4, reps: 12, weight: '20kg', rest: 60, video: true },
      { name: 'Rosca Martelo', sets: 3, reps: 15, weight: '15kg', rest: 60, video: false },
    ]
  },
  {
    id: 3,
    name: 'Treino C - Pernas',
    active: false,
    completed: 0,
    total: 0,
    exercises: [
      { name: 'Agachamento', sets: 4, reps: 12, weight: '80kg', rest: 120, video: true },
      { name: 'Leg Press', sets: 4, reps: 15, weight: '120kg', rest: 90, video: true },
      { name: 'Cadeira Extensora', sets: 3, reps: 15, weight: '40kg', rest: 60, video: false },
      { name: 'Mesa Flexora', sets: 3, reps: 15, weight: '35kg', rest: 60, video: false },
      { name: 'Panturrilha', sets: 4, reps: 20, weight: '60kg', rest: 45, video: false },
    ]
  }
]

export default function AlunoTreino() {
  const [workoutInProgress, setWorkoutInProgress] = useState(null)
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [currentSet, setCurrentSet] = useState(1)
  const [isResting, setIsResting] = useState(false)
  const [restTimer, setRestTimer] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [completedSets, setCompletedSets] = useState({})
  const [showCelebration, setShowCelebration] = useState(false)

  // Timer do treino total
  useEffect(() => {
    let interval
    if (workoutInProgress && !isResting) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [workoutInProgress, isResting])

  // Timer de descanso
  useEffect(() => {
    let interval
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => {
          if (prev <= 1) {
            setIsResting(false)
            // Vibração ao fim do descanso
            if (navigator.vibrate) {
              navigator.vibrate([200, 100, 200])
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isResting, restTimer])

  const startWorkout = (workout) => {
    setWorkoutInProgress(workout)
    setCurrentExerciseIndex(0)
    setCurrentSet(1)
    setElapsedTime(0)
    setCompletedSets({})
    setIsResting(false)
  }

  const completeSet = () => {
    const exerciseKey = `${currentExerciseIndex}-${currentSet}`
    setCompletedSets({ ...completedSets, [exerciseKey]: true })

    // Vibração de feedback
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }

    const currentExercise = workoutInProgress.exercises[currentExerciseIndex]

    if (currentSet < currentExercise.sets) {
      // Próxima série
      setCurrentSet(currentSet + 1)
      setIsResting(true)
      setRestTimer(currentExercise.rest)
    } else {
      // Próximo exercício
      if (currentExerciseIndex < workoutInProgress.exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1)
        setCurrentSet(1)
        setIsResting(true)
        setRestTimer(currentExercise.rest)
      } else {
        // Treino completo!
        finishWorkout()
      }
    }
  }

  const skipRest = () => {
    setIsResting(false)
    setRestTimer(0)
  }

  const previousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1)
      setCurrentSet(1)
      setIsResting(false)
    }
  }

  const nextExercise = () => {
    if (currentExerciseIndex < workoutInProgress.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
      setCurrentSet(1)
      setIsResting(false)
    }
  }

  const finishWorkout = () => {
    setShowCelebration(true)

    // Vibração de celebração
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100, 50, 200])
    }

    setTimeout(() => {
      setShowCelebration(false)
      setWorkoutInProgress(null)
      setCurrentExerciseIndex(0)
      setCurrentSet(1)
      setElapsedTime(0)
      setCompletedSets({})
    }, 3000)
  }

  const cancelWorkout = () => {
    if (confirm('Deseja realmente cancelar o treino?')) {
      setWorkoutInProgress(null)
      setCurrentExerciseIndex(0)
      setCurrentSet(1)
      setElapsedTime(0)
      setCompletedSets({})
      setIsResting(false)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getTotalProgress = () => {
    if (!workoutInProgress) return 0
    const totalSets = workoutInProgress.exercises.reduce((acc, ex) => acc + ex.sets, 0)
    const completedCount = Object.keys(completedSets).length
    return Math.round((completedCount / totalSets) * 100)
  }

  // Modo de treino em tela cheia
  if (workoutInProgress) {
    const currentExercise = workoutInProgress.exercises[currentExerciseIndex]
    const progress = getTotalProgress()

    // Tela de celebração
    if (showCelebration) {
      return (
        <div className={styles.celebration}>
          <div className={styles.celebrationContent}>
            <div className={styles.trophyIcon}>
              <FontAwesomeIcon icon={faTrophy} />
            </div>
            <h1 className={styles.celebrationTitle}>Treino Completo!</h1>
            <p className={styles.celebrationText}>Parabéns! Você arrasou!</p>
            <div className={styles.celebrationStats}>
              <div className={styles.celebrationStat}>
                <FontAwesomeIcon icon={faClock} />
                <span>{formatTime(elapsedTime)}</span>
              </div>
              <div className={styles.celebrationStat}>
                <FontAwesomeIcon icon={faDumbbell} />
                <span>{workoutInProgress.exercises.length} exercícios</span>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Tela de descanso
    if (isResting) {
      return (
        <div className={styles.restScreen}>
          <div className={styles.restContent}>
            <div className={styles.restHeader}>
              <button className={styles.restCancelBtn} onClick={cancelWorkout}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <div className={styles.restProgress}>
                {progress}% completo
              </div>
            </div>

            <div className={styles.restMain}>
              <div className={styles.restLabel}>Descanso</div>
              <div className={styles.restTimer}>{restTimer}s</div>
              <div className={styles.restCircle}>
                <svg viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#f0f0f0"
                    strokeWidth="2"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - restTimer / currentExercise.rest)}`}
                    transform="rotate(-90 50 50)"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className={styles.restNext}>
                <div className={styles.restNextLabel}>Próximo:</div>
                <div className={styles.restNextExercise}>
                  {currentSet <= currentExercise.sets
                    ? `${currentExercise.name} - Série ${currentSet}`
                    : currentExerciseIndex < workoutInProgress.exercises.length - 1
                      ? workoutInProgress.exercises[currentExerciseIndex + 1].name
                      : 'Finalizar treino'
                  }
                </div>
              </div>

              <button className={styles.skipRestBtn} onClick={skipRest}>
                Pular Descanso
              </button>
            </div>
          </div>
        </div>
      )
    }

    // Tela de exercício ativo
    return (
      <div className={styles.activeWorkout}>
        <div className={styles.activeHeader}>
          <button className={styles.activeCancelBtn} onClick={cancelWorkout}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className={styles.activeTitle}>{workoutInProgress.name}</div>
          <div className={styles.activeTimer}>
            <FontAwesomeIcon icon={faClock} />
            {formatTime(elapsedTime)}
          </div>
        </div>

        <div className={styles.activeProgressBar}>
          <div className={styles.activeProgressFill} style={{ width: `${progress}%` }} />
        </div>

        <div className={styles.activeContent}>
          <div className={styles.activeExerciseNumber}>
            Exercício {currentExerciseIndex + 1} de {workoutInProgress.exercises.length}
          </div>

          <div className={styles.activeExerciseName}>
            {currentExercise.name}
          </div>

          <div className={styles.activeSetInfo}>
            <div className={styles.activeSetNumber}>
              Série {currentSet} de {currentExercise.sets}
            </div>
            <div className={styles.activeSetDetails}>
              {currentExercise.reps} repetições • {currentExercise.weight}
            </div>
          </div>

          <div className={styles.activeSetsGrid}>
            {[...Array(currentExercise.sets)].map((_, i) => {
              const setNumber = i + 1
              const isCompleted = completedSets[`${currentExerciseIndex}-${setNumber}`]
              const isCurrent = setNumber === currentSet

              return (
                <div
                  key={i}
                  className={`${styles.activeSetCircle} ${
                    isCompleted ? styles.completed : ''
                  } ${isCurrent ? styles.current : ''}`}
                >
                  {isCompleted ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <span>{setNumber}</span>
                  )}
                </div>
              )
            })}
          </div>

          {currentExercise.video && (
            <button className={styles.videoBtn}>
              <FontAwesomeIcon icon={faVideo} />
              Ver Demonstração
            </button>
          )}

          <button className={styles.completeSetBtn} onClick={completeSet}>
            <FontAwesomeIcon icon={faCheck} />
            Série Completa
          </button>

          <div className={styles.activeNav}>
            <button
              className={styles.activeNavBtn}
              onClick={previousExercise}
              disabled={currentExerciseIndex === 0}
            >
              <FontAwesomeIcon icon={faBackward} />
              Anterior
            </button>
            <button
              className={styles.activeNavBtn}
              onClick={nextExercise}
              disabled={currentExerciseIndex === workoutInProgress.exercises.length - 1}
            >
              Próximo
              <FontAwesomeIcon icon={faForward} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Tela inicial de seleção de treino
  return (
    <Layout userType="aluno">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Meus Treinos</h1>
          <p className={styles.subtitle}>Escolha seu treino e comece agora</p>
        </div>

        <div className={styles.workouts}>
          {workouts.map(workout => (
            <div key={workout.id} className={`${styles.workout} ${workout.active ? styles.active : ''}`}>
              <div className={styles.workoutHeader}>
                <div className={styles.workoutInfo}>
                  <h3 className={styles.workoutName}>{workout.name}</h3>
                  {workout.active && (
                    <span className={styles.todayBadge}>
                      <FontAwesomeIcon icon={faBullseye} />
                      Treino de Hoje
                    </span>
                  )}
                </div>
                {workout.completed > 0 && (
                  <div className={styles.workoutProgress}>
                    <span className={styles.progressText}>{workout.completed}/{workout.total}</span>
                  </div>
                )}
              </div>

              <div className={styles.exercises}>
                {workout.exercises.map((exercise, index) => (
                  <div key={index} className={styles.exercise}>
                    <div className={styles.exerciseNumber}>{index + 1}</div>
                    <div className={styles.exerciseInfo}>
                      <div className={styles.exerciseName}>
                        {exercise.name}
                        {exercise.video && (
                          <span className={styles.videoIcon}>
                            <FontAwesomeIcon icon={faVideo} />
                          </span>
                        )}
                      </div>
                      <div className={styles.exerciseSets}>
                        {exercise.sets}x{exercise.reps} • {exercise.weight}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className={styles.startBtn}
                onClick={() => startWorkout(workout)}
              >
                <FontAwesomeIcon icon={faPlay} />
                Iniciar Treino
              </button>
            </div>
          ))}
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FontAwesomeIcon icon={faDumbbell} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>15</div>
              <div className={styles.statLabel}>Treinos este mês</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FontAwesomeIcon icon={faFire} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>5</div>
              <div className={styles.statLabel}>Dias seguidos</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FontAwesomeIcon icon={faChartBar} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>87%</div>
              <div className={styles.statLabel}>Taxa de adesão</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FontAwesomeIcon icon={faClock} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>45min</div>
              <div className={styles.statLabel}>Tempo médio</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
