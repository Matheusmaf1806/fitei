import { useState } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faDumbbell,
  faFire,
  faBolt,
  faPersonRunning,
  faList,
  faUsers,
  faPen,
  faCopy,
  faPersonSwimming
} from '@fortawesome/free-solid-svg-icons'
import Layout from '../../components/Layout'
import styles from '../../styles/PersonalTreinos.module.css'

const workoutTemplates = [
  {
    id: 1,
    name: 'Hipertrofia - ABC',
    type: 'Musculação',
    exercises: 15,
    students: 8,
    icon: faDumbbell
  },
  {
    id: 2,
    name: 'Emagrecimento - Full Body',
    type: 'Musculação',
    exercises: 12,
    students: 5,
    icon: faFire
  },
  {
    id: 3,
    name: 'Condicionamento - HIIT',
    type: 'HIIT',
    exercises: 8,
    students: 10,
    icon: faBolt
  },
  {
    id: 4,
    name: 'Corrida - Iniciante',
    type: 'Corrida',
    exercises: 6,
    students: 3,
    icon: faPersonRunning
  },
]

export default function PersonalTreinos() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState('Todos')

  const handleCreateWorkout = () => {
    router.push('/personal/criar-treino')
  }

  const handleEditWorkout = (workoutName) => {
    alert(`Editando treino: ${workoutName}`)
  }

  const handleDuplicateWorkout = (workoutName) => {
    alert(`Duplicando treino: ${workoutName}`)
  }

  const handleAssignWorkout = (workoutName) => {
    alert(`Atribuindo treino "${workoutName}" a alunos`)
  }

  const handleQuickCreate = (type) => {
    router.push('/personal/criar-treino')
  }

  const filteredTemplates = activeFilter === 'Todos'
    ? workoutTemplates
    : workoutTemplates.filter(t => t.type === activeFilter)

  return (
    <Layout userType="personal">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Biblioteca de Treinos</h1>
            <p className={styles.subtitle}>Crie e gerencie modelos de treino reutilizáveis</p>
          </div>
          <button className={styles.createBtn} onClick={handleCreateWorkout}>
            + Criar Novo Treino
          </button>
        </div>

        <div className={styles.filters}>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'Todos' ? styles.active : ''}`}
            onClick={() => setActiveFilter('Todos')}
          >
            Todos
          </button>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'Musculação' ? styles.active : ''}`}
            onClick={() => setActiveFilter('Musculação')}
          >
            Musculação
          </button>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'HIIT' ? styles.active : ''}`}
            onClick={() => setActiveFilter('HIIT')}
          >
            HIIT
          </button>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'Corrida' ? styles.active : ''}`}
            onClick={() => setActiveFilter('Corrida')}
          >
            Corrida
          </button>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'Funcional' ? styles.active : ''}`}
            onClick={() => setActiveFilter('Funcional')}
          >
            Funcional
          </button>
        </div>

        <div className={styles.grid}>
          {filteredTemplates.map(template => (
            <div key={template.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>
                  <FontAwesomeIcon icon={template.icon} />
                </span>
                <span className={styles.cardType}>{template.type}</span>
              </div>
              <h3 className={styles.cardTitle}>{template.name}</h3>
              <div className={styles.cardStats}>
                <div className={styles.cardStat}>
                  <span className={styles.statIcon}>
                    <FontAwesomeIcon icon={faList} />
                  </span>
                  <span>{template.exercises} exercícios</span>
                </div>
                <div className={styles.cardStat}>
                  <span className={styles.statIcon}>
                    <FontAwesomeIcon icon={faUsers} />
                  </span>
                  <span>{template.students} alunos</span>
                </div>
              </div>
              <div className={styles.cardActions}>
                <button
                  className={styles.actionBtn}
                  onClick={() => handleEditWorkout(template.name)}
                >
                  <FontAwesomeIcon icon={faPen} /> Editar
                </button>
                <button
                  className={styles.actionBtn}
                  onClick={() => handleDuplicateWorkout(template.name)}
                >
                  <FontAwesomeIcon icon={faCopy} /> Duplicar
                </button>
                <button
                  className={styles.actionBtn}
                  onClick={() => handleAssignWorkout(template.name)}
                >
                  <FontAwesomeIcon icon={faUsers} /> Atribuir
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.quickCreate}>
          <h3 className={styles.quickTitle}>Criação Rápida</h3>
          <div className={styles.quickGrid}>
            <div className={styles.quickCard} onClick={() => handleQuickCreate('Musculação')}>
              <span className={styles.quickIcon}>
                <FontAwesomeIcon icon={faDumbbell} />
              </span>
              <span className={styles.quickLabel}>Musculação</span>
            </div>
            <div className={styles.quickCard} onClick={() => handleQuickCreate('Corrida')}>
              <span className={styles.quickIcon}>
                <FontAwesomeIcon icon={faPersonRunning} />
              </span>
              <span className={styles.quickLabel}>Corrida</span>
            </div>
            <div className={styles.quickCard} onClick={() => handleQuickCreate('Natação')}>
              <span className={styles.quickIcon}>
                <FontAwesomeIcon icon={faPersonSwimming} />
              </span>
              <span className={styles.quickLabel}>Natação</span>
            </div>
            <div className={styles.quickCard} onClick={() => handleQuickCreate('Funcional')}>
              <span className={styles.quickIcon}>
                <FontAwesomeIcon icon={faPersonRunning} />
              </span>
              <span className={styles.quickLabel}>Funcional</span>
            </div>
            <div className={styles.quickCard} onClick={() => handleQuickCreate('HIIT')}>
              <span className={styles.quickIcon}>
                <FontAwesomeIcon icon={faBolt} />
              </span>
              <span className={styles.quickLabel}>HIIT</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
