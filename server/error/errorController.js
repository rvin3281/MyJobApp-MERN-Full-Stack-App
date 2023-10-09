/** GLOBAL ERROR HANDLER ---> MIDDDLEWARE */

const { StatusCodes } = require('http-status-codes');
const AppError = require('./appErrorClass');

/** DEVELOPMENT ERROR REPORT */
const sendDevErrorLog = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

/** CUSTOM ERROR FUNCTIONS */
const handleJsonWebTokenError = () => {
  return new AppError(
    `Invalid Token! Please Login Again`,
    StatusCodes.BAD_REQUEST,
  );
};

const sendProdErrorLog = (err, res) => {
  /** PRODUCTION CAN BREAT INTO 2 => OPERATIONAL ERROR OR PROGRAM ERROR */
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      error: 'Please Contact System Admin for Troubleshooting',
      status: err.status,
      message: err.message,
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendDevErrorLog(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    /** COLLECT KNOWN ERRORS FOR PRODUCTION MODE */

    // 1) FIRST WE NEED TO CREATE SHALLOW COPY FROM THE ORIGINAL ERROR OBJECT => DUPLICATION OBJECT
    let error = { ...err };
    // console.log(error.name);

    /** 2) BASED ON THE ERROR NAME ==> WE CREATE CUSTOM OPERATIONAL ERROR FUNCTION TO DISPLAY TO CLIENT */

    // Example Error 1:JsonWebTokenError
    if (error.name === 'JsonWebTokenError') {
      error = handleJsonWebTokenError();
    }

    sendProdErrorLog(error, res);
  }
};
