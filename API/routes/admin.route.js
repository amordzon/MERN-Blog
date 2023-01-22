import express from 'express';
import {
    getStatistics,
    importCSV,
    exportCsv,
} from '../controllers/admin.controller.js';
import { adminAuth } from '../middleware/auth.middleware.js';
import upload from '../middleware/csv.middleware.js';

const adminRouter = express.Router();

adminRouter.get('/statistics', adminAuth, getStatistics);
adminRouter.post('/importcsv', [adminAuth, upload.single('csv')], importCSV);
adminRouter.get('/exportcsv', adminAuth, exportCsv);

export default adminRouter;
