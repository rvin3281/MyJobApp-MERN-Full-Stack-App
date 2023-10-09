const mongoose = require('mongoose');
const logger = require('./../utils/logger');
require('dotenv').config();

// CONNECT DATABASE - DEVELOPMENT
const connectionString =
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_REMOTE
    : process.env.DATABASE_LOCAL;

const mongooseDBConnection = async () => {
  await mongoose.connect(connectionString);
  logger.info(
    `MongoDB Connected in ${
      process.env.NODE_ENV === 'production' ? 'production' : 'local'
    }`,
  );
};

module.exports = mongooseDBConnection;
