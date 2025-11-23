import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import styles from '../styles/AdherenceChart.module.css'

const data = [
  { day: 'Seg', diet: 85, workout: 100 },
  { day: 'Ter', diet: 90, workout: 100 },
  { day: 'Qua', diet: 95, workout: 100 },
  { day: 'Qui', diet: 80, workout: 0 },
  { day: 'Sex', diet: 85, workout: 100 },
  { day: 'Sáb', diet: 75, workout: 100 },
  { day: 'Dom', diet: 70, workout: 0 },
]

export default function AdherenceChart() {
  const avgDiet = Math.round(data.reduce((sum, d) => sum + d.diet, 0) / data.length)
  const avgWorkout = Math.round(data.reduce((sum, d) => sum + d.workout, 0) / data.length)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Adesão Semanal</h3>
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span className={styles.dot} style={{ background: 'var(--primary)' }}></span>
            <span>Dieta ({avgDiet}%)</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.dot} style={{ background: 'var(--success)' }}></span>
            <span>Treino ({avgWorkout}%)</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="day"
            stroke="#999"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#999"
            style={{ fontSize: '12px' }}
            domain={[0, 100]}
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
            dataKey="diet"
            stroke="var(--primary)"
            strokeWidth={3}
            dot={{ fill: 'var(--primary)', r: 5 }}
            activeDot={{ r: 7 }}
          />
          <Line
            type="monotone"
            dataKey="workout"
            stroke="var(--success)"
            strokeWidth={3}
            dot={{ fill: 'var(--success)', r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
