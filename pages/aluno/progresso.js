import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faScaleBalanced,
  faDumbbell,
  faChartBar,
  faFire,
  faCamera,
  faExpand,
  faPersonRunning,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import Layout from '../../components/Layout'
import styles from '../../styles/AlunoProgresso.module.css'

const weightData = [
  { month: 'Jan', weight: 85.5 },
  { month: 'Fev', weight: 84.2 },
  { month: 'Mar', weight: 82.8 },
  { month: 'Abr', weight: 81.5 },
  { month: 'Mai', weight: 80.3 },
  { month: 'Jun', weight: 79.0 },
]

const strengthData = [
  { exercise: 'Supino', weight: 60 },
  { exercise: 'Agachamento', weight: 80 },
  { exercise: 'Levantamento Terra', weight: 100 },
  { exercise: 'Rosca', weight: 20 },
  { exercise: 'Desenvolvimento', weight: 45 },
]

const photos = [
  { id: 1, date: 'Jan 2024', icon: faCamera, type: 'before' },
  { id: 2, date: 'Mar 2024', icon: faCamera, type: 'progress' },
  { id: 3, date: 'Jun 2024', icon: faCamera, type: 'current' },
]

export default function AlunoProgresso() {
  return (
    <Layout userType="aluno">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Meu Progresso</h1>
          <p className={styles.subtitle}>Acompanhe sua evolução ao longo do tempo</p>
        </div>

        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FontAwesomeIcon icon={faScaleBalanced} />
            </div>
            <div>
              <div className={styles.statValue}>-6.5kg</div>
              <div className={styles.statLabel}>Peso perdido</div>
              <div className={styles.statPeriod}>Últimos 6 meses</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FontAwesomeIcon icon={faDumbbell} />
            </div>
            <div>
              <div className={styles.statValue}>+25kg</div>
              <div className={styles.statLabel}>Força no supino</div>
              <div className={styles.statPeriod}>Desde o início</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FontAwesomeIcon icon={faChartBar} />
            </div>
            <div>
              <div className={styles.statValue}>87%</div>
              <div className={styles.statLabel}>Adesão média</div>
              <div className={styles.statPeriod}>Este mês</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FontAwesomeIcon icon={faFire} />
            </div>
            <div>
              <div className={styles.statValue}>72</div>
              <div className={styles.statLabel}>Treinos realizados</div>
              <div className={styles.statPeriod}>Últimos 3 meses</div>
            </div>
          </div>
        </div>

        <div className={styles.charts}>
          <div className={styles.chart}>
            <h3 className={styles.chartTitle}>Evolução de Peso</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  stroke="#999"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#999"
                  style={{ fontSize: '12px' }}
                  domain={[75, 90]}
                />
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '12px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="var(--primary)"
                  strokeWidth={3}
                  dot={{ fill: 'var(--primary)', r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.chart}>
            <h3 className={styles.chartTitle}>Carga Máxima por Exercício</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={strengthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="exercise"
                  stroke="#999"
                  style={{ fontSize: '11px' }}
                  angle={-15}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  stroke="#999"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '12px'
                  }}
                />
                <Bar
                  dataKey="weight"
                  fill="var(--primary)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.photos}>
          <div className={styles.photosHeader}>
            <h3 className={styles.photosTitle}>Timeline de Fotos</h3>
            <button className={styles.addPhotoBtn}>+ Adicionar Foto</button>
          </div>
          <div className={styles.photoGrid}>
            {photos.map(photo => (
              <div key={photo.id} className={styles.photo}>
                <div className={styles.photoPlaceholder}>
                  <span className={styles.photoEmoji}>
                    <FontAwesomeIcon icon={photo.icon} />
                  </span>
                  <span className={styles.photoLabel}>{photo.type}</span>
                </div>
                <div className={styles.photoDate}>{photo.date}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.measurements}>
          <h3 className={styles.measurementsTitle}>Medidas Corporais</h3>
          <div className={styles.measurementGrid}>
            <div className={styles.measurement}>
              <div className={styles.measurementIcon}>
                <FontAwesomeIcon icon={faDumbbell} />
              </div>
              <div className={styles.measurementName}>Braço</div>
              <div className={styles.measurementValue}>38cm</div>
              <div className={styles.measurementChange}>+2cm</div>
            </div>
            <div className={styles.measurement}>
              <div className={styles.measurementIcon}>
                <FontAwesomeIcon icon={faExpand} />
              </div>
              <div className={styles.measurementName}>Peitoral</div>
              <div className={styles.measurementValue}>105cm</div>
              <div className={styles.measurementChange}>+3cm</div>
            </div>
            <div className={styles.measurement}>
              <div className={styles.measurementIcon}>
                <FontAwesomeIcon icon={faPersonRunning} />
              </div>
              <div className={styles.measurementName}>Coxa</div>
              <div className={styles.measurementValue}>60cm</div>
              <div className={styles.measurementChange}>+4cm</div>
            </div>
            <div className={styles.measurement}>
              <div className={styles.measurementIcon}>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className={styles.measurementName}>Cintura</div>
              <div className={styles.measurementValue}>85cm</div>
              <div className={styles.measurementChange}>-8cm</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
