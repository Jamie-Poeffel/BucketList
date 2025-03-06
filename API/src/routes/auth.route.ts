import { Router } from 'express';
import { Signup, Login } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.use('/profile', authMiddleware)

export default router