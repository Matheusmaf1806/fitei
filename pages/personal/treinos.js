import Layout from '../../components/Layout'
import styles from '../../styles/PersonalTreinos.module.css'

const workoutTemplates = [
  {
    id: 1,
    name: 'Hipertrofia - ABC',
    type: 'Musculação',
    exercises: 15,
    students: 8,
    icon: '💪'
  },
  {
    id: 2,
    name: 'Emagrecimento - Full Body',
    type: 'Musculação',
    exercises: 12,
    students: 5,
    icon: '🔥'
  },
  {
    id: 3,
    name: 'Condicionamento - HIIT',
    type: 'HIIT',
    exercises: 8,
    students: 10,
    icon: '⚡'
  },
  {
    id: 4,
    name: 'Corrida - Iniciante',
    type: 'Corrida',
    exercises: 6,
    students: 3,
    icon: '🏃'
  },
]

export default function PersonalTreinos() {
  return (
    <Layout userType="personal">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Biblioteca de Treinos</h1>
            <p className={styles.subtitle}>Crie e gerencie modelos de treino reutilizáveis</p>
          </div>
          <button className={styles.createBtn}>
            + Criar Novo Treino
          </button>
        </div>

        <div className={styles.filters}>
          <button className={`${styles.filterBtn} ${styles.active}`}>
            Todos
          </button>
          <button className={styles.filterBtn}>
            Musculação
          </button>
          <button className={styles.filterBtn}>
            HIIT
          </button>
          <button className={styles.filterBtn}>
            Corrida
          </button>
          <button className={styles.filterBtn}>
            Funcional
          </button>
        </div>

        <div className={styles.grid}>
          {workoutTemplates.map(template => (
            <div key={template.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>{template.icon}</span>
                <span className={styles.cardType}>{template.type}</span>
              </div>
              <h3 className={styles.cardTitle}>{template.name}</h3>
              <div className={styles.cardStats}>
                <div className={styles.cardStat}>
                  <span className={styles.statIcon}>📝</span>
                  <span>{template.exercises} exercícios</span>
                </div>
                <div className={styles.cardStat}>
                  <span className={styles.statIcon}>👥</span>
                  <span>{template.students} alunos</span>
                </div>
              </div>
              <div className={styles.cardActions}>
                <button className={styles.actionBtn}>✏️ Editar</button>
                <button className={styles.actionBtn}>📋 Duplicar</button>
                <button className={styles.actionBtn}>👥 Atribuir</button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.quickCreate}>
          <h3 className={styles.quickTitle}>Criação Rápida</h3>
          <div className={styles.quickGrid}>
            <div className={styles.quickCard}>
              <span className={styles.quickIcon}>💪</span>
              <span className={styles.quickLabel}>Musculação</span>
            </div>
            <div className={styles.quickCard}>
              <span className={styles.quickIcon}>🏃</span>
              <span className={styles.quickLabel}>Corrida</span>
            </div>
            <div className={styles.quickCard}>
              <span className={styles.quickIcon}>🏊</span>
              <span className={styles.quickLabel}>Natação</span>
            </div>
            <div className={styles.quickCard}>
              <span className={styles.quickIcon}>🤸</span>
              <span className={styles.quickLabel}>Funcional</span>
            </div>
            <div className={styles.quickCard}>
              <span className={styles.quickIcon}>⚡</span>
              <span className={styles.quickLabel}>HIIT</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
