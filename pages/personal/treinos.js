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
  faPersonSwimming,
  faTimes
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
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [selectedWorkout, setSelectedWorkout] = useState(null)

  const handleCreateWorkout = () => {
    router.push('/personal/criar-treino')
  }

  const handleEditWorkout = (workoutId, workoutName) => {
    // Redireciona para página de edição
    router.push(`/personal/criar-treino?id=${workoutId}&edit=true`)
  }

  const handleDuplicateWorkout = (template) => {
    // Cria cópia do treino
    alert(`Treino "${template.name}" duplicado com sucesso!\nNova cópia: "${template.name} (Cópia)"`)
    // Aqui você salvaria no banco de dados
  }

  const handleAssignWorkout = (workout) => {
    setSelectedWorkout(workout)
    setShowAssignModal(true)
  }

  const handleConfirmAssign = (students) => {
    alert(`Treino "${selectedWorkout.name}" atribuído a ${students.length} aluno(s)`)
    setShowAssignModal(false)
  }

  const handleQuickCreate = (type) => {
    router.push(`/personal/criar-treino?type=${type}`)
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
                  onClick={() => handleEditWorkout(template.id, template.name)}
                >
                  <FontAwesomeIcon icon={faPen} /> Editar
                </button>
                <button
                  className={styles.actionBtn}
                  onClick={() => handleDuplicateWorkout(template)}
                >
                  <FontAwesomeIcon icon={faCopy} /> Duplicar
                </button>
                <button
                  className={styles.actionBtn}
                  onClick={() => handleAssignWorkout(template)}
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

        {/* Modal de Atribuir Treino */}
        {showAssignModal && selectedWorkout && (
          <div className={styles.modalOverlay} onClick={() => setShowAssignModal(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>Atribuir Treino</h2>
                <button className={styles.modalClose} onClick={() => setShowAssignModal(false)}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className={styles.modalContent}>
                <p className={styles.modalText}>
                  Atribuir o treino <strong>{selectedWorkout.name}</strong> a quais alunos?
                </p>
                <div className={styles.studentsList}>
                  {/* Lista de alunos mockada - substituir por dados reais */}
                  {['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa'].map((student, index) => (
                    <label key={index} className={styles.studentItem}>
                      <input type="checkbox" />
                      <span>{student}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button className={styles.btnSecondary} onClick={() => setShowAssignModal(false)}>
                  Cancelar
                </button>
                <button className={styles.btnPrimary} onClick={() => handleConfirmAssign([])}>
                  Atribuir Treino
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
