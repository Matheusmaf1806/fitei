import { useState } from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/PersonalAlunos.module.css'

const mockStudents = [
  {
    id: 1,
    name: 'João Silva',
    avatar: '👨',
    adherence: 95,
    workouts: 15,
    status: 'active',
    lastActivity: '2h atrás',
    plan: 'Hipertrofia'
  },
  {
    id: 2,
    name: 'Maria Santos',
    avatar: '👩',
    adherence: 92,
    workouts: 14,
    status: 'active',
    lastActivity: '1h atrás',
    plan: 'Emagrecimento'
  },
  {
    id: 3,
    name: 'Pedro Oliveira',
    avatar: '👨‍🦱',
    adherence: 88,
    workouts: 13,
    status: 'active',
    lastActivity: '3h atrás',
    plan: 'Condicionamento'
  },
  {
    id: 4,
    name: 'Ana Costa',
    avatar: '👩‍🦰',
    adherence: 85,
    workouts: 12,
    status: 'active',
    lastActivity: '5h atrás',
    plan: 'Hipertrofia'
  },
  {
    id: 5,
    name: 'Carlos Souza',
    avatar: '🧔',
    adherence: 65,
    workouts: 8,
    status: 'warning',
    lastActivity: '2 dias atrás',
    plan: 'Emagrecimento'
  },
  {
    id: 6,
    name: 'Juliana Lima',
    avatar: '👱‍♀️',
    adherence: 45,
    workouts: 5,
    status: 'inactive',
    lastActivity: '5 dias atrás',
    plan: 'Condicionamento'
  },
]

export default function PersonalAlunos() {
  const [filter, setFilter] = useState('all')

  const filteredStudents = mockStudents.filter(student => {
    if (filter === 'all') return true
    if (filter === 'active') return student.status === 'active'
    if (filter === 'warning') return student.status === 'warning'
    if (filter === 'inactive') return student.status === 'inactive'
    return true
  })

  return (
    <Layout userType="personal">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Meus Alunos</h1>
            <p className={styles.subtitle}>Gerencie e acompanhe seus alunos</p>
          </div>
          <button className={styles.addBtn}>
            + Adicionar Aluno
          </button>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>24</div>
            <div className={styles.statLabel}>Total de Alunos</div>
          </div>
          <div className={`${styles.statCard} ${styles.success}`}>
            <div className={styles.statValue}>18</div>
            <div className={styles.statLabel}>Ativos</div>
          </div>
          <div className={`${styles.statCard} ${styles.warning}`}>
            <div className={styles.statValue}>4</div>
            <div className={styles.statLabel}>Atenção</div>
          </div>
          <div className={`${styles.statCard} ${styles.error}`}>
            <div className={styles.statValue}>2</div>
            <div className={styles.statLabel}>Inativos</div>
          </div>
        </div>

        <div className={styles.filters}>
          <button
            className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
            onClick={() => setFilter('all')}
          >
            Todos
          </button>
          <button
            className={`${styles.filterBtn} ${filter === 'active' ? styles.active : ''}`}
            onClick={() => setFilter('active')}
          >
            Ativos
          </button>
          <button
            className={`${styles.filterBtn} ${filter === 'warning' ? styles.active : ''}`}
            onClick={() => setFilter('warning')}
          >
            Atenção
          </button>
          <button
            className={`${styles.filterBtn} ${filter === 'inactive' ? styles.active : ''}`}
            onClick={() => setFilter('inactive')}
          >
            Inativos
          </button>
        </div>

        <div className={styles.studentGrid}>
          {filteredStudents.map(student => (
            <div key={student.id} className={`${styles.studentCard} ${styles[student.status]}`}>
              <div className={styles.studentHeader}>
                <span className={styles.avatar}>{student.avatar}</span>
                <div className={styles.studentInfo}>
                  <div className={styles.studentName}>{student.name}</div>
                  <div className={styles.studentPlan}>{student.plan}</div>
                </div>
                <div className={styles.adherenceBadge}>
                  {student.adherence}%
                </div>
              </div>

              <div className={styles.studentStats}>
                <div className={styles.studentStat}>
                  <span className={styles.statIcon}>💪</span>
                  <div>
                    <div className={styles.statNumber}>{student.workouts}</div>
                    <div className={styles.statText}>Treinos</div>
                  </div>
                </div>
                <div className={styles.studentStat}>
                  <span className={styles.statIcon}>⏱️</span>
                  <div>
                    <div className={styles.statNumber}>{student.lastActivity}</div>
                    <div className={styles.statText}>Última atividade</div>
                  </div>
                </div>
              </div>

              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${student.adherence}%` }}
                />
              </div>

              <div className={styles.studentActions}>
                <button className={styles.actionBtn}>
                  📊 Ver Detalhes
                </button>
                <button className={styles.actionBtn}>
                  💬 Mensagem
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
