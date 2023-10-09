const { StatusCodes } = require('http-status-codes');
const AppError = require('../error/appErrorClass');
const { verifyJWT } = require('../utils/tokenUtils');
const User = require('../model/userModel');

// AUTH MIDDLEWARE
exports.protectRoute = async (req, res, next) => {
  try {
    // a. GET THE TOKEN => IN REAL WORLD PRODUCTION WE NEED TO GET FROM THE COOKIES
    const { token } = req.cookies;

    // b. VERIFICATION THE TOKEN => SUPER IMPORTANT
    if (!token)
      return next(
        new AppError(`Please log in to get access`, StatusCodes.UNAUTHORIZED),
      );

    // c. DECODE THE JWT ===> GET THE PAYLOAD
    const decode = await verifyJWT(token);

    // d. GET THE USER FROM THE DATABASE ===> VERIFY THE USER EXIST
    const currentUser = await User.findById(decode.id);
    if (!currentUser)
      return next(
        new AppError(
          `The user belonging to this token no longer exist`,
          StatusCodes.UNAUTHORIZED,
        ),
      );

    const status = await User.findById(currentUser.id).select('active');
    if (!status.active) {
      return next(
        new AppError(
          `You are not an active user. Please register again`,
          StatusCodes.UNAUTHORIZED,
        ),
      );
    }

    // STORE THE USER INFORMATION ON THE REQ ===> FOR NEXT MIDDLEWARE TO ACCESS
    req.user = currentUser;

    // IF THE AUTHENTICATION PASS ===> CAN ACCESS THE NEXT MIDDLEWARE
    next();
  } catch (error) {
    next(error);
  }
};

exports.restrictToAdmin = async (req, res, next) => {
  try {
    const { name, role } = req.user;

    if (!(role === 'admin'))
      return next(
        new AppError(
          `${name}, dont have authorization to access this route`,
          StatusCodes.UNAUTHORIZED,
        ),
      );

    next();
  } catch (error) {
    next(error);
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          'You do not have permission to perform this action',
          StatusCodes.UNAUTHORIZED,
        ),
      );
    }
    next();
  };
};
