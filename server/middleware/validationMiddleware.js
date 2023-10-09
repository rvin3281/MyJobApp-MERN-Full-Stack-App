const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../error/appErrorClass');

exports.validateRoute = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map((error) => error.msg);

    if (errorMessage[0].startsWith('no job')) {
      next(new AppError(`Job ID not found. Try again`, StatusCodes.NOT_FOUND));
    }
    if (errorMessage[0].startsWith('not authorize')) {
      next(
        new AppError(
          `You are not authorize to access`,
          StatusCodes.UNAUTHORIZED,
        ),
      );
    }
    next(new AppError(errorMessage, StatusCodes.BAD_REQUEST));
  }
  next();
};
