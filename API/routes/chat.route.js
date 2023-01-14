import express from 'express';
import { getAllChatMessages } from '../controllers/chat.controller.js';

const chatRouter = express.Router();

chatRouter.get('/', getAllChatMessages);
export default chatRouter;
