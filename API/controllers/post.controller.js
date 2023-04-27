import mongoose from 'mongoose';
import Post from '../models/post.model.js';
import {
    removeFromCloudinary,
    uploadToCloudinary,
} from '../services/cloudinary.services.js';

export const getAllPosts = async (req, res) => {
    const sortBy = req.query.sortBy;
    const order = req.query.order == '1' ? 1 : -1;
    const sort = { [sortBy]: order };
    if (sortBy && order) {
        if (sortBy == 'ratings') {
            const aggregatorOpts = [
                {
                    $match: { approved: true },
                },
                {
                    $project: {
                        title: 1,
                        ratings: 1,
                        ratingsLen: {
                            $size: { $ifNull: ['$ratings', []] },
                        },
                    },
                },
                { $sort: { ratingsLen: -1 } },
            ];
            Post.aggregate(aggregatorOpts, (err, allPosts) => {
                if (err) {
                    res.status(500).json({
                        success: false,
                        message: 'Server error',
                        error: err.message,
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        message: 'All posts',
                        Posts: allPosts,
                    });
                }
            });
        } else {
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
        }
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
    const aggregatorOpts = [
        {
            $match: {
                _id: mongoose.Types.ObjectId(id),
            },
        },
        {
            $unwind: '$ratings',
        },

        {
            $group: {
                _id: '$ratings.score',
                count: { $sum: 1 },
            },
        },
    ];
    try {
        const singlePost = await Post.findById(id)
            .populate('author category comments')
            .populate([
                {
                    path: 'comments',
                    options: { sort: { createdAt: -1 } },
                    populate: {
                        path: 'user',
                    },
                },
            ]);

        Post.aggregate(aggregatorOpts, (err, rating) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: 'Something went wrong!',
                    error: err.message,
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Single Post',
                    Post: singlePost,
                    Rating: rating,
                });
            }
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'This post does not exist',
            error: err.message,
        });
    }
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

export const createPost = async (req, res) => {
    const author = req.user;
    const users = req.body.users ? [author, ...req.body.users] : [author];
    const data = await uploadToCloudinary(req.file.path, 'posts-images');
    if (data == null) {
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: 'Server error. Please try again.',
        });
    }
    const post = new Post({
        _id: mongoose.Types.ObjectId(),
        author: users,
        title: req.body.title,
        body: req.body.body,
        img: { imageUrl: data.url, publicId: data.public_id },
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
    const author = req.user;
    const id = req.params.postid;
    let updateObject = req.body;
    if (req.file != null) {
        const data = await uploadToCloudinary(req.file.path, 'posts-images');
        if (data == null) {
            return res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: 'Server error. Please try again.',
            });
        }
        updateObject.img = { imageUrl: data.url, publicId: data.public_id };
    }
    updateObject.author = updateObject.users
        ? [author, ...updateObject.users]
        : [author];

    delete updateObject.users;
    await Post.findById(id)
        .then((post) => {
            if (post.author.includes(author) || req.role == 'admin') {
                post.updateOne({ $set: updateObject })
                    .then(() => {
                        res.status(200).json({
                            success: true,
                            message: 'Post is updated',
                            updatePost: updateObject,
                        });
                    })
                    .catch(() => {
                        res.status(500).json({
                            success: false,
                            message: 'Server error. Please try again.',
                        });
                    });
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

export const deletePost = async (req, res) => {
    const id = req.params.postid;
    const userId = req.user;
    await Post.findById(id)
        .then(async (post) => {
            if (post.author.includes(userId) || req.role == 'admin') {
                if (post.img.imageUrl) {
                    const message = await removeFromCloudinary(
                        post.img.publicId
                    );
                    if (message == null) {
                        return res.status(500).json({
                            success: false,
                            message: 'Server error. Please try again.',
                            error: 'Server error. Please try again.',
                        });
                    }
                }
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

export const ratePost = async (req, res) => {
    const user = req.user;

    const aggregatorOpts = [
        {
            $match: {
                _id: mongoose.Types.ObjectId(req.body.id),
            },
        },
        {
            $unwind: '$ratings',
        },

        {
            $group: {
                _id: '$ratings.score',
                count: { $sum: 1 },
            },
        },
    ];
    try {
        const post = await Post.findById(req.body.id);
        let alreadyRatedPost = post.ratings.find(
            (rating) => rating.ratedBy.toString() == user.toString()
        );
        if (alreadyRatedPost) {
            let unsetRating = post.ratings.find(
                (rating) =>
                    rating.score == req.body.score &&
                    rating.ratedBy.toString() == user.toString()
            );
            if (unsetRating) {
                await Post.updateOne(
                    {
                        _id: req.body.id,
                    },
                    {
                        $pull: { ratings: { _id: unsetRating._id } },
                    },
                    {
                        safe: true,
                    }
                );
            } else {
                await Post.updateOne(
                    {
                        ratings: { $elemMatch: alreadyRatedPost },
                    },
                    {
                        $set: { 'ratings.$.score': req.body.score },
                    },
                    {
                        new: true,
                    }
                );
            }
        } else {
            await Post.findByIdAndUpdate(
                req.body.id,
                {
                    $push: {
                        ratings: {
                            score: req.body.score,
                            ratedBy: user,
                        },
                    },
                },
                {
                    new: true,
                }
            );
        }

        Post.aggregate(aggregatorOpts, (err, rating) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    message: 'Something went wrong!',
                    error: err.message,
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Success',
                    Rating: rating,
                });
            }
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
        });
    }
};

export const approveDisapprovePost = async (req, res) => {
    const id = req.params.postid;
    console.log(id);
    await Post.findOneAndUpdate(
        { _id: id },
        [{ $set: { approved: { $eq: [false, '$approved'] } } }],
        { new: true }
    )
        .then((updatedPost) => {
            console.log(updatedPost);
            res.status(200).json({
                success: true,
                message: 'Success',
                Post: updatedPost,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
            });
        });
};
