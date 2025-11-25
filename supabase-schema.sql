-- =====================================================
-- SCHEMA DO BANCO DE DADOS - ToFiti
-- Supabase PostgreSQL Database Schema
-- =====================================================

-- =====================================================
-- TABELA: users (extends auth.users do Supabase)
-- Informações adicionais dos usuários
-- =====================================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('personal', 'aluno')),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELA: personal_trainers
-- Dados específicos dos Personal Trainers
-- =====================================================
CREATE TABLE public.personal_trainers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  cref VARCHAR(20),
  specialties TEXT[],
  bio TEXT,
  location VARCHAR(255),
  birth_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELA: alunos
-- Dados específicos dos Alunos
-- =====================================================
CREATE TABLE public.alunos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  personal_trainer_id UUID REFERENCES public.personal_trainers(id) ON DELETE SET NULL,
  birth_date DATE,
  weight DECIMAL(5,2),
  height DECIMAL(5,2),
  goal VARCHAR(100),
  medical_notes TEXT,
  adherence_score INTEGER DEFAULT 0 CHECK (adherence_score >= 0 AND adherence_score <= 100),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'warning', 'inactive')),
  last_activity TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELA: exercises
-- Banco de dados de exercícios
-- =====================================================
CREATE TABLE public.exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  muscle_group VARCHAR(100) NOT NULL,
  equipment VARCHAR(100),
  difficulty VARCHAR(50) CHECK (difficulty IN ('Iniciante', 'Intermediário', 'Avançado')),
  description TEXT,
  video_url TEXT,
  image_url TEXT,
  created_by UUID REFERENCES public.profiles(id),
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para busca rápida por grupo muscular
CREATE INDEX idx_exercises_muscle_group ON public.exercises(muscle_group);

-- =====================================================
-- TABELA: workouts
-- Treinos criados pelos Personal Trainers
-- =====================================================
CREATE TABLE public.workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  personal_trainer_id UUID REFERENCES public.personal_trainers(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  difficulty VARCHAR(50),
  duration_minutes INTEGER,
  is_template BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELA: workout_exercises
-- Exercícios dentro de um treino (relação many-to-many)
-- =====================================================
CREATE TABLE public.workout_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id UUID REFERENCES public.workouts(id) ON DELETE CASCADE,
  exercise_id UUID REFERENCES public.exercises(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  sets INTEGER,
  reps VARCHAR(50),
  rest_seconds INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para ordenação dos exercícios no treino
CREATE INDEX idx_workout_exercises_order ON public.workout_exercises(workout_id, order_index);

-- =====================================================
-- TABELA: aluno_workouts
-- Treinos atribuídos a alunos
-- =====================================================
CREATE TABLE public.aluno_workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id UUID REFERENCES public.alunos(id) ON DELETE CASCADE,
  workout_id UUID REFERENCES public.workouts(id) ON DELETE CASCADE,
  assigned_date DATE NOT NULL DEFAULT CURRENT_DATE,
  start_date DATE,
  end_date DATE,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELA: workout_logs
-- Registro de execução de treinos pelos alunos
-- =====================================================
CREATE TABLE public.workout_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id UUID REFERENCES public.alunos(id) ON DELETE CASCADE,
  aluno_workout_id UUID REFERENCES public.aluno_workouts(id) ON DELETE CASCADE,
  workout_date DATE NOT NULL DEFAULT CURRENT_DATE,
  duration_minutes INTEGER,
  completed BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELA: exercise_logs
-- Registro detalhado de cada exercício executado
-- =====================================================
CREATE TABLE public.exercise_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_log_id UUID REFERENCES public.workout_logs(id) ON DELETE CASCADE,
  exercise_id UUID REFERENCES public.exercises(id),
  sets_completed INTEGER,
  reps_completed VARCHAR(50),
  weight_used DECIMAL(6,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELA: foods
-- Banco de dados de alimentos
-- =====================================================
CREATE TABLE public.foods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  calories DECIMAL(8,2) NOT NULL,
  protein DECIMAL(6,2) DEFAULT 0,
  carbs DECIMAL(6,2) DEFAULT 0,
  fat DECIMAL(6,2) DEFAULT 0,
  serving_size DECIMAL(8,2) DEFAULT 100,
  serving_unit VARCHAR(20) DEFAULT 'g',
  created_by UUID REFERENCES public.profiles(id),
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para busca rápida por categoria
CREATE INDEX idx_foods_category ON public.foods(category);

-- =====================================================
-- TABELA: diets
-- Dietas criadas pelos Personal Trainers
-- =====================================================
CREATE TABLE public.diets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  personal_trainer_id UUID REFERENCES public.personal_trainers(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  target_calories INTEGER,
  target_protein DECIMAL(6,2),
  target_carbs DECIMAL(6,2),
  target_fat DECIMAL(6,2),
  is_template BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELA: meals
-- Refeições dentro de uma dieta
-- =====================================================
CREATE TABLE public.meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  diet_id UUID REFERENCES public.diets(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  time VARCHAR(10),
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELA: meal_foods
-- Alimentos dentro de uma refeição
-- =====================================================
CREATE TABLE public.meal_foods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_id UUID REFERENCES public.meals(id) ON DELETE CASCADE,
  food_id UUID REFERENCES public.foods(id) ON DELETE CASCADE,
  portion DECIMAL(8,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELA: aluno_diets
-- Dietas atribuídas a alunos
-- =====================================================
CREATE TABLE public.aluno_diets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id UUID REFERENCES public.alunos(id) ON DELETE CASCADE,
  diet_id UUID REFERENCES public.diets(id) ON DELETE CASCADE,
  assigned_date DATE NOT NULL DEFAULT CURRENT_DATE,
  start_date DATE,
  end_date DATE,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELA: supplements
-- Suplementos
-- =====================================================
CREATE TABLE public.supplements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(255),
  category VARCHAR(100),
  description TEXT,
  dosage VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELA: aluno_supplements
-- Suplementos atribuídos aos alunos
-- =====================================================
CREATE TABLE public.aluno_supplements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id UUID REFERENCES public.alunos(id) ON DELETE CASCADE,
  supplement_id UUID REFERENCES public.supplements(id) ON DELETE CASCADE,
  dosage VARCHAR(100),
  frequency VARCHAR(100),
  time_of_day VARCHAR(100),
  notes TEXT,
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABELA: progress_measurements
-- Medições de progresso dos alunos
-- =====================================================
CREATE TABLE public.progress_measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id UUID REFERENCES public.alunos(id) ON DELETE CASCADE,
  measurement_date DATE NOT NULL DEFAULT CURRENT_DATE,
  weight DECIMAL(5,2),
  body_fat_percentage DECIMAL(4,2),
  muscle_mass DECIMAL(5,2),
  chest DECIMAL(5,2),
  waist DECIMAL(5,2),
  hips DECIMAL(5,2),
  arm_left DECIMAL(5,2),
  arm_right DECIMAL(5,2),
  thigh_left DECIMAL(5,2),
  thigh_right DECIMAL(5,2),
  calf_left DECIMAL(5,2),
  calf_right DECIMAL(5,2),
  notes TEXT,
  photos TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para ordenação por data
CREATE INDEX idx_progress_date ON public.progress_measurements(aluno_id, measurement_date DESC);

-- =====================================================
-- TABELA: messages
-- Mensagens entre Personal e Alunos
-- =====================================================
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para consultas de mensagens
CREATE INDEX idx_messages_sender ON public.messages(sender_id, created_at DESC);
CREATE INDEX idx_messages_recipient ON public.messages(recipient_id, created_at DESC);

-- =====================================================
-- TABELA: notifications
-- Notificações do sistema
-- =====================================================
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50),
  read BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para consultas de notificações não lidas
CREATE INDEX idx_notifications_user_unread ON public.notifications(user_id, read, created_at DESC);

-- =====================================================
-- TABELA: payments
-- Pagamentos dos alunos
-- =====================================================
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id UUID REFERENCES public.alunos(id) ON DELETE CASCADE,
  personal_trainer_id UUID REFERENCES public.personal_trainers(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled')),
  payment_method VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índice para consultas financeiras
CREATE INDEX idx_payments_personal ON public.payments(personal_trainer_id, payment_date DESC);
CREATE INDEX idx_payments_aluno ON public.payments(aluno_id, payment_date DESC);

-- =====================================================
-- TRIGGERS PARA ATUALIZAR updated_at
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger em todas as tabelas com updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_personal_trainers_updated_at BEFORE UPDATE ON public.personal_trainers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_alunos_updated_at BEFORE UPDATE ON public.alunos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_exercises_updated_at BEFORE UPDATE ON public.exercises FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_workouts_updated_at BEFORE UPDATE ON public.workouts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_aluno_workouts_updated_at BEFORE UPDATE ON public.aluno_workouts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_foods_updated_at BEFORE UPDATE ON public.foods FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_diets_updated_at BEFORE UPDATE ON public.diets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_aluno_diets_updated_at BEFORE UPDATE ON public.aluno_diets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_aluno_supplements_updated_at BEFORE UPDATE ON public.aluno_supplements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alunos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aluno_workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aluno_diets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.supplements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aluno_supplements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLICIES: profiles
-- =====================================================
CREATE POLICY "Usuários podem ver seu próprio perfil"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- =====================================================
-- POLICIES: personal_trainers
-- =====================================================
CREATE POLICY "Personal pode ver seu próprio perfil"
  ON public.personal_trainers FOR SELECT
  USING (profile_id = auth.uid());

CREATE POLICY "Personal pode atualizar seu próprio perfil"
  ON public.personal_trainers FOR UPDATE
  USING (profile_id = auth.uid());

-- =====================================================
-- POLICIES: alunos
-- =====================================================
CREATE POLICY "Aluno pode ver seus próprios dados"
  ON public.alunos FOR SELECT
  USING (profile_id = auth.uid());

CREATE POLICY "Personal pode ver alunos dele"
  ON public.alunos FOR SELECT
  USING (
    personal_trainer_id IN (
      SELECT id FROM public.personal_trainers WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Personal pode atualizar alunos dele"
  ON public.alunos FOR UPDATE
  USING (
    personal_trainer_id IN (
      SELECT id FROM public.personal_trainers WHERE profile_id = auth.uid()
    )
  );

-- =====================================================
-- POLICIES: exercises
-- =====================================================
CREATE POLICY "Todos podem ver exercícios públicos"
  ON public.exercises FOR SELECT
  USING (is_public = true OR created_by = auth.uid());

CREATE POLICY "Personal pode criar exercícios"
  ON public.exercises FOR INSERT
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Personal pode atualizar seus exercícios"
  ON public.exercises FOR UPDATE
  USING (created_by = auth.uid());

-- =====================================================
-- POLICIES: workouts
-- =====================================================
CREATE POLICY "Personal pode ver seus treinos"
  ON public.workouts FOR SELECT
  USING (
    personal_trainer_id IN (
      SELECT id FROM public.personal_trainers WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Personal pode criar treinos"
  ON public.workouts FOR INSERT
  WITH CHECK (
    personal_trainer_id IN (
      SELECT id FROM public.personal_trainers WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Personal pode atualizar seus treinos"
  ON public.workouts FOR UPDATE
  USING (
    personal_trainer_id IN (
      SELECT id FROM public.personal_trainers WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Personal pode deletar seus treinos"
  ON public.workouts FOR DELETE
  USING (
    personal_trainer_id IN (
      SELECT id FROM public.personal_trainers WHERE profile_id = auth.uid()
    )
  );

-- =====================================================
-- POLICIES: messages
-- =====================================================
CREATE POLICY "Usuários podem ver mensagens enviadas por eles"
  ON public.messages FOR SELECT
  USING (sender_id = auth.uid() OR recipient_id = auth.uid());

CREATE POLICY "Usuários podem enviar mensagens"
  ON public.messages FOR INSERT
  WITH CHECK (sender_id = auth.uid());

-- =====================================================
-- POLICIES: payments
-- =====================================================
CREATE POLICY "Personal pode ver pagamentos dele"
  ON public.payments FOR SELECT
  USING (
    personal_trainer_id IN (
      SELECT id FROM public.personal_trainers WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Aluno pode ver seus pagamentos"
  ON public.payments FOR SELECT
  USING (
    aluno_id IN (
      SELECT id FROM public.alunos WHERE profile_id = auth.uid()
    )
  );

-- =====================================================
-- FUNÇÕES AUXILIARES
-- =====================================================

-- Função para calcular aderência do aluno
CREATE OR REPLACE FUNCTION calculate_aluno_adherence(aluno_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  total_workouts INTEGER;
  completed_workouts INTEGER;
  adherence INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_workouts
  FROM public.aluno_workouts
  WHERE aluno_id = aluno_uuid
    AND assigned_date >= CURRENT_DATE - INTERVAL '30 days';

  SELECT COUNT(*) INTO completed_workouts
  FROM public.workout_logs
  WHERE aluno_id = aluno_uuid
    AND workout_date >= CURRENT_DATE - INTERVAL '30 days'
    AND completed = true;

  IF total_workouts > 0 THEN
    adherence := ROUND((completed_workouts::DECIMAL / total_workouts) * 100);
  ELSE
    adherence := 0;
  END IF;

  RETURN adherence;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- ÍNDICES ADICIONAIS PARA PERFORMANCE
-- =====================================================
CREATE INDEX idx_alunos_personal ON public.alunos(personal_trainer_id);
CREATE INDEX idx_aluno_workouts_aluno ON public.aluno_workouts(aluno_id);
CREATE INDEX idx_aluno_diets_aluno ON public.aluno_diets(aluno_id);
CREATE INDEX idx_workout_logs_aluno ON public.workout_logs(aluno_id, workout_date DESC);
CREATE INDEX idx_progress_aluno ON public.progress_measurements(aluno_id);
