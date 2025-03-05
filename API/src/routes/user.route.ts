import { Router } from 'express';
import { deleteUser, getUserCount, getUsers } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Apply authMiddleware to the getUsers and deleteUser routes
router.get('/', authMiddleware, getUsers);
router.delete('/:id', authMiddleware, deleteUser);

// Optionally apply authMiddleware to getUserCount if necessary
router.get('/count', authMiddleware, getUserCount);

export default router;
