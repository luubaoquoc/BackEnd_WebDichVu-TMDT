const UserServices = require('../services/UserService');
const jwtService = require('../services/jwtService');

const createrUser = async (req, res) => {
    try {
        const { user_name, user_email, user_password, user_phone, confirm_password } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isCheckEmail = emailRegex.test(user_email);
        if (!user_name || !user_email || !user_password || !user_phone || !confirm_password) {
            return res.status(400).json({
                status: 'error',
                message: 'All fields are required',
            });
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid email format',
            });
        } else if (user_password !== confirm_password) {
            return res.status(400).json({
                status: 'error',
                message: 'Password does not match',
            });
        }
        const response = await UserServices.createrUser(req.body);
        return res.status(201).json({
            status: 'success',
            data: response,
        });
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

const loginUser = async (req, res) => {
    try {
        const { user_email, user_password } = req.body;
        if (!user_email || !user_password) {
            return res.status(400).json({
                status: 'error',
                message: 'user_email and user_password are required',
            });
        }
        const response = await UserServices.loginUser(req.body);
        return res.status(200).json({
            status: 'success',
            data: response,
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        if (!userId) {
            return res.status(400).json({
                status: 'error',
                message: 'User id is required',
            });
        }
        const response = await UserServices.updateUser(userId, data);
        return res.status(200).json({
            status: 'success',
            data: response,
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({
                status: 'error',
                message: 'User id is required',
            });
        }
        const response = await UserServices.deleteUser(userId);
        return res.status(200).json({
            status: 'success',
            data: response,
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getAllUser = async (req, res) => {
    try {

        const response = await UserServices.getAllUser();
        return res.status(200).json({
            status: 'success',
            data: response,
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({
                status: 'error',
                message: 'User id is required',
            });
        }
        const response = await UserServices.getDetailsUser(userId);
        return res.status(200).json({
            status: 'success',
            data: response,
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.headers.token.split(' ')[1];


        if (!token) {
            return res.status(400).json({
                status: 'error',
                message: 'the token is required',
            });
        }
        const response = await jwtService.refreshTokenService(token);
        return res.status(200).json({
            status: 'success',
            data: response,
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


module.exports = { createrUser, loginUser, updateUser, deleteUser, getAllUser, getDetailsUser, refreshToken };