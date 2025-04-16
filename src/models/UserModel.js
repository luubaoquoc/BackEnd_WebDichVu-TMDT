const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        user_name: { type: String, required: true },
        user_email: { type: String, required: true, unique: true },
        user_password: { type: String, required: true },
        user_phone: { type: Number, required: true },
        user_address: { type: String },
        isAdmin: { type: Boolean, default: false, required: true },
        avatar: {
            type: String, // lưu URL hoặc path ảnh
            default: "",  // có thể set mặc định rỗng hoặc ảnh mặc định
        },
        // user_status: {type: String, required: true},
        // user_access_token: {type: String, required: true},
        // user_refresh_token: {type: String, required: true},
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
