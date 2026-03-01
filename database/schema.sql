-- Users (Profesionales médicos)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  rut VARCHAR(20) UNIQUE,
  medical_license VARCHAR(50) UNIQUE,
  phone VARCHAR(20),
  avatar_url VARCHAR(500),
  role VARCHAR(50) DEFAULT 'doctor',
  specialization VARCHAR(100),
  clinic_id UUID,
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Clinics
CREATE TABLE clinics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  rut VARCHAR(20) UNIQUE NOT NULL,
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

-- Patients
CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL,
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (clinic_id) REFERENCES clinics(id) ON DELETE CASCADE
);

-- Clinical Records (Ficha Clínica)
CREATE TABLE clinical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL,
  professional_id UUID NOT NULL,
  clinic_id UUID NOT NULL,
  consultation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  chief_complaint TEXT,
  chief_complaint_voice_url VARCHAR(500),
  chief_complaint_transcription TEXT,
  patient_expectations VARCHAR(100),
  suitability_status VARCHAR(50),
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (professional_id) REFERENCES users(id),
  FOREIGN KEY (clinic_id) REFERENCES clinics(id)
);

-- Anamnesis
CREATE TABLE anamnesis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinical_record_id UUID NOT NULL UNIQUE,
  past_medical_history JSONB,
  surgical_history JSONB,
  aesthetic_procedures_history JSONB,
  current_medications JSONB,
  allergies JSONB,
  family_history JSONB,
  habits JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (clinical_record_id) REFERENCES clinical_records(id) ON DELETE CASCADE
);

-- Physical Examination
CREATE TABLE physical_examinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinical_record_id UUID NOT NULL UNIQUE,
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (clinical_record_id) REFERENCES clinical_records(id) ON DELETE CASCADE
);

-- Diagnoses
CREATE TABLE diagnoses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinical_record_id UUID NOT NULL UNIQUE,
  diagnosis_text TEXT NOT NULL,
  diagnosis_summary TEXT,
  visual_summary_url VARCHAR(500),
  patient_summary TEXT,
  ai_generated BOOLEAN DEFAULT false,
  manually_edited BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (clinical_record_id) REFERENCES clinical_records(id) ON DELETE CASCADE
);

-- Treatment Plans
CREATE TABLE treatment_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinical_record_id UUID NOT NULL UNIQUE,
  diagnosis_id UUID NOT NULL,
  plan_title VARCHAR(255),
  total_sessions INTEGER,
  estimated_duration_days INTEGER,
  visual_plan_url VARCHAR(500),
  timeline_json JSONB,
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (clinical_record_id) REFERENCES clinical_records(id) ON DELETE CASCADE,
  FOREIGN KEY (diagnosis_id) REFERENCES diagnoses(id)
);

-- Treatment Plan Items (Procedimientos)
CREATE TABLE treatment_plan_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  treatment_plan_id UUID NOT NULL,
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (treatment_plan_id) REFERENCES treatment_plans(id) ON DELETE CASCADE
);

-- Budgets
CREATE TABLE budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  treatment_plan_id UUID NOT NULL UNIQUE,
  professional_id UUID NOT NULL,
  patient_id UUID NOT NULL,
  total_amount_patient DECIMAL(12,2),
  total_cost DECIMAL(12,2),
  total_margin DECIMAL(12,2),
  currency VARCHAR(10) DEFAULT 'CLP',
  payment_terms TEXT,
  valid_until_date DATE,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (treatment_plan_id) REFERENCES treatment_plans(id),
  FOREIGN KEY (professional_id) REFERENCES users(id),
  FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- Budget Items
CREATE TABLE budget_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_id UUID NOT NULL,
  procedure_name VARCHAR(255),
  body_area VARCHAR(100),
  unit_price DECIMAL(12,2),
  quantity INTEGER,
  unit_cost DECIMAL(12,2),
  total_price DECIMAL(12,2),
  total_cost DECIMAL(12,2),
  margin_percentage DECIMAL(5,2),
  sequence_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (budget_id) REFERENCES budgets(id) ON DELETE CASCADE
);

-- Consents
CREATE TABLE consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinical_record_id UUID NOT NULL,
  patient_id UUID NOT NULL,
  professional_id UUID NOT NULL,
  consent_type VARCHAR(100),
  procedure_name VARCHAR(255),
  consent_text TEXT,
  is_signed BOOLEAN DEFAULT false,
  signed_at TIMESTAMP,
  signature_url VARCHAR(500),
  signature_digital_id VARCHAR(255),
  signature_document_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (clinical_record_id) REFERENCES clinical_records(id),
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (professional_id) REFERENCES users(id)
);

-- Sessions
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  treatment_plan_id UUID NOT NULL,
  patient_id UUID NOT NULL,
  professional_id UUID NOT NULL,
  session_number INTEGER,
  scheduled_date TIMESTAMP,
  actual_date TIMESTAMP,
  status VARCHAR(50) DEFAULT 'scheduled',
  observations TEXT,
  complications TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (treatment_plan_id) REFERENCES treatment_plans(id),
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (professional_id) REFERENCES users(id)
);

-- Session Procedures
CREATE TABLE session_procedures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL,
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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

-- Clinical Photos
CREATE TABLE clinical_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL,
  clinical_record_id UUID,
  session_id UUID,
  photo_type VARCHAR(50),
  body_area VARCHAR(100),
  photo_url VARCHAR(500),
  photo_date TIMESTAMP,
  is_before BOOLEAN,
  is_after BOOLEAN,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (clinical_record_id) REFERENCES clinical_records(id),
  FOREIGN KEY (session_id) REFERENCES sessions(id)
);

-- Post-Treatment Instructions
CREATE TABLE post_treatment_instructions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL,
  patient_id UUID NOT NULL,
  instructions_text TEXT,
  expected_effects TEXT,
  warning_signs TEXT,
  next_appointment_date DATE,
  prescription_data JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES sessions(id),
  FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- Clinical Evolutions/Follow-ups
CREATE TABLE clinical_evolutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL,
  clinical_record_id UUID NOT NULL,
  session_id UUID,
  evolution_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  evolution_type VARCHAR(50),
  clinical_findings TEXT,
  patient_satisfaction VARCHAR(50),
  complications VARCHAR(50),
  follow_up_notes TEXT,
  next_session_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (clinical_record_id) REFERENCES clinical_records(id),
  FOREIGN KEY (session_id) REFERENCES sessions(id)
);

-- Products/Inventory
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID NOT NULL,
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (clinic_id) REFERENCES clinics(id)
);

-- Product Lots
CREATE TABLE product_lots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL,
  lot_number VARCHAR(100) NOT NULL,
  expiry_date DATE NOT NULL,
  quantity_received DECIMAL(10,2),
  quantity_used DECIMAL(10,2),
  quantity_available DECIMAL(10,2),
  reception_date DATE,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id),
  UNIQUE(product_id, lot_number)
);

-- Payments
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_id UUID NOT NULL,
  patient_id UUID NOT NULL,
  amount DECIMAL(12,2),
  payment_method VARCHAR(50),
  payment_date TIMESTAMP,
  reference_number VARCHAR(100),
  status VARCHAR(50) DEFAULT 'completed',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (budget_id) REFERENCES budgets(id),
  FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- Audit Log
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  action VARCHAR(100),
  entity_type VARCHAR(50),
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Indexes
CREATE INDEX idx_patients_clinic ON patients(clinic_id);
CREATE INDEX idx_clinical_records_patient ON clinical_records(patient_id);
CREATE INDEX idx_clinical_records_status ON clinical_records(status);
CREATE INDEX idx_treatment_plans_status ON treatment_plans(status);
CREATE INDEX idx_budgets_status ON budgets(status);
CREATE INDEX idx_sessions_status ON sessions(status);
CREATE INDEX idx_sessions_scheduled_date ON sessions(scheduled_date);
CREATE INDEX idx_clinical_photos_patient ON clinical_photos(patient_id);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);
