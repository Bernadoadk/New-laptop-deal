import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Détecte le rôle depuis l'identifiant :
 * - @xxx.owner        → 'owner'
 * - @x.x.employeeXXX → 'employee'
 */
function detectRole(identifier: string): 'owner' | 'employee' | null {
  const id = identifier.toLowerCase().trim();
  if (!id.startsWith('@')) return null;
  if (id.endsWith('.owner')) return 'owner';
  if (/^@[\w]+\.[\w]+\.employee\w+$/.test(id)) return 'employee';
  return null;
}

function signToken(id: number, role: 'owner' | 'employee'): string {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );
}

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
export const login = async (req: Request, res: Response): Promise<void> => {
  const { identifier, password } = req.body;

  // Validation basique
  if (!identifier || typeof identifier !== 'string' || !password || typeof password !== 'string') {
    res.status(400).json({ message: 'Identifiant et mot de passe requis.' });
    return;
  }

  const normalizedId = identifier.toLowerCase().trim();
  const role = detectRole(normalizedId);

  if (!role) {
    // Ne pas révéler le format attendu — message générique
    res.status(401).json({ message: 'Identifiants invalides.' });
    return;
  }

  try {
    if (role === 'owner') {
      const owner = await prisma.owner.findUnique({ where: { identifier: normalizedId } });

      if (!owner || !(await bcrypt.compare(password, owner.password))) {
        res.status(401).json({ message: 'Identifiants invalides.' });
        return;
      }

      const token = signToken(owner.id, 'owner');
      res.json({
        token,
        user: { id: owner.id, name: owner.name, identifier: owner.identifier, role: 'owner' },
      });
      return;
    }

    if (role === 'employee') {
      const employee = await prisma.employee.findUnique({ where: { identifier: normalizedId } });

      if (!employee || !(await bcrypt.compare(password, employee.password))) {
        res.status(401).json({ message: 'Identifiants invalides.' });
        return;
      }

      // Vérification compte actif
      if (!employee.isActive) {
        res.status(403).json({ message: 'Votre compte a été désactivé. Contactez votre responsable.' });
        return;
      }

      const token = signToken(employee.id, 'employee');
      res.json({
        token,
        user: {
          id: employee.id,
          name: `${employee.prenom} ${employee.nom}`,
          identifier: employee.identifier,
          role: 'employee',
        },
      });
      return;
    }
  } catch (error) {
    console.error('[auth/login]', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (req.userRole === 'owner') {
      const owner = await prisma.owner.findUnique({
        where: { id: req.userId },
        select: { id: true, name: true, identifier: true },
      });
      if (!owner) { res.status(404).json({ message: 'Utilisateur introuvable.' }); return; }
      res.json({ ...owner, role: 'owner' });
      return;
    }

    if (req.userRole === 'employee') {
      const employee = await prisma.employee.findUnique({
        where: { id: req.userId },
        select: { id: true, nom: true, prenom: true, identifier: true, isActive: true },
      });
      if (!employee || !employee.isActive) {
        res.status(403).json({ message: 'Compte désactivé ou introuvable.' });
        return;
      }
      res.json({
        id: employee.id,
        name: `${employee.prenom} ${employee.nom}`,
        identifier: employee.identifier,
        role: 'employee',
      });
      return;
    }

    res.status(401).json({ message: 'Non autorisé.' });
  } catch (error) {
    console.error('[auth/me]', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
