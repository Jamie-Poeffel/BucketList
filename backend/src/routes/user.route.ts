import { Router } from 'express';
import { deleteUser, getUsers } from '../controllers/user.controller';

const router = Router();

router.get('/', getUsers);
router.delete('/:id', deleteUser);

export default router;
