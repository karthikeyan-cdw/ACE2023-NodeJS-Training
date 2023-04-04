// importing required modules
const { createLogger, format, transports } = require("winston");

// logger for logging errors
const errorLogger = createLogger({
  level: process.env.LOGGER_LEVEL_ERROR,
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
    new transports.File({
      filename: "./logs/errors.log",
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    }),
  ],
});

// logger for logging warnings
const warningLogger = createLogger({
  level: process.env.LOGGER_LEVEL_WARNING,
  transports: new transports.File({
    filename: "./logs/warnings.log",
    format: format.combine(
      format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
      format.align(),
      format.printf(
        (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
      )
    ),
  }),
});

// logger for logging informations
const infoLogger = createLogger({
  level: process.env.LOGGER_LEVEL_INFO,
  transports: new transports.File({
    filename: "./logs/info.log",
    format: format.combine(
      format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
      format.align(),
      format.printf(
        (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
      )
    ),
  }),
});
module.exports = { errorLogger, warningLogger, infoLogger };
