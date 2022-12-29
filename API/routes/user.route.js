import express from 'express';
import {
    getAllUsers,
    createUser,
    getOneUser,
    updateUserWithToken,
    deleteUser,
} from '../controllers/user.controller.js';
import { loggedIn } from '../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.post('/new', createUser);
userRouter.get('/:userid', getOneUser);
userRouter.put('/updatewithtoken', loggedIn, updateUserWithToken);
userRouter.delete('/:userid', deleteUser);

export default userRouter;
