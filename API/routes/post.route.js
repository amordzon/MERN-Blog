import express from 'express';
import {
    getAllPosts,
    getMyPosts,
    createPost,
    getOnePost,
    updatePost,
    deletePost,
    ratePost,
    approveDisapprovePost,
} from '../controllers/post.controller.js';
import { loggedIn } from '../middleware/auth.middleware.js';
import upload from '../middleware/photo.middleware.js';
import { adminAuth } from '../middleware/auth.middleware.js';

const postRouter = express.Router();

postRouter.get('/', getAllPosts);
postRouter.get('/myposts', loggedIn, getMyPosts);
postRouter.post('/new', [loggedIn, upload.single('img')], createPost);
postRouter.get('/:postid', getOnePost);
postRouter.put('/:postid', [loggedIn, upload.single('img')], updatePost);
postRouter.delete('/:postid', loggedIn, deletePost);
postRouter.post('/rating', loggedIn, ratePost);
postRouter.put('/changevisibility/:postid', adminAuth, approveDisapprovePost);

export default postRouter;
