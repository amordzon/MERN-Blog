import express from 'express';
import {
    getAllPosts,
    createPost,
    getOnePost,
    updatePost,
    deletePost,
} from '../controllers/post.controller.js';

const postRouter = express.Router();

postRouter.get('/', getAllPosts);
postRouter.post('/new', createPost);
postRouter.get('/:postid', getOnePost);
postRouter.put('/:postid', updatePost);
postRouter.delete('/:postid', deletePost);

export default postRouter;
