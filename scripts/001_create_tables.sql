-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('profesor', 'admin')),
  nombre TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create buildings table
CREATE TABLE IF NOT EXISTS public.edificios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  codigo TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create classrooms table
CREATE TABLE IF NOT EXISTS public.aulas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  edificio_id UUID NOT NULL REFERENCES public.edificios(id) ON DELETE CASCADE,
  numero TEXT NOT NULL,
  capacidad INTEGER NOT NULL,
  piso INTEGER NOT NULL,
  equipamiento TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(edificio_id, numero)
);

-- Create reservations table
CREATE TABLE IF NOT EXISTS public.reservas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aula_id UUID NOT NULL REFERENCES public.aulas(id) ON DELETE CASCADE,
  profesor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  materia TEXT NOT NULL,
  fecha DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  estudiantes_esperados INTEGER NOT NULL,
  notas TEXT,
  estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'confirmada', 'cancelada')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create verification reports table
CREATE TABLE IF NOT EXISTS public.reportes_verificacion (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aula_id UUID NOT NULL REFERENCES public.aulas(id) ON DELETE CASCADE,
  admin_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reserva_id UUID REFERENCES public.reservas(id) ON DELETE SET NULL,
  fecha TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  estado_aula TEXT NOT NULL CHECK (estado_aula IN ('libre', 'ocupada', 'mantenimiento')),
  estudiantes_presentes INTEGER,
  profesor_presente BOOLEAN,
  notas TEXT,
  accion TEXT NOT NULL CHECK (accion IN ('verificado', 'rechazado', 'pendiente')) DEFAULT 'pendiente',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create class schedules table
CREATE TABLE IF NOT EXISTS public.horarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aula_id UUID NOT NULL REFERENCES public.aulas(id) ON DELETE CASCADE,
  profesor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  materia TEXT NOT NULL,
  dia_semana INTEGER NOT NULL CHECK (dia_semana BETWEEN 0 AND 6),
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edificios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reportes_verificacion ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.horarios ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for edificios (everyone can read)
CREATE POLICY "Everyone can view buildings" ON public.edificios FOR SELECT USING (true);
CREATE POLICY "Only admins can insert buildings" ON public.edificios FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Only admins can update buildings" ON public.edificios FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS Policies for aulas (everyone can read)
CREATE POLICY "Everyone can view classrooms" ON public.aulas FOR SELECT USING (true);
CREATE POLICY "Only admins can insert classrooms" ON public.aulas FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Only admins can update classrooms" ON public.aulas FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS Policies for reservas
CREATE POLICY "Everyone can view reservations" ON public.reservas FOR SELECT USING (true);
CREATE POLICY "Professors can create their own reservations" ON public.reservas FOR INSERT WITH CHECK (
  auth.uid() = profesor_id AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'profesor')
);
CREATE POLICY "Professors can update their own reservations" ON public.reservas FOR UPDATE USING (
  auth.uid() = profesor_id
);
CREATE POLICY "Professors can delete their own reservations" ON public.reservas FOR DELETE USING (
  auth.uid() = profesor_id
);

-- RLS Policies for reportes_verificacion
CREATE POLICY "Everyone can view verification reports" ON public.reportes_verificacion FOR SELECT USING (true);
CREATE POLICY "Only admins can create verification reports" ON public.reportes_verificacion FOR INSERT WITH CHECK (
  auth.uid() = admin_id AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Only admins can update verification reports" ON public.reportes_verificacion FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- RLS Policies for horarios
CREATE POLICY "Everyone can view schedules" ON public.horarios FOR SELECT USING (true);
CREATE POLICY "Professors can create their own schedules" ON public.horarios FOR INSERT WITH CHECK (
  auth.uid() = profesor_id
);
CREATE POLICY "Professors can update their own schedules" ON public.horarios FOR UPDATE USING (
  auth.uid() = profesor_id
);
CREATE POLICY "Professors can delete their own schedules" ON public.horarios FOR DELETE USING (
  auth.uid() = profesor_id
);
