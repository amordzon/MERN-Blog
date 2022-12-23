import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const CommentSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        body: {
            type: String,
            required: true,
        },
        post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    },
    { timestamps: true }
);

export default mongoose.model('Comment', CommentSchema);
