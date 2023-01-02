import mongoose from 'mongoose';
import Category from '../models/category.model.js';
import slugify from 'slugify';

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()
            .populate('posts')
            .sort('posts');
        return res.status(200).json({
            success: true,
            message: 'All categories',
            Categories: categories,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message,
        });
    }
};

export const getOneCategory = async (req, res) => {
    const slug = req.params.categoryslug;
    await Category.findOne({ slug: slug })
        .populate([
            {
                path: 'posts',
                populate: {
                    path: 'author category',
                },
            },
        ])
        .then((singleCategory) => {
            res.status(200).json({
                success: true,
                message: 'Single category',
                Category: singleCategory,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'This category does not exist',
                error: err.message,
            });
        });
};

export const createCategory = (req, res) => {
    Category.find({ name: req.body.name }, (err, categories) => {
        if (categories.length) {
            return res.status(409).json({
                success: true,
                message: 'This category already exists!',
            });
        } else {
            const category = new Category({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                slug: slugify(req.body.name),
                description: req.body.description,
            });
            return category
                .save()
                .then((newCategory) => {
                    return res.status(201).json({
                        success: true,
                        message: 'New category created successfully',
                        Category: newCategory,
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        success: false,
                        message: 'Server error. Please try again.',
                        error: error.message,
                    });
                });
        }
    });
};

export const updateCategory = async (req, res) => {
    const id = req.params.categoryid;
    const updateObject = req.body;
    await Category.update({ _id: id }, { $set: updateObject })
        .exec()
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'Category is updated',
                updateCategory: updateObject,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
            });
        });
};

export const deleteCategory = async (req, res) => {
    const id = req.params.categoryid;
    await Category.findByIdAndRemove(id)
        .exec()
        .then(() =>
            res.status(204).json({
                success: true,
            })
        )
        .catch((err) =>
            res.status(500).json({
                success: false,
            })
        );
};
