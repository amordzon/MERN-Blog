import mongoose from 'mongoose';
import Post from '../models/post.model.js';

export const getAllPosts = async (req, res) => {
    await Post.find()
        .populate('author category')
        .then((allPosts) => {
            return res.status(200).json({
                success: true,
                message: 'All posts',
                Posts: allPosts,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: err.message,
            });
        });
};

export const getOnePost = async (req, res) => {
    const id = req.params.postid;
    await Post.findById(id)
        .then((singlePost) => {
            res.status(200).json({
                success: true,
                message: 'Single Post',
                Post: singlePost,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'This post does not exist',
                error: err.message,
            });
        });
};

export const createPost = (req, res) => {
    const post = new Post({
        _id: mongoose.Types.ObjectId(),
        author: req.body.author,
        title: req.body.title,
        body: req.body.body,
        category: req.body.category,
        published_at: req.body.published_at,
    });
    return post
        .save()
        .then((newPost) => {
            return res.status(201).json({
                success: true,
                message: 'New post created successfully',
                Post: newPost,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });
};

export const updatePost = async (req, res) => {
    const id = req.params.postid;
    const updateObject = req.body;
    await Post.update({ _id: id }, { $set: updateObject })
        .exec()
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'Post is updated',
                updatePost: updateObject,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
            });
        });
};

export const deletePost = async (req, res) => {
    const id = req.params.postid;
    await Post.findByIdAndRemove(id)
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
