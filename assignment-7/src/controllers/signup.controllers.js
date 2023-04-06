// importing required modules
const createLog = require("../helpers/createLog");
const { debugLogger } = require("../utilities/logger");

const signupServices = require("../services/signup.services");

/**
 * @summary This function handles user sign up requests by extracting username and password from the request body,
 * calling a signup service, sending a response with the result, and creating a log of the request.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request body, request method, request URL, and more. It
 * is typically provided by the web framework or library being used to handle the HTTP request.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client making the request. It contains information such as the status code,
 * headers, and body of the response. In this specific code snippet, the `response` object is used to
 * send a JSON response
 * @author @karthikeyan-cdw
 */
const signupUser = (request, response) => {
  const username = request.body.username;
  const password = request.body.password;
  debugLogger.info(`BEGIN: Service > signupUser`);
  let result = signupServices.signupUser(username, password);
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
  debugLogger.info(`END: Service > signupUser`);
};

module.exports = {
  signupUser,
};
