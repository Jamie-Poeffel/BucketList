import { Router } from 'express';
import { deleteUser, getUserCount, getUsers } from '../controllers/user.controller';

const router = Router();

router.get('/', getUsers);
router.delete('/:id', deleteUser);
router.get('/count', getUserCount);

export default router;
