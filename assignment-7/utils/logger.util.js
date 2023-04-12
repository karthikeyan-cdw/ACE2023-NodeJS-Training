const logger = require("../config/logger.config");
const constants = require("../constants");

/**
 * The function creates logs based on the status code of a result object.
 * @param result - The `result` parameter is an object that contains information about the outcome of a
 * request or operation. It typically includes a `status` property that indicates the HTTP status code
 * of the response. The `createLog` function uses this status code to determine the appropriate log
 * level to use when logging the result.
 * The status code range of 200 to 299 will be logged as info,
 * The status code range of 400 to 499 will be logged as warning,
 * The status code range of 500 to 599 will be logged as error,
 */
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
