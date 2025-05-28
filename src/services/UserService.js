const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('./jwtService');

const createrUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { user_name, user_email, user_phone, user_password } = newUser;
        try {
            const checkUser = await User.findOne({ user_email });
            if (checkUser) {
                resolve({
                    status: 'error',
                    message: 'User already exist'
                });
            }
            const hash = bcrypt.hashSync(user_password, 10);
            const createUser = await User.create({
                user_name,
                user_email,
                user_phone,
                user_password: hash
            });
            if (createUser) {
                resolve({
                    status: 'success',
                    message: 'User created successfully',
                    data: createUser
                });
            }
        } catch (error) {
            reject(error);
        }
    }
    )
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { user_email, user_password } = userLogin;
        try {
            const checkUser = await User.findOne({ user_email });
            console.log(checkUser);
            if (!checkUser) {
                reject({
                    status: 'error',
                    message: 'User not found'
                });
                return;
            }
            if (checkUser.isBlocked) {
                reject({
                    status: 'error',
                    message: 'User is blocked'
                });
                return;
            }
            const comparePassword = bcrypt.compareSync(user_password, checkUser.user_password);
            if (!comparePassword) {
                reject({
                    status: 'error',
                    message: 'Password is incorrect'
                });
                return;
            }
            const access_token = await generateAccessToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin
            });
            const refresh_token = await generateRefreshToken({
                id: checkUser._id,
                isAdmin: checkUser.isAdmin
            });
            resolve({
                status: 'success',
                message: 'Login successfully',
                access_token,
                refresh_token,
                data: checkUser
            });
        } catch (error) {
            reject(error);
        }
    }
    )
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findById({
                _id: id
            });
            if (!checkUser) {
                resolve({
                    status: 'error',
                    message: 'User not found'
                });
            }
            if (data.user_password) {
                data.user_password = bcrypt.hashSync(data.user_password, 10);
            }
            const updateUser = await User.findByIdAndUpdate(id, data, { new: true });
            if (updateUser) {
                resolve({
                    status: 'success',
                    message: 'User updated successfully',
                    data: updateUser
                });
            }
        } catch (error) {
            reject(error);
        }
    }
    )
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findById({
                _id: id
            });
            if (!checkUser) {
                resolve({
                    status: 'error',
                    message: 'User not found'
                });
            }
            await User.findByIdAndDelete(id);
            resolve({
                status: 'success',
                message: 'User delete successfully',
            });

        } catch (error) {
            reject(error);
        }
    }
    )
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {

            const allUser = await User.find();
            resolve(allUser);
        } catch (error) {
            reject(error);
        }
    }
    )
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById({
                _id: id
            });
            if (!user) {
                resolve({
                    status: 'error',
                    message: 'User not found'
                });
            }
            resolve({
                status: 'success',
                message: 'SUCCESS',
                data: user

            });

        } catch (error) {
            reject(error);
        }
    }
    )
}

const blockUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById({
                _id: id
            });
            if (!user) {
                resolve({
                    status: 'error',
                    message: 'User not found'
                });
            }
            const updateUser = await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
            resolve({
                status: 'success',
                message: 'User blocked successfully',
                data: updateUser
            });
        } catch (error) {
            reject(error);
        }
    }
    )
}

module.exports = { createrUser, loginUser, updateUser, deleteUser, getAllUser, getDetailsUser, blockUser };