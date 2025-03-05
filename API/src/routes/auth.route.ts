import { Router } from 'express';
import { Signup, Login } from '../controllers/auth.controller';

const router = Router();

router.post('/signup', Signup);
router.post('/login', Login);

export default router