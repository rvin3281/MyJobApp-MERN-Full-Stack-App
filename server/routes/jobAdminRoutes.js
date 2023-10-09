const express = require('express');
// const { body, validationResult } = require('express-validator');
// const AppError = require('../error/appErrorClass');
const validationMiddleware = require('../middleware/validationMiddleware');
const validationSchema = require('../schema/validationSchema');

// PROTECT MIDDLEWARE
const protectMiddleware = require('../middleware/protectMiddleware');

const router = express.Router();

// CONTROLLER
const jobControllerAdmin = require('../controller/jobController');

// Admin-only routes
router.use(protectMiddleware.restrictTo('admin'));

router
  .route('/')
  .post(
    validationSchema.createJobSchema,
    validationMiddleware.validateRoute,
    jobControllerAdmin.createJob,
  )
  .get(jobControllerAdmin.getAllJobsAdmin);

// ROUTE FOR STATS --> ONLY FOR ADMIN
router.route('/stats').get(jobControllerAdmin.showStats);

router
  .route('/:id')
  .get(
    validationSchema.validateJobIdParam,
    validationMiddleware.validateRoute,
    jobControllerAdmin.getJob,
  )
  .delete(
    validationSchema.validateJobIdParam,
    validationMiddleware.validateRoute,
    jobControllerAdmin.deleteJob,
  )
  .patch(
    validationSchema.updateJobSchema,
    validationSchema.validateJobIdParam,
    validationMiddleware.validateRoute,
    jobControllerAdmin.updateJob,
  );

module.exports = router;
