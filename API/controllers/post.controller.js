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

export const createPost = (req, res) => {
    const author = req.user;

    const post = new Post({
        _id: mongoose.Types.ObjectId(),
        author: author,
        title: req.body.title,
        body: req.body.body,
        img:
            req.protocol +
            '://' +
            req.get('host') +
            '/uploads/' +
            req.file.filename,
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
    let updateObject = req.body;
    updateObject.img = updateObject.img
        ? updateObject.img
        : req.protocol +
          '://' +
          req.get('host') +
          '/uploads/' +
          req.file.filename;

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
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
        });
    }
};
