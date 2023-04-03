// importing the required modules
const logger = require("../utilities/logger");

const createLog = (result) => {
  switch (true) {
    case result.status >= 200 && result.status <= 299:
      logger.info(result.data);
      break;
    case result.status >= 400 && result.status <= 499:
      logger.warn(result.data);
      break;
    case result.status >= 500 && result.status <= 599:
      logger.error(result.data);
      break;
    default:
  }
};

module.exports = createLog;
