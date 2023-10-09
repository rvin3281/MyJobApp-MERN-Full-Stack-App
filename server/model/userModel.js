const mongoose = require('mongoose');
const passwordUtil = require('../utils/passwordUtils');
const constant = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    lowercase: true,
  },
  password: {
    type: String,
    select: false, // This will prevent client from selecting the password field
  },
  passwordConfirm: String,
  lastName: {
    type: String,
    default: 'lastName',
  },
  location: {
    type: String,
    default: 'my city',
  },
  role: {
    type: String,
    enum: Object.values(constant.USER_ROLE),
    default: 'user',
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  avatar: String,
  avatarPublicId: String,
});

// 1. START PASSWORD ENCRYPTION WHEN USER REGISTER
userSchema.pre('save', async function (next) {
  // If the password is NOT modified then we return next() => not continue to encrypt
  if (!this.isModified('password')) return next();

  // Start encrypt
  // the current password of the document should be === to bcrypt
  // Specify the corse parameter
  this.password = await passwordUtil.hashPassword(this.password);

  // DELETE THE CONFIRM PASSWORD
  this.passwordConfirm = undefined;

  // MUST CALL NEXT
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
