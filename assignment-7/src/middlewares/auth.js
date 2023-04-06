// importing the required modules
const jwt = require("jsonwebtoken");
const createLog = require("../helpers/createLog");
const { debugLogger } = require("../utilities/logger");
require("dotenv");

/**
 * @summary This is a middleware function that checks for a valid JWT token in the request header and verifies
 * it using a secret key, and if valid, adds the user object to the request and passes control to the
 * next middleware function.
 * @param request - The request parameter is an object that represents the HTTP request made by the
 * client to the server. It contains information about the request such as the URL, headers, body, and
 * other details.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods and properties that allow you to set the status
 * code, headers, and body of the response. In this specific function, the `response` parameter is used
 * to send an error.
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. If an error occurs or the request/response cycle is complete, `next` should be called to
 * move to the next middleware function.
 * @returns If there is no `jwtToken` in the request header, the function returns a response with a
 * status code of 401 and a message "Un-authenticated user". If there is a `jwtToken`, the function
 * tries to verify it using the "secretPrivateKey_Listify" key. If the verification is successful, the
 * `user` object is added to the request and the `next()` function.
 * @author @karthikeyan-cdw
 */
function auth(request, response, next) {
  debugLogger.info("BEGIN: Authentication");
  const jwtToken = request.header("x-auth-token");
  if (!jwtToken) {
    const result = { status: 401, data: "Access Token Not Found in Header" };
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
    const result = { status: 401, data: "Username Not Found in Header" };
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
    const user = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    request.user = user.username;
    if (request.user !== username) {
      const result = { status: 400, data: "It's not your Access Token" };
      createLog({
        ...result,
        requestStatus: response.statusMessage,
        originalUrl: request.originalUrl,
        ip: request.ip,
        method: request.method,
      });
      return response.status(result.status).send({ message: result.data });
    }
    const result = { status: 200, data: "Authentication Success" };
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
        status: 401,
        data: "Access Token Expired, Login Again",
        error: `${error.status || 401} - ${error} - ${error.stack}`,
      };
    } else {
      result = {
        status: 401,
        data: "Invalid Access Token",
        error: `${error.status || 401} - ${error} - ${error.stack}`,
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
  }
}

module.exports = auth;
