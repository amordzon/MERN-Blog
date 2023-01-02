import express from 'express';
import {
    getAllComments,
    createComment,
    getOneComment,
    updateComment,
    deleteComment,
} from '../controllers/comment.controller.js';
import { loggedIn } from '../middleware/auth.middleware.js';

const commentRouter = express.Router();

commentRouter.get('/', getAllComments);
commentRouter.post('/new', [loggedIn], createComment);
commentRouter.get('/:commentid', getOneComment);
commentRouter.put('/:commentid', [loggedIn], updateComment);
commentRouter.delete('/:commentid', [loggedIn], deleteComment);

export default commentRouter;
