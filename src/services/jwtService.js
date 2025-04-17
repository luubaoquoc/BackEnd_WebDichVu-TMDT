const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const generateAccessToken = async (payload) => {
  const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '365s' });
  return access_token;
}


const generateRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '365d' });
  return refresh_token;
}

const refreshTokenService = async (token) => {
  return new Promise(async (resolve, reject) => {
    try {


      console.log('token', token);
      jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          resolve({
            status: 'ERROR',
            message: 'the authemtication'
          })
        }
        const access_token = await generateAccessToken({
          id: user.id,
          isAdmin: user.isAdmin
        })
        resolve({
          status: 'success',
          message: 'SUCCESS',
          access_token

        });
      })

    } catch (error) {
      reject(error);
    }
  }
  )
}
module.exports = { generateAccessToken, generateRefreshToken, refreshTokenService };