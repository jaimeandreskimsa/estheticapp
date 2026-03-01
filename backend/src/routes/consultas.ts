import { Router } from 'express';

const router = Router();

// POST /api/consultas
router.post('/', async (req, res) => {
  try {
    const { patientId, motivo, expectativas, anamnesis } = req.body;
    
    res.status(201).json({
      message: 'Consulta created',
      data: {
        patientId,
        motivo,
        expectativas,
        anamnesis
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create consulta' });
  }
});

// GET /api/consultas/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    res.json({
      message: 'Get consulta',
      id,
      data: null
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get consulta' });
  }
});

export { router as consultasRouter };
