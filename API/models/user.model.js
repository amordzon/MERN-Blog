import mongoose from 'mongoose';
import Comment from './comment.model.js';
import Post from './post.model.js';

mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        password: { type: String, required: true },
        email: { type: String, required: true },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        role: { type: String, required: true, default: 'normal' },
    },
    { timestamps: true }
);

UserSchema.pre('deleteOne', { document: true, query: false }, function (next) {
    Comment.deleteMany({ user: this._id }).exec();
    Post.updateMany(
        { author: this._id },
        {
            $pull: {
                author: this._id,
            },
        }
    )
        .exec()
        .then(() => {
            Post.deleteMany({ 'author.0': { $exists: false } }).exec();
        });

    next();
});

export default mongoose.model('User', UserSchema);
