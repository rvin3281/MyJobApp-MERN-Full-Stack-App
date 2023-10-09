const { StatusCodes } = require('http-status-codes');
const User = require('../model/userModel');
const AppError = require('../error/appErrorClass');
const Job = require('../model/jobModel');
const cloudinary = require('cloudinary');
const fs = require('fs').promises;

exports.getCurrentUser = async (req, res, next) => {
  try {
    const { id } = req.user;

    const data = await User.findOne({ _id: id });

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await User.findById(id);

    if (!data)
      return next(new AppError('No User Data Found'), StatusCodes.NOT_FOUND);

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const data = await User.find();

    res.status(StatusCodes.OK).json({
      status: 'success',
      length: data.length,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const obj = { ...req.body };
    delete obj.password;
    console.log(obj);
    const data = await User.findByIdAndUpdate(id, obj, {
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

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await User.findByIdAndRemove(id);

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

// ! PERSONAL PROFILE UPDATE

exports.updateMe = async (req, res, next) => {
  try {
    // 1) Create error if user POST password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password update. Please use/updateMyPassword',
        ),
        400,
      );
    }

    // * ONLY UPDATE THE IMAGE IF WE RECEIVE AN IMAGE
    if (req.file) {
      // IF SUCCESSFULLY UPLOADED
      const response = await cloudinary.v2.uploader.upload(req.file.path);
      // THEN WE CAN REMOVE THE IMAGE
      await fs.unlink(req.file.path);
      req.body.avatar = response.secure_url;
      req.body.avatarPublicId = response.public_id;
    }

    // 3) Update user document
    const data = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });

    if (req.file && data.avatarPublicId) {
      await cloudinary.v2.uploader.destroy(data.avatarPublicId);
    }

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteMe = async (req, res, next) => {
  try {
    console.log(req.user.id);
    // GET THE CURRENT LOGGED IN USER
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

exports.getApplicationStats = async (req, res, next) => {
  try {
    const users = await User.where({ active: true }).countDocuments();
    const jobs = await Job.where({ active: true }).countDocuments();

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: { users, jobs },
    });
  } catch (error) {
    next(error);
  }
};

// This is to show how many users are in our DATA
// exports.getApplicationStats = async (req, res) => {
//   const users = await User.countDocuments();
//   const Job = await User.countDocuments();
// };
