# 📊 Setup do Banco de Dados Supabase - ToFiti

Este guia explica como configurar o banco de dados Supabase para o aplicativo ToFiti.

## 🚀 Como Executar o Schema

### 1. Acesse o Supabase

1. Entre no seu projeto no [Supabase Dashboard](https://app.supabase.com)
2. Vá em **SQL Editor** no menu lateral
3. Clique em **New Query**

### 2. Execute o Schema

1. Abra o arquivo `supabase-schema.sql`
2. Copie **todo** o conteúdo do arquivo
3. Cole no editor SQL do Supabase
4. Clique em **Run** (ou pressione Ctrl+Enter)

### 3. Verifique a Criação

No menu lateral, vá em **Table Editor** e verifique se todas as tabelas foram criadas:

✅ profiles
✅ personal_trainers
✅ alunos
✅ exercises
✅ workouts
✅ workout_exercises
✅ aluno_workouts
✅ workout_logs
✅ exercise_logs
✅ foods
✅ diets
✅ meals
✅ meal_foods
✅ aluno_diets
✅ supplements
✅ aluno_supplements
✅ progress_measurements
✅ messages
✅ notifications
✅ payments

---

## 📋 Estrutura do Banco de Dados

### 👤 **Tabelas de Usuários**

#### `profiles`
Perfis de usuários (extends auth.users do Supabase)
- `id` - UUID do usuário (referencia auth.users)
- `user_type` - 'personal' ou 'aluno'
- `full_name` - Nome completo
- `email` - Email do usuário
- `phone` - Telefone
- `avatar_url` - URL da foto de perfil

#### `personal_trainers`
Dados específicos dos Personal Trainers
- `id` - UUID único
- `profile_id` - Referência ao profile
- `cref` - Registro profissional
- `specialties` - Array de especialidades
- `bio` - Biografia
- `location` - Localização
- `birth_date` - Data de nascimento

#### `alunos`
Dados específicos dos Alunos
- `id` - UUID único
- `profile_id` - Referência ao profile
- `personal_trainer_id` - Personal responsável
- `weight` - Peso atual
- `height` - Altura
- `goal` - Objetivo (hipertrofia, emagrecimento, etc)
- `adherence_score` - Score de aderência (0-100)
- `status` - 'active', 'warning', 'inactive'
- `last_activity` - Última atividade

---

### 💪 **Tabelas de Treino**

#### `exercises`
Banco de dados de exercícios
- `name` - Nome do exercício
- `muscle_group` - Grupo muscular (Peito, Costas, Pernas, etc)
- `equipment` - Equipamento necessário
- `difficulty` - Iniciante, Intermediário, Avançado
- `description` - Descrição do exercício
- `video_url` - URL de vídeo demonstrativo
- `created_by` - Quem criou (pode ser nulo se for público)
- `is_public` - Se está disponível para todos

#### `workouts`
Treinos criados pelos Personal Trainers
- `personal_trainer_id` - Personal que criou
- `name` - Nome do treino
- `description` - Descrição
- `category` - Categoria (Hipertrofia, Força, etc)
- `difficulty` - Nível de dificuldade
- `duration_minutes` - Duração estimada
- `is_template` - Se é um template (não atribuído)

#### `workout_exercises`
Exercícios dentro de um treino
- `workout_id` - Treino ao qual pertence
- `exercise_id` - Exercício
- `order_index` - Ordem no treino
- `sets` - Número de séries
- `reps` - Repetições (pode ser "8-12" ou "até a falha")
- `rest_seconds` - Descanso entre séries
- `notes` - Observações

#### `aluno_workouts`
Treinos atribuídos aos alunos
- `aluno_id` - Aluno
- `workout_id` - Treino
- `assigned_date` - Data de atribuição
- `start_date` - Data de início
- `end_date` - Data de término
- `status` - 'active', 'completed', 'cancelled'

#### `workout_logs`
Registro de execução de treinos
- `aluno_id` - Aluno que executou
- `aluno_workout_id` - Treino atribuído
- `workout_date` - Data da execução
- `duration_minutes` - Duração real
- `completed` - Se foi completado
- `notes` - Observações do aluno

#### `exercise_logs`
Registro detalhado de cada exercício
- `workout_log_id` - Log do treino
- `exercise_id` - Exercício executado
- `sets_completed` - Séries completadas
- `reps_completed` - Repetições completadas
- `weight_used` - Peso utilizado
- `notes` - Observações

---

### 🥗 **Tabelas de Dieta**

#### `foods`
Banco de dados de alimentos (por 100g)
- `name` - Nome do alimento
- `category` - Categoria (Proteínas, Carboidratos, etc)
- `calories` - Calorias
- `protein` - Proteínas (g)
- `carbs` - Carboidratos (g)
- `fat` - Gorduras (g)
- `serving_size` - Tamanho da porção padrão
- `serving_unit` - Unidade (g, ml, unidade)
- `created_by` - Quem criou
- `is_public` - Se está disponível para todos

#### `diets`
Dietas criadas pelos Personal Trainers
- `personal_trainer_id` - Personal que criou
- `name` - Nome da dieta
- `description` - Descrição
- `target_calories` - Meta de calorias diárias
- `target_protein` - Meta de proteínas
- `target_carbs` - Meta de carboidratos
- `target_fat` - Meta de gorduras
- `is_template` - Se é um template

#### `meals`
Refeições dentro de uma dieta
- `diet_id` - Dieta à qual pertence
- `name` - Nome da refeição (Café da Manhã, Almoço, etc)
- `time` - Horário sugerido
- `order_index` - Ordem no dia

#### `meal_foods`
Alimentos dentro de cada refeição
- `meal_id` - Refeição
- `food_id` - Alimento
- `portion` - Porção em gramas
- `notes` - Observações

#### `aluno_diets`
Dietas atribuídas aos alunos
- `aluno_id` - Aluno
- `diet_id` - Dieta
- `assigned_date` - Data de atribuição
- `start_date` - Data de início
- `end_date` - Data de término
- `status` - 'active', 'completed', 'cancelled'

---

### 💊 **Tabelas de Suplementos**

#### `supplements`
Catálogo de suplementos
- `name` - Nome do suplemento
- `brand` - Marca
- `category` - Categoria
- `description` - Descrição
- `dosage` - Dosagem padrão

#### `aluno_supplements`
Suplementos atribuídos aos alunos
- `aluno_id` - Aluno
- `supplement_id` - Suplemento
- `dosage` - Dosagem específica
- `frequency` - Frequência (1x/dia, 2x/dia, etc)
- `time_of_day` - Horário (manhã, noite, pré-treino, etc)
- `start_date` - Data de início
- `end_date` - Data de término

---

### 📈 **Tabelas de Progresso**

#### `progress_measurements`
Medições e acompanhamento
- `aluno_id` - Aluno
- `measurement_date` - Data da medição
- `weight` - Peso
- `body_fat_percentage` - % de gordura corporal
- `muscle_mass` - Massa muscular
- `chest` - Circunferência do peito
- `waist` - Circunferência da cintura
- `hips` - Circunferência do quadril
- `arm_left/right` - Circunferência dos braços
- `thigh_left/right` - Circunferência das coxas
- `calf_left/right` - Circunferência das panturrilhas
- `photos` - Array de URLs de fotos
- `notes` - Observações

---

### 💬 **Tabelas de Comunicação**

#### `messages`
Mensagens entre Personal e Alunos
- `sender_id` - Quem enviou
- `recipient_id` - Quem recebeu
- `message` - Conteúdo da mensagem
- `read` - Se foi lida
- `read_at` - Quando foi lida

#### `notifications`
Notificações do sistema
- `user_id` - Usuário
- `title` - Título da notificação
- `message` - Mensagem
- `type` - Tipo de notificação
- `read` - Se foi lida
- `action_url` - URL de ação (opcional)

---

### 💰 **Tabelas Financeiras**

#### `payments`
Pagamentos dos alunos
- `aluno_id` - Aluno
- `personal_trainer_id` - Personal
- `amount` - Valor
- `payment_date` - Data do pagamento
- `due_date` - Data de vencimento
- `status` - 'pending', 'paid', 'overdue', 'cancelled'
- `payment_method` - Método de pagamento
- `description` - Descrição

---

## 🔒 Segurança (RLS - Row Level Security)

O schema inclui políticas de segurança em nível de linha (RLS) que garantem:

### ✅ Usuários podem:
- Ver e editar apenas seus próprios dados
- Personal trainers podem ver/editar dados de seus alunos
- Alunos podem ver apenas seus próprios dados
- Exercícios e alimentos públicos são visíveis para todos

### ❌ Usuários NÃO podem:
- Acessar dados de outros usuários
- Ver alunos de outros personal trainers
- Modificar dados de outras pessoas

---

## 🔧 Funções Auxiliares

### `calculate_aluno_adherence(aluno_uuid)`
Calcula a aderência do aluno baseado nos treinos completados nos últimos 30 dias.

**Uso:**
```sql
SELECT calculate_aluno_adherence('uuid-do-aluno');
```

**Retorna:** INTEGER (0-100)

---

## 📊 Índices para Performance

O schema inclui índices otimizados para:
- Buscas por grupo muscular em exercícios
- Buscas por categoria em alimentos
- Ordenação de exercícios em treinos
- Consultas de mensagens por remetente/destinatário
- Consultas de progresso por data
- Consultas financeiras por personal/aluno

---

## 🔄 Triggers Automáticos

Todas as tabelas com campo `updated_at` têm triggers que atualizam automaticamente esse campo quando há uma alteração.

---

## 🌱 Próximos Passos

Após executar o schema:

1. **Popular dados iniciais**
   - Exercícios (execute o script de seed em `seeds/exercises.sql`)
   - Alimentos (execute o script de seed em `seeds/foods.sql`)

2. **Configurar autenticação**
   - Configure providers no Supabase (Email, Google, etc)
   - Configure emails transacionais

3. **Configurar Storage**
   - Crie buckets para: `avatars`, `progress-photos`, `exercise-videos`

4. **Testar políticas RLS**
   - Crie usuários de teste
   - Verifique se as permissões estão corretas

---

## 📝 Notas Importantes

- Todos os campos de medição usam DECIMAL para precisão
- UUIDs são gerados automaticamente
- Timestamps incluem timezone
- Arrays são usados para fotos e especialidades
- RLS está habilitado em todas as tabelas
- Foreign keys têm ON DELETE CASCADE ou SET NULL conforme necessário

---

## 🆘 Troubleshooting

### "Função gen_random_uuid() não existe"
Execute:
```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

### "Políticas RLS bloqueando acesso"
Verifique se o usuário está autenticado e se `auth.uid()` retorna o UUID correto.

### "Trigger não está atualizando updated_at"
Verifique se a função `update_updated_at_column()` foi criada corretamente.

---

## 📞 Suporte

Para dúvidas sobre o schema:
- Consulte a documentação do Supabase: https://supabase.com/docs
- Verifique os logs de erro no SQL Editor
- Teste as queries no SQL Editor antes de usar na aplicação
