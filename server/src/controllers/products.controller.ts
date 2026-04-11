import { Request, Response } from 'express';
import prisma from '../config/database';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export const getProducts = async (req: Request, res: Response) => {
  const { category, search, bestseller } = req.query;

  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        category: category ? (category as string) : undefined,
        isBestseller: bestseller === 'true' ? true : undefined,
        name: search ? { contains: search as string, mode: 'insensitive' } : undefined,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, category, description, price, badge, isBestseller, stock } = req.body;
  let imagePath = null;

  try {
    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;
      imagePath = `/uploads/${fileName}`;
      const fullPath = path.join(__dirname, '../../uploads', fileName);

      await sharp(req.file.buffer)
        .resize(600, 400)
        .toFile(fullPath);
    }

    const product = await prisma.product.create({
      data: {
        name,
        category,
        description,
        price: parseInt(price),
        badge,
        isBestseller: isBestseller === 'true',
        stock: stock || 'instock',
        image: imagePath,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { name, category, description, price, badge, isBestseller, stock, isActive } = req.body;
  const id = parseInt(req.params.id);

  try {
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: 'Product not found' });

    let imagePath = existing.image;

    if (req.file) {
      const fileName = `${Date.now()}-${req.file.originalname}`;
      imagePath = `/uploads/${fileName}`;
      const fullPath = path.join(__dirname, '../../uploads', fileName);

      await sharp(req.file.buffer)
        .resize(600, 400)
        .toFile(fullPath);
      
      // Optionally delete old image
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        category,
        description,
        price: price ? parseInt(price) : undefined,
        badge,
        isBestseller: isBestseller === 'true',
        stock,
        isActive: isActive === 'true',
        image: imagePath,
      },
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await prisma.product.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateStock = async (req: Request, res: Response) => {
  const { stock } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id: parseInt(req.params.id) },
      data: { stock },
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
