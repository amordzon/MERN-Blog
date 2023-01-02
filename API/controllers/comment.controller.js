import mongoose from 'mongoose';
import Comment from '../models/comment.model.js';

export const getAllComments = async (req, res) => {
    await Comment.find()
        .populate('user post')
        .then((allComments) => {
            return res.status(200).json({
                success: true,
                message: 'All comments',
                Comments: allComments,
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

export const getOneComment = async (req, res) => {
    const id = req.params.commentid;
    await Comment.findById(id)
        .then((singleComment) => {
            res.status(200).json({
                success: true,
                message: 'Single comment',
                Comment: singleComment,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'This comment does not exist',
                error: err.message,
            });
        });
};

export const createComment = (req, res) => {
    const comment = new Comment({
        _id: mongoose.Types.ObjectId(),
        user: req.body.user,
        body: req.body.body,
        post: req.body.post,
    });
    return comment
        .save()
        .then((newComment) => {
            Comment.populate(newComment, { path: 'user' }, (err, comment) => {
                return res.status(201).json({
                    success: true,
                    message: 'New comment created successfully',
                    Comment: comment,
                });
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

export const updateComment = async (req, res) => {
    const id = req.params.commentid;
    const updateObject = req.body;
    const author = req.user;
    // await Comment.update({ _id: id }, { $set: updateObject })
    //     .exec()
    //     .then(() => {
    //         res.status(200).json({
    //             success: true,
    //             message: 'Comment is updated',
    //             updatePost: updateObject,
    //         });
    //     })
    //     .catch((err) => {
    //         res.status(500).json({
    //             success: false,
    //             message: 'Server error. Please try again.',
    //         });
    //     });
    await Comment.findById(id)
        .then((comment) => {
            if (comment.user == author) {
                comment
                    .updateOne({ $set: updateObject })
                    .then(() =>
                        res.status(204).json({
                            success: true,
                        })
                    )
                    .catch(() =>
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
        .catch(() => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
            });
        });
};

export const deleteComment = async (req, res) => {
    const author = req.user;
    const id = req.params.commentid;
    await Comment.findById(id)
        .then((comment) => {
            if (comment.user == author) {
                comment
                    .remove()
                    .then(() =>
                        res.status(204).json({
                            success: true,
                        })
                    )
                    .catch(() =>
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
        .catch(() => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
            });
        });
};
