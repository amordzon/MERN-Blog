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

export const createChatMessage = (req, res) => {
    const chatmessage = new Chat({
        _id: mongoose.Types.ObjectId(),
        user: req.body.user,
        message: req.body.message,
    });
    return chatmessage
        .save()
        .then((newChatMessage) => {
            return res.status(201).json({
                success: true,
                message: 'New chat message created successfully',
                chatMessage: newChatMessage,
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

export const deleteChatMessage = async (req, res) => {
    const id = req.params.chatmessageid;
    await Chat.findByIdAndRemove(id)
        .exec()
        .then(() =>
            res.status(204).json({
                success: true,
            })
        )
        .catch((err) =>
            res.status(500).json({
                success: false,
            })
        );
};
