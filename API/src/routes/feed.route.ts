import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { feed, more } from '../controllers/feed.controller';

const router = Router();

router.get('/', authMiddleware, feed);
router.get('/more', authMiddleware, more);

export default router