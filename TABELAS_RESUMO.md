# 📊 Resumo das Tabelas do Supabase - ToFiti

## 🎯 Tabelas Principais

### 👥 **USUÁRIOS** (3 tabelas)

```
profiles
├── id (UUID)
├── user_type (personal | aluno)
├── full_name
├── email
├── phone
└── avatar_url

personal_trainers
├── id (UUID)
├── profile_id → profiles
├── cref
├── specialties
├── bio
├── location
└── birth_date

alunos
├── id (UUID)
├── profile_id → profiles
├── personal_trainer_id → personal_trainers
├── weight, height, goal
├── adherence_score (0-100)
├── status (active | warning | inactive)
└── last_activity
```

### 💪 **TREINOS** (6 tabelas)

```
exercises (Banco de Exercícios)
├── id
├── name
├── muscle_group
├── equipment
├── difficulty
└── is_public

workouts (Treinos Criados)
├── id
├── personal_trainer_id
├── name
├── description
├── category
└── is_template

workout_exercises (Exercícios do Treino)
├── id
├── workout_id → workouts
├── exercise_id → exercises
├── order_index
├── sets
├── reps
└── rest_seconds

aluno_workouts (Treinos Atribuídos)
├── id
├── aluno_id → alunos
├── workout_id → workouts
├── assigned_date
└── status

workout_logs (Execução de Treinos)
├── id
├── aluno_id
├── aluno_workout_id
├── workout_date
├── duration_minutes
└── completed

exercise_logs (Detalhes de Exercícios)
├── id
├── workout_log_id
├── exercise_id
├── sets_completed
├── reps_completed
└── weight_used
```

### 🥗 **DIETAS** (5 tabelas)

```
foods (Banco de Alimentos - por 100g)
├── id
├── name
├── category
├── calories
├── protein
├── carbs
├── fat
└── is_public

diets (Dietas Criadas)
├── id
├── personal_trainer_id
├── name
├── target_calories
├── target_protein
├── target_carbs
├── target_fat
└── is_template

meals (Refeições da Dieta)
├── id
├── diet_id → diets
├── name (Café, Almoço, Jantar...)
├── time
└── order_index

meal_foods (Alimentos da Refeição)
├── id
├── meal_id → meals
├── food_id → foods
├── portion (em gramas)
└── notes

aluno_diets (Dietas Atribuídas)
├── id
├── aluno_id → alunos
├── diet_id → diets
├── assigned_date
└── status
```

### 💊 **SUPLEMENTOS** (2 tabelas)

```
supplements
├── id
├── name
├── brand
├── category
├── description
└── dosage

aluno_supplements
├── id
├── aluno_id → alunos
├── supplement_id → supplements
├── dosage
├── frequency
├── time_of_day
├── start_date
└── end_date
```

### 📈 **PROGRESSO** (1 tabela)

```
progress_measurements
├── id
├── aluno_id → alunos
├── measurement_date
├── weight
├── body_fat_percentage
├── muscle_mass
├── chest, waist, hips
├── arm_left, arm_right
├── thigh_left, thigh_right
├── calf_left, calf_right
├── photos (array)
└── notes
```

### 💬 **COMUNICAÇÃO** (2 tabelas)

```
messages
├── id
├── sender_id → profiles
├── recipient_id → profiles
├── message
├── read
└── read_at

notifications
├── id
├── user_id → profiles
├── title
├── message
├── type
├── read
└── action_url
```

### 💰 **FINANCEIRO** (1 tabela)

```
payments
├── id
├── aluno_id → alunos
├── personal_trainer_id → personal_trainers
├── amount
├── payment_date
├── due_date
├── status (pending | paid | overdue | cancelled)
├── payment_method
└── description
```

---

## 🔗 Relacionamentos Principais

### Personal Trainer → Alunos
```
personal_trainers (1) ──→ (N) alunos
```

### Personal Trainer → Treinos/Dietas
```
personal_trainers (1) ──→ (N) workouts
personal_trainers (1) ──→ (N) diets
```

### Aluno → Treinos Atribuídos
```
alunos (1) ──→ (N) aluno_workouts ──→ (1) workouts
```

### Aluno → Dietas Atribuídas
```
alunos (1) ──→ (N) aluno_diets ──→ (1) diets
```

### Treino → Exercícios
```
workouts (1) ──→ (N) workout_exercises ──→ (N) exercises
```

### Dieta → Refeições → Alimentos
```
diets (1) ──→ (N) meals (1) ──→ (N) meal_foods ──→ (N) foods
```

### Aluno → Logs de Treino
```
alunos (1) ──→ (N) workout_logs ──→ (N) exercise_logs
```

### Aluno → Medições
```
alunos (1) ──→ (N) progress_measurements
```

---

## 📋 Total de Tabelas por Módulo

| Módulo | Tabelas | Total |
|--------|---------|-------|
| 👥 Usuários | profiles, personal_trainers, alunos | 3 |
| 💪 Treinos | exercises, workouts, workout_exercises, aluno_workouts, workout_logs, exercise_logs | 6 |
| 🥗 Dietas | foods, diets, meals, meal_foods, aluno_diets | 5 |
| 💊 Suplementos | supplements, aluno_supplements | 2 |
| 📈 Progresso | progress_measurements | 1 |
| 💬 Comunicação | messages, notifications | 2 |
| 💰 Financeiro | payments | 1 |
| **TOTAL** | | **20 tabelas** |

---

## 🎯 Fluxo de Dados Principais

### 1️⃣ Criar e Atribuir Treino
```
Personal cria workout
    ↓
Adiciona exercises via workout_exercises
    ↓
Atribui para aluno via aluno_workouts
    ↓
Aluno executa e registra em workout_logs
    ↓
Detalhes em exercise_logs
```

### 2️⃣ Criar e Atribuir Dieta
```
Personal cria diet
    ↓
Cria meals (refeições)
    ↓
Adiciona foods via meal_foods
    ↓
Atribui para aluno via aluno_diets
```

### 3️⃣ Acompanhar Progresso
```
Personal cadastra aluno
    ↓
Aluno executa treinos (workout_logs)
    ↓
Personal registra medições (progress_measurements)
    ↓
Sistema calcula adherence_score
```

### 4️⃣ Comunicação
```
Personal/Aluno envia message
    ↓
Sistema cria notification
    ↓
Destinatário recebe e marca como read
```

---

## ✅ Checklist de Setup

### Passo 1: Criar Estrutura
- [ ] Executar `supabase-schema.sql` no SQL Editor
- [ ] Verificar se todas as 20 tabelas foram criadas
- [ ] Confirmar que RLS está habilitado

### Passo 2: Popular Dados Iniciais
- [ ] Executar `supabase/seeds/01_exercises.sql`
- [ ] Executar `supabase/seeds/02_foods.sql`
- [ ] Verificar se exercícios e alimentos foram inseridos

### Passo 3: Configurar Storage
- [ ] Criar bucket `avatars` (público)
- [ ] Criar bucket `progress-photos` (privado)
- [ ] Criar bucket `exercise-videos` (público)

### Passo 4: Configurar Autenticação
- [ ] Habilitar Email Provider
- [ ] Configurar Email Templates
- [ ] (Opcional) Habilitar Google/Facebook login

### Passo 5: Testar
- [ ] Criar usuário Personal de teste
- [ ] Criar usuário Aluno de teste
- [ ] Testar políticas RLS
- [ ] Verificar relacionamentos

---

## 🔒 Políticas RLS Configuradas

✅ **Usuários** podem ver/editar apenas seus próprios dados
✅ **Personal Trainers** podem ver/editar dados de seus alunos
✅ **Alunos** podem ver apenas seus próprios treinos/dietas
✅ **Exercícios e Alimentos** públicos são visíveis para todos
✅ **Mensagens** são visíveis apenas para remetente/destinatário
✅ **Pagamentos** são visíveis apenas para as partes envolvidas

---

## 📦 Arquivos do Projeto

```
fitei/
├── supabase-schema.sql          ← Schema completo (EXECUTAR PRIMEIRO)
├── SUPABASE_SETUP.md            ← Guia detalhado
├── TABELAS_RESUMO.md            ← Este arquivo
└── supabase/
    └── seeds/
        ├── 01_exercises.sql     ← Seed de exercícios
        └── 02_foods.sql         ← Seed de alimentos
```

---

## 🚀 Próximos Passos

Após configurar o Supabase:

1. **Instalar Cliente Supabase**
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Criar arquivo de configuração**
   ```javascript
   // lib/supabase.js
   import { createClient } from '@supabase/supabase-js'

   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

   export const supabase = createClient(supabaseUrl, supabaseAnonKey)
   ```

3. **Integrar com as páginas existentes**
   - Substituir dados mockados por queries reais
   - Implementar autenticação
   - Conectar formulários ao banco

---

## 💡 Dicas

- Use **transactions** para operações que envolvem múltiplas tabelas
- Aproveite os **índices** criados para queries otimizadas
- Use a função `calculate_aluno_adherence()` para calcular aderência
- Configure **triggers** adicionais conforme necessário
- Monitore o uso com o **Dashboard do Supabase**
