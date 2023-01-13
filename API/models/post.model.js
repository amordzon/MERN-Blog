import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const PostSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        ratings: [
            {
                score: Number,
                ratedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            },
        ],
        img: {
            type: String,
            required: true,
        },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

PostSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post',
});

export default mongoose.model('Post', PostSchema);
