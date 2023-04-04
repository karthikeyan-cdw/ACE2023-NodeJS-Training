// importing the required modules
const {
  errorLogger,
  warningLogger,
  infoLogger,
} = require("../utilities/logger");

const createLog = (result) => {
  switch (true) {
    case result.status >= 200 && result.status <= 299:
      infoLogger.info(result.data);
      break;
    case result.status >= 400 && result.status <= 499:
      warningLogger.warn(result.data);
      break;
    case result.status >= 500 && result.status <= 599:
      errorLogger.error(result.data);
      break;
    default:
  }
};

module.exports = createLog;
