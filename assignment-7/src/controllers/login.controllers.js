// importing required modules
const createLog = require("../helpers/createLog");
const { debugLogger } = require("../utilities/logger");

const loginServices = require("../services/login.services");

/**
 * @summary This function logs in a user with their username and password and returns a token if successful, while
 * also creating a log of the request.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request body, request method, and request URL. It is
 * typically provided by the web framework or library being used to handle the request.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client making the request. It contains methods and properties that allow the
 * server to send data back to the client, such as `status`, `send`, and `statusMessage`.
 * @returns If the `result.status` is equal to 200, the function will return a response with a status
 * of 200 and a JSON object containing a token. Otherwise, it will return a response with the
 * `result.status` and a JSON object containing a message. Additionally, the function will call the
 * `createLog` function with some parameters and log some debug information.
 * @author @karthikeyan-cdw
 */
const loginUser = (request, response) => {
  const username = request.body.username;
  const password = request.body.password;
  debugLogger.info(`BEGIN: Service > loginUser`);
  let result = loginServices.loginUser(username, password);
  if (result.status === 200)
    return response.status(result.status).send({ token: result.token });
  response.status(result.status).send({ message: result.data });
  createLog({
    ...result,
    requestStatus: response.statusMessage,
    originalUrl: request.originalUrl,
    ip: request.ip,
    method: request.method,
  });
  debugLogger.info(`END: Service > loginUser`);
};

module.exports = {
  loginUser,
};
