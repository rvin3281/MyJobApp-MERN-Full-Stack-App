const express = require('express');

const router = express.Router();

// ! IMPORT RATE LIMITER
const rateLimiter = require('express-rate-limit');

const upload = require('../middleware/multerMiddleware');

// PROTECT MIDDLEWARE
// const protectMiddleware = require('../middleware/protectMiddleware');

// CONTROLLERS
const userController = require('../controller/userController');
const authController = require('../controller/authController');

// PROTECT MIDDLEWARE
const protectMiddleware = require('../middleware/protectMiddleware');

// VALIDATION MIDDLEWARE
const validationSchema = require('../schema/validationSchema');
const validationMiddleware = require('../middleware/validationMiddleware');

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 Minutes
  max: 10, // Only 1 Request Allowed
  message: { message: 'IP rate limit exceeded! Retry in 15 minutes' },
});

// SIGN UP ROUTE - AUTH
router.post(
  '/signup',
  apiLimiter,
  validationSchema.createUserSchema,
  validationMiddleware.validateRoute,
  authController.signup,
);

// LOGIN ROUTE - AUTH
router.post(
  '/login',
  apiLimiter,
  validationSchema.validateLoginSchema,
  validationMiddleware.validateRoute,
  authController.login,
);

// LOGOUT ROUTE - AUTH
router.get('/logout', authController.logout);

// PERSONAL - USER UPDATE PROFILE --> NEED TO AUTHORIZED

router.use(protectMiddleware.protectRoute);

router.get('/current-user', userController.getCurrentUser);

router.patch(
  '/updateMe',
  upload.single('avatar'), // the name must be same with form name
  validationSchema.updateUserSchema,
  validationMiddleware.validateRoute,
  userController.updateMe,
);
router.delete(
  '/deleteMe',
  protectMiddleware.protectRoute,
  userController.deleteMe,
);

// ! ONLY ADMIN IS AUTHORIZED TO ACCESS AND MANIPULATE USER DATA
// ALL THE ROUTE BELOW PROTECT ROUTE

router.use(protectMiddleware.restrictToAdmin);

// GET ALL USER ROUTE => PROTECTED ROUTE
router.route('/').get(userController.getAllUser);

// GET / UPDATE / DELETE SINGLE USER
router
  .route('/:id')
  .get(
    validationSchema.validateUserIdParam,
    validationMiddleware.validateRoute,
    userController.getUser,
  )
  .patch(
    validationSchema.updateUserSchema,
    validationSchema.validateUserIdParam,
    validationMiddleware.validateRoute,
    userController.updateUser,
  )
  .delete(
    validationSchema.validateUserIdParam,
    validationMiddleware.validateRoute,
    userController.deleteUser,
  );

router.get('/admin/app-stats', userController.getApplicationStats);

// router.get('/app-stats',userController.);

module.exports = router;
