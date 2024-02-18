import Post from '../models/post.model.js';
import Category from '../models/category.model.js';
import User from '../models/user.model.js';
import Comment from '../models/comment.model.js';
import csv from 'csvtojson';
import mongoose from 'mongoose';

export const getStatistics = async (req, res) => {
    try {
        const postsNum = await Post.countDocuments({}).exec();
        const categoryNum = await Category.countDocuments({}).exec();
        const usersNum = await User.countDocuments({}).exec();
        const commentsNum = await Comment.countDocuments({}).exec();
        res.status(200).json({
            success: true,
            message: 'Statistics',
            Statistics: {
                postsNum: postsNum,
                categoryNum: categoryNum,
                usersNum: usersNum,
                commentsNum: commentsNum,
            },
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message,
        });
    }
};

const getData = async (type) => {
    switch (type) {
        case 'posts':
            return Post.find().exec();
        case 'categories':
            return Category.find().exec();
        case 'comments':
            return Comment.find().exec();
        case 'users':
            return User.find().exec();
        default:
            return null;
    }
};

export const exportCsv = async (req, res) => {
    const type = req.query.type;
    try {
        const data = await getData(type);
        console.log(data);
        if (data) {
            res.status(200).json({
                success: true,
                message: 'CSV data',
                Data: data,
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Server error',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

export const importCSV = async (req, res) => {
    try {
        csv()
            .fromFile(req.file.path)
            .then((jsonObj) => {
                let posts = [];
                for (let i = 0; i < jsonObj.length; i++) {
                    let obj = {};
                    obj.author = [
                        mongoose.Types.ObjectId(jsonObj[i]['author']),
                    ];
                    obj.title = jsonObj[i]['title'];
                    obj.body = jsonObj[i]['body'];
                    obj.img = jsonObj[i]['img'];
                    obj.category = mongoose.Types.ObjectId(
                        jsonObj[i]['category']
                    );
                    posts.push(obj);
                }
                Post.insertMany(posts)
                    .then(function () {
                        res.status(200).send({
                            message: 'Successfully Uploaded!',
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                        res.status(500).send({
                            message: 'Something went wrong!',
                            error,
                        });
                    });
            })
            .catch((error) => {
                res.status(500).send({
                    message: 'Something went wrong!',
                    error,
                });
            });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message,
        });
    }
};
