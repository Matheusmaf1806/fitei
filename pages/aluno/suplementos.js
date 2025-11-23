import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGlassWater,
  faPills,
  faBolt,
  faFish,
  faSun,
  faFire,
  faClock,
  faCheck,
  faTriangleExclamation,
  faShoppingCart,
  faChartBar,
  faLightbulb,
  faDroplet
} from '@fortawesome/free-solid-svg-icons'
import Layout from '../../components/Layout'
import styles from '../../styles/AlunoSuplemento.module.css'

const initialSupplements = [
  {
    id: 1,
    name: 'Whey Protein',
    icon: faGlassWater,
    times: ['08:00', '15:30', '21:00'],
    completed: [true, false, false],
    dosage: '30g',
    stock: 85
  },
  {
    id: 2,
    name: 'Creatina',
    icon: faPills,
    times: ['08:00'],
    completed: [true],
    dosage: '5g',
    stock: 60
  },
  {
    id: 3,
    name: 'BCAA',
    icon: faBolt,
    times: ['07:00', '17:30'],
    completed: [true, false],
    dosage: '5g',
    stock: 40
  },
  {
    id: 4,
    name: 'Ômega 3',
    icon: faFish,
    times: ['12:30'],
    completed: [false],
    dosage: '1 cápsula',
    stock: 25
  },
  {
    id: 5,
    name: 'Vitamina D',
    icon: faSun,
    times: ['08:00'],
    completed: [true],
    dosage: '2000 UI',
    stock: 90
  },
  {
    id: 6,
    name: 'Pré-Treino',
    icon: faFire,
    times: ['17:30'],
    completed: [false],
    dosage: '1 dose',
    stock: 15
  }
]

export default function AlunoSuplemento() {
  const [supplements, setSupplements] = useState(initialSupplements)

  const toggleSupplement = (id, timeIndex) => {
    setSupplements(supplements.map(supp => {
      if (supp.id === id) {
        const newCompleted = [...supp.completed]
        newCompleted[timeIndex] = !newCompleted[timeIndex]
        return { ...supp, completed: newCompleted }
      }
      return supp
    }))
  }

  const totalTasks = supplements.reduce((acc, supp) => acc + supp.times.length, 0)
  const completedTasks = supplements.reduce(
    (acc, supp) => acc + supp.completed.filter(c => c).length,
    0
  )

  return (
    <Layout userType="aluno">
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Suplementação</h1>
            <p className={styles.subtitle}>Acompanhe seus suplementos e horários</p>
          </div>
          <div className={styles.todayProgress}>
            <div className={styles.progressCircle}>
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  fill="none"
                  stroke="#f0f0f0"
                  strokeWidth="8"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - completedTasks / totalTasks)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                />
                <text
                  x="40"
                  y="45"
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="700"
                  fill="var(--primary)"
                >
                  {Math.round((completedTasks / totalTasks) * 100)}%
                </text>
              </svg>
            </div>
            <div>
              <div className={styles.progressLabel}>Hoje</div>
              <div className={styles.progressText}>{completedTasks}/{totalTasks}</div>
            </div>
          </div>
        </div>

        <div className={styles.supplements}>
          {supplements.map(supplement => (
            <div key={supplement.id} className={styles.supplement}>
              <div className={styles.supplementHeader}>
                <div className={styles.supplementInfo}>
                  <span className={styles.icon}>
                    <FontAwesomeIcon icon={supplement.icon} />
                  </span>
                  <div>
                    <div className={styles.supplementName}>{supplement.name}</div>
                    <div className={styles.supplementDosage}>{supplement.dosage}</div>
                  </div>
                </div>
                <div className={styles.stock}>
                  <div className={styles.stockBar}>
                    <div
                      className={styles.stockFill}
                      style={{
                        width: `${supplement.stock}%`,
                        background: supplement.stock < 30 ? 'var(--error)' : 'var(--success)'
                      }}
                    />
                  </div>
                  <div className={styles.stockText}>
                    {supplement.stock < 30 ? (
                      <>
                        <FontAwesomeIcon icon={faTriangleExclamation} /> Acabando
                      </>
                    ) : `${supplement.stock}%`}
                  </div>
                </div>
              </div>

              <div className={styles.times}>
                {supplement.times.map((time, index) => (
                  <button
                    key={index}
                    className={`${styles.timeBtn} ${supplement.completed[index] ? styles.completed : ''}`}
                    onClick={() => toggleSupplement(supplement.id, index)}
                  >
                    <span className={styles.timeIcon}>
                      <FontAwesomeIcon icon={faClock} />
                    </span>
                    <span className={styles.timeText}>{time}</span>
                    <span className={styles.timeCheck}>
                      {supplement.completed[index] && <FontAwesomeIcon icon={faCheck} />}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <button className={styles.actionBtn}>
            + Adicionar Suplemento
          </button>
          <button className={styles.actionBtn}>
            <FontAwesomeIcon icon={faShoppingCart} /> Marcar como &quot;Acabando&quot;
          </button>
          <button className={styles.actionBtn}>
            <FontAwesomeIcon icon={faChartBar} /> Ver Histórico
          </button>
        </div>

        <div className={styles.tips}>
          <h3 className={styles.tipsTitle}>
            <FontAwesomeIcon icon={faLightbulb} /> Dicas
          </h3>
          <div className={styles.tipsList}>
            <div className={styles.tip}>
              <span className={styles.tipIcon}>
                <FontAwesomeIcon icon={faGlassWater} />
              </span>
              <div className={styles.tipText}>
                Tome o Whey Protein até 30 minutos após o treino para melhor absorção
              </div>
            </div>
            <div className={styles.tip}>
              <span className={styles.tipIcon}>
                <FontAwesomeIcon icon={faPills} />
              </span>
              <div className={styles.tipText}>
                A creatina pode ser tomada a qualquer hora, mas mantenha a consistência
              </div>
            </div>
            <div className={styles.tip}>
              <span className={styles.tipIcon}>
                <FontAwesomeIcon icon={faDroplet} />
              </span>
              <div className={styles.tipText}>
                Sempre tome seus suplementos com bastante água
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
