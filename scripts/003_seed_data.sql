-- Insert sample buildings
INSERT INTO public.edificios (nombre, codigo) VALUES
  ('Edificio Central', 'EC'),
  ('Edificio Norte', 'EN'),
  ('Edificio Sur', 'ES'),
  ('Laboratorios', 'LAB')
ON CONFLICT (codigo) DO NOTHING;

-- Insert sample classrooms
INSERT INTO public.aulas (edificio_id, numero, capacidad, piso, equipamiento)
SELECT 
  e.id,
  aula.numero,
  aula.capacidad,
  aula.piso,
  aula.equipamiento
FROM public.edificios e
CROSS JOIN (
  VALUES
    ('101', 30, 1, ARRAY['Proyector', 'Pizarra']),
    ('102', 40, 1, ARRAY['Proyector', 'Pizarra', 'Computadoras']),
    ('201', 25, 2, ARRAY['Proyector']),
    ('202', 35, 2, ARRAY['Proyector', 'Pizarra']),
    ('301', 50, 3, ARRAY['Proyector', 'Pizarra', 'Sistema de audio'])
) AS aula(numero, capacidad, piso, equipamiento)
WHERE e.codigo = 'EC'
ON CONFLICT (edificio_id, numero) DO NOTHING;

INSERT INTO public.aulas (edificio_id, numero, capacidad, piso, equipamiento)
SELECT 
  e.id,
  aula.numero,
  aula.capacidad,
  aula.piso,
  aula.equipamiento
FROM public.edificios e
CROSS JOIN (
  VALUES
    ('A1', 45, 1, ARRAY['Proyector', 'Pizarra', 'Computadoras']),
    ('A2', 45, 1, ARRAY['Proyector', 'Pizarra', 'Computadoras']),
    ('B1', 30, 2, ARRAY['Proyector', 'Pizarra'])
) AS aula(numero, capacidad, piso, equipamiento)
WHERE e.codigo = 'LAB'
ON CONFLICT (edificio_id, numero) DO NOTHING;
