import mongoose from 'mongoose';
import Post from '../models/post.model.js';

export const getAllPosts = async (req, res) => {
    const sortBy = req.query.sortBy;
    const order = req.query.order == '1' ? 1 : -1;
    const sort = { [sortBy]: order };
    if (sortBy && order) {
        await Post.find()
            .populate('author category')
            .sort(sort)
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
    } else {
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
    }
};

export const getOnePost = async (req, res) => {
    const id = req.params.postid;
    await Post.findById(id)
        .populate('author category comments')
        .populate([
            {
                path: 'comments',
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: 'user',
                },
            },
        ])
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

export const getMyPosts = async (req, res) => {
    const author = req.user;
    await Post.find({ author: author })
        .populate('author category')
        .then((posts) => {
            res.status(200).json({
                success: true,
                message: 'My Posts',
                Posts: posts,
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
        img: req.body.img,
        category: req.body.category,
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
    const userId = req.user;
    await Post.findById(id)
        .then((post) => {
            if (post.author == userId) {
                post.remove()
                    .then(() =>
                        res.status(204).json({
                            success: true,
                        })
                    )
                    .catch((err) =>
                        res.status(500).json({
                            success: false,
                            message: 'Server error. Please try again.',
                        })
                    );
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Unauthorized action!',
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
            });
        });
};
