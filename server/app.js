const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// COOKIE PARSER
const cookieParser = require('cookie-parser');

// HTTP STATUS CODE LIBRARY
const status = require('http-status-codes');

// IMPORT CLOUDINARY
const cloudinary = require('cloudinary');

// Serving static files in Express
// * serve static files such as images, CSS files, and JavaScript files, use the express.static
const path = require('path');

// SECURITY PACKAGES
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

// ROUTES IMPORT
const jobRoute = require('./routes/jobRoutes');
const jobAdminRoute = require('./routes/jobAdminRoutes');
const userRoute = require('./routes/userRoute');

// PROTECT MIDDLEWARE
const protectMiddleware = require('./middleware/protectMiddleware');

// IMPORT ERROR CONTROLLER
const globalErrorController = require('./error/errorController');

// IMPORT APP ERROR CLASS
const AppError = require('./error/appErrorClass');

// SETTING UP THE CONFID
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

// ADD CORSE MIDDLEWARE
app.use(cors());

// MORGAN MIDDLEWARE -> TOP
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Middleware: COOKIER PARSER
app.use(cookieParser());

//Middleware: BODY PARSING
app.use(express.json());

// ! SECURITY PACKAGES AFTER EXPRESS JSON
app.use(helmet());
app.use(mongoSanitize());

// Access Public Folder
app.use(express.static(path.join(__dirname, 'public')));

//Routes: ONLY AUTHENTICATE LOGGGED IN USER CAN ACCESS THIS ROUTE
app.use('/api/v1/jobs', protectMiddleware.protectRoute, jobRoute);

//Routes: ONLY AUTHENTICATE LOGGGED IN USER CAN ACCESS THIS ROUTE -- ADMIN ROLE
app.use('/api/v1/admin/jobs', protectMiddleware.protectRoute, jobAdminRoute);

//Route: ONLY AUTHENTICATE LOGGGED IN USER CAN ACCESS THIS ROUTE ==> THIS ROUTE RESTRICT ONLY TO ADMIN ROLE
app.use('/api/v1/users', userRoute);

// ERROR HANDLER -> FOR UNHANDLED ROUTES
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Cant find the route ${req.originalUrl}`,
      status.StatusCodes.NOT_FOUND,
    ),
  );
});

app.use(globalErrorController);

module.exports = app;
