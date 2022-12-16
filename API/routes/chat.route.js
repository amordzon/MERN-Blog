import express from 'express';
import {
    getAllChatMessages,
    createChatMessage,
    deleteChatMessage,
} from '../controllers/chat.controller.js';
import { adminAuth, loggedIn } from '../middleware/auth.middleware.js';

const chatRouter = express.Router();

chatRouter.get('/', getAllChatMessages);
chatRouter.post('/new', [loggedIn], createChatMessage);
chatRouter.delete('/:chatmessageid', [adminAuth], deleteChatMessage);

export default chatRouter;
