import { Router } from 'express';
import { getPresets, updatePreset } from '../controllers/presets.controller';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', getPresets);
router.put('/:key', protect, updatePreset);

export default router;
