import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFire,
  faDrumstickBite,
  faWheatAwn,
  faLeaf,
  faCamera,
  faFilePdf,
  faComments,
  faCheck,
  faMugHot,
  faCoffee,
  faUtensils,
  faSeedling,
  faBolt,
  faBowlFood,
  faGlassWater
} from '@fortawesome/free-solid-svg-icons'
import Layout from '../../components/Layout'
import styles from '../../styles/AlunoDieta.module.css'

const initialMeals = [
  {
    id: 1,
    name: 'Café da Manhã',
    time: '07:00',
    icon: faMugHot,
    completed: true,
    items: [
      '3 ovos mexidos',
      '2 fatias de pão integral',
      '1 banana',
      'Café sem açúcar'
    ],
    macros: { calories: 450, protein: 28, carbs: 45, fat: 15 }
  },
  {
    id: 2,
    name: 'Lanche da Manhã',
    time: '10:00',
    icon: faCoffee,
    completed: true,
    items: [
      'Whey protein 30g',
      '1 maçã'
    ],
    macros: { calories: 200, protein: 25, carbs: 20, fat: 2 }
  },
  {
    id: 3,
    name: 'Almoço',
    time: '12:30',
    icon: faUtensils,
    completed: false,
    items: [
      '150g Frango grelhado',
      '100g Arroz integral',
      '80g Brócolis',
      'Salada à vontade'
    ],
    macros: { calories: 450, protein: 45, carbs: 35, fat: 8 }
  },
  {
    id: 4,
    name: 'Lanche da Tarde',
    time: '15:30',
    icon: faSeedling,
    completed: false,
    items: [
      '30g Pasta de amendoim',
      '2 torradas integrais'
    ],
    macros: { calories: 280, protein: 12, carbs: 20, fat: 16 }
  },
  {
    id: 5,
    name: 'Pré-Treino',
    time: '17:30',
    icon: faBolt,
    completed: false,
    items: [
      '1 banana',
      'Pré-treino'
    ],
    macros: { calories: 150, protein: 2, carbs: 30, fat: 1 }
  },
  {
    id: 6,
    name: 'Jantar',
    time: '20:00',
    icon: faBowlFood,
    completed: false,
    items: [
      '150g Salmão',
      'Batata doce média',
      'Legumes grelhados'
    ],
    macros: { calories: 500, protein: 40, carbs: 40, fat: 18 }
  },
  {
    id: 7,
    name: 'Ceia',
    time: '22:30',
    icon: faGlassWater,
    completed: false,
    items: [
      '200g Iogurte grego',
      '1 colher de mel'
    ],
    macros: { calories: 200, protein: 20, carbs: 18, fat: 6 }
  }
]

export default function AlunoDieta() {
  const [meals, setMeals] = useState(initialMeals)

  const toggleMeal = (id) => {
    setMeals(meals.map(meal =>
      meal.id === id ? { ...meal, completed: !meal.completed } : meal
    ))
  }

  const completedMeals = meals.filter(m => m.completed).length
  const totalMacros = meals.reduce((acc, meal) => ({
    calories: acc.calories + meal.macros.calories,
    protein: acc.protein + meal.macros.protein,
    carbs: acc.carbs + meal.macros.carbs,
    fat: acc.fat + meal.macros.fat
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 })

  const consumedMacros = meals.filter(m => m.completed).reduce((acc, meal) => ({
    calories: acc.calories + meal.macros.calories,
    protein: acc.protein + meal.macros.protein,
    carbs: acc.carbs + meal.macros.carbs,
    fat: acc.fat + meal.macros.fat
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 })

  return (
    <Layout userType="aluno">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Minha Dieta</h1>
          <p className={styles.subtitle}>Acompanhe suas refeições e nutrição diária</p>
        </div>

        <div className={styles.summary}>
          <div className={styles.adherence}>
            <div className={styles.adherenceCircle}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="#f0f0f0"
                  strokeWidth="12"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="12"
                  strokeDasharray={`${2 * Math.PI * 54}`}
                  strokeDashoffset={`${2 * Math.PI * 54 * (1 - completedMeals / meals.length)}`}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
                <text
                  x="60"
                  y="65"
                  textAnchor="middle"
                  fontSize="24"
                  fontWeight="700"
                  fill="var(--primary)"
                >
                  {Math.round((completedMeals / meals.length) * 100)}%
                </text>
              </svg>
            </div>
            <div>
              <div className={styles.adherenceLabel}>Adesão Hoje</div>
              <div className={styles.adherenceText}>{completedMeals} de {meals.length} refeições</div>
            </div>
          </div>

          <div className={styles.macros}>
            <div className={styles.macroCard}>
              <div className={styles.macroHeader}>
                <span className={styles.macroIcon}>
                  <FontAwesomeIcon icon={faFire} />
                </span>
                <span className={styles.macroName}>Calorias</span>
              </div>
              <div className={styles.macroValue}>{consumedMacros.calories}</div>
              <div className={styles.macroTotal}>de {totalMacros.calories} kcal</div>
              <div className={styles.macroBar}>
                <div
                  className={styles.macroFill}
                  style={{ width: `${(consumedMacros.calories / totalMacros.calories) * 100}%` }}
                />
              </div>
            </div>

            <div className={styles.macroCard}>
              <div className={styles.macroHeader}>
                <span className={styles.macroIcon}>
                  <FontAwesomeIcon icon={faDrumstickBite} />
                </span>
                <span className={styles.macroName}>Proteína</span>
              </div>
              <div className={styles.macroValue}>{consumedMacros.protein}g</div>
              <div className={styles.macroTotal}>de {totalMacros.protein}g</div>
              <div className={styles.macroBar}>
                <div
                  className={styles.macroFill}
                  style={{ width: `${(consumedMacros.protein / totalMacros.protein) * 100}%`, background: 'var(--success)' }}
                />
              </div>
            </div>

            <div className={styles.macroCard}>
              <div className={styles.macroHeader}>
                <span className={styles.macroIcon}>
                  <FontAwesomeIcon icon={faWheatAwn} />
                </span>
                <span className={styles.macroName}>Carboidratos</span>
              </div>
              <div className={styles.macroValue}>{consumedMacros.carbs}g</div>
              <div className={styles.macroTotal}>de {totalMacros.carbs}g</div>
              <div className={styles.macroBar}>
                <div
                  className={styles.macroFill}
                  style={{ width: `${(consumedMacros.carbs / totalMacros.carbs) * 100}%`, background: '#2196f3' }}
                />
              </div>
            </div>

            <div className={styles.macroCard}>
              <div className={styles.macroHeader}>
                <span className={styles.macroIcon}>
                  <FontAwesomeIcon icon={faLeaf} />
                </span>
                <span className={styles.macroName}>Gorduras</span>
              </div>
              <div className={styles.macroValue}>{consumedMacros.fat}g</div>
              <div className={styles.macroTotal}>de {totalMacros.fat}g</div>
              <div className={styles.macroBar}>
                <div
                  className={styles.macroFill}
                  style={{ width: `${(consumedMacros.fat / totalMacros.fat) * 100}%`, background: 'var(--warning)' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.meals}>
          {meals.map(meal => (
            <div
              key={meal.id}
              className={`${styles.meal} ${meal.completed ? styles.completed : ''}`}
            >
              <div className={styles.mealHeader}>
                <div className={styles.mealInfo}>
                  <span className={styles.mealIcon}>
                    <FontAwesomeIcon icon={meal.icon} />
                  </span>
                  <div>
                    <div className={styles.mealName}>{meal.name}</div>
                    <div className={styles.mealTime}>{meal.time}</div>
                  </div>
                </div>
                <button
                  className={styles.checkBtn}
                  onClick={() => toggleMeal(meal.id)}
                >
                  {meal.completed ? (
                    <>
                      <FontAwesomeIcon icon={faCheck} /> Feito
                    </>
                  ) : 'Marcar'}
                </button>
              </div>

              <div className={styles.mealItems}>
                {meal.items.map((item, index) => (
                  <div key={index} className={styles.item}>• {item}</div>
                ))}
              </div>

              <div className={styles.mealMacros}>
                <div className={styles.mealMacro}>
                  <span>{meal.macros.calories} cal</span>
                </div>
                <div className={styles.mealMacro}>
                  <span>P: {meal.macros.protein}g</span>
                </div>
                <div className={styles.mealMacro}>
                  <span>C: {meal.macros.carbs}g</span>
                </div>
                <div className={styles.mealMacro}>
                  <span>G: {meal.macros.fat}g</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <button className={styles.actionBtn}>
            <FontAwesomeIcon icon={faCamera} /> Enviar foto da refeição
          </button>
          <button className={styles.actionBtn}>
            <FontAwesomeIcon icon={faFilePdf} /> Ver plano completo (PDF)
          </button>
          <button className={styles.actionBtn}>
            <FontAwesomeIcon icon={faComments} /> Falar com personal
          </button>
        </div>
      </div>
    </Layout>
  )
}
