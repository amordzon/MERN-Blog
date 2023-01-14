import mongoose from 'mongoose';
import Chat from '../models/chat.model.js';

export const getAllChatMessages = async (req, res) => {
    await Chat.find()
        .populate('user')
        .then((allChatMessages) => {
            return res.status(200).json({
                success: true,
                message: 'All chat messages',
                Comments: allChatMessages,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: err.message,
            });
        });
};
