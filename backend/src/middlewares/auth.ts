import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
    clinicId: string;
  };
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET || 'default_secret_change_in_production';
    const decoded = jwt.verify(token, secret) as {
      userId: string;
      email: string;
      role: string;
      clinicId: string;
    };
    req.user = decoded;
    return next();
  } catch {
    logger.warn('Invalid JWT token attempt');
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}
