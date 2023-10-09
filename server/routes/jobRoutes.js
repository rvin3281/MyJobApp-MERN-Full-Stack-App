const express = require('express');

const validationMiddleware = require('../middleware/validationMiddleware');
const validationSchema = require('../schema/validationSchema');

const router = express.Router();

// CONTROLLER
const jobController = require('../controller/jobController');

router
  .route('/')
  .post(
    validationSchema.createJobSchema,
    validationMiddleware.validateRoute,
    jobController.createJob,
  )
  .get(jobController.getAllJobUser);

router
  .route('/:id')
  .get(
    validationSchema.validateJobIdParam,
    validationMiddleware.validateRoute,
    jobController.getJob,
  )
  .delete(
    validationSchema.validateJobIdParam,
    validationMiddleware.validateRoute,
    jobController.deleteJob,
  )
  .patch(
    validationSchema.validateJobIdParam,
    validationMiddleware.validateRoute,
    jobController.updateJob,
  );

module.exports = router;
