const { body, param } = require('express-validator');
const mongoose = require('mongoose');
const constant = require('../utils/constants');
const User = require('../model/userModel');
const Job = require('../model/jobModel');
const AppError = require('../error/appErrorClass');

exports.createJobSchema = [
  body('company').notEmpty().withMessage('Company is required').escape(),
  body('position').notEmpty().withMessage('Position name is required').escape(),
  body('jobLocation')
    .notEmpty()
    .withMessage('Job Location is required')
    .escape(),
  body('jobStatus')
    .isIn(Object.values(constant.JOB_STATUS))
    .withMessage('Invalid status value')
    .escape(),
  body('jobType')
    .isIn(Object.values(constant.JOB_TYPE))
    .withMessage('Invalid Type value')
    .escape(),
];

exports.updateJobSchema = [
  body('company')
    .optional()
    .notEmpty()
    .withMessage('Company is required')
    .escape(),
  body('position')
    .optional()
    .notEmpty()
    .withMessage('Position name is required')
    .escape(),
  body('jobLocation')
    .optional()
    .notEmpty()
    .withMessage('Job Location is required')
    .escape(),
  body('jobStatus')
    .optional()
    .isIn(Object.values(constant.JOB_STATUS))
    .withMessage('Invalid status value')
    .escape(),
  body('jobType')
    .optional()
    .isIn(Object.values(constant.JOB_TYPE))
    .withMessage('Invalid Type value')
    .escape(),
];

exports.validateJobIdParam = [
  param('id')
    // If the ID is not similar as Mongoose ObjectID then the server will send back a response
    .custom(async (value, { req, res, next }) => {
      const isValidId = mongoose.Types.ObjectId.isValid(value);
      if (!isValidId) throw new Error(`Invalid ID ${value}`);

      const job = await Job.findById(value);
      if (!job) throw new Error(`no job with ID ${value}`);

      const isAdmin = req.user.role === 'admin';
      const isOwner = req.user.id === job.createdBy.toString();

      if (!isAdmin && !isOwner) throw new Error(`not authorize`);
    }),
];

/** THIS MODEL TEACHES HOW TO USE MODEL FOR VALIDATION
 *  -> WHEN USE MODEL FOR QUERY DATABASE WE NEED TO USE ASYNC
 *  -> PURPOSE IS TO CHECK WHETHERE EMAIL IS UNIQUE OR NOT
 *  -> FOR ASYNC WE NO NEED TO EXPLICITYLY RETURN TRUE
 *  -> FOR SYNC WE NEED TO RETURN TRUE OR FALSE EXPLICITLY
 */
exports.createUserSchema = [
  body('name').notEmpty().withMessage('Name is required').escape(),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please input a valid email')
    .custom(async (email, { req }) => {
      // ASYNCHRONOUS

      const user = await User.findOne({ email }); // LOOK FOR USER BASED ON THIS EMAIL
      if (user) {
        // console.log(value);
        throw new Error('Email already exist');
      }
    })
    .escape(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .escape(),
  body('passwordConfirm')
    .notEmpty()
    .withMessage('Password Confirm is required')
    .custom((passwordConfirm, { req }) => {
      // SYNCHRONOUS
      if (passwordConfirm !== req.body.password)
        throw new Error('Password Not Matching');
      return true;
    })
    .escape(),
  body('lastName').notEmpty().withMessage('Last Name is Required').escape(),
  body('location').notEmpty().withMessage('Location is Required').escape(),
];

exports.updateUserSchema = [
  body('name').optional().notEmpty().withMessage('Name is required').escape(),
  body('email')
    .optional()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please input a valid email')
    .custom(async (email, { req }) => {
      // ASYNCHRONOUS

      const user = await User.findOne({ email }); // LOOK FOR USER BASED ON THIS EMAIL
      // If EMAIL ALREADY EXIST AND IF THE RECEIVED EMAIL ID IS NOT = TO CURRENT LOGGED IN USER ID RETURN ERROR
      if (user && user.id.toString() !== req.user.id) {
        // console.log(value);
        throw new Error('Email already exist');
      }
    })
    .escape(),
  body('lastName')
    .optional()
    .notEmpty()
    .withMessage('Last Name is Required')
    .escape(),
  body('location')
    .optional()
    .notEmpty()
    .withMessage('Location is Required')
    .escape(),
  body('role')
    .optional()
    .custom((value, { req }) => {
      // Check if the role value is different from the original value in the request
      if (value !== req.user.role) {
        throw new Error('Role cannot be modified');
      }
      return true;
    }),
];

exports.validateLoginSchema = [
  body('email').notEmpty().withMessage('Email is required').escape(),
  body('password').notEmpty().withMessage('Password is required').escape(),
];

exports.validateUserIdParam = [
  param('id')
    // If the ID is not similar as Mongoose ObjectID then the server will send back a response
    .custom(async (value, { req, res, next }) => {
      const isValidId = mongoose.Types.ObjectId.isValid(value);
      if (!isValidId) throw new Error(`Invalid ID ${value}`);
      const id = await User.findById(value);
      if (!id) throw new Error(`ID not found ${value}`);
    }),
];

/** CUSTOM ERROR ALSO CAN BE SEND WITH withMessage IF WE NEVER USE ASYNC */
// exports.validateIdParam = [
//   param('id')
//     // If the ID is not similar as Mongoose ObjectID then the server will send back a response
//     .custom((value) => mongoose.Types.ObjectId.isValid(value))
//     .withMessage('Invalid ID'),
// ];

// body('company').notEmpty().withMessage('Company is required').escape(),
// body('position')
//   .notEmpty()
//   .withMessage('Position name is required')
//   .custom((value, { req }) => {
//     {
//       console.log(req.body);
//       if (value !== req.body.company) {
//         throw new Error('Passwords do not match');
//       }
//     }
//     return true;
//   })
//   .escape(),

// {
//   "company": "coding addict",
//   "position": "backend-end",
//   "jobStatus": "pending",
//   "jobType": "full-time",
//   "jobLocation": "florida"
// }
