import express from 'express';
import { Login, Logout, Register } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/login', Login);
authRouter.post('/register', Register);
authRouter.get('/logout', Logout);

export default authRouter;
