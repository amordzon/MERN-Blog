import express from 'express';
import {
    getAllUsers,
    createUser,
    getOneUser,
    updateUserWithToken,
    deleteUser,
    updateUser,
} from '../controllers/user.controller.js';
import { loggedIn, adminAuth } from '../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.post('/new', adminAuth, createUser);
userRouter.get('/:userid', getOneUser);
userRouter.put('/:userid', adminAuth, updateUser);
userRouter.put('/updatewithtoken', loggedIn, updateUserWithToken);
userRouter.delete('/:userid', adminAuth, deleteUser);

export default userRouter;
