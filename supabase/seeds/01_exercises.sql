-- =====================================================
-- SEED: Exercícios
-- Popula o banco com exercícios iniciais
-- =====================================================

-- PEITO
INSERT INTO public.exercises (name, muscle_group, equipment, difficulty, is_public) VALUES
('Supino Reto com Barra', 'Peito', 'Barra', 'Intermediário', true),
('Supino Inclinado com Barra', 'Peito', 'Barra', 'Intermediário', true),
('Supino Declinado com Barra', 'Peito', 'Barra', 'Intermediário', true),
('Supino Reto com Halteres', 'Peito', 'Halteres', 'Intermediário', true),
('Supino Inclinado com Halteres', 'Peito', 'Halteres', 'Intermediário', true),
('Supino Declinado com Halteres', 'Peito', 'Halteres', 'Intermediário', true),
('Crucifixo Reto', 'Peito', 'Halteres', 'Iniciante', true),
('Crucifixo Inclinado', 'Peito', 'Halteres', 'Iniciante', true),
('Crucifixo na Máquina', 'Peito', 'Máquina', 'Iniciante', true),
('Crossover no Cabo Alto', 'Peito', 'Cabo', 'Iniciante', true),
('Crossover no Cabo Médio', 'Peito', 'Cabo', 'Iniciante', true),
('Crossover no Cabo Baixo', 'Peito', 'Cabo', 'Iniciante', true),
('Flexão de Braço', 'Peito', 'Peso Corporal', 'Iniciante', true),
('Flexão com Peso', 'Peito', 'Peso Corporal', 'Avançado', true),
('Flexão Diamante', 'Peito', 'Peso Corporal', 'Intermediário', true),
('Pullover com Halteres', 'Peito', 'Halteres', 'Intermediário', true),
('Pullover no Cabo', 'Peito', 'Cabo', 'Intermediário', true),
('Peck Deck (Voador)', 'Peito', 'Máquina', 'Iniciante', true);

-- COSTAS
INSERT INTO public.exercises (name, muscle_group, equipment, difficulty, is_public) VALUES
('Barra Fixa (Pull Up)', 'Costas', 'Peso Corporal', 'Avançado', true),
('Barra Fixa Supinada (Chin Up)', 'Costas', 'Peso Corporal', 'Avançado', true),
('Puxada Frontal Aberta', 'Costas', 'Cabo', 'Iniciante', true),
('Puxada Frontal Fechada', 'Costas', 'Cabo', 'Iniciante', true),
('Puxada Supinada', 'Costas', 'Cabo', 'Iniciante', true),
('Puxada Triângulo', 'Costas', 'Cabo', 'Iniciante', true),
('Remada Curvada com Barra', 'Costas', 'Barra', 'Intermediário', true),
('Remada Curvada com Halteres', 'Costas', 'Halteres', 'Intermediário', true),
('Remada Unilateral', 'Costas', 'Halteres', 'Iniciante', true),
('Remada Cavalinho', 'Costas', 'Máquina', 'Iniciante', true),
('Remada Baixa (Puxada)', 'Costas', 'Cabo', 'Iniciante', true),
('Remada Alta', 'Costas', 'Cabo', 'Iniciante', true),
('Remada Serrote', 'Costas', 'Halteres', 'Intermediário', true),
('Levantamento Terra', 'Costas', 'Barra', 'Avançado', true),
('Levantamento Terra Sumô', 'Costas', 'Barra', 'Avançado', true),
('Levantamento Terra Romeno', 'Costas', 'Barra', 'Intermediário', true),
('Pulldown Reto', 'Costas', 'Cabo', 'Iniciante', true),
('Encolhimento com Barra', 'Costas', 'Barra', 'Iniciante', true),
('Encolhimento com Halteres', 'Costas', 'Halteres', 'Iniciante', true);

-- OMBROS
INSERT INTO public.exercises (name, muscle_group, equipment, difficulty, is_public) VALUES
('Desenvolvimento com Barra', 'Ombros', 'Barra', 'Intermediário', true),
('Desenvolvimento com Halteres', 'Ombros', 'Halteres', 'Intermediário', true),
('Desenvolvimento Militar', 'Ombros', 'Barra', 'Intermediário', true),
('Desenvolvimento Arnold', 'Ombros', 'Halteres', 'Avançado', true),
('Elevação Lateral', 'Ombros', 'Halteres', 'Iniciante', true),
('Elevação Lateral no Cabo', 'Ombros', 'Cabo', 'Iniciante', true),
('Elevação Frontal', 'Ombros', 'Halteres', 'Iniciante', true),
('Elevação Frontal com Barra', 'Ombros', 'Barra', 'Iniciante', true),
('Elevação Frontal no Cabo', 'Ombros', 'Cabo', 'Iniciante', true),
('Crucifixo Inverso', 'Ombros', 'Halteres', 'Intermediário', true),
('Crucifixo Inverso na Máquina', 'Ombros', 'Máquina', 'Iniciante', true),
('Remada Alta com Barra', 'Ombros', 'Barra', 'Intermediário', true),
('Remada Alta com Halteres', 'Ombros', 'Halteres', 'Intermediário', true),
('Face Pull', 'Ombros', 'Cabo', 'Iniciante', true);

-- BÍCEPS
INSERT INTO public.exercises (name, muscle_group, equipment, difficulty, is_public) VALUES
('Rosca Direta com Barra', 'Bíceps', 'Barra', 'Iniciante', true),
('Rosca Direta com Halteres', 'Bíceps', 'Halteres', 'Iniciante', true),
('Rosca Alternada', 'Bíceps', 'Halteres', 'Iniciante', true),
('Rosca Martelo', 'Bíceps', 'Halteres', 'Iniciante', true),
('Rosca Concentrada', 'Bíceps', 'Halteres', 'Iniciante', true),
('Rosca Scott com Barra', 'Bíceps', 'Barra', 'Intermediário', true),
('Rosca Scott com Halteres', 'Bíceps', 'Halteres', 'Intermediário', true),
('Rosca 21', 'Bíceps', 'Barra', 'Avançado', true),
('Rosca Inversa', 'Bíceps', 'Barra', 'Intermediário', true),
('Rosca no Cabo', 'Bíceps', 'Cabo', 'Iniciante', true),
('Rosca Spider', 'Bíceps', 'Barra', 'Intermediário', true);

-- TRÍCEPS
INSERT INTO public.exercises (name, muscle_group, equipment, difficulty, is_public) VALUES
('Tríceps Testa', 'Tríceps', 'Barra', 'Intermediário', true),
('Tríceps Testa com Halteres', 'Tríceps', 'Halteres', 'Intermediário', true),
('Tríceps Francês', 'Tríceps', 'Halteres', 'Intermediário', true),
('Tríceps Corda', 'Tríceps', 'Cabo', 'Iniciante', true),
('Tríceps Barra Reta', 'Tríceps', 'Cabo', 'Iniciante', true),
('Tríceps Barra V', 'Tríceps', 'Cabo', 'Iniciante', true),
('Tríceps Unilateral no Cabo', 'Tríceps', 'Cabo', 'Iniciante', true),
('Tríceps Coice', 'Tríceps', 'Halteres', 'Iniciante', true),
('Mergulho em Paralelas', 'Tríceps', 'Peso Corporal', 'Avançado', true),
('Mergulho no Banco', 'Tríceps', 'Peso Corporal', 'Intermediário', true),
('Supino Fechado', 'Tríceps', 'Barra', 'Intermediário', true);

-- PERNAS - QUADRÍCEPS
INSERT INTO public.exercises (name, muscle_group, equipment, difficulty, is_public) VALUES
('Agachamento Livre', 'Pernas - Quadríceps', 'Barra', 'Avançado', true),
('Agachamento no Smith', 'Pernas - Quadríceps', 'Máquina', 'Intermediário', true),
('Agachamento Frontal', 'Pernas - Quadríceps', 'Barra', 'Avançado', true),
('Agachamento Sumô', 'Pernas - Quadríceps', 'Barra', 'Intermediário', true),
('Agachamento Búlgaro', 'Pernas - Quadríceps', 'Halteres', 'Intermediário', true),
('Leg Press 45°', 'Pernas - Quadríceps', 'Máquina', 'Iniciante', true),
('Leg Press Horizontal', 'Pernas - Quadríceps', 'Máquina', 'Iniciante', true),
('Hack Machine', 'Pernas - Quadríceps', 'Máquina', 'Intermediário', true),
('Cadeira Extensora', 'Pernas - Quadríceps', 'Máquina', 'Iniciante', true),
('Avanço (Afundo)', 'Pernas - Quadríceps', 'Halteres', 'Intermediário', true),
('Avanço com Barra', 'Pernas - Quadríceps', 'Barra', 'Intermediário', true),
('Sissy Squat', 'Pernas - Quadríceps', 'Peso Corporal', 'Avançado', true);

-- PERNAS - POSTERIOR
INSERT INTO public.exercises (name, muscle_group, equipment, difficulty, is_public) VALUES
('Mesa Flexora', 'Pernas - Posterior', 'Máquina', 'Iniciante', true),
('Flexora em Pé', 'Pernas - Posterior', 'Máquina', 'Iniciante', true),
('Stiff', 'Pernas - Posterior', 'Barra', 'Intermediário', true),
('Stiff com Halteres', 'Pernas - Posterior', 'Halteres', 'Intermediário', true),
('Good Morning', 'Pernas - Posterior', 'Barra', 'Avançado', true),
('Cadeira Adutora', 'Pernas - Posterior', 'Máquina', 'Iniciante', true),
('Cadeira Abdutora', 'Pernas - Posterior', 'Máquina', 'Iniciante', true),
('Elevação Pélvica', 'Pernas - Posterior', 'Peso Corporal', 'Iniciante', true),
('Elevação Pélvica com Barra', 'Pernas - Posterior', 'Barra', 'Intermediário', true);

-- PANTURRILHAS
INSERT INTO public.exercises (name, muscle_group, equipment, difficulty, is_public) VALUES
('Panturrilha em Pé', 'Panturrilhas', 'Máquina', 'Iniciante', true),
('Panturrilha Sentado', 'Panturrilhas', 'Máquina', 'Iniciante', true),
('Panturrilha no Leg Press', 'Panturrilhas', 'Máquina', 'Iniciante', true),
('Panturrilha no Smith', 'Panturrilhas', 'Máquina', 'Intermediário', true);

-- ABDÔMEN
INSERT INTO public.exercises (name, muscle_group, equipment, difficulty, is_public) VALUES
('Abdominal Supra', 'Abdômen', 'Peso Corporal', 'Iniciante', true),
('Abdominal Infra', 'Abdômen', 'Peso Corporal', 'Iniciante', true),
('Abdominal Canivete', 'Abdômen', 'Peso Corporal', 'Intermediário', true),
('Abdominal Bicicleta', 'Abdômen', 'Peso Corporal', 'Iniciante', true),
('Prancha Frontal', 'Abdômen', 'Peso Corporal', 'Iniciante', true),
('Prancha Lateral', 'Abdômen', 'Peso Corporal', 'Intermediário', true),
('Abdominal no Cabo', 'Abdômen', 'Cabo', 'Intermediário', true),
('Abdominal Remador', 'Abdômen', 'Peso Corporal', 'Avançado', true),
('Elevação de Pernas', 'Abdômen', 'Peso Corporal', 'Intermediário', true),
('Elevação de Pernas Suspenso', 'Abdômen', 'Peso Corporal', 'Avançado', true);
