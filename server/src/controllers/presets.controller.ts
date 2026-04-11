import { Request, Response } from 'express';
import prisma from '../config/database';

export const getPresets = async (req: Request, res: Response) => {
  try {
    const presets = await prisma.setupPreset.findMany({
      include: {
        items: {
          include: {
            option: {
              include: { category: true }
            }
          }
        }
      },
      orderBy: { sortOrder: 'asc' },
    });
    res.json(presets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updatePreset = async (req: Request, res: Response) => {
  const { key } = req.params;
  const { optionIds } = req.body; // Array of option IDs

  try {
    const preset = await prisma.setupPreset.findUnique({ where: { key } });
    if (!preset) return res.status(404).json({ message: 'Preset not found' });

    // Remove old items
    await prisma.setupPresetItem.deleteMany({ where: { presetId: preset.id } });

    // Add new items
    if (optionIds && optionIds.length > 0) {
      await prisma.setupPresetItem.createMany({
        data: optionIds.map((id: number) => ({
          presetId: preset.id,
          optionId: id,
        })),
      });
    }

    const updated = await prisma.setupPreset.findUnique({
      where: { key },
      include: { items: { include: { option: true } } }
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
