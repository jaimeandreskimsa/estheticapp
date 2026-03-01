import pino from 'pino';
import { config } from 'dotenv';

config();

const isProduction = process.env.NODE_ENV === 'production';

// En producción: JSON puro (Railway lo captura bien)
// En desarrollo: pino-pretty con colores
export const logger = isProduction
  ? pino({ level: process.env.LOG_LEVEL || 'info' })
  : pino({
      level: process.env.LOG_LEVEL || 'debug',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname'
        }
      }
    });
