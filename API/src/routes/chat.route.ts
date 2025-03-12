import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware';
import { addChat, deleteMessage, streamChat, sendMessage, getChatHistory, getChatsforUser } from '../controllers/chat.controller';

const router = Router();

router.post('/', authMiddleware, addChat);
router.get('/', authMiddleware, getChatsforUser)
router.get('/:id', authMiddleware, streamChat);
router.get('/:id/history', authMiddleware, getChatHistory);
router.post('/:id/message', authMiddleware, sendMessage);
router.delete('/:chatId/message/:messageId', authMiddleware, deleteMessage);

export default router;