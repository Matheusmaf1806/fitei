-- =====================================================
-- SEED: Alimentos
-- Popula o banco com alimentos iniciais
-- Valores nutricionais por 100g
-- =====================================================

-- PROTEÍNAS - CARNES
INSERT INTO public.foods (name, category, calories, protein, carbs, fat, serving_size, serving_unit, is_public) VALUES
('Peito de Frango Grelhado', 'Proteínas - Carnes', 165, 31, 0, 3.6, 100, 'g', true),
('Peito de Frango Cozido', 'Proteínas - Carnes', 165, 31, 0, 3.6, 100, 'g', true),
('Coxa de Frango sem Pele', 'Proteínas - Carnes', 119, 21, 0, 3.7, 100, 'g', true),
('Carne Bovina Magra (Patinho)', 'Proteínas - Carnes', 158, 26, 0, 5.5, 100, 'g', true),
('Carne Bovina (Alcatra)', 'Proteínas - Carnes', 198, 23, 0, 11, 100, 'g', true),
('Carne Bovina (Filé Mignon)', 'Proteínas - Carnes', 206, 23, 0, 12, 100, 'g', true),
('Carne Bovina (Picanha)', 'Proteínas - Carnes', 271, 20, 0, 21, 100, 'g', true),
('Carne Bovina Moída (Magra)', 'Proteínas - Carnes', 176, 20, 0, 10, 100, 'g', true),
('Carne de Porco (Lombo)', 'Proteínas - Carnes', 143, 21, 0, 6, 100, 'g', true),
('Carne de Porco (Bisteca)', 'Proteínas - Carnes', 231, 19, 0, 17, 100, 'g', true),
('Peru (Peito)', 'Proteínas - Carnes', 135, 30, 0, 0.7, 100, 'g', true),
('Patinho Moído', 'Proteínas - Carnes', 158, 26, 0, 5.5, 100, 'g', true);

-- PROTEÍNAS - PEIXES
INSERT INTO public.foods (name, category, calories, protein, carbs, fat, serving_size, serving_unit, is_public) VALUES
('Salmão', 'Proteínas - Peixes', 208, 20, 0, 13, 100, 'g', true),
('Atum em Água', 'Proteínas - Peixes', 116, 26, 0, 0.8, 100, 'g', true),
('Atum em Óleo', 'Proteínas - Peixes', 198, 29, 0, 8, 100, 'g', true),
('Tilápia', 'Proteínas - Peixes', 96, 20, 0, 1.7, 100, 'g', true),
('Bacalhau', 'Proteínas - Peixes', 82, 18, 0, 0.7, 100, 'g', true),
('Sardinha', 'Proteínas - Peixes', 208, 25, 0, 11, 100, 'g', true),
('Pescada', 'Proteínas - Peixes', 86, 17, 0, 1.5, 100, 'g', true),
('Merluza', 'Proteínas - Peixes', 85, 17, 0, 1.4, 100, 'g', true),
('Linguado', 'Proteínas - Peixes', 91, 19, 0, 1.2, 100, 'g', true),
('Camarão', 'Proteínas - Peixes', 99, 24, 0.2, 0.3, 100, 'g', true);

-- PROTEÍNAS - OVOS E LATICÍNIOS
INSERT INTO public.foods (name, category, calories, protein, carbs, fat, serving_size, serving_unit, is_public) VALUES
('Ovo Inteiro Cozido', 'Proteínas - Ovos e Laticínios', 155, 13, 1.1, 11, 100, 'g', true),
('Clara de Ovo', 'Proteínas - Ovos e Laticínios', 52, 11, 0.7, 0.2, 100, 'g', true),
('Gema de Ovo', 'Proteínas - Ovos e Laticínios', 322, 16, 3.6, 27, 100, 'g', true),
('Omelete Simples', 'Proteínas - Ovos e Laticínios', 154, 11, 0.6, 12, 100, 'g', true),
('Queijo Cottage', 'Proteínas - Ovos e Laticínios', 98, 11, 3.4, 4.3, 100, 'g', true),
('Queijo Minas Frescal', 'Proteínas - Ovos e Laticínios', 264, 17, 5.5, 19, 100, 'g', true),
('Queijo Ricota', 'Proteínas - Ovos e Laticínios', 174, 11, 3, 13, 100, 'g', true),
('Queijo Muçarela', 'Proteínas - Ovos e Laticínios', 280, 28, 2.2, 17, 100, 'g', true),
('Iogurte Grego Natural', 'Proteínas - Ovos e Laticínios', 97, 10, 3.6, 5, 100, 'g', true),
('Iogurte Desnatado', 'Proteínas - Ovos e Laticínios', 56, 5.7, 7.7, 0.2, 100, 'g', true),
('Leite Integral', 'Proteínas - Ovos e Laticínios', 61, 3.2, 4.8, 3.3, 100, 'ml', true),
('Leite Desnatado', 'Proteínas - Ovos e Laticínios', 34, 3.4, 5, 0.1, 100, 'ml', true),
('Requeijão Light', 'Proteínas - Ovos e Laticínios', 174, 11, 3.6, 13, 100, 'g', true);

-- CARBOIDRATOS - CEREAIS E GRÃOS
INSERT INTO public.foods (name, category, calories, protein, carbs, fat, serving_size, serving_unit, is_public) VALUES
('Arroz Branco Cozido', 'Carboidratos - Cereais e Grãos', 130, 2.7, 28, 0.3, 100, 'g', true),
('Arroz Integral Cozido', 'Carboidratos - Cereais e Grãos', 112, 2.6, 24, 0.9, 100, 'g', true),
('Arroz Parboilizado', 'Carboidratos - Cereais e Grãos', 123, 2.5, 27, 0.4, 100, 'g', true),
('Macarrão Cozido', 'Carboidratos - Cereais e Grãos', 131, 5, 25, 1.1, 100, 'g', true),
('Macarrão Integral Cozido', 'Carboidratos - Cereais e Grãos', 124, 5, 26, 1.3, 100, 'g', true),
('Aveia em Flocos', 'Carboidratos - Cereais e Grãos', 389, 17, 66, 7, 100, 'g', true),
('Granola', 'Carboidratos - Cereais e Grãos', 471, 13, 64, 17, 100, 'g', true),
('Quinoa Cozida', 'Carboidratos - Cereais e Grãos', 120, 4.4, 21, 1.9, 100, 'g', true),
('Cuscuz Marroquino', 'Carboidratos - Cereais e Grãos', 112, 3.8, 23, 0.2, 100, 'g', true),
('Milho Verde Cozido', 'Carboidratos - Cereais e Grãos', 86, 3.3, 19, 1.4, 100, 'g', true),
('Ervilha Cozida', 'Carboidratos - Cereais e Grãos', 81, 5.4, 14, 0.4, 100, 'g', true),
('Grão de Bico Cozido', 'Carboidratos - Cereais e Grãos', 164, 8.9, 27, 2.6, 100, 'g', true),
('Lentilha Cozida', 'Carboidratos - Cereais e Grãos', 116, 9, 20, 0.4, 100, 'g', true),
('Feijão Preto Cozido', 'Carboidratos - Cereais e Grãos', 77, 4.5, 14, 0.5, 100, 'g', true),
('Feijão Carioca Cozido', 'Carboidratos - Cereais e Grãos', 76, 4.8, 13.6, 0.5, 100, 'g', true);

-- CARBOIDRATOS - TUBÉRCULOS
INSERT INTO public.foods (name, category, calories, protein, carbs, fat, serving_size, serving_unit, is_public) VALUES
('Batata Doce Cozida', 'Carboidratos - Tubérculos', 86, 1.6, 20, 0.1, 100, 'g', true),
('Batata Doce Assada', 'Carboidratos - Tubérculos', 90, 2, 21, 0.2, 100, 'g', true),
('Batata Inglesa Cozida', 'Carboidratos - Tubérculos', 87, 1.9, 20, 0.1, 100, 'g', true),
('Batata Inglesa Assada', 'Carboidratos - Tubérculos', 93, 2.5, 21, 0.1, 100, 'g', true),
('Mandioca Cozida', 'Carboidratos - Tubérculos', 125, 0.6, 30, 0.3, 100, 'g', true),
('Inhame Cozido', 'Carboidratos - Tubérculos', 118, 1.5, 28, 0.2, 100, 'g', true),
('Cará Cozido', 'Carboidratos - Tubérculos', 118, 1.5, 28, 0.2, 100, 'g', true),
('Mandioquinha Cozida', 'Carboidratos - Tubérculos', 98, 1, 23, 0.3, 100, 'g', true);

-- CARBOIDRATOS - PÃES
INSERT INTO public.foods (name, category, calories, protein, carbs, fat, serving_size, serving_unit, is_public) VALUES
('Pão Francês', 'Carboidratos - Pães', 300, 9, 58, 3.1, 100, 'g', true),
('Pão de Forma Integral', 'Carboidratos - Pães', 253, 9, 43, 4.2, 100, 'g', true),
('Pão de Forma Branco', 'Carboidratos - Pães', 266, 8.3, 50, 3.3, 100, 'g', true),
('Pão Sírio Integral', 'Carboidratos - Pães', 268, 10, 52, 2.2, 100, 'g', true),
('Pão de Centeio', 'Carboidratos - Pães', 259, 8.5, 48, 3.3, 100, 'g', true),
('Tapioca', 'Carboidratos - Pães', 357, 0.6, 88, 0.3, 100, 'g', true),
('Torrada Integral', 'Carboidratos - Pães', 373, 11, 66, 5.6, 100, 'g', true);

-- VEGETAIS - FOLHAS
INSERT INTO public.foods (name, category, calories, protein, carbs, fat, serving_size, serving_unit, is_public) VALUES
('Alface', 'Vegetais - Folhas', 15, 1.4, 2.3, 0.2, 100, 'g', true),
('Rúcula', 'Vegetais - Folhas', 25, 2.6, 3.7, 0.7, 100, 'g', true),
('Espinafre', 'Vegetais - Folhas', 23, 2.9, 3.6, 0.4, 100, 'g', true),
('Couve', 'Vegetais - Folhas', 49, 4.3, 10, 0.9, 100, 'g', true),
('Agrião', 'Vegetais - Folhas', 11, 2.6, 1.3, 0.1, 100, 'g', true),
('Acelga', 'Vegetais - Folhas', 19, 1.8, 3.7, 0.2, 100, 'g', true),
('Almeirão', 'Vegetais - Folhas', 23, 1.7, 4.7, 0.3, 100, 'g', true),
('Repolho', 'Vegetais - Folhas', 25, 1.3, 5.8, 0.1, 100, 'g', true);

-- VEGETAIS - LEGUMES
INSERT INTO public.foods (name, category, calories, protein, carbs, fat, serving_size, serving_unit, is_public) VALUES
('Brócolis Cozido', 'Vegetais - Legumes', 35, 2.4, 7, 0.4, 100, 'g', true),
('Couve-flor Cozida', 'Vegetais - Legumes', 23, 1.9, 4.7, 0.2, 100, 'g', true),
('Cenoura Cozida', 'Vegetais - Legumes', 35, 0.8, 8.2, 0.2, 100, 'g', true),
('Beterraba Cozida', 'Vegetais - Legumes', 44, 1.7, 10, 0.2, 100, 'g', true),
('Abobrinha Cozida', 'Vegetais - Legumes', 17, 1.2, 3.1, 0.3, 100, 'g', true),
('Berinjela Cozida', 'Vegetais - Legumes', 35, 0.8, 8.7, 0.2, 100, 'g', true),
('Abóbora Cozida', 'Vegetais - Legumes', 26, 1, 6.5, 0.1, 100, 'g', true),
('Chuchu Cozido', 'Vegetais - Legumes', 19, 0.8, 4.5, 0.1, 100, 'g', true),
('Vagem Cozida', 'Vegetais - Legumes', 31, 1.8, 7, 0.1, 100, 'g', true),
('Quiabo Cozido', 'Vegetais - Legumes', 22, 1.9, 4.5, 0.2, 100, 'g', true),
('Tomate', 'Vegetais - Legumes', 18, 0.9, 3.9, 0.2, 100, 'g', true),
('Pepino', 'Vegetais - Legumes', 15, 0.7, 3.6, 0.1, 100, 'g', true),
('Pimentão', 'Vegetais - Legumes', 31, 1, 6, 0.3, 100, 'g', true);

-- FRUTAS
INSERT INTO public.foods (name, category, calories, protein, carbs, fat, serving_size, serving_unit, is_public) VALUES
('Banana', 'Frutas', 89, 1.1, 23, 0.3, 100, 'g', true),
('Maçã', 'Frutas', 52, 0.3, 14, 0.2, 100, 'g', true),
('Laranja', 'Frutas', 47, 0.9, 12, 0.1, 100, 'g', true),
('Morango', 'Frutas', 32, 0.7, 7.7, 0.3, 100, 'g', true),
('Manga', 'Frutas', 60, 0.8, 15, 0.4, 100, 'g', true),
('Abacaxi', 'Frutas', 50, 0.5, 13, 0.1, 100, 'g', true),
('Melancia', 'Frutas', 30, 0.6, 8, 0.2, 100, 'g', true),
('Uva', 'Frutas', 69, 0.7, 18, 0.2, 100, 'g', true),
('Mamão', 'Frutas', 43, 0.5, 11, 0.3, 100, 'g', true),
('Abacate', 'Frutas', 160, 2, 8.5, 15, 100, 'g', true),
('Kiwi', 'Frutas', 61, 1.1, 15, 0.5, 100, 'g', true),
('Pêra', 'Frutas', 57, 0.4, 15, 0.1, 100, 'g', true);

-- GORDURAS SAUDÁVEIS
INSERT INTO public.foods (name, category, calories, protein, carbs, fat, serving_size, serving_unit, is_public) VALUES
('Azeite de Oliva', 'Gorduras Saudáveis', 884, 0, 0, 100, 100, 'ml', true),
('Óleo de Coco', 'Gorduras Saudáveis', 862, 0, 0, 100, 100, 'ml', true),
('Amendoim', 'Gorduras Saudáveis', 567, 26, 16, 49, 100, 'g', true),
('Castanha do Pará', 'Gorduras Saudáveis', 656, 14, 12, 66, 100, 'g', true),
('Castanha de Caju', 'Gorduras Saudáveis', 553, 18, 30, 44, 100, 'g', true),
('Amêndoas', 'Gorduras Saudáveis', 579, 21, 22, 50, 100, 'g', true),
('Nozes', 'Gorduras Saudáveis', 654, 15, 14, 65, 100, 'g', true),
('Pasta de Amendoim', 'Gorduras Saudáveis', 588, 25, 20, 50, 100, 'g', true);

-- WHEY E SUPLEMENTOS ALIMENTARES
INSERT INTO public.foods (name, category, calories, protein, carbs, fat, serving_size, serving_unit, is_public) VALUES
('Whey Protein', 'Suplementos', 400, 80, 10, 5, 100, 'g', true),
('Whey Isolado', 'Suplementos', 370, 90, 2, 1, 100, 'g', true),
('Caseína', 'Suplementos', 360, 76, 8, 2, 100, 'g', true),
('Albumina', 'Suplementos', 387, 81, 4, 0.5, 100, 'g', true),
('Creatina', 'Suplementos', 0, 0, 0, 0, 5, 'g', true),
('BCAA', 'Suplementos', 0, 0, 0, 0, 5, 'g', true),
('Maltodextrina', 'Suplementos', 380, 0, 95, 0, 100, 'g', true),
('Dextrose', 'Suplementos', 387, 0, 100, 0, 100, 'g', true);
