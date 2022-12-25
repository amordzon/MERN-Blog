import express from 'express';
import {
    getAllPosts,
    getMyPosts,
    createPost,
    getOnePost,
    updatePost,
    deletePost,
} from '../controllers/post.controller.js';
import { loggedIn } from '../middleware/auth.middleware.js';

const postRouter = express.Router();

postRouter.get('/', getAllPosts);
postRouter.get('/myposts', loggedIn, getMyPosts);
postRouter.post('/new', createPost);
postRouter.get('/:postid', getOnePost);
postRouter.put('/:postid', updatePost);
postRouter.delete('/:postid', deletePost);

export default postRouter;
