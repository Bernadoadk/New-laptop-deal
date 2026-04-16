import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  userId?: number;
  userRole?: 'owner' | 'employee';
}

interface JwtPayload {
  id: number;
  role: 'owner' | 'employee';
}

// ─── Protect: vérifie le JWT et attache userId + userRole ──────────────────
export const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Non autorisé — token manquant.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (!decoded.id || !decoded.role) {
      res.status(401).json({ message: 'Token invalide.' });
      return;
    }

    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Non autorisé — token expiré ou invalide.' });
  }
};

// ─── RequireOwner: bloque les non-owners ───────────────────────────────────
export const requireOwner = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.userRole !== 'owner') {
    res.status(403).json({ message: 'Accès refusé — réservé au propriétaire.' });
    return;
  }
  next();
};
