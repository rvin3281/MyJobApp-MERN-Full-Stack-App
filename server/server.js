const mongooseDBConnection = require('./database/mongoDB');

require('dotenv').config();

const logger = require('./utils/logger');
const app = require('./app');

const port = process.env.PORT || 3000;

// MONGO DB DATABASE CONNECTION
try {
  mongooseDBConnection();
  // WEB SERVER PORT CONNECTION
  app.listen(port, () => {
    // console.log(`App running on port ${port}`);
    logger.info(`App running on port ${port}`);
  });
} catch (err) {
  console.log('Connection Failed', err);
  process.exit(1);
}
