import { useState } from 'react'
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
  faGripVertical
} from '@fortawesome/free-solid-svg-icons'
import Layout from '../../components/Layout'
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
  const [workoutName, setWorkoutName] = useState('')
  const [workoutType, setWorkoutType] = useState('Musculação')
  const [selectedExercises, setSelectedExercises] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMuscle, setSelectedMuscle] = useState('all')
  const [showExerciseModal, setShowExerciseModal] = useState(false)

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

  const handleSaveWorkout = () => {
    if (!workoutName.trim()) {
      alert('Por favor, dê um nome ao treino')
      return
    }

    if (selectedExercises.length === 0) {
      alert('Adicione pelo menos um exercício ao treino')
      return
    }

    // Aqui você salvaria no banco de dados
    alert(`Treino "${workoutName}" salvo com sucesso!\n${selectedExercises.length} exercícios adicionados.`)
    router.push('/personal/treinos')
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

  return (
    <Layout userType="personal">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Criar Novo Treino</h1>
            <p className={styles.subtitle}>Monte um treino completo para seus alunos</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.btnSecondary} onClick={() => router.back()}>
              Cancelar
            </button>
            <button className={styles.btnPrimary} onClick={handleSaveWorkout}>
              <FontAwesomeIcon icon={faSave} />
              Salvar Treino
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.mainPanel}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Informações do Treino</h3>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Nome do Treino</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Ex: Treino A - Peito e Tríceps"
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Tipo de Treino</label>
                  <select
                    className={styles.select}
                    value={workoutType}
                    onChange={(e) => setWorkoutType(e.target.value)}
                  >
                    <option>Musculação</option>
                    <option>Funcional</option>
                    <option>HIIT</option>
                    <option>Cardio</option>
                    <option>Misto</option>
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
                    <div key={exercise.id} className={styles.exerciseCard}>
                      <div className={styles.exerciseHeader}>
                        <div className={styles.exerciseNumber}>{index + 1}</div>
                        <div className={styles.exerciseInfo}>
                          <div className={styles.exerciseName}>{exercise.name}</div>
                          <div className={styles.exerciseMeta}>
                            {exercise.muscle} • {exercise.equipment}
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
                            className={styles.iconBtn}
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
                        <input
                          type="text"
                          className={styles.notesInput}
                          placeholder="Observações (opcional)"
                          value={exercise.notes}
                          onChange={(e) =>
                            handleUpdateExercise(exercise.id, 'notes', e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal de Adicionar Exercício */}
        {showExerciseModal && (
          <div className={styles.modal} onClick={() => setShowExerciseModal(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>Adicionar Exercício</h2>
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

                <select
                  className={styles.muscleFilter}
                  value={selectedMuscle}
                  onChange={(e) => setSelectedMuscle(e.target.value)}
                >
                  <option value="all">Todos os Grupos</option>
                  {Object.keys(exercisesDatabase).map(muscle => (
                    <option key={muscle} value={muscle}>{muscle}</option>
                  ))}
                </select>
              </div>

              <div className={styles.exerciseGrid}>
                {filteredExercises.map((exercise, index) => (
                  <div
                    key={index}
                    className={styles.exerciseOption}
                    onClick={() => handleAddExercise(exercise)}
                  >
                    <div className={styles.optionName}>{exercise.name}</div>
                    <div className={styles.optionMeta}>
                      <span className={styles.optionBadge}>{exercise.muscle}</span>
                      <span className={styles.optionEquipment}>{exercise.equipment}</span>
                    </div>
                    <div className={styles.optionDifficulty}>
                      {exercise.difficulty}
                    </div>
                  </div>
                ))}

                {filteredExercises.length === 0 && (
                  <div className={styles.noResults}>
                    Nenhum exercício encontrado
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
