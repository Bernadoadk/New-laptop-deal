import { Request, Response } from 'express';
import prisma from '../config/database';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.componentCategory.findMany({
      include: { options: { where: { isActive: true }, orderBy: { price: 'asc' } } },
      orderBy: { sortOrder: 'asc' },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { key, label, emoji, sortOrder } = req.body;
  try {
    const category = await prisma.componentCategory.create({
      data: { key, label, emoji, sortOrder },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createOption = async (req: Request, res: Response) => {
  const { categoryId, name, price } = req.body;
  try {
    const option = await prisma.componentOption.create({
      data: { categoryId: parseInt(categoryId), name, price: parseInt(price) },
    });
    res.status(201).json(option);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateOption = async (req: Request, res: Response) => {
  const { name, price, isActive } = req.body;
  try {
    const option = await prisma.componentOption.update({
      where: { id: parseInt(req.params.id) },
      data: { name, price: price ? parseInt(price) : undefined, isActive },
    });
    res.json(option);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteOption = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const option = await prisma.componentOption.findUnique({ where: { id } });
    
    // Check if it's the last option in category
    if (option) {
      const count = await prisma.componentOption.count({ where: { categoryId: option.categoryId } });
      if (count <= 1) {
        return res.status(400).json({ message: 'Cannot delete the last option in a category' });
      }
    }

    await prisma.componentOption.delete({ where: { id } });
    res.json({ message: 'Option removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
