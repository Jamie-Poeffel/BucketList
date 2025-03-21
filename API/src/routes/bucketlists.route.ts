import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { addBucketlistitem, getAllBucketlists, getBucketlistbyId } from "../controllers/bucketlists.controller";

const router = Router();

router.get('/', authMiddleware, getAllBucketlists);
router.get('/:id', authMiddleware, getBucketlistbyId);
router.post('/', authMiddleware, addBucketlistitem);
router.put('/:id', authMiddleware);
router.delete('/:id', authMiddleware);

export default router;