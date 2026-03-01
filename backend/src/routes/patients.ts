import { Router } from 'express';
import { query } from '../database/db';
import { authenticate, AuthRequest } from '../middlewares/auth';

const router = Router();
router.use(authenticate);

// GET /api/patients
router.get('/', async (req: AuthRequest, res) => {
  const { clinicId } = req.user!;
  const { search, page = '1', limit = '20' } = req.query as Record<string, string>;

  const offset = (parseInt(page) - 1) * parseInt(limit);
  const params: unknown[] = [clinicId];
  let whereExtra = '';

  if (search) {
    params.push(`%${search}%`);
    whereExtra = `AND (
      LOWER(first_name || ' ' || last_name) LIKE LOWER($${params.length}) OR
      LOWER(COALESCE(email,'')) LIKE LOWER($${params.length}) OR
      COALESCE(rut,'') ILIKE $${params.length}
    )`;
  }

  const { rows } = await query(
    `SELECT id, first_name, last_name, rut, email, phone, date_of_birth,
            biological_sex, city, is_active, created_at,
            (SELECT MAX(consultation_date) FROM clinical_records WHERE patient_id = patients.id) as last_visit
     FROM patients
     WHERE clinic_id = $1 AND is_active = true ${whereExtra}
     ORDER BY created_at DESC
     LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
    [...params, parseInt(limit), offset]
  );

  const { rows: countRows } = await query<{ total: string }>(
    `SELECT COUNT(*)::text as total FROM patients WHERE clinic_id = $1 AND is_active = true ${whereExtra}`,
    params
  );

  return res.json({
    data: rows,
    total: parseInt(countRows[0].total),
    page: parseInt(page),
    limit: parseInt(limit),
  });
});

// GET /api/patients/:id
router.get('/:id', async (req: AuthRequest, res) => {
  const { clinicId } = req.user!;
  const { id } = req.params;

  const { rows } = await query(
    `SELECT p.*,
            (SELECT COUNT(*)::int FROM clinical_records WHERE patient_id = p.id) as total_consultas,
            (SELECT MAX(consultation_date) FROM clinical_records WHERE patient_id = p.id) as last_visit
     FROM patients p
     WHERE p.id = $1 AND p.clinic_id = $2`,
    [id, clinicId]
  );

  if (!rows[0]) return res.status(404).json({ error: 'Paciente no encontrado' });

  return res.json({ data: rows[0] });
});

// POST /api/patients
router.post('/', async (req: AuthRequest, res) => {
  const { clinicId } = req.user!;
  const {
    firstName, lastName, rut, email, phone,
    dateOfBirth, biologicalSex, address, city,
    emergencyContactName, emergencyContactPhone,
  } = req.body;

  if (!firstName || !lastName || !phone || !dateOfBirth) {
    return res.status(400).json({ error: 'Nombre, apellido, teléfono y fecha de nacimiento son requeridos' });
  }

  const { rows } = await query(
    `INSERT INTO patients (
       clinic_id, first_name, last_name, rut, email, phone,
       date_of_birth, biological_sex, address, city,
       emergency_contact_name, emergency_contact_phone
     ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
     RETURNING *`,
    [clinicId, firstName, lastName, rut || null, email || null, phone,
     dateOfBirth, biologicalSex || null, address || null, city || null,
     emergencyContactName || null, emergencyContactPhone || null]
  );

  return res.status(201).json({ data: rows[0] });
});

// PUT /api/patients/:id
router.put('/:id', async (req: AuthRequest, res) => {
  const { clinicId } = req.user!;
  const { id } = req.params;
  const {
    firstName, lastName, rut, email, phone,
    dateOfBirth, biologicalSex, address, city,
    emergencyContactName, emergencyContactPhone, isActive,
  } = req.body;

  const { rows } = await query(
    `UPDATE patients SET
       first_name = COALESCE($1, first_name),
       last_name  = COALESCE($2, last_name),
       rut        = COALESCE($3, rut),
       email      = COALESCE($4, email),
       phone      = COALESCE($5, phone),
       date_of_birth = COALESCE($6, date_of_birth),
       biological_sex = COALESCE($7, biological_sex),
       address    = COALESCE($8, address),
       city       = COALESCE($9, city),
       emergency_contact_name  = COALESCE($10, emergency_contact_name),
       emergency_contact_phone = COALESCE($11, emergency_contact_phone),
       is_active  = COALESCE($12, is_active),
       updated_at = NOW()
     WHERE id = $13 AND clinic_id = $14
     RETURNING *`,
    [firstName, lastName, rut, email, phone, dateOfBirth, biologicalSex,
     address, city, emergencyContactName, emergencyContactPhone, isActive,
     id, clinicId]
  );

  if (!rows[0]) return res.status(404).json({ error: 'Paciente no encontrado' });

  return res.json({ data: rows[0] });
});

export { router as patientsRouter };
