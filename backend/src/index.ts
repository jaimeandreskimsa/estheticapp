import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { config } from 'dotenv';
import { logger } from './utils/logger';
import { errorHandler } from './middlewares/errorHandler';
import { authRouter } from './routes/auth';
import { patientsRouter } from './routes/patients';
import { consultasRouter } from './routes/consultas';
import { diagnosticoRouter } from './routes/diagnostico';
import { planRouter } from './routes/plan';
import { presupuestoRouter } from './routes/presupuesto';
import { sesionesRouter } from './routes/sesiones';
import { initDatabase } from './database/init';

// Cargar variables de entorno
config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares globales
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/patients', patientsRouter);
app.use('/api/consultas', consultasRouter);
app.use('/api/diagnostico', diagnosticoRouter);
app.use('/api/plan', planRouter);
app.use('/api/presupuesto', presupuestoRouter);
app.use('/api/sesiones', sesionesRouter);

// API Documentation
app.get('/api-docs', (req, res) => {
  res.json({
    message: 'Esthetic App API Documentation',
    version: '0.1.0',
    endpoints: {
      auth: '/api/auth',
      patients: '/api/patients',
      consultas: '/api/consultas',
      diagnostico: '/api/diagnostico',
      plan: '/api/plan',
      presupuesto: '/api/presupuesto',
      sesiones: '/api/sesiones'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error Handler (debe ser el último middleware)
app.use(errorHandler);

// Iniciar servidor
async function startServer() {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      logger.info(`🚀 Backend running on port ${PORT}`);
      logger.info(`📚 API docs: http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    logger.error('Fatal: could not start server', err);
    process.exit(1);
  }
}

startServer();

export default app;
