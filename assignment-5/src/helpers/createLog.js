// importing the required modules
const {
  errorLogger,
  warningLogger,
  infoLogger,
} = require("../utilities/logger");

// function to create logs
const createLog = (result) => {
  switch (true) {
    case result.status >= 200 && result.status <= 299:
      infoLogger.info(JSON.stringify(result));
      break;
    case result.status >= 400 && result.status <= 499:
      warningLogger.warn(JSON.stringify(result));
      break;
    case result.status >= 500 && result.status <= 599:
      errorLogger.error(JSON.stringify(result));
      break;
    default:
  }
};

module.exports = createLog;
