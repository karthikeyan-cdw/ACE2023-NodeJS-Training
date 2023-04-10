const {
  errorLogger,
  warningLogger,
  infoLogger,
} = require("../utilities/logger");
const constants = require("../../constants");

const createLog = (result) => {
  switch (true) {
    case result.status >= constants.CODES.OK && result.status <= 299:
      infoLogger.info(JSON.stringify(result));
      break;
    case result.status >= constants.CODES.BAD_REQUEST && result.status <= 499:
      warningLogger.warn(JSON.stringify(result));
      break;
    case result.status >= constants.CODES.INTERNAL_SERVER_ERROR &&
      result.status <= 599:
      errorLogger.error(JSON.stringify(result));
      break;
    default:
  }
};

module.exports = createLog;
