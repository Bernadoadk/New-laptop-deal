import { Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Génère l'identifiant d'un employé : @{nom}.{prenom}.employee{codesecret}
 * Tout en minuscules, caractères spéciaux remplacés.
 */
function buildEmployeeIdentifier(nom: string, prenom: string, codeSecret: string): string {
  const clean = (s: string) =>
    s.toLowerCase()
     .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // supprime accents
     .replace(/[^a-z0-9]/g, '');                        // garde alphanumériques
  return `@${clean(nom)}.${clean(prenom)}.employee${clean(codeSecret)}`;
}

// ─── GET /api/employees ───────────────────────────────────────────────────────
export const listEmployees = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const employees = await prisma.employee.findMany({
      where: { ownerId: req.userId! },
      select: {
        id: true,
        nom: true,
        prenom: true,
        identifier: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(employees);
  } catch (error) {
    console.error('[employees/list]', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// ─── POST /api/employees ──────────────────────────────────────────────────────
export const createEmployee = async (req: AuthRequest, res: Response): Promise<void> => {
  const { nom, prenom, codeSecret, password } = req.body;

  if (!nom || !prenom || !codeSecret || !password) {
    res.status(400).json({ message: 'Tous les champs sont requis (nom, prenom, codeSecret, password).' });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères.' });
    return;
  }

  const identifier = buildEmployeeIdentifier(nom, prenom, codeSecret);

  try {
    // Vérifier unicité de l'identifiant
    const existing = await prisma.employee.findUnique({ where: { identifier } });
    if (existing) {
      res.status(409).json({ message: `L'identifiant "${identifier}" est déjà utilisé. Changez le code secret.` });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const employee = await prisma.employee.create({
      data: {
        nom,
        prenom,
        identifier,
        password: hashedPassword,
        isActive: true,
        ownerId: req.userId!,
      },
      select: {
        id: true,
        nom: true,
        prenom: true,
        identifier: true,
        isActive: true,
        createdAt: true,
      },
    });

    res.status(201).json(employee);
  } catch (error) {
    console.error('[employees/create]', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// ─── PATCH /api/employees/:id/toggle ─────────────────────────────────────────
export const toggleEmployee = async (req: AuthRequest, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ message: 'ID invalide.' }); return; }

  try {
    const employee = await prisma.employee.findFirst({
      where: { id, ownerId: req.userId! },
    });

    if (!employee) {
      res.status(404).json({ message: 'Employé introuvable.' });
      return;
    }

    const updated = await prisma.employee.update({
      where: { id },
      data: { isActive: !employee.isActive },
      select: { id: true, nom: true, prenom: true, identifier: true, isActive: true },
    });

    res.json(updated);
  } catch (error) {
    console.error('[employees/toggle]', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

// ─── DELETE /api/employees/:id ────────────────────────────────────────────────
export const deleteEmployee = async (req: AuthRequest, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) { res.status(400).json({ message: 'ID invalide.' }); return; }

  try {
    const employee = await prisma.employee.findFirst({
      where: { id, ownerId: req.userId! },
    });

    if (!employee) {
      res.status(404).json({ message: 'Employé introuvable.' });
      return;
    }

    await prisma.employee.delete({ where: { id } });
    res.json({ message: 'Employé supprimé.' });
  } catch (error) {
    console.error('[employees/delete]', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
