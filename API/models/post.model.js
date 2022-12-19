import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const PostSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            default: 0,
        },
        img: {
            type: String,
            required: true,
        },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        published_at: {
            type: Date,
            required: true,
        },
    },
    { collection: 'posts' }
);

export default mongoose.model('Post', PostSchema);
