const logger = require("../config/logger.config");
const constants = require("../../constants");

const createLog = (result) => {
  switch (true) {
    case result.status >= constants.CODES.OK && result.status <= 299:
      logger.info(JSON.stringify(result));
      break;
    case result.status >= constants.CODES.BAD_REQUEST && result.status <= 499:
      logger.warn(JSON.stringify(result));
      break;
    case result.status >= constants.CODES.INTERNAL_SERVER_ERROR &&
      result.status <= 599:
      logger.error(JSON.stringify(result));
      break;
    default:
  }
};

module.exports = createLog;
