import { Router } from 'express';
import { deleteUser, getUserCount, getUsers } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import profileRoutes from './profile.route';

const router = Router();

router.get('/', authMiddleware, getUsers);
router.delete('/:id', authMiddleware, deleteUser);
router.get('/count', authMiddleware, getUserCount);
router.use('/profile', profileRoutes);


export default router;
