import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "../middlewares/authMiddleware";
import { getSpecificUser, getUserProfile, putUserProfile } from "../controllers/profile.controller";
import { deleteProfilePicture, uploadProfilePicture } from "../controllers/upload.controller"; // create this controller

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', authMiddleware, getUserProfile);
router.put('/', authMiddleware, putUserProfile);
router.get('/:id', authMiddleware, getSpecificUser);
router.post('/upload', authMiddleware, upload.single('image'), uploadProfilePicture);
router.delete('/picture', authMiddleware, deleteProfilePicture)

export default router;
