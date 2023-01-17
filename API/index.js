import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import postRouter from './routes/post.route.js';
import userRouter from './routes/user.route.js';
import categoryRouter from './routes/category.route.js';
import commentRouter from './routes/comment.route.js';
import chatRouter from './routes/chat.route.js';
import authRouter from './routes/auth.route.js';
import adminRouter from './routes/admin.route.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import http from 'http';
import Chat from './models/chat.model.js';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
const whitelist = ['http://localhost:3001', 'http://localhost:3000'];
const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});
app.use(cors(corsOptions));
mongoose.connect(
    'mongodb+srv://' +
        process.env.LOGIN +
        ':' +
        process.env.PASSWORD +
        process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            console.log('error in connection');
        } else {
            console.log('mongodb is connected');
        }
    }
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/comments', commentRouter);
app.use('/api/chat', chatRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';
const GET_CHAT_MESSAGES_EVENT = 'getChatMessages';
io.on('connection', (socket) => {
    Chat.find({})
        .populate('user')
        .then((messages) => {
            io.emit(GET_CHAT_MESSAGES_EVENT, messages);
        });

    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        const chatmessage = new Chat({
            _id: mongoose.Types.ObjectId(),
            user: data.user,
            message: data.body,
        });
        chatmessage
            .save()
            .then(() => {
                io.emit(NEW_CHAT_MESSAGE_EVENT, data);
            })
            .catch((error) => {
                console.log(error);
            });
    });
});

server.listen(process.env.PORT, () => {
    console.log(`Our server is running on port ${process.env.PORT}`);
});
