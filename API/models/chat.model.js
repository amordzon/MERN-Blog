import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const ChatSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
    },
});

export default mongoose.model('Chat', ChatSchema);
