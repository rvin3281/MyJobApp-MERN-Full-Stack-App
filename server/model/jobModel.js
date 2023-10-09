const mongoose = require('mongoose');
const constant = require('../utils/constants');

const jobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: Object.values(constant.JOB_STATUS), // Can be used for select
      default: constant.JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(constant.JOB_TYPE),
      default: constant.JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: 'my city',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true }, // This will provide createdAt and updatedAt field when create a new data
);

// Export the schema
const Job = mongoose.model('Job', jobSchema); // Thi will create a new collection
module.exports = Job;
