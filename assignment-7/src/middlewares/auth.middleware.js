// importing the required modules
const jwt = require("jsonwebtoken");
const createLog = require("../utils/logger.util");
const logger = require("../config/logger.config");
const { verifyJWTToken } = require("../utils/jwt.util");
require("dotenv");
const constants = require("../../constants");

/**
 * This is an authentication middleware function that verifies a JWT token and logs the request
 * details.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request body, request method, and request URL.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods and properties that allow you to set the response
 * status, headers, and body.
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. If an error occurs or the request/response cycle is complete, `next` should be called to
 * move on to the next middleware function.
 * @returns The `auth` function returns either the result of the `jwtNotFound` function if there is no
 * JWT token in the request header, or the result of the `handleError` function if there is an error
 * while verifying the JWT token. If the JWT token is successfully verified, the function calls the
 * `next` function to pass control to the next middleware function.
 */
const auth = (request, response, next) => {
  logger.info("BEGIN: Authentication");
  try {
    const jwtToken = request.header("Authorization");
    if (!jwtToken) return jwtNotFound();
    const user = verifyJWTToken(jwtToken.split(" ")[1].trim());
    request.user = user.username;
    const result = {
      status: constants.CODES.OK,
      data: constants.MESSAGES.AUTH_SUCCESS,
    };
    createLog({
      ...result,
      requestStatus: response.statusMessage,
      originalUrl: request.originalUrl,
      ip: request.ip,
      method: request.method,
    });
    logger.info("END: Authentication");
    next();
  } catch (error) {
    return handleError(error, request, response);
  }
};

/**
 * This function returns an error response with a message indicating that an access token was not
 * found.
 * @param request - The `request` parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request body, request method, request URL, and client IP
 * address.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains information such as the status code, headers, and body of
 * the response.
 * @returns The function `jwtNotFound` is returning a response with a status code and a message
 * indicating that the access token was not found. It is also creating a log with information about the
 * request and response.
 */
const jwtNotFound = (request, response) => {
  const result = {
    status: constants.CODES.UNAUTHORIZED,
    data: constants.MESSAGES.AUTH_ACCESS_TOKEN_NOT_FOUND,
  };
  createLog({
    ...result,
    requestStatus: response.statusMessage,
    originalUrl: request.originalUrl,
    ip: request.ip,
    method: request.method,
  });
  return response.status(result.status).send({ message: result.data });
};

/**
 * This is a function that handles errors related to authentication, including invalid or expired
 * access tokens.
 * @param error - The error object that was thrown or caught in the code.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request URL, request method, request body, etc.
 * @param response - The response parameter is an object that represents the HTTP response that will be
 * sent back to the client. It contains information such as the status code, headers, and body of the
 * response.
 */
const handleError = (error, request, response) => {
  let result = {
    status: constants.CODES.UNAUTHORIZED,
    data: constants.MESSAGES.AUTH_ACCESS_TOKEN_INVALID,
    error: `${error.status || constants.CODES.UNAUTHORIZED} - ${error} - ${
      error.stack
    }`,
  };
  if (error instanceof jwt.TokenExpiredError)
    result["data"] = constants.MESSAGES.AUTH_ACCESS_TOKEN_EXPIRED;
  else if (error instanceof TypeError)
    result["data"] = constants.MESSAGES.AUTH_ACCESS_TOKEN_NOT_FOUND;
  response.status(result.status).send({ message: result.data });
  createLog({
    ...result,
    requestStatus: response.statusMessage,
    originalUrl: request.originalUrl,
    ip: request.ip,
    method: request.method,
  });
  logger.info("END: Authentication");
};

module.exports = auth;
