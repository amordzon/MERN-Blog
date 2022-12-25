import express from 'express';
import {
    getAllChatMessages,
    createChatMessage,
    deleteChatMessage,
} from '../controllers/chat.controller.js';

const chatRouter = express.Router();

chatRouter.get('/', getAllChatMessages);
chatRouter.post('/new', createChatMessage);
chatRouter.delete('/:chatmessageid', deleteChatMessage);

export default chatRouter;
