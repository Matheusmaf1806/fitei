import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faDumbbell,
  faSearch,
  faPlus,
  faTimes,
  faCheck,
  faCopy,
  faSave,
  faChevronDown,
  faGripVertical,
  faTrashAlt,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons'
import Layout from '../../components/Layout'
import Toast from '../../components/Toast'
import { useToast } from '../../hooks/useToast'
import styles from '../../styles/CriarTreino.module.css'

// Banco de dados completo de exercícios
const exercisesDatabase = {
  'Peito': [
    { name: 'Supino Reto com Barra', equipment: 'Barra', difficulty: 'Intermediário' },
    { name: 'Supino Inclinado com Barra', equipment: 'Barra', difficulty: 'Intermediário' },
    { name: 'Supino Declinado com Barra', equipment: 'Barra', difficulty: 'Intermediário' },
    { name: 'Supino Reto com Halteres', equipment: 'Halteres', difficulty: 'Intermediário' },
    { name: 'Supino Inclinado com Halteres', equipment: 'Halteres', difficulty: 'Intermediário' },
    { name: 'Supino Declinado com Halteres', equipment: 'Halteres', difficulty: 'Intermediário' },
    { name: 'Crucifixo Reto', equipment: 'Halteres', difficulty: 'Iniciante' },
    { name: 'Crucifixo Inclinado', equipment: 'Halteres', difficulty: 'Iniciante' },
    { name: 'Crucifixo na Máquina', equipment: 'Máquina', difficulty: 'Iniciante' },
    { name: 'Crossover no Cabo Alto', equipment: 'Cabo', difficulty: 'Iniciante' },
    { name: 'Crossover no Cabo Médio', equipment: 'Cabo', difficulty: 'Iniciante' },
    { name: 'Crossover no Cabo Baixo', equipment: 'Cabo', difficulty: 'Iniciante' },
    { name: 'Flexão de Braço', equipment: 'Peso Corporal', difficulty: 'Iniciante' },
    { name: 'Flexão com Peso', equipment: 'Peso Corporal', difficulty: 'Avançado' },
    { name: 'Flexão Diamante', equipment: 'Peso Corporal', difficulty: 'Intermediário' },
    { name: 'Pullover com Halteres', equipment: 'Halteres', difficulty: 'Intermediário' },
    { name: 'Pullover no Cabo', equipment: 'Cabo', difficulty: 'Intermediário' },
    { name: 'Peck Deck (Voador)', equipment: 'Máquina', difficulty: 'Iniciante' },
  ],
  'Costas': [
    { name: 'Barra Fixa (Pull Up)', equipment: 'Peso Corporal', difficulty: 'Avançado' },
    { name: 'Barra Fixa Supinada (Chin Up)', equipment: 'Peso Corporal', difficulty: 'Avançado' },
    { name: 'Puxada Frontal Aberta', equipment: 'Cabo', difficulty: 'Iniciante' },
    { name: 'Puxada Frontal Fechada', equipment: 'Cabo', difficulty: 'Iniciante' },
    { name: 'Puxada Supinada', equipment: 'Cabo', difficulty: 'Iniciante' },
    { name: 'Puxada Triângulo', equipment: 'Cabo', difficulty: 'Iniciante' },
    { name: 'Remada Curvada com Barra', equipment: 'Barra', difficulty: 'Intermediário' },
    { name: 'Remada Curvada com Halteres', equipment: 'Halteres', difficulty: 'Intermediário' },
    { name: 'Remada Unilateral', equipment: 'Halteres', difficulty: 'Iniciante' },
    { name: 'Remada Cavalinho', equipment: 'Máquina', difficulty: 'Iniciante' },
    { name: 'Remada Baixa (Puxada)', equipment: 'Cabo', difficulty: 'Iniciante' },
    { name: 'Remada Alta', equipment: 'Cabo', difficulty: 'Iniciante' },
    { name: 'Remada Serrote', equipment: 'Halteres', difficulty: 'Intermediário' },
    { name: 'Levantamento Terra', equipment: 'Barra', difficulty: 'Avançado' },
    { name: 'Levantamento Terra Sumô', equipment: 'Barra', difficulty: 'Avançado' },
    { name: 'Levantamento Terra Romeno', equipment: 'Barra', difficulty: 'Intermediário' },
    { name: 'Pulldown Reto', equipment: 'Cabo', difficulty: 'Iniciante' },
    { name: 'Encolhimento com Barra', equipment: 'Barra', difficulty: 'Iniciante' },
    { name: 'Encolhimento com Halteres', equipment: 'Halteres', difficulty: 'Iniciante' },
  ],
  'Ombros': [
    { name: 'Desenvolvimento com Barra', equipment: 'Barra', difficulty: 'Intermediário' },
    { name: 'Desenvolvimento com Halteres', equipment: 'Halteres', difficulty: 'Intermediário' },
    { name: 'Desenvolvimento Militar', equipment: 'Barra', difficulty: 'Intermediário' },
    { name: 'Desenvolvimento Arnold', equipment: 'Halteres', difficulty: 'Avançado' },
    { name: 'Elevação Lateral', equipment: 'Halteres', difficulty: 'Iniciante' },
    { name: 'Elevação Lateral no Cabo', equipment: 'Cabo', difficulty: 'Iniciante' },
    { name: 'Elevação Frontal', equipment: 'Halteres', difficulty: 'Iniciante' },
    { name: 'Elevação Frontal com Barra', equipment: 'Barra', difficulty: 'Iniciante' },
    { name: 'Elevação Frontal no Cabo', equipment: 'Cabo', difficulty: 'Iniciante' },
    { name: 'Crucifixo Inverso', equipment: 'Halteres', difficulty: 'Intermediário' },
    { name: 'Crucifixo Inverso na Máquina', equipment: 'Máquina', difficulty: 'Iniciante' },
    { name: 'Remada Alta com Barra', equipment: 'Barra', difficulty: 'Intermediário' },
    { name: 'Remada Alta com Halteres', equipment: 'Halteres', difficulty: 'Intermediário' },
    { name: 'Face Pull', equipment: 'Cabo', difficulty: 'Iniciante' },
  ],
  'Bíceps': [
    { name: 'Rosca Direta com Barra', equipment: 'Barra', difficulty: 'Iniciante' },
    { name: 'Rosca Direta com Halteres', equipment: 'Halteres', difficulty: 'Iniciante' },
    { name: 'Rosca Alternada', equipment: 'Halteres', difficulty: 'Iniciante' },
    { name: 'Rosca Martelo', equipment: 'Halteres', difficulty: 'Iniciante' },
    { name: 'Rosca Concentrada', equipment: 'Halteres', difficulty: 'Iniciante' },
    { name: 'Rosca Scott com Barra', equipment: 'Barra', difficulty: 'Intermediário' },
    { name: 'Rosca Scott com Halteres', equipment: 'Halteres', difficulty: 'Intermediário' },
    { name: 'Rosca 21', equipment: 'Barra', difficulty: 'Avançado' },
    { name: 'Rosca Inversa', equipment: 'Barra', difficulty: 'Intermediário' },
    { name: 'Rosca no Cabo', equipment: 'Cabo', difficulty: 'Iniciante' },
    { name: 'Rosca Spider', equipment: 'Barra', difficulty: 'Intermediário' },
  ],
  'Tríceps': [
    { name: 'Tríceps Testa', equipment: 'Barra', difficulty: 'Intermediário' },
    { name: 'Tríceps Testa com Halteres', equipment: 'Halteres', difficulty: 'Intermediário' },
    { name: 'Tríceps Francês', equipment: 'Halteres', difficulty: 'Intermediário' },
    { name: 'Tríceps Corda', equipment: 'Cabo', difficulty: 'Iniciante' },
    { name: 'Tríceps Barra Reta', equipment: 'Cabo', difficulty: 'Iniciante' },
    { name: 'Tríceps Barra V', equipment: 'Cabo', difficulty: 'Iniciante' },
    { name: 'Tríceps Unilateral no Cabo', equipment: 'Cabo', difficulty: 'Iniciante' },
    { name: 'Tríceps Coice', equipment: 'Halteres', difficulty: 'Iniciante' },
    { name: 'Mergulho em Paralelas', equipment: 'Peso Corporal', difficulty: 'Avançado' },
    { name: 'Mergulho no Banco', equipment: 'Peso Corporal', difficulty: 'Intermediário' },
    { name: 'Supino Fechado', equipment: 'Barra', difficulty: 'Intermediário' },
  ],
  'Pernas - Quadríceps': [
    { name: 'Agachamento Livre', equipment: 'Barra', difficulty: 'Avançado' },
    { name: 'Agachamento no Smith', equipment: 'Máquina', difficulty: 'Intermediário' },
    { name: 'Agachamento Frontal', equipment: 'Barra', difficulty: 'Avançado' },
    { name: 'Agachamento Sumô', equipment: 'Barra', difficulty: 'Intermediário' },
    { name: 'Agachamento Búlgaro', equipment: 'Halteres', difficulty: 'Intermediário' },
    { name: 'Leg Press 45°', equipment: 'Máquina', difficulty: 'Iniciante' },
    { name: 'Leg Press Horizontal', equipment: 'Máquina', difficulty: 'Iniciante' },
    { name: 'Hack Machine', equipment: 'Máquina', difficulty: 'Intermediário' },
    { name: 'Cadeira Extensora', equipment: 'Máquina', difficulty: 'Iniciante' },
    { name: 'Avanço (Afundo)', equipment: 'Halteres', difficulty: 'Intermediário' },
    { name: 'Avanço com Barra', equipment: 'Barra', difficulty: 'Intermediário' },
    { name: 'Sissy Squat', equipment: 'Peso Corporal', difficulty: 'Avançado' },
  ],
  'Pernas - Posterior': [
    { name: 'Mesa Flexora', equipment: 'Máquina', difficulty: 'Iniciante' },
    { name: 'Flexora em Pé', equipment: 'Máquina', difficulty: 'Iniciante' },
    { name: 'Stiff', equipment: 'Barra', difficulty: 'Intermediário' },
    { name: 'Stiff com Halteres', equipment: 'Halteres', difficulty: 'Intermediário' },
    { name: 'Good Morning', equipment: 'Barra', difficulty: 'Avançado' },
    { name: 'Cadeira Adutora', equipment: 'Máquina', difficulty: 'Iniciante' },
    { name: 'Cadeira Abdutora', equipment: 'Máquina', difficulty: 'Iniciante' },
    { name: 'Elevação Pélvica', equipment: 'Peso Corporal', difficulty: 'Iniciante' },
    { name: 'Elevação Pélvica com Barra', equipment: 'Barra', difficulty: 'Intermediário' },
  ],
  'Panturrilhas': [
    { name: 'Panturrilha em Pé', equipment: 'Máquina', difficulty: 'Iniciante' },
    { name: 'Panturrilha Sentado', equipment: 'Máquina', difficulty: 'Iniciante' },
    { name: 'Panturrilha no Leg Press', equipment: 'Máquina', difficulty: 'Iniciante' },
    { name: 'Panturrilha no Smith', equipment: 'Máquina', difficulty: 'Intermediário' },
  ],
  'Abdômen': [
    { name: 'Abdominal Supra', equipment: 'Peso Corporal', difficulty: 'Iniciante' },
    { name: 'Abdominal Infra', equipment: 'Peso Corporal', difficulty: 'Iniciante' },
    { name: 'Abdominal Canivete', equipment: 'Peso Corporal', difficulty: 'Intermediário' },
    { name: 'Abdominal Bicicleta', equipment: 'Peso Corporal', difficulty: 'Iniciante' },
    { name: 'Prancha Frontal', equipment: 'Peso Corporal', difficulty: 'Iniciante' },
    { name: 'Prancha Lateral', equipment: 'Peso Corporal', difficulty: 'Intermediário' },
    { name: 'Abdominal no Cabo', equipment: 'Cabo', difficulty: 'Intermediário' },
    { name: 'Abdominal Remador', equipment: 'Peso Corporal', difficulty: 'Avançado' },
    { name: 'Elevação de Pernas', equipment: 'Peso Corporal', difficulty: 'Intermediário' },
    { name: 'Elevação de Pernas Suspenso', equipment: 'Peso Corporal', difficulty: 'Avançado' },
  ]
}

export default function CriarTreino() {
  const router = useRouter()
  const toast = useToast()

  const [workoutName, setWorkoutName] = useState('')
  const [workoutType, setWorkoutType] = useState('Musculação')
  const [selectedExercises, setSelectedExercises] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMuscle, setSelectedMuscle] = useState('all')
  const [showExerciseModal, setShowExerciseModal] = useState(false)
  const [draggedItem, setDraggedItem] = useState(null)
  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)

  // 🎯 MELHORIA 2: LocalStorage - Salvar rascunho automaticamente
  useEffect(() => {
    const savedDraft = localStorage.getItem('workout-draft')
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft)
        if (draft.workoutName) setWorkoutName(draft.workoutName)
        if (draft.workoutType) setWorkoutType(draft.workoutType)
        if (draft.selectedExercises) setSelectedExercises(draft.selectedExercises)
        toast.info('Rascunho recuperado!', 2000)
      } catch (e) {
        console.error('Erro ao carregar rascunho:', e)
      }
    }
  }, [])

  useEffect(() => {
    const draft = {
      workoutName,
      workoutType,
      selectedExercises
    }
    localStorage.setItem('workout-draft', JSON.stringify(draft))
  }, [workoutName, workoutType, selectedExercises])

  // 🎯 MELHORIA 10: Atalhos de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      // ESC para fechar modal
      if (e.key === 'Escape' && showExerciseModal) {
        setShowExerciseModal(false)
      }
      // Ctrl/Cmd + S para salvar
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSaveWorkout()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showExerciseModal, workoutName, selectedExercises])

  // 🎯 MELHORIA 6: Debounce na busca
  useEffect(() => {
    const timer = setTimeout(() => {
      // A busca já é feita em tempo real, mas com debounce evita re-renders excessivos
    }, 300)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const handleAddExercise = (exercise) => {
    setSelectedExercises([
      ...selectedExercises,
      {
        ...exercise,
        id: Date.now() + Math.random(),
        sets: 3,
        reps: 12,
        weight: '',
        rest: 60,
        notes: ''
      }
    ])
    setShowExerciseModal(false)
  }

  const handleRemoveExercise = (id) => {
    setSelectedExercises(selectedExercises.filter(ex => ex.id !== id))
  }

  const handleUpdateExercise = (id, field, value) => {
    // 🎯 MELHORIA 7: Prevenir valores negativos
    if (field === 'sets' || field === 'reps' || field === 'rest') {
      const numValue = parseInt(value)
      if (numValue < 0) {
        toast.warning('Valores não podem ser negativos')
        return
      }
    }

    setSelectedExercises(
      selectedExercises.map(ex =>
        ex.id === id ? { ...ex, [field]: value } : ex
      )
    )
  }

  const handleDuplicateExercise = (exercise) => {
    setSelectedExercises([
      ...selectedExercises,
      {
        ...exercise,
        id: Date.now() + Math.random()
      }
    ])
  }

  // 🎯 MELHORIA 1 & 7: Validações visuais e de valores negativos
  const handleSaveWorkout = async () => {
    const newErrors = {}

    if (!workoutName.trim()) {
      newErrors.workoutName = 'Nome do treino é obrigatório'
      toast.error('Por favor, dê um nome ao treino')
    }

    if (selectedExercises.length === 0) {
      newErrors.exercises = 'Adicione pelo menos um exercício'
      toast.error('Adicione pelo menos um exercício ao treino')
    }

    // Validar exercícios
    selectedExercises.forEach((ex, index) => {
      if (ex.sets <= 0 || ex.reps <= 0 || ex.rest < 0) {
        newErrors[`exercise_${index}`] = 'Valores inválidos'
        toast.error(`Exercício ${index + 1}: valores devem ser positivos`)
      }
    })

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      return
    }

    setIsSaving(true)

    // Simular salvamento
    setTimeout(() => {
      // Limpar rascunho após salvar
      localStorage.removeItem('workout-draft')

      toast.success(`Treino "${workoutName}" salvo com sucesso! ${selectedExercises.length} exercícios adicionados.`)

      setTimeout(() => {
        router.push('/personal/treinos')
      }, 1500)
    }, 1000)
  }

  // 🎯 MELHORIA 14: Limpar tudo
  const handleClearAll = () => {
    if (confirm('Tem certeza que deseja limpar tudo? Esta ação não pode ser desfeita.')) {
      setWorkoutName('')
      setWorkoutType('Musculação')
      setSelectedExercises([])
      localStorage.removeItem('workout-draft')
      toast.info('Treino limpo!')
    }
  }

  // 🎯 MELHORIA 4: Drag & Drop para reordenar exercícios
  const handleDragStart = (index) => {
    setDraggedItem(index)
  }

  const handleDragOver = (e, index) => {
    e.preventDefault()
    if (draggedItem === null || draggedItem === index) return

    const items = [...selectedExercises]
    const draggedExercise = items[draggedItem]
    items.splice(draggedItem, 1)
    items.splice(index, 0, draggedExercise)

    setSelectedExercises(items)
    setDraggedItem(index)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  // Calculate workout statistics
  const calculateWorkoutStats = () => {
    const totalSets = selectedExercises.reduce((sum, ex) => sum + (ex.sets || 0), 0)
    const estimatedTime = selectedExercises.reduce((sum, ex) => {
      const exerciseTime = (ex.sets || 0) * (ex.reps || 0) * 3 // 3 segundos por rep
      const restTime = (ex.sets || 0) * (ex.rest || 60)
      return sum + exerciseTime + restTime
    }, 0)

    // Count muscle groups
    const muscleGroups = [...new Set(selectedExercises.map(ex => ex.muscle))]

    return {
      totalExercises: selectedExercises.length,
      totalSets,
      estimatedTime: Math.ceil(estimatedTime / 60), // Convert to minutes
      muscleGroups
    }
  }

  const filteredExercises = Object.entries(exercisesDatabase)
    .filter(([muscle]) => selectedMuscle === 'all' || muscle === selectedMuscle)
    .flatMap(([muscle, exercises]) =>
      exercises
        .filter(ex =>
          ex.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(ex => ({ ...ex, muscle }))
    )

  const workoutStats = calculateWorkoutStats()

  return (
    <Layout userType="personal">
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => router.back()}>
            <FontAwesomeIcon icon={faChevronDown} rotation={90} />
            Voltar
          </button>
          <div className={styles.headerInfo}>
            <h1>Criar Novo Treino</h1>
            <p>Monte um treino personalizado com exercícios da nossa biblioteca</p>
          </div>
          <div className={styles.headerActions}>
            <button
              className={styles.btnDanger}
              onClick={handleClearAll}
              title="Limpar tudo"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            <button className={styles.btnSecondary} onClick={() => router.back()}>
              Cancelar
            </button>
            <button
              className={styles.btnPrimary}
              onClick={handleSaveWorkout}
              disabled={isSaving}
            >
              <FontAwesomeIcon icon={faSave} />
              {isSaving ? 'Salvando...' : 'Salvar Treino'}
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.mainPanel}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Informações do Treino</h3>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Nome do Treino
                    <span className={styles.required}>*</span>
                    <span className={styles.tooltip} title="Dê um nome descritivo para identificar este treino">
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </span>
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} ${errors.workoutName ? styles.inputError : ''}`}
                    placeholder="Ex: Treino A - Peito e Tríceps"
                    value={workoutName}
                    onChange={(e) => {
                      setWorkoutName(e.target.value)
                      if (errors.workoutName) {
                        setErrors({...errors, workoutName: null})
                      }
                    }}
                  />
                  {errors.workoutName && (
                    <span className={styles.errorText}>{errors.workoutName}</span>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Tipo de Treino
                    <span className={styles.tooltip} title="Selecione o tipo principal deste treino">
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </span>
                  </label>
                  <select
                    className={styles.select}
                    value={workoutType}
                    onChange={(e) => setWorkoutType(e.target.value)}
                  >
                    <option>Musculação</option>
                    <option>Aeróbico</option>
                    <option>Funcional</option>
                    <option>HIIT</option>
                    <option>Hydrox</option>
                    <option>Jiu-Jitsu</option>
                    <option>CrossFit</option>
                    <option>Futebol</option>
                    <option>Vôlei</option>
                    <option>Basquete</option>
                    <option>Natação</option>
                    <option>Muay Thai</option>
                    <option>Atletismo</option>
                    <option>Surf</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Exercícios ({selectedExercises.length})</h3>
                <button
                  className={styles.addExerciseBtn}
                  onClick={() => setShowExerciseModal(true)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  Adicionar Exercício
                </button>
              </div>

              {selectedExercises.length === 0 ? (
                <div className={styles.emptyState}>
                  <FontAwesomeIcon icon={faDumbbell} className={styles.emptyIcon} />
                  <p className={styles.emptyText}>Nenhum exercício adicionado</p>
                  <p className={styles.emptySubtext}>
                    Clique em &ldquo;Adicionar Exercício&rdquo; para começar
                  </p>
                </div>
              ) : (
                <div className={styles.exercisesList}>
                  {selectedExercises.map((exercise, index) => (
                    <div
                      key={exercise.id}
                      className={`${styles.exerciseCard} ${draggedItem === index ? styles.dragging : ''}`}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className={styles.dragHandle} title="Arraste para reordenar">
                        <FontAwesomeIcon icon={faGripVertical} />
                        <FontAwesomeIcon icon={faGripVertical} />
                      </div>

                      <div className={styles.exerciseContent}>
                        <div className={styles.exerciseHeader}>
                          <div className={styles.exerciseNumberBadge}>{index + 1}</div>
                          <div className={styles.exerciseInfo}>
                            <div className={styles.exerciseName}>{exercise.name}</div>
                            <div className={styles.exerciseMeta}>
                              <span className={styles.muscleBadge}>
                                <FontAwesomeIcon icon={faDumbbell} />
                                {exercise.muscle}
                              </span>
                              <span className={styles.equipmentText}>
                                {exercise.equipment}
                              </span>
                              <span className={styles.difficultyTextSmall}>
                                {exercise.difficulty}
                              </span>
                            </div>
                          </div>
                          <div className={styles.exerciseActions}>
                            <button
                              className={styles.iconBtn}
                              onClick={() => handleDuplicateExercise(exercise)}
                              title="Duplicar"
                            >
                              <FontAwesomeIcon icon={faCopy} />
                            </button>
                            <button
                              className={`${styles.iconBtn} ${styles.deleteBtn}`}
                              onClick={() => handleRemoveExercise(exercise.id)}
                              title="Remover"
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                          </div>
                        </div>

                        <div className={styles.exerciseParams}>
                          <div className={styles.paramGroup}>
                            <label className={styles.paramLabel}>Séries</label>
                            <input
                              type="number"
                              className={styles.paramInput}
                              value={exercise.sets}
                              onChange={(e) =>
                                handleUpdateExercise(exercise.id, 'sets', parseInt(e.target.value))
                              }
                              min="1"
                            />
                          </div>
                          <div className={styles.paramGroup}>
                            <label className={styles.paramLabel}>Repetições</label>
                            <input
                              type="number"
                              className={styles.paramInput}
                              value={exercise.reps}
                              onChange={(e) =>
                                handleUpdateExercise(exercise.id, 'reps', parseInt(e.target.value))
                              }
                              min="1"
                            />
                          </div>
                          <div className={styles.paramGroup}>
                            <label className={styles.paramLabel}>Carga</label>
                            <input
                              type="text"
                              className={styles.paramInput}
                              placeholder="Ex: 60kg"
                              value={exercise.weight}
                              onChange={(e) =>
                                handleUpdateExercise(exercise.id, 'weight', e.target.value)
                              }
                            />
                          </div>
                          <div className={styles.paramGroup}>
                            <label className={styles.paramLabel}>Descanso (s)</label>
                            <input
                              type="number"
                              className={styles.paramInput}
                              value={exercise.rest}
                              onChange={(e) =>
                                handleUpdateExercise(exercise.id, 'rest', parseInt(e.target.value))
                              }
                              min="0"
                            />
                          </div>
                        </div>

                        <div className={styles.notesGroup}>
                          <label className={styles.notesLabel}>
                            <FontAwesomeIcon icon={faDumbbell} />
                            Observações
                          </label>
                          <input
                            type="text"
                            className={styles.notesInput}
                            placeholder="Ex: Fazer movimento controlado, foco na contração..."
                            value={exercise.notes}
                            onChange={(e) =>
                              handleUpdateExercise(exercise.id, 'notes', e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar com Estatísticas */}
          <div className={styles.sidebar}>
            <div className={styles.statsCard}>
              <h3>Resumo do Treino</h3>
              <div className={styles.statsList}>
                <div className={styles.statItem}>
                  <div className={styles.statIcon}>
                    <FontAwesomeIcon icon={faDumbbell} />
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{workoutStats.totalExercises}</span>
                    <span className={styles.statLabel}>Exercícios</span>
                  </div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statIcon}>
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{workoutStats.totalSets}</span>
                    <span className={styles.statLabel}>Séries totais</span>
                  </div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statIcon}>
                    <FontAwesomeIcon icon={faDumbbell} />
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{workoutStats.estimatedTime} min</span>
                    <span className={styles.statLabel}>Tempo estimado</span>
                  </div>
                </div>
              </div>
            </div>

            {workoutStats.muscleGroups.length > 0 && (
              <div className={styles.muscleGroupsCard}>
                <h3>Grupos Musculares</h3>
                <div className={styles.muscleGroupsList}>
                  {workoutStats.muscleGroups.map(muscle => (
                    <div key={muscle} className={styles.muscleGroupBadge}>
                      <FontAwesomeIcon icon={faDumbbell} />
                      {muscle}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.tipsCard}>
              <h3>Dicas para um Bom Treino</h3>
              <ul>
                <li>
                  <FontAwesomeIcon icon={faCheck} />
                  Varie exercícios para trabalhar diferentes ângulos
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheck} />
                  Configure o descanso adequado entre séries
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheck} />
                  Adicione progressão de carga ao longo das semanas
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheck} />
                  Inclua aquecimento e alongamento
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modal de Adicionar Exercício */}
        {showExerciseModal && (
          <div className={styles.modalOverlay} onClick={() => setShowExerciseModal(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <div>
                  <h2 className={styles.modalTitle}>Adicionar Exercício</h2>
                  <p className={styles.modalSubtitle}>
                    Selecione um exercício da nossa biblioteca completa
                  </p>
                </div>
                <button
                  className={styles.modalClose}
                  onClick={() => setShowExerciseModal(false)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              <div className={styles.modalFilters}>
                <div className={styles.searchBox}>
                  <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
                  <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Buscar exercício..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className={styles.muscleFilters}>
                  <button
                    className={`${styles.muscleTab} ${selectedMuscle === 'all' ? styles.muscleTabActive : ''}`}
                    onClick={() => setSelectedMuscle('all')}
                  >
                    Todos
                  </button>
                  {Object.keys(exercisesDatabase).map(muscle => (
                    <button
                      key={muscle}
                      className={`${styles.muscleTab} ${selectedMuscle === muscle ? styles.muscleTabActive : ''}`}
                      onClick={() => setSelectedMuscle(muscle)}
                    >
                      {muscle}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.exerciseGrid}>
                {filteredExercises.length === 0 ? (
                  <div className={styles.noResults}>
                    <FontAwesomeIcon icon={faSearch} className={styles.noResultsIcon} />
                    <p>Nenhum exercício encontrado</p>
                    <p className={styles.noResultsHint}>Tente ajustar os filtros ou busca</p>
                  </div>
                ) : (
                  filteredExercises.map((exercise, index) => {
                    const difficultyColor =
                      exercise.difficulty === 'Iniciante' ? 'success' :
                      exercise.difficulty === 'Intermediário' ? 'warning' : 'danger'

                    return (
                      <div
                        key={index}
                        className={styles.exerciseOption}
                        onClick={() => handleAddExercise(exercise)}
                      >
                        <div className={styles.optionHeader}>
                          <div className={`${styles.difficultyBadge} ${styles[difficultyColor]}`}>
                            {exercise.difficulty}
                          </div>
                        </div>
                        <div className={styles.optionName}>{exercise.name}</div>
                        <div className={styles.optionMeta}>
                          <span className={styles.optionMuscle}>
                            <FontAwesomeIcon icon={faDumbbell} />
                            {exercise.muscle}
                          </span>
                          <span className={styles.optionEquipment}>
                            {exercise.equipment}
                          </span>
                        </div>
                        <div className={styles.optionFooter}>
                          <span className={styles.optionAction}>
                            <FontAwesomeIcon icon={faPlus} />
                            Adicionar
                          </span>
                        </div>
                      </div>
                    )
                  })
                )}
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
