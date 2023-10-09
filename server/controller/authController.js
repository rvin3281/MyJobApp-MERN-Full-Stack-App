const { StatusCodes } = require('http-status-codes');
const User = require('../model/userModel');
const AppError = require('../error/appErrorClass');
const passwordUtil = require('../utils/passwordUtils');
const { createToken } = require('../utils/tokenUtils');

exports.signup = async (req, res, next) => {
  try {
    // 1. GET THE USER FROM BODY AFTER VALIDATION LAYER
    // const data = await User.create(req.body);

    const data = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      lastName: req.body.lastName,
      location: req.body.location,
    });

    // DONT DISPLAY PASSWORD FOR USER
    data.password = undefined;

    res.status(StatusCodes.CREATED).json({
      status: 'User Registered',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    // 1. GET THE USER EMAIL AND PASSWORD
    const { email, password, role } = req.body;

    // 2. check if email and password exist ==> DO THIS IN VALIDATION MIDDLEWARE

    // 3. Check if the user exist && password is correct
    // - The .select('+password') part is used to explicitly include the "password" field in the query result.
    // - By default, Mongoose doesn't include fields that have select: false in the schema when you query for documents.
    // - In your case, it seems like the "password" field might be set to select: false in your schema,
    const user = await User.findOne({ email }).select('+password');

    /** VERIFY EMAIL AND PASSWORD */
    // 3.1 If user NOT EXIST or password NOT MATCH => return App Error
    if (!user || !(await passwordUtil.comparePassword(password, user.password)))
      return next(
        new AppError('Incorrect Email or Password', StatusCodes.BAD_REQUEST),
      );

    // Verify if the selected role matches the user's role
    if (user.role !== role) {
      return next(
        new AppError(
          'You have selected the wrong role. Please select the correct role.',
          StatusCodes.BAD_REQUEST,
        ),
      );
    }

    // 5. GET THE JWT TOKEN
    const token = createToken({ id: user._id, role: user.role });

    // Options for cookies
    const cookieOptions = {
      httpOnly: true, //The cookie cannot be access or modified in anyway by the browser -> this important to prevent XSS attack
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
      ), // COokies accept expires in milliseconds
      // REMOVE BELOW LATER
      // expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 5000),
      secure: process.env.NODE_ENV === 'production', // the cookie only send on an encrypted connection (Only on HTTPS)
    };

    //6. ATTACH TOKEN TO COOKIE
    res.cookie('token', token, cookieOptions);

    // 7. Return success
    res.status(200).json({
      status: 'successfull',
      data: user,
    });

    // 4. Return Error
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    res.status(200).json({
      status: 'success',
      message: 'User Log Out',
    });
  } catch (error) {
    next(error);
  }
};
