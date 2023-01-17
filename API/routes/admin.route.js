import express from 'express';
import { getStatistics } from '../controllers/admin.controller.js';
import { adminAuth } from '../middleware/auth.middleware.js';

const adminRouter = express.Router();

adminRouter.get('/statistics', adminAuth, getStatistics);

export default adminRouter;
