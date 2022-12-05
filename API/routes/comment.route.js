import express from 'express';
import {
    getAllComments,
    createComment,
    getOneComment,
    updateComment,
    deleteComment,
} from '../controllers/comment.controller.js';

const commentRouter = express.Router();

commentRouter.get('/', getAllComments);
commentRouter.post('/new', createComment);
commentRouter.get('/:commentid', getOneComment);
commentRouter.put('/:commentid', updateComment);
commentRouter.delete('/:commentid', deleteComment);

export default commentRouter;
