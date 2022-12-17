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

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
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

app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/comments', commentRouter);
app.use('/api/chat', chatRouter);
app.use('/api/auth', authRouter);

app.listen(process.env.PORT, () => {
    console.log(`Our server is running on port ${process.env.PORT}`);
});
