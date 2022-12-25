import express from 'express';
import {
    getAllUsers,
    createUser,
    getOneUser,
    updateUser,
    deleteUser,
} from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.post('/new', createUser);
userRouter.get('/:userid', getOneUser);
userRouter.put('/:userid', updateUser);
userRouter.delete('/:userid', deleteUser);

export default userRouter;
