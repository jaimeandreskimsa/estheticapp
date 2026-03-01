import { Router } from 'express';

const router = Router();

// POST /api/sesiones
router.post('/', async (req, res) => {
  try {
    const { patientId, planId, fecha } = req.body;
    
    res.status(201).json({
      message: 'Sesión creada',
      data: {
        patientId,
        planId,
        fecha
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create session' });
  }
});

export { router as sesionesRouter };
