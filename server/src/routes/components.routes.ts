import { Router } from 'express';
import {
  getCategories,
  createCategory,
  createOption,
  updateOption,
  deleteOption
} from '../controllers/components.controller';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', getCategories);
router.post('/category', protect, createCategory);
router.post('/option', protect, createOption);
router.put('/option/:id', protect, updateOption);
router.delete('/option/:id', protect, deleteOption);

export default router;
