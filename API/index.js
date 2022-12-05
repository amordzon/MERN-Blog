import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRouter from './routes/post.route.js';
import userRouter from './routes/user.route.js';
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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

app.listen(process.env.PORT, () => {
    console.log(`Our server is running on port ${process.env.PORT}`);
});
