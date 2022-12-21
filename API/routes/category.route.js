import express from 'express';
import {
    getAllCategories,
    createCategory,
    getOneCategory,
    updateCategory,
    deleteCategory,
} from '../controllers/category.controller.js';
import { adminAuth } from '../middleware/auth.middleware.js';

const categoryRouter = express.Router();

categoryRouter.get('/', getAllCategories);
categoryRouter.post('/new', createCategory);
categoryRouter.get('/:categoryslug', getOneCategory);
categoryRouter.put('/:categoryid', updateCategory);
categoryRouter.delete('/:categoryid', [adminAuth], deleteCategory);

export default categoryRouter;
