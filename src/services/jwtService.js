const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const generateAccessToken = async (payload) => {
  const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '30s' });
    return access_token;
}


const generateRefreshToken = async (payload) => {
    const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '365d' });
    return refresh_token;
}
module.exports = { generateAccessToken, generateRefreshToken };