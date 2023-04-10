// importing the required modules
const jwt = require("jsonwebtoken");
const createLog = require("../helpers/createLog");
const { debugLogger } = require("../utilities/logger");
const { verifyJWTToken } = require("../utilities/jwtToken");
require("dotenv");
const constants = require("../../constants");

/**
 * This is an authentication middleware function in JavaScript that verifies a JWT token and username
 * in the request header and logs the result.
 * @param request - The request parameter represents the HTTP request made by the client to the server.
 * It contains information such as the request method, headers, body, and URL.
 * @param response - The response parameter is an object that represents the HTTP response that will be
 * sent back to the client. It contains methods and properties that allow the server to send data back
 * to the client, such as status codes, headers, and the response body.
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. If `next()` is not called, the request will be left hanging and the client will not
 * receive a response.
 * @returns The `auth` function returns either a response with an error message and status code or
 * calls the `next()` function to move on to the next middleware function.
 */
const auth = (request, response, next) => {
  debugLogger.info("BEGIN: Authentication");
  const jwtToken = request.header("x-auth-token");
  if (!jwtToken) {
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
  }
  const username = request.header("username");
  if (!username) {
    const result = {
      status: constants.CODES.UNAUTHORIZED,
      data: constants.MESSAGES.AUTH_USERNAME_NOT_FOUND,
    };
    createLog({
      ...result,
      requestStatus: response.statusMessage,
      originalUrl: request.originalUrl,
      ip: request.ip,
      method: request.method,
    });
    return response.status(result.status).send({ message: result.data });
  }
  try {
    const user = verifyJWTToken(jwtToken.split(" ")[1].trim());
    request.user = user.username;
    if (request.user !== username) {
      const result = {
        status: 400,
        data: constants.MESSAGES.AUTH_ACCESS_TOKEN_MISMATCH,
      };
      createLog({
        ...result,
        requestStatus: response.statusMessage,
        originalUrl: request.originalUrl,
        ip: request.ip,
        method: request.method,
      });
      return response.status(result.status).send({ message: result.data });
    }
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
    debugLogger.info("END: Authentication");
    next();
  } catch (error) {
    let result = {};
    if (error instanceof jwt.TokenExpiredError) {
      result = {
        status: constants.CODES.UNAUTHORIZED,
        data: constants.MESSAGES.AUTH_ACCESS_TOKEN_MISMATCH,
        error: `${error.status || constants.CODES.UNAUTHORIZED} - ${error} - ${
          error.stack
        }`,
      };
    } else {
      result = {
        status: constants.CODES.UNAUTHORIZED,
        data: constants.MESSAGES.AUTH_ACCESS_TOKEN_INVALID,
        error: `${error.status || constants.CODES.UNAUTHORIZED} - ${error} - ${
          error.stack
        }`,
      };
    }
    response.status(result.status).send({ message: result.data });
    createLog({
      ...result,
      requestStatus: response.statusMessage,
      originalUrl: request.originalUrl,
      ip: request.ip,
      method: request.method,
    });
    debugLogger.info("END: Authentication");
  }
};

module.exports = auth;
