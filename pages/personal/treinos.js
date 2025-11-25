import { useState, useEffect } from 'react'
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
  faTimes,
  faSearch,
  faFilter,
  faSortAlphaDown,
  faSortAlphaUp,
  faSortNumericDown,
  faEye,
  faHeart
} from '@fortawesome/free-solid-svg-icons'
import Layout from '../../components/Layout'
import Toast from '../../components/Toast'
import { useToast } from '../../hooks/useToast'
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
  const toast = useToast()

  const [activeFilter, setActiveFilter] = useState('Todos')
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [selectedWorkout, setSelectedWorkout] = useState(null)

  // 🎯 MELHORIAS: Novos estados
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name') // name, students, exercises
  const [sortOrder, setSortOrder] = useState('asc')
  const [favorites, setFavorites] = useState([])
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [previewWorkout, setPreviewWorkout] = useState(null)

  // Carregar favoritos do localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorite-workouts')
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (e) {
        console.error('Erro ao carregar favoritos:', e)
      }
    }
  }, [])

  const handleCreateWorkout = () => {
    router.push('/personal/criar-treino')
  }

  const handleEditWorkout = (workoutId, workoutName) => {
    // Redireciona para página de edição
    router.push(`/personal/criar-treino?id=${workoutId}&edit=true`)
  }

  const handleDuplicateWorkout = (template) => {
    toast.success(`Treino "${template.name}" duplicado com sucesso!`)
    // Aqui você salvaria no banco de dados
  }

  const handleAssignWorkout = (workout) => {
    setSelectedWorkout(workout)
    setShowAssignModal(true)
  }

  const handleConfirmAssign = (students) => {
    toast.success(`Treino "${selectedWorkout.name}" atribuído a ${students.length} aluno(s)`)
    setShowAssignModal(false)
  }

  const handleQuickCreate = (type) => {
    router.push(`/personal/criar-treino?type=${type}`)
  }

  // 🎯 MELHORIA 20: Sistema de favoritos
  const toggleFavorite = (workoutId) => {
    const newFavorites = favorites.includes(workoutId)
      ? favorites.filter(id => id !== workoutId)
      : [...favorites, workoutId]

    setFavorites(newFavorites)
    localStorage.setItem('favorite-workouts', JSON.stringify(newFavorites))

    const message = favorites.includes(workoutId)
      ? 'Removido dos favoritos'
      : 'Adicionado aos favoritos'
    toast.info(message, 2000)
  }

  // 🎯 MELHORIA 18: Preview modal
  const handlePreview = (workout) => {
    setPreviewWorkout(workout)
    setShowPreviewModal(true)
  }

  // 🎯 MELHORIA 8 & 17: Busca, filtros e ordenação
  const filteredTemplates = workoutTemplates
    .filter(t => {
      // Filtro por tipo
      if (activeFilter !== 'Todos' && t.type !== activeFilter) return false

      // Busca por nome
      if (searchTerm && !t.name.toLowerCase().includes(searchTerm.toLowerCase())) return false

      return true
    })
    .sort((a, b) => {
      let comparison = 0

      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name)
      } else if (sortBy === 'students') {
        comparison = a.students - b.students
      } else if (sortBy === 'exercises') {
        comparison = a.exercises - b.exercises
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })

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

        {/* 🎯 MELHORIA 8: Busca e Ordenação */}
        <div className={styles.searchBar}>
          <div className={styles.searchBox}>
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="Buscar treinos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.sortControls}>
            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Nome</option>
              <option value="students">Alunos</option>
              <option value="exercises">Exercícios</option>
            </select>
            <button
              className={styles.sortButton}
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              title={`Ordenar ${sortOrder === 'asc' ? 'decrescente' : 'crescente'}`}
            >
              <FontAwesomeIcon icon={sortOrder === 'asc' ? faSortAlphaDown : faSortAlphaUp} />
            </button>
          </div>
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
                <div className={styles.cardHeaderLeft}>
                  <span className={styles.cardIcon}>
                    <FontAwesomeIcon icon={template.icon} />
                  </span>
                  <span className={styles.cardType}>{template.type}</span>
                </div>
                {/* 🎯 MELHORIA 20: Botão de favorito */}
                <button
                  className={`${styles.favoriteBtn} ${favorites.includes(template.id) ? styles.favorited : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(template.id)
                  }}
                  title={favorites.includes(template.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
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
                {/* 🎯 MELHORIA 18: Preview */}
                <button
                  className={styles.actionBtn}
                  onClick={() => handlePreview(template)}
                >
                  <FontAwesomeIcon icon={faEye} /> Preview
                </button>
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

        {/* 🎯 MELHORIA 18: Modal de Preview */}
        {showPreviewModal && previewWorkout && (
          <div className={styles.modalOverlay} onClick={() => setShowPreviewModal(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <div>
                  <h2>{previewWorkout.name}</h2>
                  <p className={styles.previewType}>{previewWorkout.type}</p>
                </div>
                <button className={styles.modalClose} onClick={() => setShowPreviewModal(false)}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className={styles.modalContent}>
                <div className={styles.previewStats}>
                  <div className={styles.previewStat}>
                    <FontAwesomeIcon icon={faList} />
                    <span>{previewWorkout.exercises} exercícios</span>
                  </div>
                  <div className={styles.previewStat}>
                    <FontAwesomeIcon icon={faUsers} />
                    <span>{previewWorkout.students} alunos usando</span>
                  </div>
                </div>
                <div className={styles.previewDescription}>
                  <h4>Descrição</h4>
                  <p>Este é um treino de {previewWorkout.type} com {previewWorkout.exercises} exercícios cuidadosamente selecionados.</p>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button className={styles.btnSecondary} onClick={() => setShowPreviewModal(false)}>
                  Fechar
                </button>
                <button
                  className={styles.btnPrimary}
                  onClick={() => {
                    setShowPreviewModal(false)
                    handleEditWorkout(previewWorkout.id, previewWorkout.name)
                  }}
                >
                  Editar Treino
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notifications */}
        {toast.toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.message}
            type={t.type}
            duration={t.duration}
            onClose={() => toast.removeToast(t.id)}
          />
        ))}
      </div>
    </Layout>
  )
}
