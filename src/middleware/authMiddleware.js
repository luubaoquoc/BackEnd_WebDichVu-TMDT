const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); // Import model User
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            status: 'error',
            message: 'Authorization header is missing',
        });
    }

    const token = authHeader.split(' ')[1]; // "Bearer token"

    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Token is missing',
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({
                status: 'error',
                message: 'The authentication token is invalid or expired',
            });
        }

        // gán user vào req để controller dùng nếu cần
        req.user = user;

        if (user.isAdmin) {
            next();
        } else {
            return res.status(403).json({
                status: 'error',
                message: 'You are not authorized to perform this action',
            });
        }
    });
}
const authUserMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Không có token trong request',
            });
        }

        let user;
        try {
            user = jwt.verify(token, process.env.ACCESS_TOKEN);
        } catch (err) {
            return res.status(403).json({
                status: 'error',
                message: 'Token không hợp lệ hoặc đã hết hạn',
            });
        }

        const dbUser = await User.findById(user.id);
        if (!dbUser || dbUser.isBlocked) {
            return res.status(403).json({
                status: 'error',
                message: 'Tài khoản đã bị khóa hoặc không tồn tại',
            });
        }
        req.user = dbUser;
        next();
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Lỗi server", error });
    }
};

module.exports = {
    authMiddleware,
    authUserMiddleware
}