import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '7d',
      });

      res.json({
        token,
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
        },
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMe = async (req: any, res: Response) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.adminId },
      select: { id: true, email: true, name: true },
    });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
