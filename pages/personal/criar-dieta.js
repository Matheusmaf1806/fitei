import { useState, useEffect } from 'react'
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
  faPen,
  faInfoCircle,
  faGripVertical,
  faTrashAlt,
  faHistory,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'
import Layout from '../../components/Layout'
import Toast from '../../components/Toast'
import { useToast } from '../../hooks/useToast'
import styles from '../../styles/CriarDieta.module.css'

export default function CriarDieta() {
  const router = useRouter()
  const toast = useToast()

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

  // 🎯 MELHORIAS: Novos estados
  const [draggedMealIndex, setDraggedMealIndex] = useState(null)
  const [errors, setErrors] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [recentFoods, setRecentFoods] = useState([])

  // 🎯 MELHORIA: LocalStorage - Salvar rascunho e histórico
  useEffect(() => {
    const savedDraft = localStorage.getItem('diet-draft')
    const savedRecent = localStorage.getItem('recent-foods')

    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft)
        if (draft.dietName) setDietName(draft.dietName)
        if (draft.targetCalories) setTargetCalories(draft.targetCalories)
        if (draft.selectedMeals) setSelectedMeals(draft.selectedMeals)
        toast.info('Rascunho recuperado!', 2000)
      } catch (e) {
        console.error('Erro ao carregar rascunho:', e)
      }
    }

    if (savedRecent) {
      try {
        setRecentFoods(JSON.parse(savedRecent))
      } catch (e) {
        console.error('Erro ao carregar recentes:', e)
      }
    }
  }, [])

  useEffect(() => {
    const draft = {
      dietName,
      targetCalories,
      selectedMeals
    }
    localStorage.setItem('diet-draft', JSON.stringify(draft))
  }, [dietName, targetCalories, selectedMeals])

  // 🎯 MELHORIA: Atalhos de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showFoodModal) {
        setShowFoodModal(false)
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleSaveDiet()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showFoodModal, dietName, selectedMeals])

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

    // 🎯 MELHORIA 16: Adicionar ao histórico de alimentos recentes
    const newRecent = [food, ...recentFoods.filter(f => f.name !== food.name)].slice(0, 10)
    setRecentFoods(newRecent)
    localStorage.setItem('recent-foods', JSON.stringify(newRecent))

    toast.success(`${food.name} adicionado!`, 2000)
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

  // 🎯 MELHORIA 1 & 12: Validações visuais e de macros
  const handleSaveDiet = async () => {
    const newErrors = {}

    if (!dietName.trim()) {
      newErrors.dietName = 'Nome da dieta é obrigatório'
      toast.error('Por favor, dê um nome à dieta')
    }

    const totalFoods = selectedMeals.reduce((sum, meal) => sum + meal.foods.length, 0)

    if (totalFoods === 0) {
      newErrors.foods = 'Adicione pelo menos um alimento'
      toast.error('Adicione pelo menos um alimento à dieta')
    }

    // 🎯 MELHORIA 12: Validar macros desbalanceados
    const dailyTotals = calculateDailyTotals()
    const proteinCalories = dailyTotals.protein * 4
    const carbsCalories = dailyTotals.carbs * 4
    const fatCalories = dailyTotals.fat * 9
    const totalMacroCalories = proteinCalories + carbsCalories + fatCalories

    if (totalMacroCalories > 0) {
      const proteinPercent = (proteinCalories / totalMacroCalories) * 100
      const carbsPercent = (carbsCalories / totalMacroCalories) * 100
      const fatPercent = (fatCalories / totalMacroCalories) * 100

      // Alertar se macros muito desbalanceados
      if (proteinPercent < 10) {
        toast.warning('⚠️ Proteína muito baixa (<10%)! Considere adicionar mais fontes proteicas.')
      }
      if (fatPercent < 15) {
        toast.warning('⚠️ Gordura muito baixa (<15%)! Adicione gorduras saudáveis.')
      }
      if (carbsPercent > 70) {
        toast.warning('⚠️ Carboidratos muito altos (>70%)! Considere balancear os macros.')
      }
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      return
    }

    setIsSaving(true)

    // Simular salvamento
    setTimeout(() => {
      localStorage.removeItem('diet-draft')

      toast.success(`Dieta "${dietName}" salva com sucesso! ${selectedMeals.length} refeições, ${totalFoods} alimentos, ${dailyTotals.calories.toFixed(0)} kcal totais`)

      setTimeout(() => {
        router.push('/personal/dietas')
      }, 1500)
    }, 1000)
  }

  // 🎯 MELHORIA 14: Limpar tudo
  const handleClearAll = () => {
    if (confirm('Tem certeza que deseja limpar tudo? Esta ação não pode ser desfeita.')) {
      setDietName('')
      setTargetCalories(2000)
      setSelectedMeals([
        { id: '1', name: 'Café da Manhã', foods: [], alternatives: [] },
        { id: '2', name: 'Lanche da Manhã', foods: [], alternatives: [] },
        { id: '3', name: 'Almoço', foods: [], alternatives: [] },
      ])
      localStorage.removeItem('diet-draft')
      toast.info('Dieta limpa!')
    }
  }

  // 🎯 MELHORIA 5: Drag & Drop para reordenar refeições
  const handleMealDragStart = (index) => {
    setDraggedMealIndex(index)
  }

  const handleMealDragOver = (e, index) => {
    e.preventDefault()
    if (draggedMealIndex === null || draggedMealIndex === index) return

    const meals = [...selectedMeals]
    const draggedMeal = meals[draggedMealIndex]
    meals.splice(draggedMealIndex, 1)
    meals.splice(index, 0, draggedMeal)

    setSelectedMeals(meals)
    setDraggedMealIndex(index)
  }

  const handleMealDragEnd = () => {
    setDraggedMealIndex(null)
    toast.info('Refeição reordenada!', 1500)
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
          <div className={styles.headerActions}>
            <button
              className={styles.btnDanger}
              onClick={handleClearAll}
              title="Limpar tudo"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            <button
              className={styles.saveButton}
              onClick={handleSaveDiet}
              disabled={isSaving}
            >
              <FontAwesomeIcon icon={faSave} />
              {isSaving ? 'Salvando...' : 'Salvar Dieta'}
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.mainPanel}>
            <div className={styles.card}>
              <h3>Informações da Dieta</h3>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Nome da Dieta
                    <span className={styles.required}>*</span>
                    <span className={styles.tooltip} title="Dê um nome descritivo para esta dieta">
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Dieta Hipertrofia 3000kcal"
                    value={dietName}
                    onChange={(e) => {
                      setDietName(e.target.value)
                      if (errors.dietName) {
                        setErrors({...errors, dietName: null})
                      }
                    }}
                    className={`${styles.inputLarge} ${errors.dietName ? styles.inputError : ''}`}
                  />
                  {errors.dietName && (
                    <span className={styles.errorText}>{errors.dietName}</span>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Meta de Calorias
                    <span className={styles.tooltip} title="Calorias diárias alvo">
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </span>
                  </label>
                  <input
                    type="number"
                    placeholder="2000"
                    value={targetCalories}
                    onChange={(e) => setTargetCalories(parseFloat(e.target.value) || 0)}
                    className={styles.inputSmall}
                    min="0"
                  />
                </div>
              </div>
            </div>

            {selectedMeals.map((meal, mealIndex) => (
              <div
                key={meal.id}
                className={`${styles.mealCard} ${draggedMealIndex === mealIndex ? styles.dragging : ''}`}
                draggable
                onDragStart={() => handleMealDragStart(mealIndex)}
                onDragOver={(e) => handleMealDragOver(e, mealIndex)}
                onDragEnd={handleMealDragEnd}
              >
                <div className={styles.mealDragHandle} title="Arraste para reordenar refeições">
                  <FontAwesomeIcon icon={faGripVertical} />
                </div>
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

            {/* 🎯 MELHORIA 16: Histórico de Alimentos Recentes */}
            {recentFoods.length > 0 && (
              <div className={styles.recentSection}>
                <h4>
                  <FontAwesomeIcon icon={faHistory} />
                  Adicionados Recentemente
                </h4>
                <div className={styles.recentFoodsGrid}>
                  {recentFoods.slice(0, 5).map((food, index) => (
                    <div
                      key={index}
                      className={styles.recentFoodChip}
                      onClick={() => handleAddFood(food)}
                    >
                      {food.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

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
    </Layout>
  )
}
