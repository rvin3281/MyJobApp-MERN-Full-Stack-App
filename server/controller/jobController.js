const { StatusCodes } = require('http-status-codes');
const AppError = require('../error/appErrorClass');
const Job = require('../model/jobModel');
const day = require('dayjs');

//* USER AND ADMIN CREATE JOB
exports.createJob = async (req, res, next) => {
  try {
    // We added a field on the BODY ==> which is the ID of the logged in user
    req.body.createdBy = req.user.id;

    const data = await Job.create(req.body);

    res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

//* USER ONLY GET JOB BASED ON ID
exports.getAllJobUser = async (req, res, next) => {
  try {
    const queryObj = {
      active: true,
      createdBy: req.user.id,
    };

    // * SEARCH OPTION ----> RECEIVE FROM QUERY PARAMS FROM AXIOS GET
    const { search, jobStatus, jobType, sort } = req.query;

    // * 2) IF SEARCH IS ON THE QUERY THEN WE ATTACH ON THE QUERY OBJECT
    if (search) {
      queryObj.$or = [
        { position: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    // * 3) CHECK WHETHER JON STATUS ON THE QUERY STRING OR NOT
    if (jobStatus && jobStatus !== 'all') {
      queryObj.jobStatus = jobStatus;
    }

    // * 3) CHECK WHETHER JON STATUS ON THE QUERY STRING OR NOT --> IF ALL THEN WE CAN DISPLAY ALL THE JOB
    if (jobType && jobType !== 'all') {
      queryObj.jobType = jobType;
    }

    /** --------------------------------------------------------------------------- SORTING OBJECT CREATION */

    const sortOptions = {
      newest: '-createdAt',
      oldest: 'createdAt',
      'a-z': 'position',
      'z-a': '-position',
    };

    /** --------------------------------------------------------------------------- SETUP PAGINATION */
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10; //  IF NOT LIMIT THEN THE EACH PAGE WILL ONLY HAVE 10 value
    const skip = (page - 1) * limit;

    // * IF SORT AVAILABLE ON THE STRING THEN SORT KEY WILL BE ASSIGN TO THE STRING
    const sortKey = sortOptions[sort] || sortOptions.newest;

    const data = await Job.find(queryObj).sort(sortKey).skip(skip).limit(limit);

    /** ------------------------------------------------------------------------------- TOTAL JOB */
    const totalJobs = await Job.countDocuments(queryObj);

    // GET THE TOTAL PAGE TO DISPLAY ON THE PAGINATION
    const numOfpages = Math.ceil(totalJobs / limit);

    if (!data) {
      return next(new AppError(`No Jobs Found`, StatusCodes.NOT_FOUND));
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      length: data.length,
      totalJobs,
      numOfpages,
      currentPage: page,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getJob = async (req, res, next) => {
  try {
    //1. Get the ID from req.params
    const { id } = req.params;
    // * find only one document with Job ID and active true
    const data = await Job.findOne({ _id: id, active: true });

    //3. If no ID found return an ERROR
    if (!data) {
      return next(new AppError(`Job not Found ${id}`, StatusCodes.NOT_FOUND));
    }

    // 4. Successfuly queried
    res.status(StatusCodes.OK).json({
      status: 'success',
      data,
    });
  } catch (error) {
    //5. The route has an issue
    next(error);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Job.findByIdAndUpdate(id, { active: false });

    if (!data) {
      return next(
        new AppError(`ID not found for ${id}`, StatusCodes.NOT_FOUND),
      );
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
    });
  } catch (error) {
    next(error);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Job.findByIdAndUpdate(id, req.body, {
      new: true, // -> This will return the updated data on response / without this the latest updated data cannot be seen
    });

    if (!data) {
      return next(
        new AppError(`ID not found for ${id}`, StatusCodes.NOT_FOUND),
      );
    }
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

// * ----------- ADMIN ROLE ACCESS ------- GET ALL / GET SINGLE / UPDATE / DELETE

exports.getAllJobsAdmin = async (req, res, next) => {
  try {
    // * 1) ACTIVE FIELD WILL BE ALWAYS AVAILABLE ON THE QUERY OBJECT
    const queryObj = {
      active: true,
    };

    /** --------------------------------------------------------------------------- FILTERING OBJECT CREATION */

    // ** FOR FILTERING AND SEARCHING FIRST WE NEED TO GET THE PROPERTY FROM REQ.QUERY *
    // ** THEN NEED TO FILTER BASED ON THE DATA

    // * SEARCH OPTION
    const { search, jobStatus, jobType, sort } = req.query;

    // * 2) IF SEARCH IS ON THE QUERY THEN WE ATTACH ON THE QUERY OBJECT
    if (search) {
      queryObj.$or = [
        { position: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    // * 3) CHECK WHETHER JON STATUS ON THE QUERY STRING OR NOT
    if (jobStatus && jobStatus !== 'all') {
      queryObj.jobStatus = jobStatus;
    }

    // * 3) CHECK WHETHER JON STATUS ON THE QUERY STRING OR NOT --> IF ALL THEN WE CAN DISPLAY ALL THE JOB
    if (jobType && jobType !== 'all') {
      queryObj.jobType = jobType;
    }

    // console.log(queryObj);

    /** --------------------------------------------------------------------------- SORTING OBJECT CREATION */

    const sortOptions = {
      newest: '-createdAt',
      oldest: 'createdAt',
      'a-z': 'position',
      'z-a': '-position',
    };
    // console.log(sortOptions[sort]);

    /** --------------------------------------------------------------------------- SETUP PAGINATION */
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10; //  IF NOT LIMIT THEN THE EACH PAGE WILL ONLY HAVE 10 value
    const skip = (page - 1) * limit;

    // * IF SORT AVAILABLE ON THE STRING THEN SORT KEY WILL BE ASSIGN TO THE STRING
    const sortKey = sortOptions[sort] || sortOptions.newest;

    const data = await Job.find(queryObj).sort(sortKey).skip(skip).limit(limit);

    /** ------------------------------------------------------------------------------- TOTAL JOB */
    const totalJobs = await Job.countDocuments(queryObj);

    // GET THE TOTAL PAGE TO DISPLAY ON THE PAGINATION
    const numOfpages = Math.ceil(totalJobs / limit);

    if (!data) {
      return next(new AppError(`No Jobs Found`, StatusCodes.NOT_FOUND));
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      length: data.length,
      totalJobs,
      numOfpages,
      currentPage: page,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.showStats = async (req, res, next) => {
  try {
    // * MONGO DB AGGREGATION

    let stats = await Job.aggregate([
      // 1. FIRST WE GET ALL THE DOCUMENT FROM JOB WHICH ACTIVE STATUS IS TRUE
      { $match: { active: true } },
      // 2. GROUP THE REMAINING DOCUMENT BY JOB TYPE AND CALCULATE THE TOTAL SUM
      { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
    ]);
    // console.log(stats);

    // 3. CONVERT ARRAY INTO OBJECT
    stats = stats.reduce((acc, curr) => {
      const { _id: title, count } = curr;
      acc[title] = count;
      return acc;
    }, {});

    // console.log(stats);

    const defaultStats = {
      pending: stats.pending,
      interview: stats.interview,
      declined: stats.declined,
    };

    let monthlyApplication = await Job.aggregate([
      { $match: { active: true } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 6 },
    ]);

    monthlyApplication = monthlyApplication
      .map((item) => {
        const {
          _id: { year, month },
          count,
        } = item;

        const date = day()
          .month(month - 1)
          .year(year)
          .format('MMM YY');

        return { date, count };
      })
      .reverse();

    res.status(200).json({
      status: 'success',
      stats: defaultStats,
      monthlyApplication: monthlyApplication,
    });
  } catch (error) {
    next(error);
  }
};

// let monthlyApplications = [
//   { date: 'May 23', count: 12 },
//   { date: 'Jun 23', count: 9 },
//   { date: 'Jul 23', count: 3 },
// ];
// month: monthlyApplications,
