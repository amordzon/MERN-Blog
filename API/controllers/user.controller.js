import mongoose from 'mongoose';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const getAllUsers = async (req, res) => {
    await User.find()
        .then((allUsers) => {
            return res.status(200).json({
                success: true,
                message: 'All users',
                Users: allUsers,
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

export const getOneUser = async (req, res) => {
    const id = req.params.userid;
    await User.findById(id)
        .then((singleUser) => {
            res.status(200).json({
                success: true,
                message: 'Single User',
                User: singleUser,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'This user does not exist',
                error: err.message,
            });
        });
};

export const createUser = async (req, res) => {
    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    User.find({ email: req.body.email }, (err, users) => {
        if (users.length) {
            res.status(500).json({
                success: false,
                message: 'This user already exists',
            });
        } else {
            const user = new User({
                _id: mongoose.Types.ObjectId(),
                password: hashedPwd,
                email: req.body.email,
                name: req.body.name,
                surname: req.body.surname,
                role: req.body.role,
            });
            return user
                .save()
                .then((newUser) => {
                    return res.status(201).json({
                        success: true,
                        message: 'New user created successfully',
                        User: newUser,
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

export const updateUser = async (req, res) => {
    const id = req.params.userid;
    const val = req.body.password
        ? {
              password: await bcrypt.hash(req.body.password, 10),
              email: req.body.email,
              name: req.body.name,
              surname: req.body.surname,
              role: req.body.role,
          }
        : {
              email: req.body.email,
              name: req.body.name,
              surname: req.body.surname,
              role: req.body.role,
          };
    await User.findByIdAndUpdate(id, val, { new: true })
        .then((user) => {
            res.status(200).json({
                success: true,
                message: 'User is updated',
                User: {
                    user: user,
                },
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
            });
        });
};

export const updateUserWithToken = async (req, res) => {
    const id = req.user;
    const token = req.header('x-access-token');
    const user = await User.findOne({ _id: id });
    if (req.body.password && req.body.oldpassword) {
        const validate = await bcrypt.compare(
            req.body.oldpassword,
            user.password
        );
        if (validate) {
            const hashedPwd = await bcrypt.hash(req.body.password, 10);
            await User.findByIdAndUpdate(
                id,
                {
                    password: hashedPwd,
                    email: req.body.email,
                    name: req.body.name,
                    surname: req.body.surname,
                },
                { new: true }
            )
                .then((user) => {
                    res.status(200).json({
                        success: true,
                        message: 'User is updated',
                        User: {
                            user: user,
                            token: token,
                        },
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        success: false,
                        message: 'Server error. Please try again.',
                    });
                });
        } else {
            res.status(500).json({
                success: false,
                message: 'Invalid password.',
            });
        }
    } else {
        await User.findByIdAndUpdate(
            id,
            {
                email: req.body.email,
                name: req.body.name,
                surname: req.body.surname,
            },
            { new: true }
        )
            .then((user) => {
                res.status(200).json({
                    success: true,
                    message: 'User is updated',
                    User: {
                        user: user,
                        token: token,
                    },
                });
            })
            .catch((err) => {
                res.status(500).json({
                    success: false,
                    message: 'Server error. Please try again.',
                });
            });
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.userid;
    await User.findByIdAndRemove(id)
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
