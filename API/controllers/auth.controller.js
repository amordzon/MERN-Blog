import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const jwtSecret =
    '4a84cdc69fccd13e2b4207a184c17f6cb7373af21e2d5d10562c693c0b780866a768e4';

export const Login = async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    const validate = await bcrypt.compare(req.body.password, user.password);
    if (validate) {
        createJWT(user, res);
        res.status(200).json({
            success: true,
            message: 'User logged in!',
            User: user,
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Email or password incorrect!',
        });
    }
};

export const Register = async (req, res) => {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    User.find({ email: req.body.email }, (err, users) => {
        if (users.length) {
            return res.sendStatus(409);
        } else {
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hashedPwd,
                email: req.body.email,
                name: req.body.name,
                surname: req.body.surname,
                created_at: req.body.created_at,
            });
            return user
                .save()
                .then((newUser) => {
                    createJWT(newUser, res);
                    return res.status(201).json({
                        success: true,
                        message: 'New user created successfully',
                        User: newUser._id,
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        success: false,
                        message: 'Server error. Please try again.',
                        error: error.message,
                    });
                });
        }
    });
};

const createJWT = (user, res) => {
    const maxAge = 3 * 60 * 60;
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
            role: user.role,
        },
        jwtSecret,
        {
            expiresIn: maxAge,
        }
    );
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
    });
};
