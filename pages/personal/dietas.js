import { useState } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faDumbbell,
  faFire,
  faScaleBalanced,
  faDrumstickBite,
  faClipboard,
  faUsers,
  faChartBar,
  faUtensils,
  faPen,
  faCopy,
  faPaperPlane,
  faCalculator,
  faMobileAlt,
  faFilePdf,
  faTimes,
  faCheck
} from '@fortawesome/free-solid-svg-icons'
import Layout from '../../components/Layout'
import styles from '../../styles/PersonalDietas.module.css'

const dietTemplates = [
  {
    id: 1,
    name: 'Hipertrofia - 3000 kcal',
    calories: 3000,
    protein: 180,
    carbs: 350,
    fat: 80,
    meals: 6,
    students: 12,
    icon: faDumbbell
  },
  {
    id: 2,
    name: 'Emagrecimento - 1800 kcal',
    calories: 1800,
    protein: 140,
    carbs: 150,
    fat: 60,
    meals: 5,
    students: 8,
    icon: faFire
  },
  {
    id: 3,
    name: 'Manutenção - 2400 kcal',
    calories: 2400,
    protein: 150,
    carbs: 250,
    fat: 70,
    meals: 5,
    students: 6,
    icon: faScaleBalanced
  },
  {
    id: 4,
    name: 'Low Carb - 2000 kcal',
    calories: 2000,
    protein: 160,
    carbs: 100,
    fat: 110,
    meals: 4,
    students: 4,
    icon: faDrumstickBite
  },
]

// Mock de alunos disponíveis
const availableStudents = [
  { id: 1, name: 'João Silva', active: true },
  { id: 2, name: 'Maria Santos', active: true },
  { id: 3, name: 'Pedro Costa', active: true },
  { id: 4, name: 'Ana Oliveira', active: true },
  { id: 5, name: 'Carlos Rodrigues', active: false },
]

export default function PersonalDietas() {
  const router = useRouter()
  const [showSendModal, setShowSendModal] = useState(false)
  const [showMacroCalculator, setShowMacroCalculator] = useState(false)
  const [selectedDiet, setSelectedDiet] = useState(null)
  const [selectedStudents, setSelectedStudents] = useState([])
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [goal, setGoal] = useState('maintenance')

  const handleCreateDiet = () => {
    router.push('/personal/criar-dieta')
  }

  const handleEditDiet = (diet) => {
    // Em produção, passaria o ID da dieta via query params
    router.push(`/personal/criar-dieta?edit=${diet.id}`)
  }

  const handleDuplicateDiet = (diet) => {
    // Em produção, criaria uma cópia no backend
    alert(`Dieta "${diet.name}" duplicada com sucesso!\nNova dieta: "${diet.name} (Cópia)"`)
    // Poderia redirecionar para edição da cópia
    setTimeout(() => {
      router.push('/personal/criar-dieta')
    }, 1000)
  }

  const handleSendDiet = (diet) => {
    setSelectedDiet(diet)
    setSelectedStudents([])
    setShowSendModal(true)
  }

  const toggleStudent = (studentId) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    )
  }

  const confirmSendDiet = () => {
    if (selectedStudents.length === 0) {
      alert('Selecione pelo menos um aluno!')
      return
    }

    const studentNames = availableStudents
      .filter(s => selectedStudents.includes(s.id))
      .map(s => s.name)
      .join(', ')

    alert(`Dieta "${selectedDiet.name}" enviada com sucesso para:\n${studentNames}`)
    setShowSendModal(false)
  }

  const calculateMacros = () => {
    if (!weight || !height || !age) {
      alert('Preencha todos os campos!')
      return
    }

    const w = parseFloat(weight)
    const h = parseFloat(height) / 100
    const a = parseInt(age)

    // Fórmula Mifflin-St Jeor (simplificada para homem)
    const bmr = 10 * w + 6.25 * (h * 100) - 5 * a + 5

    let tdee = bmr * 1.55 // Activity level moderate

    if (goal === 'bulking') tdee += 300
    if (goal === 'cutting') tdee -= 500

    const protein = Math.round(w * 2)
    const fat = Math.round(w * 0.8)
    const carbs = Math.round((tdee - (protein * 4 + fat * 9)) / 4)

    alert(`Resultado do Cálculo:\n\nCalorias: ${Math.round(tdee)} kcal\nProteína: ${protein}g\nCarboidrato: ${carbs}g\nGordura: ${fat}g`)
  }

  const handleWhatsApp = () => {
    alert('Funcionalidade de envio via WhatsApp em desenvolvimento!\n\nEm breve você poderá enviar dietas diretamente para seus alunos via WhatsApp.')
  }

  const handleGeneratePDF = () => {
    alert('Funcionalidade de geração de PDF em desenvolvimento!\n\nEm breve você poderá gerar PDFs profissionais das suas dietas.')
  }

  return (
    <Layout userType="personal">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Biblioteca de Dietas</h1>
            <p className={styles.subtitle}>Crie e gerencie planos alimentares personalizados</p>
          </div>
          <button className={styles.createBtn} onClick={handleCreateDiet}>
            + Criar Nova Dieta
          </button>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>
              <FontAwesomeIcon icon={faClipboard} />
            </span>
            <div>
              <div className={styles.statValue}>{dietTemplates.length}</div>
              <div className={styles.statLabel}>Dietas criadas</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>
              <FontAwesomeIcon icon={faUsers} />
            </span>
            <div>
              <div className={styles.statValue}>
                {dietTemplates.reduce((acc, d) => acc + d.students, 0)}
              </div>
              <div className={styles.statLabel}>Alunos ativos</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>
              <FontAwesomeIcon icon={faChartBar} />
            </span>
            <div>
              <div className={styles.statValue}>85%</div>
              <div className={styles.statLabel}>Adesão média</div>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {dietTemplates.map(diet => (
            <div key={diet.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>
                  <FontAwesomeIcon icon={diet.icon} />
                </span>
                <span className={styles.caloriesBadge}>{diet.calories} kcal</span>
              </div>

              <h3 className={styles.cardTitle}>{diet.name}</h3>

              <div className={styles.macros}>
                <div className={styles.macro}>
                  <div className={styles.macroLabel}>Proteína</div>
                  <div className={styles.macroValue}>{diet.protein}g</div>
                </div>
                <div className={styles.macro}>
                  <div className={styles.macroLabel}>Carbo</div>
                  <div className={styles.macroValue}>{diet.carbs}g</div>
                </div>
                <div className={styles.macro}>
                  <div className={styles.macroLabel}>Gordura</div>
                  <div className={styles.macroValue}>{diet.fat}g</div>
                </div>
              </div>

              <div className={styles.cardInfo}>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>
                    <FontAwesomeIcon icon={faUtensils} />
                  </span>
                  <span>{diet.meals} refeições</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>
                    <FontAwesomeIcon icon={faUsers} />
                  </span>
                  <span>{diet.students} alunos</span>
                </div>
              </div>

              <div className={styles.cardActions}>
                <button className={styles.actionBtn} onClick={() => handleEditDiet(diet)}>
                  <FontAwesomeIcon icon={faPen} /> Editar
                </button>
                <button className={styles.actionBtn} onClick={() => handleDuplicateDiet(diet)}>
                  <FontAwesomeIcon icon={faCopy} /> Duplicar
                </button>
                <button className={styles.actionBtn} onClick={() => handleSendDiet(diet)}>
                  <FontAwesomeIcon icon={faPaperPlane} /> Enviar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.tools}>
          <h3 className={styles.toolsTitle}>Ferramentas Rápidas</h3>
          <div className={styles.toolsGrid}>
            <div
              className={styles.tool}
              onClick={() => setShowMacroCalculator(true)}
              style={{ cursor: 'pointer' }}
            >
              <span className={styles.toolIcon}>
                <FontAwesomeIcon icon={faCalculator} />
              </span>
              <div className={styles.toolInfo}>
                <div className={styles.toolName}>Calculadora de Macros</div>
                <div className={styles.toolDesc}>Calcule necessidades calóricas</div>
              </div>
            </div>
            <div
              className={styles.tool}
              onClick={handleWhatsApp}
              style={{ cursor: 'pointer' }}
            >
              <span className={styles.toolIcon}>
                <FontAwesomeIcon icon={faMobileAlt} />
              </span>
              <div className={styles.toolInfo}>
                <div className={styles.toolName}>Envio via WhatsApp</div>
                <div className={styles.toolDesc}>Envie dietas automaticamente</div>
              </div>
            </div>
            <div
              className={styles.tool}
              onClick={handleGeneratePDF}
              style={{ cursor: 'pointer' }}
            >
              <span className={styles.toolIcon}>
                <FontAwesomeIcon icon={faFilePdf} />
              </span>
              <div className={styles.toolInfo}>
                <div className={styles.toolName}>Gerar PDF</div>
                <div className={styles.toolDesc}>Crie PDFs profissionais</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de Enviar Dieta */}
        {showSendModal && selectedDiet && (
          <div className={styles.modalOverlay} onClick={() => setShowSendModal(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <div>
                  <h2>Enviar Dieta</h2>
                  <p className={styles.modalSubtitle}>
                    Selecione os alunos para receber: {selectedDiet.name}
                  </p>
                </div>
                <button className={styles.closeButton} onClick={() => setShowSendModal(false)}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className={styles.modalContent}>
                <div className={styles.studentsList}>
                  {availableStudents.map(student => (
                    <div
                      key={student.id}
                      className={`${styles.studentItem} ${selectedStudents.includes(student.id) ? styles.selected : ''}`}
                      onClick={() => toggleStudent(student.id)}
                    >
                      <div className={styles.checkbox}>
                        {selectedStudents.includes(student.id) && (
                          <FontAwesomeIcon icon={faCheck} />
                        )}
                      </div>
                      <div className={styles.studentInfo}>
                        <div className={styles.studentName}>{student.name}</div>
                        <div className={styles.studentStatus}>
                          {student.active ? 'Ativo' : 'Inativo'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.modalActions}>
                  <button className={styles.btnSecondary} onClick={() => setShowSendModal(false)}>
                    Cancelar
                  </button>
                  <button className={styles.btnPrimary} onClick={confirmSendDiet}>
                    Enviar para {selectedStudents.length} aluno{selectedStudents.length !== 1 ? 's' : ''}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Calculadora de Macros */}
        {showMacroCalculator && (
          <div className={styles.modalOverlay} onClick={() => setShowMacroCalculator(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <div>
                  <h2>Calculadora de Macros</h2>
                  <p className={styles.modalSubtitle}>
                    Calcule as necessidades calóricas e macronutrientes
                  </p>
                </div>
                <button className={styles.closeButton} onClick={() => setShowMacroCalculator(false)}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className={styles.modalContent}>
                <div className={styles.calculatorForm}>
                  <div className={styles.formGroup}>
                    <label>Peso (kg)</label>
                    <input
                      type="number"
                      className={styles.input}
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="Ex: 75"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Altura (cm)</label>
                    <input
                      type="number"
                      className={styles.input}
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="Ex: 175"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Idade</label>
                    <input
                      type="number"
                      className={styles.input}
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="Ex: 30"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Objetivo</label>
                    <select
                      className={styles.select}
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                    >
                      <option value="cutting">Emagrecimento</option>
                      <option value="maintenance">Manutenção</option>
                      <option value="bulking">Ganho de Massa</option>
                    </select>
                  </div>
                </div>
                <div className={styles.modalActions}>
                  <button className={styles.btnSecondary} onClick={() => setShowMacroCalculator(false)}>
                    Cancelar
                  </button>
                  <button className={styles.btnPrimary} onClick={calculateMacros}>
                    <FontAwesomeIcon icon={faCalculator} />
                    Calcular
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
