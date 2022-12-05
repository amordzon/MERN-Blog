import express from 'express';
import {
    getAllPosts,
    createPost,
    getOnePost,
    updatePost,
    deletePost,
} from '../controllers/post.controller.js';

const postRouter = express.Router();

postRouter.get('/posts', getAllPosts);
postRouter.post('/posts/new', createPost);
postRouter.get('/posts/:postid', getOnePost);
postRouter.put('/posts/:postid', updatePost);
postRouter.delete('/posts/:postid', deletePost);

export default postRouter;
