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
    icon: '💪'
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
    icon: '🔥'
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
    icon: '⚖️'
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
    icon: '🥩'
  },
]

export default function PersonalDietas() {
  return (
    <Layout userType="personal">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Biblioteca de Dietas</h1>
            <p className={styles.subtitle}>Crie e gerencie planos alimentares personalizados</p>
          </div>
          <button className={styles.createBtn}>
            + Criar Nova Dieta
          </button>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>📋</span>
            <div>
              <div className={styles.statValue}>{dietTemplates.length}</div>
              <div className={styles.statLabel}>Dietas criadas</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>👥</span>
            <div>
              <div className={styles.statValue}>
                {dietTemplates.reduce((acc, d) => acc + d.students, 0)}
              </div>
              <div className={styles.statLabel}>Alunos ativos</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>📊</span>
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
                <span className={styles.cardIcon}>{diet.icon}</span>
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
                  <span className={styles.infoIcon}>🍽️</span>
                  <span>{diet.meals} refeições</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoIcon}>👥</span>
                  <span>{diet.students} alunos</span>
                </div>
              </div>

              <div className={styles.cardActions}>
                <button className={styles.actionBtn}>✏️ Editar</button>
                <button className={styles.actionBtn}>📋 Duplicar</button>
                <button className={styles.actionBtn}>📤 Enviar</button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.tools}>
          <h3 className={styles.toolsTitle}>Ferramentas Rápidas</h3>
          <div className={styles.toolsGrid}>
            <div className={styles.tool}>
              <span className={styles.toolIcon}>🧮</span>
              <div className={styles.toolInfo}>
                <div className={styles.toolName}>Calculadora de Macros</div>
                <div className={styles.toolDesc}>Calcule necessidades calóricas</div>
              </div>
            </div>
            <div className={styles.tool}>
              <span className={styles.toolIcon}>📱</span>
              <div className={styles.toolInfo}>
                <div className={styles.toolName}>Envio via WhatsApp</div>
                <div className={styles.toolDesc}>Envie dietas automaticamente</div>
              </div>
            </div>
            <div className={styles.tool}>
              <span className={styles.toolIcon}>📄</span>
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
