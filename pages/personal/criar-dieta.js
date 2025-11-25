import { useState } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faSave,
  faPlus,
  faTrash,
  faCopy,
  faTimes,
  faSearch,
  faUtensils,
  faDrumstickBite,
  faBreadSlice,
  faAppleAlt,
  faCheese,
  faFish,
  faCarrot,
  faCookie,
  faCoffee,
  faShoppingCart,
  faCheck,
  faClipboard,
  faChevronDown,
  faChevronUp,
  faPen
} from '@fortawesome/free-solid-svg-icons'
import Layout from '../../components/Layout'
import styles from '../../styles/CriarDieta.module.css'

export default function CriarDieta() {
  const router = useRouter()
  const [dietName, setDietName] = useState('')
  const [targetCalories, setTargetCalories] = useState(2000)

  // NOVO: Array de refeições ao invés de objeto
  const [selectedMeals, setSelectedMeals] = useState([
    { id: '1', name: 'Café da Manhã', foods: [], alternatives: [] },
    { id: '2', name: 'Lanche da Manhã', foods: [], alternatives: [] },
    { id: '3', name: 'Almoço', foods: [], alternatives: [] },
    { id: '4', name: 'Lanche da Tarde', foods: [], alternatives: [] },
    { id: '5', name: 'Jantar', foods: [], alternatives: [] },
  ])

  const [showFoodModal, setShowFoodModal] = useState(false)
  const [currentMealId, setCurrentMealId] = useState(null)
  const [isAddingAlternative, setIsAddingAlternative] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showShoppingList, setShowShoppingList] = useState(false)
  const [checkedItems, setCheckedItems] = useState({})

  // NOVO: Estados para edição e alternativas
  const [editingMealId, setEditingMealId] = useState(null)
  const [editingMealName, setEditingMealName] = useState('')
  const [expandedAlternatives, setExpandedAlternatives] = useState({})

  // Database completo de alimentos
  const foodDatabase = {
    'Proteínas - Carnes': [
      { name: 'Peito de Frango Grelhado', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
      { name: 'Peito de Frango Cozido', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
      { name: 'Coxa de Frango sem Pele', calories: 119, protein: 21, carbs: 0, fat: 3.7 },
      { name: 'Carne Bovina Magra (Patinho)', calories: 158, protein: 26, carbs: 0, fat: 5.5 },
      { name: 'Carne Bovina (Alcatra)', calories: 198, protein: 23, carbs: 0, fat: 11 },
      { name: 'Carne Bovina (Filé Mignon)', calories: 206, protein: 23, carbs: 0, fat: 12 },
      { name: 'Carne Bovina Moída (Magra)', calories: 176, protein: 20, carbs: 0, fat: 10 },
      { name: 'Peru (Peito)', calories: 135, protein: 30, carbs: 0, fat: 0.7 },
    ],
    'Proteínas - Peixes': [
      { name: 'Salmão', calories: 208, protein: 20, carbs: 0, fat: 13 },
      { name: 'Atum em Água', calories: 116, protein: 26, carbs: 0, fat: 0.8 },
      { name: 'Tilápia', calories: 96, protein: 20, carbs: 0, fat: 1.7 },
      { name: 'Bacalhau', calories: 82, protein: 18, carbs: 0, fat: 0.7 },
    ],
    'Proteínas - Ovos e Laticínios': [
      { name: 'Ovo Inteiro Cozido', calories: 155, protein: 13, carbs: 1.1, fat: 11 },
      { name: 'Clara de Ovo', calories: 52, protein: 11, carbs: 0.7, fat: 0.2 },
      { name: 'Queijo Cottage', calories: 98, protein: 11, carbs: 3.4, fat: 4.3 },
      { name: 'Iogurte Grego Natural', calories: 97, protein: 10, carbs: 3.6, fat: 5 },
      { name: 'Leite Integral', calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3 },
    ],
    'Carboidratos - Cereais': [
      { name: 'Arroz Branco Cozido', calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
      { name: 'Arroz Integral Cozido', calories: 112, protein: 2.6, carbs: 24, fat: 0.9 },
      { name: 'Macarrão Cozido', calories: 131, protein: 5, carbs: 25, fat: 1.1 },
      { name: 'Aveia em Flocos', calories: 389, protein: 17, carbs: 66, fat: 7 },
      { name: 'Feijão Carioca Cozido', calories: 76, protein: 4.8, carbs: 13.6, fat: 0.5 },
    ],
    'Carboidratos - Tubérculos': [
      { name: 'Batata Doce Cozida', calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
      { name: 'Batata Inglesa Cozida', calories: 87, protein: 1.9, carbs: 20, fat: 0.1 },
      { name: 'Mandioca Cozida', calories: 125, protein: 0.6, carbs: 30, fat: 0.3 },
    ],
    'Carboidratos - Pães': [
      { name: 'Pão Francês', calories: 300, protein: 9, carbs: 58, fat: 3.1 },
      { name: 'Pão de Forma Integral', calories: 253, protein: 9, carbs: 43, fat: 4.2 },
      { name: 'Tapioca', calories: 357, protein: 0.6, carbs: 88, fat: 0.3 },
    ],
    'Vegetais': [
      { name: 'Brócolis Cozido', calories: 35, protein: 2.4, carbs: 7, fat: 0.4 },
      { name: 'Alface', calories: 15, protein: 1.4, carbs: 2.3, fat: 0.2 },
      { name: 'Tomate', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
      { name: 'Cenoura Cozida', calories: 35, protein: 0.8, carbs: 8.2, fat: 0.2 },
    ],
    'Frutas': [
      { name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
      { name: 'Maçã', calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
      { name: 'Morango', calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3 },
      { name: 'Abacate', calories: 160, protein: 2, carbs: 8.5, fat: 15 },
    ],
    'Gorduras Saudáveis': [
      { name: 'Azeite de Oliva', calories: 884, protein: 0, carbs: 0, fat: 100 },
      { name: 'Castanha do Pará', calories: 656, protein: 14, carbs: 12, fat: 66 },
      { name: 'Amendoim', calories: 567, protein: 26, carbs: 16, fat: 49 },
    ]
  }

  const getMealIcon = (mealName) => {
    const lowerName = mealName.toLowerCase()
    if (lowerName.includes('café') || lowerName.includes('manhã')) return faCoffee
    if (lowerName.includes('almoço')) return faUtensils
    if (lowerName.includes('jantar')) return faUtensils
    if (lowerName.includes('lanche')) return faCookie
    if (lowerName.includes('pré') || lowerName.includes('treino')) return faDrumstickBite
    return faUtensils
  }

  // NOVO: Adicionar refeição
  const handleAddMeal = () => {
    const newMeal = {
      id: Date.now().toString(),
      name: 'Nova Refeição',
      foods: [],
      alternatives: []
    }
    setSelectedMeals([...selectedMeals, newMeal])
  }

  // NOVO: Remover refeição
  const handleRemoveMeal = (mealId) => {
    if (selectedMeals.length <= 1) {
      alert('Você precisa ter pelo menos uma refeição!')
      return
    }
    if (confirm('Tem certeza que deseja remover esta refeição?')) {
      setSelectedMeals(selectedMeals.filter(m => m.id !== mealId))
    }
  }

  // NOVO: Iniciar edição de nome
  const handleStartEditMealName = (meal) => {
    setEditingMealId(meal.id)
    setEditingMealName(meal.name)
  }

  // NOVO: Salvar nome editado
  const handleSaveMealName = () => {
    if (!editingMealName.trim()) {
      alert('O nome da refeição não pode estar vazio')
      return
    }
    setSelectedMeals(selectedMeals.map(m =>
      m.id === editingMealId ? { ...m, name: editingMealName } : m
    ))
    setEditingMealId(null)
    setEditingMealName('')
  }

  // NOVO: Cancelar edição
  const handleCancelEditMealName = () => {
    setEditingMealId(null)
    setEditingMealName('')
  }

  // NOVO: Toggle alternativas
  const toggleAlternatives = (mealId) => {
    setExpandedAlternatives({
      ...expandedAlternatives,
      [mealId]: !expandedAlternatives[mealId]
    })
  }

  const handleOpenFoodModal = (mealId, isAlternative = false) => {
    setCurrentMealId(mealId)
    setIsAddingAlternative(isAlternative)
    setShowFoodModal(true)
    setSearchTerm('')
    setSelectedCategory('all')
  }

  const handleAddFood = (food) => {
    const foodWithPortion = {
      ...food,
      id: Date.now() + Math.random(),
      portion: 100
    }

    setSelectedMeals(selectedMeals.map(meal => {
      if (meal.id === currentMealId) {
        if (isAddingAlternative) {
          return { ...meal, alternatives: [...meal.alternatives, foodWithPortion] }
        } else {
          return { ...meal, foods: [...meal.foods, foodWithPortion] }
        }
      }
      return meal
    }))

    setShowFoodModal(false)
  }

  const handleRemoveFood = (mealId, foodId, isAlternative = false) => {
    setSelectedMeals(selectedMeals.map(meal => {
      if (meal.id === mealId) {
        if (isAlternative) {
          return { ...meal, alternatives: meal.alternatives.filter(f => f.id !== foodId) }
        } else {
          return { ...meal, foods: meal.foods.filter(f => f.id !== foodId) }
        }
      }
      return meal
    }))
  }

  const handleUpdatePortion = (mealId, foodId, newPortion, isAlternative = false) => {
    setSelectedMeals(selectedMeals.map(meal => {
      if (meal.id === mealId) {
        if (isAlternative) {
          return {
            ...meal,
            alternatives: meal.alternatives.map(f =>
              f.id === foodId ? { ...f, portion: parseFloat(newPortion) || 0 } : f
            )
          }
        } else {
          return {
            ...meal,
            foods: meal.foods.map(f =>
              f.id === foodId ? { ...f, portion: parseFloat(newPortion) || 0 } : f
            )
          }
        }
      }
      return meal
    }))
  }

  const handleDuplicateFood = (mealId, food, isAlternative = false) => {
    const duplicatedFood = {
      ...food,
      id: Date.now() + Math.random()
    }

    setSelectedMeals(selectedMeals.map(meal => {
      if (meal.id === mealId) {
        if (isAlternative) {
          return { ...meal, alternatives: [...meal.alternatives, duplicatedFood] }
        } else {
          return { ...meal, foods: [...meal.foods, duplicatedFood] }
        }
      }
      return meal
    }))
  }

  const calculateMealTotals = (foods) => {
    return foods.reduce((totals, food) => {
      const multiplier = food.portion / 100
      return {
        calories: totals.calories + (food.calories * multiplier),
        protein: totals.protein + (food.protein * multiplier),
        carbs: totals.carbs + (food.carbs * multiplier),
        fat: totals.fat + (food.fat * multiplier)
      }
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 })
  }

  const calculateDailyTotals = () => {
    let dailyTotals = { calories: 0, protein: 0, carbs: 0, fat: 0 }
    selectedMeals.forEach(meal => {
      const mealTotals = calculateMealTotals(meal.foods)
      dailyTotals.calories += mealTotals.calories
      dailyTotals.protein += mealTotals.protein
      dailyTotals.carbs += mealTotals.carbs
      dailyTotals.fat += mealTotals.fat
    })
    return dailyTotals
  }

  const handleSaveDiet = () => {
    if (!dietName.trim()) {
      alert('Por favor, dê um nome à dieta')
      return
    }

    const totalFoods = selectedMeals.reduce((sum, meal) => sum + meal.foods.length, 0)

    if (totalFoods === 0) {
      alert('Adicione pelo menos um alimento à dieta')
      return
    }

    const dailyTotals = calculateDailyTotals()
    alert(`Dieta "${dietName}" salva com sucesso!\n${selectedMeals.length} refeições\n${totalFoods} alimentos\n${dailyTotals.calories.toFixed(0)} kcal totais`)
    router.push('/personal/dietas')
  }

  const getFilteredFoods = () => {
    let allFoods = []
    const categories = selectedCategory === 'all' ? Object.keys(foodDatabase) : [selectedCategory]

    categories.forEach(category => {
      const foods = foodDatabase[category] || []
      foods.forEach(food => {
        if (food.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          allFoods.push({ ...food, category })
        }
      })
    })

    return allFoods
  }

  const dailyTotals = calculateDailyTotals()
  const calorieProgress = (dailyTotals.calories / targetCalories) * 100
  const filteredFoods = getFilteredFoods()

  return (
    <Layout userType="personal">
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => router.back()}>
            <FontAwesomeIcon icon={faArrowLeft} />
            Voltar
          </button>
          <div>
            <h1>Criar Nova Dieta</h1>
            <p>Monte uma dieta personalizada com alimentos da nossa biblioteca</p>
          </div>
          <button className={styles.saveButton} onClick={handleSaveDiet}>
            <FontAwesomeIcon icon={faSave} />
            Salvar Dieta
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.mainPanel}>
            <div className={styles.card}>
              <h3>Informações da Dieta</h3>
              <div className={styles.formRow}>
                <input
                  type="text"
                  placeholder="Nome da dieta (Ex: Dieta Hipertrofia 3000kcal)"
                  value={dietName}
                  onChange={(e) => setDietName(e.target.value)}
                  className={styles.inputLarge}
                />
                <input
                  type="number"
                  placeholder="2000"
                  value={targetCalories}
                  onChange={(e) => setTargetCalories(parseFloat(e.target.value) || 0)}
                  className={styles.inputSmall}
                />
              </div>
            </div>

            {selectedMeals.map((meal) => (
              <div key={meal.id} className={styles.mealCard}>
                <div className={styles.mealHeader}>
                  <div className={styles.mealTitle}>
                    <span className={styles.mealIcon}>
                      <FontAwesomeIcon icon={getMealIcon(meal.name)} />
                    </span>

                    {editingMealId === meal.id ? (
                      <div className={styles.editingContainer}>
                        <input
                          type="text"
                          value={editingMealName}
                          onChange={(e) => setEditingMealName(e.target.value)}
                          className={styles.editInput}
                          autoFocus
                          onKeyPress={(e) => e.key === 'Enter' && handleSaveMealName()}
                        />
                        <button onClick={handleSaveMealName} className={styles.iconButtonSmall}>
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button onClick={handleCancelEditMealName} className={styles.iconButtonSmall}>
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <h3>{meal.name}</h3>
                        <button
                          onClick={() => handleStartEditMealName(meal)}
                          className={styles.editMealButton}
                          title="Editar nome"
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                      </>
                    )}

                    {meal.foods.length > 0 && (
                      <span className={styles.foodCount}>
                        {meal.foods.length} {meal.foods.length === 1 ? 'item' : 'itens'}
                      </span>
                    )}
                  </div>

                  <div className={styles.mealActions}>
                    {meal.foods.length > 0 && (
                      <div className={styles.mealMacros}>
                        {(() => {
                          const totals = calculateMealTotals(meal.foods)
                          return (
                            <>
                              <span>{totals.calories.toFixed(0)} kcal</span>
                              <span>P: {totals.protein.toFixed(1)}g</span>
                              <span>C: {totals.carbs.toFixed(1)}g</span>
                              <span>G: {totals.fat.toFixed(1)}g</span>
                            </>
                          )
                        })()}
                      </div>
                    )}

                    <button
                      className={styles.deleteMealButton}
                      onClick={() => handleRemoveMeal(meal.id)}
                      title="Excluir refeição"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>

                {meal.foods.length > 0 && (
                  <div className={styles.foodsList}>
                    {meal.foods.map((food) => (
                      <div key={food.id} className={styles.foodItem}>
                        <div className={styles.foodInfo}>
                          <div className={styles.foodName}>{food.name}</div>
                          <div className={styles.foodMacros}>
                            {((food.calories * food.portion) / 100).toFixed(0)} kcal •
                            P: {((food.protein * food.portion) / 100).toFixed(1)}g •
                            C: {((food.carbs * food.portion) / 100).toFixed(1)}g •
                            G: {((food.fat * food.portion) / 100).toFixed(1)}g
                          </div>
                        </div>
                        <div className={styles.foodControls}>
                          <input
                            type="number"
                            value={food.portion}
                            onChange={(e) => handleUpdatePortion(meal.id, food.id, e.target.value, false)}
                            className={styles.portionInput}
                          />
                          <span className={styles.unit}>g</span>
                          <button
                            className={styles.iconButton}
                            onClick={() => handleDuplicateFood(meal.id, food, false)}
                            title="Duplicar"
                          >
                            <FontAwesomeIcon icon={faCopy} />
                          </button>
                          <button
                            className={`${styles.iconButton} ${styles.danger}`}
                            onClick={() => handleRemoveFood(meal.id, food.id, false)}
                            title="Remover"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  className={styles.addFoodButton}
                  onClick={() => handleOpenFoodModal(meal.id, false)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  Adicionar Alimento
                </button>

                {/* NOVO: Seção de Alternativas */}
                <div className={styles.alternativesSection}>
                  <button
                    className={styles.alternativesToggle}
                    onClick={() => toggleAlternatives(meal.id)}
                  >
                    <FontAwesomeIcon icon={expandedAlternatives[meal.id] ? faChevronUp : faChevronDown} />
                    <span>Opcionais / Alternativas</span>
                    {meal.alternatives.length > 0 && (
                      <span className={styles.alternativesBadge}>{meal.alternatives.length}</span>
                    )}
                  </button>

                  {expandedAlternatives[meal.id] && (
                    <div className={styles.alternativesContent}>
                      {meal.alternatives.length > 0 && (
                        <div className={styles.alternativesList}>
                          {meal.alternatives.map((food) => (
                            <div key={food.id} className={styles.foodItem}>
                              <div className={styles.foodInfo}>
                                <div className={styles.foodName}>{food.name}</div>
                                <div className={styles.foodMacros}>
                                  {((food.calories * food.portion) / 100).toFixed(0)} kcal •
                                  P: {((food.protein * food.portion) / 100).toFixed(1)}g •
                                  C: {((food.carbs * food.portion) / 100).toFixed(1)}g •
                                  G: {((food.fat * food.portion) / 100).toFixed(1)}g
                                </div>
                              </div>
                              <div className={styles.foodControls}>
                                <input
                                  type="number"
                                  value={food.portion}
                                  onChange={(e) => handleUpdatePortion(meal.id, food.id, e.target.value, true)}
                                  className={styles.portionInput}
                                />
                                <span className={styles.unit}>g</span>
                                <button
                                  className={styles.iconButton}
                                  onClick={() => handleDuplicateFood(meal.id, food, true)}
                                  title="Duplicar"
                                >
                                  <FontAwesomeIcon icon={faCopy} />
                                </button>
                                <button
                                  className={`${styles.iconButton} ${styles.danger}`}
                                  onClick={() => handleRemoveFood(meal.id, food.id, true)}
                                  title="Remover"
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <button
                        className={styles.addAlternativeButton}
                        onClick={() => handleOpenFoodModal(meal.id, true)}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                        Adicionar Alternativa
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* NOVO: Botão Adicionar Refeição */}
            <button className={styles.addMealButton} onClick={handleAddMeal}>
              <FontAwesomeIcon icon={faPlus} />
              Adicionar Refeição
            </button>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.totalsCard}>
              <h3>Totais Diários</h3>
              <div className={styles.calorieProgress}>
                <div className={styles.calorieProgressBar}>
                  <div
                    className={styles.calorieProgressFill}
                    style={{ width: `${Math.min(calorieProgress, 100)}%` }}
                  />
                </div>
                <div className={styles.calorieInfo}>
                  <span className={styles.currentCalories}>
                    {dailyTotals.calories.toFixed(0)} kcal
                  </span>
                  <span className={styles.targetCalories}>
                    de {targetCalories} kcal
                  </span>
                </div>
              </div>
              <div className={styles.macrosList}>
                <div className={styles.macroItem}>
                  <span className={styles.macroLabel}>Proteínas</span>
                  <span className={styles.macroValue}>{dailyTotals.protein.toFixed(1)}g</span>
                </div>
                <div className={styles.macroItem}>
                  <span className={styles.macroLabel}>Carboidratos</span>
                  <span className={styles.macroValue}>{dailyTotals.carbs.toFixed(1)}g</span>
                </div>
                <div className={styles.macroItem}>
                  <span className={styles.macroLabel}>Gorduras</span>
                  <span className={styles.macroValue}>{dailyTotals.fat.toFixed(1)}g</span>
                </div>
              </div>
            </div>

            <div className={styles.infoCard}>
              <h3>Dicas de Nutrição</h3>
              <ul>
                <li><FontAwesomeIcon icon={faDrumstickBite} /> Use 1.8-2.2g de proteína por kg de peso</li>
                <li><FontAwesomeIcon icon={faBreadSlice} /> Distribua carboidratos ao longo do dia</li>
                <li><FontAwesomeIcon icon={faFish} /> Inclua gorduras saudáveis em cada refeição</li>
                <li><FontAwesomeIcon icon={faCarrot} /> Adicione vegetais em pelo menos 3 refeições</li>
                <li><FontAwesomeIcon icon={faCoffee} /> Hidratação: 35ml de água por kg de peso</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Adicionar Alimento */}
      {showFoodModal && (
        <div className={styles.modalOverlay} onClick={() => setShowFoodModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h2>{isAddingAlternative ? 'Adicionar Alternativa' : 'Adicionar Alimento'}</h2>
                <p>Selecione um alimento da nossa biblioteca</p>
              </div>
              <button className={styles.modalClose} onClick={() => setShowFoodModal(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className={styles.modalFilters}>
              <div className={styles.searchBox}>
                <FontAwesomeIcon icon={faSearch} />
                <input
                  type="text"
                  placeholder="Buscar alimento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={styles.categorySelect}
              >
                <option value="all">Todas as categorias</option>
                {Object.keys(foodDatabase).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className={styles.foodGrid}>
              {filteredFoods.length === 0 ? (
                <div className={styles.noResults}>
                  <p>Nenhum alimento encontrado</p>
                </div>
              ) : (
                filteredFoods.map((food, index) => (
                  <div
                    key={index}
                    className={styles.foodOption}
                    onClick={() => handleAddFood(food)}
                  >
                    <div className={styles.foodOptionName}>{food.name}</div>
                    <div className={styles.foodOptionMacros}>
                      {food.calories} kcal • P: {food.protein}g • C: {food.carbs}g • G: {food.fat}g
                    </div>
                    <div className={styles.foodOptionCategory}>{food.category}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
