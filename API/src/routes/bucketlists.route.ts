import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getAllBucketlists } from "../controllers/bucketlists.controller";

const router = Router();

router.get('/', authMiddleware, getAllBucketlists);
router.get('/:id', authMiddleware);
router.post('/', authMiddleware);
router.put('/:id', authMiddleware);
router.delete('/:id', authMiddleware);

export default router;