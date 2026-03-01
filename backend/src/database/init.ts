import bcrypt from 'bcryptjs';
import { query } from './db';
import { logger } from '../utils/logger';

const SCHEMA_SQL = `
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS clinics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  rut VARCHAR(20) UNIQUE,
  email VARCHAR(255),
  phone VARCHAR(20),
  address VARCHAR(255),
  city VARCHAR(100),
  country VARCHAR(100) DEFAULT 'Chile',
  logo_url VARCHAR(500),
  legal_terms_accepted BOOLEAN DEFAULT false,
  legal_terms_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  rut VARCHAR(20),
  medical_license VARCHAR(50),
  phone VARCHAR(20),
  avatar_url VARCHAR(500),
  role VARCHAR(50) DEFAULT 'doctor',
  specialization VARCHAR(100),
  clinic_id UUID REFERENCES clinics(id),
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  rut VARCHAR(20),
  dni VARCHAR(20),
  passport VARCHAR(50),
  date_of_birth DATE NOT NULL,
  biological_sex VARCHAR(20),
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  address VARCHAR(255),
  city VARCHAR(100),
  country VARCHAR(100) DEFAULT 'Chile',
  profession VARCHAR(100),
  emergency_contact_name VARCHAR(100),
  emergency_contact_phone VARCHAR(20),
  medical_history JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS clinical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  professional_id UUID NOT NULL REFERENCES users(id),
  clinic_id UUID NOT NULL REFERENCES clinics(id),
  consultation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  chief_complaint TEXT,
  chief_complaint_voice_url VARCHAR(500),
  chief_complaint_transcription TEXT,
  patient_expectations VARCHAR(100),
  suitability_status VARCHAR(50),
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS anamnesis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinical_record_id UUID NOT NULL UNIQUE REFERENCES clinical_records(id) ON DELETE CASCADE,
  past_medical_history JSONB,
  surgical_history JSONB,
  aesthetic_procedures_history JSONB,
  current_medications JSONB,
  allergies JSONB,
  family_history JSONB,
  habits JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS physical_examinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinical_record_id UUID NOT NULL UNIQUE REFERENCES clinical_records(id) ON DELETE CASCADE,
  skin_type VARCHAR(50),
  fitzpatrick_type INTEGER,
  skin_quality JSONB,
  wrinkles JSONB,
  flaccidity JSONB,
  volume JSONB,
  asymmetries JSONB,
  other_findings TEXT,
  examination_notes JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS diagnoses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinical_record_id UUID NOT NULL UNIQUE REFERENCES clinical_records(id) ON DELETE CASCADE,
  diagnosis_text TEXT NOT NULL,
  diagnosis_summary TEXT,
  visual_summary_url VARCHAR(500),
  patient_summary TEXT,
  ai_generated BOOLEAN DEFAULT false,
  manually_edited BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS treatment_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinical_record_id UUID NOT NULL UNIQUE REFERENCES clinical_records(id) ON DELETE CASCADE,
  diagnosis_id UUID NOT NULL REFERENCES diagnoses(id),
  plan_title VARCHAR(255),
  total_sessions INTEGER,
  estimated_duration_days INTEGER,
  visual_plan_url VARCHAR(500),
  timeline_json JSONB,
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS treatment_plan_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  treatment_plan_id UUID NOT NULL REFERENCES treatment_plans(id) ON DELETE CASCADE,
  procedure_type VARCHAR(100) NOT NULL,
  body_area VARCHAR(100),
  product_id UUID,
  quantity DECIMAL(10,2),
  unit_of_measurement VARCHAR(20),
  technique VARCHAR(100),
  session_number INTEGER,
  estimated_date DATE,
  sequence_order INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  treatment_plan_id UUID NOT NULL UNIQUE REFERENCES treatment_plans(id),
  professional_id UUID NOT NULL REFERENCES users(id),
  patient_id UUID NOT NULL REFERENCES patients(id),
  total_amount_patient DECIMAL(12,2),
  total_cost DECIMAL(12,2),
  total_margin DECIMAL(12,2),
  currency VARCHAR(10) DEFAULT 'CLP',
  payment_terms TEXT,
  valid_until_date DATE,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS budget_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_id UUID NOT NULL REFERENCES budgets(id) ON DELETE CASCADE,
  procedure_name VARCHAR(255),
  body_area VARCHAR(100),
  unit_price DECIMAL(12,2),
  quantity INTEGER,
  unit_cost DECIMAL(12,2),
  total_price DECIMAL(12,2),
  total_cost DECIMAL(12,2),
  margin_percentage DECIMAL(5,2),
  sequence_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinical_record_id UUID NOT NULL REFERENCES clinical_records(id),
  patient_id UUID NOT NULL REFERENCES patients(id),
  professional_id UUID NOT NULL REFERENCES users(id),
  consent_type VARCHAR(100),
  procedure_name VARCHAR(255),
  consent_text TEXT,
  is_signed BOOLEAN DEFAULT false,
  signed_at TIMESTAMP,
  signature_url VARCHAR(500),
  signature_digital_id VARCHAR(255),
  signature_document_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  treatment_plan_id UUID NOT NULL REFERENCES treatment_plans(id),
  patient_id UUID NOT NULL REFERENCES patients(id),
  professional_id UUID NOT NULL REFERENCES users(id),
  session_number INTEGER,
  scheduled_date TIMESTAMP,
  actual_date TIMESTAMP,
  status VARCHAR(50) DEFAULT 'scheduled',
  observations TEXT,
  complications TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS session_procedures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  procedure_type VARCHAR(100),
  body_area VARCHAR(100),
  product_id UUID,
  product_name VARCHAR(255),
  lot_number VARCHAR(100),
  expiry_date DATE,
  quantity_used DECIMAL(10,2),
  unit_of_measurement VARCHAR(20),
  technique VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS clinical_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id),
  clinical_record_id UUID REFERENCES clinical_records(id),
  session_id UUID REFERENCES sessions(id),
  photo_type VARCHAR(50),
  body_area VARCHAR(100),
  photo_url VARCHAR(500),
  photo_date TIMESTAMP,
  is_before BOOLEAN,
  is_after BOOLEAN,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS post_treatment_instructions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sessions(id),
  patient_id UUID NOT NULL REFERENCES patients(id),
  instructions_text TEXT,
  expected_effects TEXT,
  warning_signs TEXT,
  next_appointment_date DATE,
  prescription_data JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS clinical_evolutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id),
  clinical_record_id UUID NOT NULL REFERENCES clinical_records(id),
  session_id UUID REFERENCES sessions(id),
  evolution_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  evolution_type VARCHAR(50),
  clinical_findings TEXT,
  patient_satisfaction VARCHAR(50),
  complications VARCHAR(50),
  follow_up_notes TEXT,
  next_session_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL REFERENCES clinics(id),
  product_name VARCHAR(255) NOT NULL,
  product_type VARCHAR(100),
  brand VARCHAR(100),
  description TEXT,
  unit_cost DECIMAL(12,2),
  selling_price DECIMAL(12,2),
  unit_of_measurement VARCHAR(20),
  current_stock DECIMAL(10,2),
  reorder_level DECIMAL(10,2),
  supplier VARCHAR(255),
  supplier_phone VARCHAR(20),
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_lots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id),
  lot_number VARCHAR(100) NOT NULL,
  expiry_date DATE NOT NULL,
  quantity_received DECIMAL(10,2),
  quantity_used DECIMAL(10,2),
  quantity_available DECIMAL(10,2),
  reception_date DATE,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(product_id, lot_number)
);

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_id UUID NOT NULL REFERENCES budgets(id),
  patient_id UUID NOT NULL REFERENCES patients(id),
  amount DECIMAL(12,2),
  payment_method VARCHAR(50),
  payment_date TIMESTAMP,
  reference_number VARCHAR(100),
  status VARCHAR(50) DEFAULT 'completed',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100),
  entity_type VARCHAR(50),
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_patients_clinic ON patients(clinic_id);
CREATE INDEX IF NOT EXISTS idx_patients_active ON patients(clinic_id, is_active);
CREATE INDEX IF NOT EXISTS idx_clinical_records_patient ON clinical_records(patient_id);
CREATE INDEX IF NOT EXISTS idx_clinical_records_status ON clinical_records(status);
CREATE INDEX IF NOT EXISTS idx_treatment_plans_status ON treatment_plans(status);
CREATE INDEX IF NOT EXISTS idx_budgets_status ON budgets(status);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON sessions(status);
CREATE INDEX IF NOT EXISTS idx_sessions_scheduled_date ON sessions(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_clinical_photos_patient ON clinical_photos(patient_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at);
`;

export async function initDatabase(): Promise<void> {
  logger.info('Initializing database schema...');

  try {
    await query(SCHEMA_SQL);
    logger.info('Database schema ready');

    await seedInitialData();
  } catch (error) {
    logger.error('Failed to initialize database', error);
    throw error;
  }
}

async function seedInitialData(): Promise<void> {
  const { rows: existingClinics } = await query('SELECT id FROM clinics LIMIT 1');

  if (existingClinics.length > 0) {
    logger.info('Database already has data, skipping seed');
    return;
  }

  logger.info('Seeding initial clinic and admin user...');

  const clinicResult = await query<{ id: string }>(
    `INSERT INTO clinics (name, email, phone, city, country, legal_terms_accepted, legal_terms_date)
     VALUES ($1, $2, $3, $4, $5, true, NOW())
     RETURNING id`,
    ['Clínica Esthetic App', process.env.ADMIN_EMAIL || 'admin@estheticapp.cl', '+56221234567', 'Santiago', 'Chile']
  );

  const clinicId = clinicResult.rows[0].id;

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@estheticapp.cl';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await query(
    `INSERT INTO users (email, password_hash, first_name, last_name, role, clinic_id, is_active)
     VALUES ($1, $2, $3, $4, 'admin', $5, true)`,
    [adminEmail, passwordHash, 'Admin', 'Esthetic', clinicId]
  );

  logger.info(`✅ Admin user created — email: ${adminEmail} / password: ${adminPassword}`);
  logger.info('⚠️  Change the admin password after first login!');
}
