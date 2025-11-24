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
  faCoffee
} from '@fortawesome/free-solid-svg-icons'
import Layout from '../../components/Layout'
import styles from '../../styles/CriarDieta.module.css'

export default function CriarDieta() {
  const router = useRouter()
  const [dietName, setDietName] = useState('')
  const [targetCalories, setTargetCalories] = useState(2000)
  const [selectedMeals, setSelectedMeals] = useState({
    'Café da Manhã': [],
    'Lanche da Manhã': [],
    'Almoço': [],
    'Lanche da Tarde': [],
    'Pré-Treino': [],
    'Jantar': [],
    'Ceia': []
  })
  const [showFoodModal, setShowFoodModal] = useState(false)
  const [currentMeal, setCurrentMeal] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Comprehensive food database with macronutrients per 100g
  const foodDatabase = {
    'Proteínas - Carnes': [
      { name: 'Peito de Frango Grelhado', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
      { name: 'Peito de Frango Cozido', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0 },
      { name: 'Coxa de Frango sem Pele', calories: 119, protein: 21, carbs: 0, fat: 3.7, fiber: 0 },
      { name: 'Carne Bovina Magra (Patinho)', calories: 158, protein: 26, carbs: 0, fat: 5.5, fiber: 0 },
      { name: 'Carne Bovina (Alcatra)', calories: 198, protein: 23, carbs: 0, fat: 11, fiber: 0 },
      { name: 'Carne Bovina (Filé Mignon)', calories: 206, protein: 23, carbs: 0, fat: 12, fiber: 0 },
      { name: 'Carne Bovina (Picanha)', calories: 271, protein: 20, carbs: 0, fat: 21, fiber: 0 },
      { name: 'Carne Bovina Moída (Magra)', calories: 176, protein: 20, carbs: 0, fat: 10, fiber: 0 },
      { name: 'Carne de Porco (Lombo)', calories: 143, protein: 21, carbs: 0, fat: 6, fiber: 0 },
      { name: 'Carne de Porco (Bisteca)', calories: 231, protein: 19, carbs: 0, fat: 17, fiber: 0 },
      { name: 'Peru (Peito)', calories: 135, protein: 30, carbs: 0, fat: 0.7, fiber: 0 },
      { name: 'Patinho Moído', calories: 158, protein: 26, carbs: 0, fat: 5.5, fiber: 0 },
    ],
    'Proteínas - Peixes': [
      { name: 'Salmão', calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0 },
      { name: 'Atum em Água', calories: 116, protein: 26, carbs: 0, fat: 0.8, fiber: 0 },
      { name: 'Atum em Óleo', calories: 198, protein: 29, carbs: 0, fat: 8, fiber: 0 },
      { name: 'Tilápia', calories: 96, protein: 20, carbs: 0, fat: 1.7, fiber: 0 },
      { name: 'Bacalhau', calories: 82, protein: 18, carbs: 0, fat: 0.7, fiber: 0 },
      { name: 'Sardinha', calories: 208, protein: 25, carbs: 0, fat: 11, fiber: 0 },
      { name: 'Pescada', calories: 86, protein: 17, carbs: 0, fat: 1.5, fiber: 0 },
      { name: 'Merluza', calories: 85, protein: 17, carbs: 0, fat: 1.4, fiber: 0 },
      { name: 'Linguado', calories: 91, protein: 19, carbs: 0, fat: 1.2, fiber: 0 },
      { name: 'Camarão', calories: 99, protein: 24, carbs: 0.2, fat: 0.3, fiber: 0 },
    ],
    'Proteínas - Ovos e Laticínios': [
      { name: 'Ovo Inteiro Cozido', calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0 },
      { name: 'Clara de Ovo', calories: 52, protein: 11, carbs: 0.7, fat: 0.2, fiber: 0 },
      { name: 'Gema de Ovo', calories: 322, protein: 16, carbs: 3.6, fat: 27, fiber: 0 },
      { name: 'Omelete Simples', calories: 154, protein: 11, carbs: 0.6, fat: 12, fiber: 0 },
      { name: 'Queijo Cottage', calories: 98, protein: 11, carbs: 3.4, fat: 4.3, fiber: 0 },
      { name: 'Queijo Minas Frescal', calories: 264, protein: 17, carbs: 5.5, fat: 19, fiber: 0 },
      { name: 'Queijo Ricota', calories: 174, protein: 11, carbs: 3, fat: 13, fiber: 0 },
      { name: 'Queijo Muçarela', calories: 280, protein: 28, carbs: 2.2, fat: 17, fiber: 0 },
      { name: 'Iogurte Grego Natural', calories: 97, protein: 10, carbs: 3.6, fat: 5, fiber: 0 },
      { name: 'Iogurte Desnatado', calories: 56, protein: 5.7, carbs: 7.7, fat: 0.2, fiber: 0 },
      { name: 'Leite Integral', calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, fiber: 0 },
      { name: 'Leite Desnatado', calories: 34, protein: 3.4, carbs: 5, fat: 0.1, fiber: 0 },
      { name: 'Requeijão Light', calories: 174, protein: 11, carbs: 3.6, fat: 13, fiber: 0 },
    ],
    'Carboidratos - Cereais e Grãos': [
      { name: 'Arroz Branco Cozido', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4 },
      { name: 'Arroz Integral Cozido', calories: 112, protein: 2.6, carbs: 24, fat: 0.9, fiber: 1.8 },
      { name: 'Arroz Parboilizado', calories: 123, protein: 2.5, carbs: 27, fat: 0.4, fiber: 0.6 },
      { name: 'Macarrão Cozido', calories: 131, protein: 5, carbs: 25, fat: 1.1, fiber: 1.8 },
      { name: 'Macarrão Integral Cozido', calories: 124, protein: 5, carbs: 26, fat: 1.3, fiber: 3.5 },
      { name: 'Aveia em Flocos', calories: 389, protein: 17, carbs: 66, fat: 7, fiber: 10 },
      { name: 'Granola', calories: 471, protein: 13, carbs: 64, fat: 17, fiber: 9 },
      { name: 'Quinoa Cozida', calories: 120, protein: 4.4, carbs: 21, fat: 1.9, fiber: 2.8 },
      { name: 'Cuscuz Marroquino', calories: 112, protein: 3.8, carbs: 23, fat: 0.2, fiber: 1.4 },
      { name: 'Milho Verde Cozido', calories: 86, protein: 3.3, carbs: 19, fat: 1.4, fiber: 2.4 },
      { name: 'Ervilha Cozida', calories: 81, protein: 5.4, carbs: 14, fat: 0.4, fiber: 5.7 },
      { name: 'Grão de Bico Cozido', calories: 164, protein: 8.9, carbs: 27, fat: 2.6, fiber: 7.6 },
      { name: 'Lentilha Cozida', calories: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 7.9 },
      { name: 'Feijão Preto Cozido', calories: 77, protein: 4.5, carbs: 14, fat: 0.5, fiber: 4.4 },
      { name: 'Feijão Carioca Cozido', calories: 76, protein: 4.8, carbs: 13.6, fat: 0.5, fiber: 6.4 },
    ],
    'Carboidratos - Tubérculos': [
      { name: 'Batata Doce Cozida', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3 },
      { name: 'Batata Doce Assada', calories: 90, protein: 2, carbs: 21, fat: 0.2, fiber: 3.3 },
      { name: 'Batata Inglesa Cozida', calories: 87, protein: 1.9, carbs: 20, fat: 0.1, fiber: 1.8 },
      { name: 'Batata Inglesa Assada', calories: 93, protein: 2.5, carbs: 21, fat: 0.1, fiber: 2.1 },
      { name: 'Mandioca Cozida', calories: 125, protein: 0.6, carbs: 30, fat: 0.3, fiber: 1.6 },
      { name: 'Inhame Cozido', calories: 118, protein: 1.5, carbs: 28, fat: 0.2, fiber: 4.1 },
      { name: 'Cará Cozido', calories: 118, protein: 1.5, carbs: 28, fat: 0.2, fiber: 4.1 },
      { name: 'Mandioquinha Cozida', calories: 98, protein: 1, carbs: 23, fat: 0.3, fiber: 2.3 },
    ],
    'Carboidratos - Pães': [
      { name: 'Pão Francês', calories: 300, protein: 9, carbs: 58, fat: 3.1, fiber: 2.3 },
      { name: 'Pão de Forma Integral', calories: 253, protein: 9, carbs: 43, fat: 4.2, fiber: 6.7 },
      { name: 'Pão de Forma Branco', calories: 266, protein: 8.3, carbs: 50, fat: 3.3, fiber: 2.7 },
      { name: 'Pão Sírio Integral', calories: 268, protein: 10, carbs: 52, fat: 2.2, fiber: 7 },
      { name: 'Pão de Centeio', calories: 259, protein: 8.5, carbs: 48, fat: 3.3, fiber: 5.8 },
      { name: 'Tapioca', calories: 357, protein: 0.6, carbs: 88, fat: 0.3, fiber: 1.4 },
      { name: 'Torrada Integral', calories: 373, protein: 11, carbs: 66, fat: 5.6, fiber: 9.7 },
    ],
    'Vegetais - Folhas': [
      { name: 'Alface', calories: 15, protein: 1.4, carbs: 2.3, fat: 0.2, fiber: 1.3 },
      { name: 'Rúcula', calories: 25, protein: 2.6, carbs: 3.7, fat: 0.7, fiber: 1.6 },
      { name: 'Espinafre', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2 },
      { name: 'Couve', calories: 49, protein: 4.3, carbs: 10, fat: 0.9, fiber: 4.1 },
      { name: 'Agrião', calories: 11, protein: 2.6, carbs: 1.3, fat: 0.1, fiber: 1.1 },
      { name: 'Acelga', calories: 19, protein: 1.8, carbs: 3.7, fat: 0.2, fiber: 1.6 },
      { name: 'Almeirão', calories: 23, protein: 1.7, carbs: 4.7, fat: 0.3, fiber: 3.1 },
      { name: 'Repolho', calories: 25, protein: 1.3, carbs: 5.8, fat: 0.1, fiber: 2.5 },
    ],
    'Vegetais - Legumes': [
      { name: 'Brócolis Cozido', calories: 35, protein: 2.4, carbs: 7, fat: 0.4, fiber: 3.3 },
      { name: 'Couve-flor Cozida', calories: 23, protein: 1.9, carbs: 4.7, fat: 0.2, fiber: 2.3 },
      { name: 'Cenoura Cozida', calories: 35, protein: 0.8, carbs: 8.2, fat: 0.2, fiber: 3 },
      { name: 'Beterraba Cozida', calories: 44, protein: 1.7, carbs: 10, fat: 0.2, fiber: 2.8 },
      { name: 'Abobrinha Cozida', calories: 17, protein: 1.2, carbs: 3.1, fat: 0.3, fiber: 1 },
      { name: 'Berinjela Cozida', calories: 35, protein: 0.8, carbs: 8.7, fat: 0.2, fiber: 2.5 },
      { name: 'Abóbora Cozida', calories: 26, protein: 1, carbs: 6.5, fat: 0.1, fiber: 0.5 },
      { name: 'Chuchu Cozido', calories: 19, protein: 0.8, carbs: 4.5, fat: 0.1, fiber: 1.7 },
      { name: 'Vagem Cozida', calories: 31, protein: 1.8, carbs: 7, fat: 0.1, fiber: 3.4 },
      { name: 'Quiabo Cozido', calories: 22, protein: 1.9, carbs: 4.5, fat: 0.2, fiber: 2.5 },
      { name: 'Tomate', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2 },
      { name: 'Pepino', calories: 15, protein: 0.7, carbs: 3.6, fat: 0.1, fiber: 0.5 },
      { name: 'Pimentão', calories: 31, protein: 1, carbs: 6, fat: 0.3, fiber: 2.1 },
    ],
    'Frutas': [
      { name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6 },
      { name: 'Maçã', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4 },
      { name: 'Laranja', calories: 47, protein: 0.9, carbs: 12, fat: 0.1, fiber: 2.4 },
      { name: 'Mamão Papaya', calories: 43, protein: 0.5, carbs: 11, fat: 0.1, fiber: 1.7 },
      { name: 'Morango', calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, fiber: 2 },
      { name: 'Melancia', calories: 30, protein: 0.6, carbs: 7.6, fat: 0.2, fiber: 0.4 },
      { name: 'Melão', calories: 34, protein: 0.8, carbs: 8.2, fat: 0.2, fiber: 0.9 },
      { name: 'Abacaxi', calories: 50, protein: 0.5, carbs: 13, fat: 0.1, fiber: 1.4 },
      { name: 'Manga', calories: 60, protein: 0.8, carbs: 15, fat: 0.4, fiber: 1.6 },
      { name: 'Uva', calories: 69, protein: 0.7, carbs: 18, fat: 0.2, fiber: 0.9 },
      { name: 'Pêra', calories: 57, protein: 0.4, carbs: 15, fat: 0.1, fiber: 3.1 },
      { name: 'Pêssego', calories: 39, protein: 0.9, carbs: 9.5, fat: 0.3, fiber: 1.5 },
      { name: 'Kiwi', calories: 61, protein: 1.1, carbs: 15, fat: 0.5, fiber: 3 },
      { name: 'Abacate', calories: 160, protein: 2, carbs: 8.5, fat: 15, fiber: 6.7 },
      { name: 'Goiaba', calories: 68, protein: 2.6, carbs: 14, fat: 1, fiber: 5.4 },
    ],
    'Gorduras Saudáveis': [
      { name: 'Azeite de Oliva Extra Virgem', calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0 },
      { name: 'Óleo de Coco', calories: 862, protein: 0, carbs: 0, fat: 100, fiber: 0 },
      { name: 'Abacate', calories: 160, protein: 2, carbs: 8.5, fat: 15, fiber: 6.7 },
      { name: 'Castanha do Pará', calories: 656, protein: 14, carbs: 12, fat: 66, fiber: 7.5 },
      { name: 'Castanha de Caju', calories: 553, protein: 18, carbs: 30, fat: 44, fiber: 3.3 },
      { name: 'Amêndoas', calories: 579, protein: 21, carbs: 22, fat: 50, fiber: 12 },
      { name: 'Nozes', calories: 654, protein: 15, carbs: 14, fat: 65, fiber: 6.7 },
      { name: 'Amendoim', calories: 567, protein: 26, carbs: 16, fat: 49, fiber: 8.5 },
      { name: 'Pasta de Amendoim', calories: 588, protein: 25, carbs: 20, fat: 50, fiber: 6 },
      { name: 'Semente de Chia', calories: 486, protein: 17, carbs: 42, fat: 31, fiber: 34 },
      { name: 'Semente de Linhaça', calories: 534, protein: 18, carbs: 29, fat: 42, fiber: 27 },
      { name: 'Semente de Girassol', calories: 584, protein: 21, carbs: 20, fat: 51, fiber: 8.6 },
    ],
    'Suplementos e Whey': [
      { name: 'Whey Protein Concentrado', calories: 400, protein: 80, carbs: 8, fat: 5, fiber: 0 },
      { name: 'Whey Protein Isolado', calories: 370, protein: 90, carbs: 2, fat: 1, fiber: 0 },
      { name: 'Whey Protein Hidrolisado', calories: 380, protein: 90, carbs: 3, fat: 1.5, fiber: 0 },
      { name: 'Caseína', calories: 360, protein: 78, carbs: 10, fat: 1.5, fiber: 0 },
      { name: 'Albumina', calories: 380, protein: 81, carbs: 3, fat: 0.1, fiber: 0 },
      { name: 'Creatina', calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
      { name: 'BCAA', calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
      { name: 'Maltodextrina', calories: 380, protein: 0, carbs: 95, fat: 0, fiber: 0 },
      { name: 'Dextrose', calories: 380, protein: 0, carbs: 100, fat: 0, fiber: 0 },
      { name: 'Hipercalórico (Mass Gainer)', calories: 380, protein: 15, carbs: 75, fat: 3, fiber: 2 },
    ],
    'Bebidas': [
      { name: 'Água (200ml)', calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
      { name: 'Café sem Açúcar (200ml)', calories: 2, protein: 0.3, carbs: 0, fat: 0, fiber: 0 },
      { name: 'Chá Verde (200ml)', calories: 1, protein: 0, carbs: 0, fat: 0, fiber: 0 },
      { name: 'Suco de Laranja Natural (200ml)', calories: 90, protein: 1.4, carbs: 21, fat: 0.4, fiber: 0.4 },
      { name: 'Leite Integral (200ml)', calories: 122, protein: 6.4, carbs: 9.6, fat: 6.6, fiber: 0 },
      { name: 'Leite Desnatado (200ml)', calories: 68, protein: 6.8, carbs: 10, fat: 0.2, fiber: 0 },
      { name: 'Água de Coco (200ml)', calories: 38, protein: 0.6, carbs: 8.8, fat: 0, fiber: 0 },
    ]
  }

  const getMealIcon = (mealName) => {
    const icons = {
      'Café da Manhã': faCoffee,
      'Lanche da Manhã': faAppleAlt,
      'Almoço': faUtensils,
      'Lanche da Tarde': faCookie,
      'Pré-Treino': faDrumstickBite,
      'Jantar': faUtensils,
      'Ceia': faCheese
    }
    return icons[mealName] || faUtensils
  }

  const handleOpenFoodModal = (mealName) => {
    setCurrentMeal(mealName)
    setShowFoodModal(true)
    setSearchTerm('')
    setSelectedCategory('all')
  }

  const handleAddFood = (food) => {
    const foodWithPortion = {
      ...food,
      id: Date.now() + Math.random(),
      portion: 100 // Default 100g
    }
    setSelectedMeals({
      ...selectedMeals,
      [currentMeal]: [...selectedMeals[currentMeal], foodWithPortion]
    })
  }

  const handleRemoveFood = (mealName, foodId) => {
    setSelectedMeals({
      ...selectedMeals,
      [mealName]: selectedMeals[mealName].filter(f => f.id !== foodId)
    })
  }

  const handleUpdatePortion = (mealName, foodId, newPortion) => {
    setSelectedMeals({
      ...selectedMeals,
      [mealName]: selectedMeals[mealName].map(f =>
        f.id === foodId ? { ...f, portion: parseFloat(newPortion) || 0 } : f
      )
    })
  }

  const handleDuplicateFood = (mealName, food) => {
    const duplicatedFood = {
      ...food,
      id: Date.now() + Math.random()
    }
    setSelectedMeals({
      ...selectedMeals,
      [mealName]: [...selectedMeals[mealName], duplicatedFood]
    })
  }

  const calculateMealTotals = (foods) => {
    return foods.reduce((totals, food) => {
      const multiplier = food.portion / 100
      return {
        calories: totals.calories + (food.calories * multiplier),
        protein: totals.protein + (food.protein * multiplier),
        carbs: totals.carbs + (food.carbs * multiplier),
        fat: totals.fat + (food.fat * multiplier),
        fiber: totals.fiber + (food.fiber * multiplier)
      }
    }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 })
  }

  const calculateDailyTotals = () => {
    let dailyTotals = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
    Object.values(selectedMeals).forEach(mealFoods => {
      const mealTotals = calculateMealTotals(mealFoods)
      dailyTotals.calories += mealTotals.calories
      dailyTotals.protein += mealTotals.protein
      dailyTotals.carbs += mealTotals.carbs
      dailyTotals.fat += mealTotals.fat
      dailyTotals.fiber += mealTotals.fiber
    })
    return dailyTotals
  }

  const handleSaveDiet = () => {
    if (!dietName.trim()) {
      alert('Por favor, dê um nome para a dieta!')
      return
    }

    const totalFoods = Object.values(selectedMeals).reduce((sum, foods) => sum + foods.length, 0)
    if (totalFoods === 0) {
      alert('Por favor, adicione pelo menos um alimento à dieta!')
      return
    }

    const dailyTotals = calculateDailyTotals()
    alert(`Dieta "${dietName}" salva com sucesso!\n\nTotais diários:\nCalorias: ${dailyTotals.calories.toFixed(0)} kcal\nProteína: ${dailyTotals.protein.toFixed(1)}g\nCarboidratos: ${dailyTotals.carbs.toFixed(1)}g\nGorduras: ${dailyTotals.fat.toFixed(1)}g`)
    router.push('/personal/dietas')
  }

  // Filter foods based on search and category
  const getFilteredFoods = () => {
    let allFoods = []
    const categories = selectedCategory === 'all' ? Object.keys(foodDatabase) : [selectedCategory]

    categories.forEach(category => {
      foodDatabase[category].forEach(food => {
        allFoods.push({ ...food, category })
      })
    })

    if (searchTerm) {
      allFoods = allFoods.filter(food =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return allFoods
  }

  const dailyTotals = calculateDailyTotals()
  const calorieProgress = (dailyTotals.calories / targetCalories) * 100

  return (
    <Layout userType="personal">
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={() => router.back()}>
            <FontAwesomeIcon icon={faArrowLeft} />
            Voltar
          </button>
          <div className={styles.headerInfo}>
            <h1>Criar Nova Dieta</h1>
            <p>Monte uma dieta completa e personalizada para seu aluno</p>
          </div>
          <div className={styles.actions}>
            <button className={styles.saveButton} onClick={handleSaveDiet}>
              <FontAwesomeIcon icon={faSave} />
              Salvar Dieta
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.main}>
            <div className={styles.card}>
              <div className={styles.formGroup}>
                <label>Nome da Dieta</label>
                <input
                  type="text"
                  placeholder="Ex: Dieta de Ganho de Massa - 2500 kcal"
                  value={dietName}
                  onChange={(e) => setDietName(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Meta Calórica Diária</label>
                <input
                  type="number"
                  placeholder="2000"
                  value={targetCalories}
                  onChange={(e) => setTargetCalories(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            {Object.keys(selectedMeals).map((mealName) => (
              <div key={mealName} className={styles.mealCard}>
                <div className={styles.mealHeader}>
                  <div className={styles.mealTitle}>
                    <span className={styles.mealIcon}>
                      <FontAwesomeIcon icon={getMealIcon(mealName)} />
                    </span>
                    <h3>{mealName}</h3>
                    {selectedMeals[mealName].length > 0 && (
                      <span className={styles.foodCount}>
                        {selectedMeals[mealName].length} {selectedMeals[mealName].length === 1 ? 'item' : 'itens'}
                      </span>
                    )}
                  </div>
                  {selectedMeals[mealName].length > 0 && (
                    <div className={styles.mealMacros}>
                      {(() => {
                        const totals = calculateMealTotals(selectedMeals[mealName])
                        return (
                          <>
                            <span className={styles.macro}>
                              {totals.calories.toFixed(0)} kcal
                            </span>
                            <span className={styles.macro}>
                              P: {totals.protein.toFixed(1)}g
                            </span>
                            <span className={styles.macro}>
                              C: {totals.carbs.toFixed(1)}g
                            </span>
                            <span className={styles.macro}>
                              G: {totals.fat.toFixed(1)}g
                            </span>
                          </>
                        )
                      })()}
                    </div>
                  )}
                </div>

                {selectedMeals[mealName].length > 0 && (
                  <div className={styles.foodsList}>
                    {selectedMeals[mealName].map((food) => (
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
                            onChange={(e) => handleUpdatePortion(mealName, food.id, e.target.value)}
                            className={styles.portionInput}
                          />
                          <span className={styles.unit}>g</span>
                          <button
                            className={styles.iconButton}
                            onClick={() => handleDuplicateFood(mealName, food)}
                            title="Duplicar"
                          >
                            <FontAwesomeIcon icon={faCopy} />
                          </button>
                          <button
                            className={`${styles.iconButton} ${styles.danger}`}
                            onClick={() => handleRemoveFood(mealName, food.id)}
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
                  onClick={() => handleOpenFoodModal(mealName)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  Adicionar Alimento
                </button>
              </div>
            ))}
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
                <div className={styles.macroItem}>
                  <span className={styles.macroLabel}>Fibras</span>
                  <span className={styles.macroValue}>{dailyTotals.fiber.toFixed(1)}g</span>
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

      {showFoodModal && (
        <div className={styles.modalOverlay} onClick={() => setShowFoodModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Adicionar Alimento - {currentMeal}</h2>
              <button className={styles.closeButton} onClick={() => setShowFoodModal(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.searchSection}>
                <input
                  type="text"
                  placeholder="Buscar alimento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="all">Todas as Categorias</option>
                  {Object.keys(foodDatabase).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className={styles.foodsGrid}>
                {getFilteredFoods().map((food, index) => (
                  <div
                    key={index}
                    className={styles.foodCard}
                    onClick={() => {
                      handleAddFood(food)
                      setShowFoodModal(false)
                    }}
                  >
                    <h4>{food.name}</h4>
                    <div className={styles.foodCategory}>{food.category}</div>
                    <div className={styles.foodNutrition}>
                      <div className={styles.nutritionItem}>
                        <span className={styles.nutritionLabel}>Calorias</span>
                        <span className={styles.nutritionValue}>{food.calories} kcal</span>
                      </div>
                      <div className={styles.nutritionGrid}>
                        <div className={styles.nutritionItem}>
                          <span className={styles.nutritionLabel}>Prot.</span>
                          <span className={styles.nutritionValue}>{food.protein}g</span>
                        </div>
                        <div className={styles.nutritionItem}>
                          <span className={styles.nutritionLabel}>Carb.</span>
                          <span className={styles.nutritionValue}>{food.carbs}g</span>
                        </div>
                        <div className={styles.nutritionItem}>
                          <span className={styles.nutritionLabel}>Gord.</span>
                          <span className={styles.nutritionValue}>{food.fat}g</span>
                        </div>
                        <div className={styles.nutritionItem}>
                          <span className={styles.nutritionLabel}>Fibras</span>
                          <span className={styles.nutritionValue}>{food.fiber}g</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.per100g}>por 100g</div>
                  </div>
                ))}
              </div>
              {getFilteredFoods().length === 0 && (
                <div className={styles.noResults}>
                  <p>Nenhum alimento encontrado</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
