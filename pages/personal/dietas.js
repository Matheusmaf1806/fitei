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
  faFilePdf
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

export default function PersonalDietas() {
  const router = useRouter()

  const handleCreateDiet = () => {
    router.push('/personal/criar-dieta')
  }

  const handleEditDiet = (dietName) => {
    alert(`Editando dieta: ${dietName}`)
  }

  const handleDuplicateDiet = (dietName) => {
    alert(`Duplicando dieta: ${dietName}`)
  }

  const handleSendDiet = (dietName) => {
    alert(`Enviando dieta "${dietName}" para alunos`)
  }

  const handleToolClick = (toolName) => {
    alert(`Abrindo ferramenta: ${toolName}`)
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
                <button className={styles.actionBtn} onClick={() => handleEditDiet(diet.name)}>
                  <FontAwesomeIcon icon={faPen} /> Editar
                </button>
                <button className={styles.actionBtn} onClick={() => handleDuplicateDiet(diet.name)}>
                  <FontAwesomeIcon icon={faCopy} /> Duplicar
                </button>
                <button className={styles.actionBtn} onClick={() => handleSendDiet(diet.name)}>
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
              onClick={() => handleToolClick('Calculadora de Macros')}
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
              onClick={() => handleToolClick('Envio via WhatsApp')}
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
              onClick={() => handleToolClick('Gerar PDF')}
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
      </div>
    </Layout>
  )
}
