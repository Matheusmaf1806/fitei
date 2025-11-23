import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUsers,
  faChartLine,
  faDumbbell,
  faComments,
  faTriangleExclamation,
  faCircleInfo,
  faCircleCheck,
  faUtensils,
  faChartBar
} from '@fortawesome/free-solid-svg-icons'
import Layout from '../../components/Layout'
import StatCard from '../../components/StatCard'
import QuickActions from '../../components/QuickActions'
import StudentRanking from '../../components/StudentRanking'
import styles from '../../styles/Dashboard.module.css'

export default function PersonalDashboard() {
  return (
    <Layout userType="personal">
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Bem-vindo de volta! Aqui está um resumo do seu trabalho hoje.</p>
        </div>

        <div className={styles.stats}>
          <StatCard
            title="Alunos Ativos"
            value="24"
            icon={faUsers}
            trend={{ value: '+3 este mês', positive: true }}
          />
          <StatCard
            title="Adesão Média"
            value="87%"
            icon={faChartLine}
            trend={{ value: '+5% esta semana', positive: true }}
            color="success"
          />
          <StatCard
            title="Treinos Criados"
            value="12"
            icon={faDumbbell}
            trend={{ value: '8 esta semana', positive: true }}
            color="warning"
          />
          <StatCard
            title="Mensagens"
            value="5"
            icon={faComments}
            trend={{ value: '3 não lidas', positive: false }}
            color="error"
          />
        </div>

        <div className={styles.grid}>
          <div className={styles.main}>
            <QuickActions />

            <div className={styles.alerts}>
              <h3 className={styles.sectionTitle}>Alertas</h3>
              <div className={styles.alertList}>
                <div className={`${styles.alert} ${styles.warning}`}>
                  <span className={styles.alertIcon}>
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                  </span>
                  <div className={styles.alertContent}>
                    <div className={styles.alertTitle}>3 alunos com baixa adesão</div>
                    <div className={styles.alertText}>João, Maria e Pedro estão abaixo de 70%</div>
                  </div>
                </div>
                <div className={`${styles.alert} ${styles.info}`}>
                  <span className={styles.alertIcon}>
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </span>
                  <div className={styles.alertContent}>
                    <div className={styles.alertTitle}>5 mensagens não respondidas</div>
                    <div className={styles.alertText}>Verifique suas mensagens pendentes</div>
                  </div>
                </div>
                <div className={`${styles.alert} ${styles.success}`}>
                  <span className={styles.alertIcon}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </span>
                  <div className={styles.alertContent}>
                    <div className={styles.alertTitle}>8 treinos concluídos hoje</div>
                    <div className={styles.alertText}>Seus alunos estão ativos!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.sidebar}>
            <StudentRanking />

            <div className={styles.recentActivity}>
              <h3 className={styles.sectionTitle}>Atividade Recente</h3>
              <div className={styles.activityList}>
                <div className={styles.activityItem}>
                  <span className={styles.activityIcon}>
                    <FontAwesomeIcon icon={faDumbbell} />
                  </span>
                  <div className={styles.activityContent}>
                    <div className={styles.activityTitle}>João completou treino A</div>
                    <div className={styles.activityTime}>Há 5 minutos</div>
                  </div>
                </div>
                <div className={styles.activityItem}>
                  <span className={styles.activityIcon}>
                    <FontAwesomeIcon icon={faUtensils} />
                  </span>
                  <div className={styles.activityContent}>
                    <div className={styles.activityTitle}>Maria registrou refeição</div>
                    <div className={styles.activityTime}>Há 15 minutos</div>
                  </div>
                </div>
                <div className={styles.activityItem}>
                  <span className={styles.activityIcon}>
                    <FontAwesomeIcon icon={faComments} />
                  </span>
                  <div className={styles.activityContent}>
                    <div className={styles.activityTitle}>Nova mensagem de Pedro</div>
                    <div className={styles.activityTime}>Há 1 hora</div>
                  </div>
                </div>
                <div className={styles.activityItem}>
                  <span className={styles.activityIcon}>
                    <FontAwesomeIcon icon={faChartBar} />
                  </span>
                  <div className={styles.activityContent}>
                    <div className={styles.activityTitle}>Ana atingiu meta semanal</div>
                    <div className={styles.activityTime}>Há 2 horas</div>
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
