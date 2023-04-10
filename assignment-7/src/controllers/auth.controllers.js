// importing the required modules
const createLog = require("../utils/logger.util");
const logger = require("../config/logger.config");
const {
  loginUserService,
  signupUserService,
} = require("../services/auth.services");
const constants = require("../../constants");

/**
 * This function logs in a user and returns a token if successful, otherwise it returns an error
 * message and logs the error.
 * @param request - The `request` parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request body, request method, request URL, and client IP
 * address. It is typically provided by the web framework or library being used to handle the request.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client making the request. It contains methods and properties that allow the
 * server to send data back to the client, such as `status`, `send`, and `statusMessage`.
 * @returns The `loginUser` function returns a response to the client based on the result of calling
 * the `loginUserService` function with the provided `username` and `password` in the request body. If
 * the result status is `constants.CODES.OK`, it returns a response with a token. Otherwise, it returns
 * a response with an error message. Additionally, it logs the result and request information.
 */
const loginUser = (request, response) => {
  logger.info(`BEGIN: Service > loginUser`);
  let result = loginUserService(
    request.body.username.trim(),
    request.body.password
  );
  if (result.status === constants.CODES.OK)
    return response.status(result.status).send({ token: result.token });
  response.status(result.status).send({ message: result.data });
  createLog({
    ...result,
    requestStatus: response.statusMessage,
    originalUrl: request.originalUrl,
    ip: request.ip,
    method: request.method,
  });
  logger.info(`END: Service > loginUser`);
};

/**
 * The function `signupUser` handles a user signup request, calls a service function to process the
 * request, and returns a response with a token or an error message.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request body, request method, and request URL. It is
 * typically provided by the web framework or library being used to handle the HTTP request.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client making the request. It contains methods and properties that allow the
 * server to send data back to the client, such as `status()` to set the HTTP status code, `send()` to
 * send a message.
 * @returns The function `signupUser` returns a response object with a status code and either a token
 * or a message, depending on the result of calling the `signupUserService` function with the provided
 * username and password. Additionally, the function logs information about the request and response
 * using the `createLog` function and debug logs the beginning and end of the function execution.
 */
const signupUser = (request, response) => {
  logger.info(`BEGIN: Service > signupUser`);
  let result = signupUserService(
    request.body.username.trim(),
    request.body.password
  );
  if (result.status === constants.CODES.OK)
    return response.status(result.status).send({ token: result.token });
  response.status(result.status).send({ message: result.data });
  createLog({
    ...result,
    requestStatus: response.statusMessage,
    originalUrl: request.originalUrl,
    ip: request.ip,
    method: request.method,
  });
  logger.info(`END: Service > signupUser`);
};

module.exports = {
  loginUser,
  signupUser,
};
