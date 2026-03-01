import { Router } from 'express';

const router = Router();

// POST /api/presupuesto/generate
router.post('/generate', async (req, res) => {
  try {
    const { planId, patientId } = req.body;
    
    res.json({
      message: 'Presupuesto generado automáticamente',
      data: {
        planId,
        patientId,
        items: [],
        total: 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate budget' });
  }
});

export { router as presupuestoRouter };
