import jwt from 'jsonwebtoken';

const jwtSecret = process.env.TOKEN_SECRET;

export const adminAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Not authorized' });
            } else {
                if (decodedToken.role != 'admin') {
                    console.log(decodedToken.role);
                    return res.status(401).json({ message: 'Not authorized' });
                } else {
                    next();
                }
            }
        });
    } else {
        return res
            .status(401)
            .json({ message: 'Not authorized, token not available' });
    }
};

export const loggedIn = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Not authorized' });
            } else {
                next();
            }
        });
    } else {
        return res
            .status(401)
            .json({ message: 'Not authorized, token not available' });
    }
};
