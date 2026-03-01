import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../database/db';
import { logger } from '../utils/logger';

const router = Router();

const getSecret = () => process.env.JWT_SECRET || 'default_secret_change_in_production';

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  const { rows } = await query<Record<string, string>>(
    `SELECT u.*, c.name as clinic_name
     FROM users u
     LEFT JOIN clinics c ON u.clinic_id = c.id
     WHERE LOWER(u.email) = LOWER($1) AND u.is_active = true`,
    [email]
  );

  const user = rows[0];

  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  await query('UPDATE users SET last_login_at = NOW() WHERE id = $1', [user.id]);

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role, clinicId: user.clinic_id },
    getSecret(),
    { expiresIn: process.env.JWT_EXPIRATION || '7d' }
  );

  logger.info(`User logged in: ${user.email}`);

  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: `${user.first_name} ${user.last_name}`,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
      clinicId: user.clinic_id,
      clinicName: user.clinic_name,
      avatar: user.avatar_url || null,
    },
  });
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password, firstName, lastName, clinicName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'Nombre, apellido, email y contraseña son requeridos' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
  }

  const existing = await query('SELECT id FROM users WHERE LOWER(email) = LOWER($1)', [email]);
  if (existing.rows.length > 0) {
    return res.status(409).json({ error: 'El email ya está registrado' });
  }

  let clinicId: string | null = null;
  if (clinicName) {
    const clinicResult = await query<{ id: string }>(
      `INSERT INTO clinics (name, email, country, legal_terms_accepted, legal_terms_date)
       VALUES ($1, $2, 'Chile', true, NOW()) RETURNING id`,
      [clinicName, email.toLowerCase()]
    );
    clinicId = clinicResult.rows[0].id;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const userResult = await query<Record<string, string>>(
    `INSERT INTO users (email, password_hash, first_name, last_name, role, clinic_id, is_active)
     VALUES ($1, $2, $3, $4, 'admin', $5, true)
     RETURNING id, email, first_name, last_name, role, clinic_id`,
    [email.toLowerCase(), passwordHash, firstName, lastName, clinicId]
  );

  const newUser = userResult.rows[0];

  const token = jwt.sign(
    { userId: newUser.id, email: newUser.email, role: newUser.role, clinicId: newUser.clinic_id },
    getSecret(),
    { expiresIn: '7d' }
  );

  return res.status(201).json({
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: `${newUser.first_name} ${newUser.last_name}`,
      role: newUser.role,
      clinicId: newUser.clinic_id,
    },
  });
});

// GET /api/auth/me
router.get('/me', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, getSecret()) as { userId: string };

    const { rows } = await query<Record<string, string>>(
      `SELECT u.id, u.email, u.first_name, u.last_name, u.role, u.clinic_id, u.avatar_url,
              c.name as clinic_name
       FROM users u
       LEFT JOIN clinics c ON u.clinic_id = c.id
       WHERE u.id = $1 AND u.is_active = true`,
      [decoded.userId]
    );

    if (!rows[0]) return res.status(401).json({ error: 'Usuario no encontrado' });

    const u = rows[0];
    return res.json({
      id: u.id,
      email: u.email,
      name: `${u.first_name} ${u.last_name}`,
      role: u.role,
      clinicId: u.clinic_id,
      clinicName: u.clinic_name,
      avatar: u.avatar_url || null,
    });
  } catch {
    return res.status(401).json({ error: 'Token inválido' });
  }
});

export { router as authRouter };
