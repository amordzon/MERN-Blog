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
import upload from '../middleware/photo.middleware.js';

const postRouter = express.Router();

postRouter.get('/', getAllPosts);
postRouter.get('/myposts', loggedIn, getMyPosts);
postRouter.post('/new', [loggedIn, upload.single('img')], createPost);
postRouter.get('/:postid', getOnePost);
postRouter.put('/:postid', updatePost);
postRouter.delete('/:postid', loggedIn, deletePost);

export default postRouter;
