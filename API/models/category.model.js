import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const CategorySchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        created_at: {
            type: Date,
            required: true,
        },
    },
    { toJSON: { virtuals: true } }
);

CategorySchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'category',
    count: true,
});

export default mongoose.model('Category', CategorySchema);
