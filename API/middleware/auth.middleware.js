import jwt from 'jsonwebtoken';

const jwtSecret =
    '4a84cdc69fccd13e2b4207a184c17f6cb7373af21e2d5d10562c693c0b780866a768e4';

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

export const userAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Not authorized' });
            } else {
                if (decodedToken.role !== 'normal') {
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
