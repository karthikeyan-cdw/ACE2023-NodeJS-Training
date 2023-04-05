// importing the required modules
const {
  errorLogger,
  warningLogger,
  infoLogger,
} = require("../utilities/logger");


/**
 * @summary The function creates logs based on the HTTP status code of a result object.
 * @param result - The `result` parameter is an object that contains information about the result of an
 * HTTP request, including the status code, headers, and response body. The `createLog` function takes
 * this `result` object as input and logs it to different loggers based on the status code of the
 * response.
* @author @karthikeyan-cdw
 */
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
