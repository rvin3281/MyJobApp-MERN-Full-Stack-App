const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.createToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

exports.verifyJWT = async (token) => {
  // THE DECODED IS THE RESULT OR THE PAYLOAD THAT WE GOING TO GET BACK
  // const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  return decoded;
};
