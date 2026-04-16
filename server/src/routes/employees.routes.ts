import { Router } from 'express';
import { listEmployees, createEmployee, toggleEmployee, deleteEmployee } from '../controllers/employees.controller';
import { protect, requireOwner } from '../middleware/auth';

const router = Router();

// Toutes les routes employés sont réservées à l'owner
router.use(protect, requireOwner);

router.get('/', listEmployees);
router.post('/', createEmployee);
router.patch('/:id/toggle', toggleEmployee);
router.delete('/:id', deleteEmployee);

export default router;
