-- Mock data para desarrollo local

-- Clinics
INSERT INTO clinics (id, name, rut, email, phone, address, city, country, legal_terms_accepted)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'Clínica Estética Premium',
  '76.123.456-7',
  'contact@clinicaestética.cl',
  '+56223456789',
  'Calle Principal 123, Piso 5',
  'Santiago',
  'Chile',
  true
);

-- Users (Profesionales)
INSERT INTO users (id, email, password_hash, first_name, last_name, rut, medical_license, phone, role, specialization, clinic_id)
VALUES (
  '650e8400-e29b-41d4-a716-446655440001',
  'dra.garcia@clinicaestética.cl',
  '$2b$10$Placeholder', -- Será hasheado en producción
  'María',
  'García',
  '18.456.789-5',
  'MED-2023-00123',
  '+56987654321',
  'doctor',
  'Medicina Estética',
  '550e8400-e29b-41d4-a716-446655440000'
);

-- Patients
INSERT INTO patients (id, clinic_id, first_name, last_name, rut, date_of_birth, biological_sex, phone, email, address, city)
VALUES (
  '750e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440000',
  'María',
  'González',
  '12.345.678-9',
  '1982-05-15',
  'F',
  '+56912345678',
  'maria.gonzalez@email.com',
  'Avenida Paseo 456',
  'Santiago'
),
(
  '750e8400-e29b-41d4-a716-446655440003',
  '550e8400-e29b-41d4-a716-446655440000',
  'Carlos',
  'López',
  '13.456.789-0',
  '1978-12-03',
  'M',
  '+56987654321',
  'carlos.lopez@email.com',
  'Calle Moderna 789',
  'Santiago'
);

-- Products (Inventario básico)
INSERT INTO products (id, clinic_id, product_name, product_type, brand, unit_cost, selling_price, unit_of_measurement, current_stock)
VALUES (
  '850e8400-e29b-41d4-a716-446655440004',
  '550e8400-e29b-41d4-a716-446655440000',
  'Toxina Botulínica 100U',
  'Neurotoxina',
  'Botox',
  80000,
  180000,
  'unidad',
  15
),
(
  '850e8400-e29b-41d4-a716-446655440005',
  '550e8400-e29b-41d4-a716-446655440000',
  'Ácido Hialurónico Voluma',
  'Relleno Dérmico',
  'Juvederm',
  150000,
  350000,
  'ml',
  20
),
(
  '850e8400-e29b-41d4-a716-446655440006',
  '550e8400-e29b-41d4-a716-446655440000',
  'Bioestimulador',
  'Bioestimulador',
  'Radiesse',
  200000,
  500000,
  'ml',
  10
);
