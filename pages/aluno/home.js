import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPeace, faFire, faStar, faDumbbell, faHammer, faUtensils } from '@fortawesome/free-solid-svg-icons'
import Layout from '../../components/Layout'
import MyDayBar from '../../components/MyDayBar'
import AdherenceChart from '../../components/AdherenceChart'
import MotivationalFeed from '../../components/MotivationalFeed'
import styles from '../../styles/AlunoHome.module.css'

export default function AlunoHome() {
  return (
    <Layout userType="aluno">
      <div className={styles.home}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>
              Olá, João! <FontAwesomeIcon icon={faHandPeace} />
            </h1>
            <p className={styles.subtitle}>Hoje é dia de treinar! Vamos lá?</p>
          </div>
          <div className={styles.headerStats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Sequência</span>
              <span className={styles.statValue}>
                5 dias <FontAwesomeIcon icon={faFire} />
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Esta semana</span>
              <span className={styles.statValue}>
                87% <FontAwesomeIcon icon={faStar} />
              </span>
            </div>
          </div>
        </div>

        <MyDayBar />

        <div className={styles.grid}>
          <div className={styles.main}>
            <div className={styles.todayWorkout}>
              <div className={styles.workoutHeader}>
                <h3 className={styles.sectionTitle}>Treino de Hoje</h3>
                <span className={styles.badge}>Treino A - Peito/Tríceps</span>
              </div>
              <div className={styles.exercises}>
                <div className={styles.exercise}>
                  <div className={styles.exerciseInfo}>
                    <span className={styles.exerciseIcon}>
                      <FontAwesomeIcon icon={faDumbbell} />
                    </span>
                    <div>
                      <div className={styles.exerciseName}>Supino Reto</div>
                      <div className={styles.exerciseDetails}>4x12 - 60kg</div>
                    </div>
                  </div>
                  <button className={styles.exerciseBtn}>Iniciar</button>
                </div>
                <div className={styles.exercise}>
                  <div className={styles.exerciseInfo}>
                    <span className={styles.exerciseIcon}>
                      <FontAwesomeIcon icon={faDumbbell} />
                    </span>
                    <div>
                      <div className={styles.exerciseName}>Supino Inclinado</div>
                      <div className={styles.exerciseDetails}>4x12 - 50kg</div>
                    </div>
                  </div>
                  <button className={styles.exerciseBtn}>Iniciar</button>
                </div>
                <div className={styles.exercise}>
                  <div className={styles.exerciseInfo}>
                    <span className={styles.exerciseIcon}>
                      <FontAwesomeIcon icon={faHammer} />
                    </span>
                    <div>
                      <div className={styles.exerciseName}>Crucifixo</div>
                      <div className={styles.exerciseDetails}>3x15 - 30kg</div>
                    </div>
                  </div>
                  <button className={styles.exerciseBtn}>Iniciar</button>
                </div>
              </div>
              <button className={styles.startWorkoutBtn}>
                Iniciar Treino Completo
              </button>
            </div>

            <AdherenceChart />
          </div>

          <div className={styles.sidebar}>
            <MotivationalFeed />

            <div className={styles.nextMeal}>
              <h3 className={styles.sectionTitle}>Próxima Refeição</h3>
              <div className={styles.meal}>
                <div className={styles.mealTime}>
                  <span className={styles.mealIcon}>
                    <FontAwesomeIcon icon={faUtensils} />
                  </span>
                  <span className={styles.mealLabel}>Almoço - 12:30</span>
                </div>
                <div className={styles.mealItems}>
                  <div className={styles.mealItem}>• 150g Frango grelhado</div>
                  <div className={styles.mealItem}>• 100g Arroz integral</div>
                  <div className={styles.mealItem}>• 80g Brócolis</div>
                  <div className={styles.mealItem}>• Salada à vontade</div>
                </div>
                <div className={styles.mealMacros}>
                  <div className={styles.macro}>
                    <span className={styles.macroLabel}>Calorias</span>
                    <span className={styles.macroValue}>450</span>
                  </div>
                  <div className={styles.macro}>
                    <span className={styles.macroLabel}>Proteína</span>
                    <span className={styles.macroValue}>45g</span>
                  </div>
                  <div className={styles.macro}>
                    <span className={styles.macroLabel}>Carbo</span>
                    <span className={styles.macroValue}>35g</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
