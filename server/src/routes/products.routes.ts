import { Router } from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock
} from '../controllers/products.controller';
import { protect } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', protect, upload.single('image'), createProduct);
router.put('/:id', protect, upload.single('image'), updateProduct);
router.delete('/:id', protect, deleteProduct);
router.patch('/:id/stock', protect, updateStock);

export default router;
