import express from 'express';
import {
    getAllCategories,
    createCategory,
    getOneCategory,
    updateCategory,
    deleteCategory,
} from '../controllers/category.controller.js';
import { loggedIn } from '../middleware/auth.middleware.js';

const categoryRouter = express.Router();

categoryRouter.get('/', getAllCategories);
categoryRouter.post('/new', loggedIn, createCategory);
categoryRouter.get('/:categoryslug', getOneCategory);
categoryRouter.put('/:categoryid', updateCategory);
categoryRouter.delete('/:categoryid', deleteCategory);

export default categoryRouter;
