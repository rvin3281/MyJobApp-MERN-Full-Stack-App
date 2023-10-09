const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', //Log only if info.level is less than or equal to this level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),

  transports: [
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' }),

    // DISPLAY IN CONSOLE
    // new winston.transports.Console({ level: 'info' }),

    // DISPLAY IN FILE
    new winston.transports.Console({
      filename: 'server-log.log',
      level: 'info',
    }),
  ],
});

module.exports = logger;

// const levels = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6
// };
