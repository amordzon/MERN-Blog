import express from 'express';
import {
    getAllUsers,
    createUser,
    getOneUser,
    updateUser,
    deleteUser,
} from '../controllers/user.controller.js';
import { adminAuth } from '../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.get('/', [adminAuth], getAllUsers);
userRouter.post('/new', createUser);
userRouter.get('/:userid', getOneUser);
userRouter.put('/:userid', updateUser);
userRouter.delete('/:userid', deleteUser);

export default userRouter;
