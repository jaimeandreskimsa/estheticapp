import { Router } from 'express';

const router = Router();

// POST /api/plan
router.post('/', async (req, res) => {
  try {
    const { patientId, diagnosticoId, procedimientos } = req.body;
    
    res.status(201).json({
      message: 'Plan de tratamiento creado',
      data: {
        patientId,
        diagnosticoId,
        procedimientos
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create plan' });
  }
});

export { router as planRouter };
