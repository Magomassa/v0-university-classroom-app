-- Create test users for the application
-- Admin account: admin@cursoalvuelo.com / Admin123!
-- Professor account: profesor@cursoalvuelo.com / Profesor123!

-- Insert admin user
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  aud,
  role
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'admin@cursoalvuelo.com',
  crypt('Admin123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"role":"admin","name":"Administrador Sistema"}',
  'authenticated',
  'authenticated'
);

-- Insert professor user
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  aud,
  role
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'profesor@cursoalvuelo.com',
  crypt('Profesor123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  -- Changed "professor" to "profesor" to match the check constraint
  '{"role":"profesor","name":"Profesor Demo"}',
  'authenticated',
  'authenticated'
);

-- The trigger will automatically create profiles for these users
