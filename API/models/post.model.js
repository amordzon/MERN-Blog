import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const PostSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        person_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Catgory' },
        published_at: {
            type: Date,
            required: true,
        },
    },
    { collection: 'posts' }
);

export default mongoose.model('Post', PostSchema);
