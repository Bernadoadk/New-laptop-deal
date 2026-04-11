import { Router } from 'express';
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  getStats
} from '../controllers/orders.controller';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', protect, getOrders);
router.get('/stats', protect, getStats);
router.get('/:id', protect, getOrder);
router.post('/', createOrder);
router.patch('/:id/status', protect, updateOrderStatus);
router.delete('/:id', protect, deleteOrder);

export default router;
