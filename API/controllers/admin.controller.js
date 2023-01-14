import Post from '../models/post.model.js';
import Category from '../models/category.model.js';
import User from '../models/user.model.js';
import Comment from '../models/comment.model.js';

export const getStatistics = async (req, res) => {
    try {
        const postsNum = await Post.countDocuments({}).exec();
        const categoryNum = await Category.countDocuments({}).exec();
        const usersNum = await User.countDocuments({}).exec();
        const commentsNum = await Comment.countDocuments({}).exec();
        res.status(200).json({
            success: true,
            message: 'Statistics',
            Statistics: {
                postsNum: postsNum,
                categoryNum: categoryNum,
                usersNum: usersNum,
                commentsNum: commentsNum,
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message,
        });
    }
};
