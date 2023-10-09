const bcrypt = require('bcryptjs');

exports.hashPassword = async (password) => {
  // const encryptPassword = await bcrypt.hash(password, 12);
  // return encryptPassword;

  const salt = await bcrypt.genSalt(10);
  const encryptPassword = await bcrypt.hash(password, salt);
  return encryptPassword;
};

exports.comparePassword = async (password, hashedPassword) => {
  // hashed password -> from database
  // password -> from user
  return await bcrypt.compare(password, hashedPassword);
};
