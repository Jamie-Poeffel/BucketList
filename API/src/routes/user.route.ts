import { Router } from 'express';
import { deleteUser, getCurrentUser, getUserCount, getUsers } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import profileRoutes from './profile.route';
import { getUsersBucketlist } from '../controllers/bucketlists.controller';

const router = Router();

router.get('/', authMiddleware, getUsers);
router.get('/me', authMiddleware, getCurrentUser);
router.delete('/:id', authMiddleware, deleteUser);
router.get('/count', authMiddleware, getUserCount);
router.use('/profile', profileRoutes);
router.get('/bucketlist', authMiddleware, getUsersBucketlist)


export default router;
