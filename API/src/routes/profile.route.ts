import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getSpecificUser, getUserProfile, putUserProfile } from "../controllers/profile.controller";

const router = Router();

router.get('/', authMiddleware, getUserProfile);
router.put('/', authMiddleware, putUserProfile);
router.get('/:id', authMiddleware, getSpecificUser);

export default router;