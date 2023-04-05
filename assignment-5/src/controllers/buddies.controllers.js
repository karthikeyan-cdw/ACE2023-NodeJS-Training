// importing the required modules
const createLog = require("../helpers/createLog");

// setting up the controllers for the buddies
const buddiesServices = require("../services/buddies.services");

/**
 * @summary The function adds a buddy and sends a response with a status and message, while also creating a log
 * of the request.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request body, request method, request URL, and more. It
 * is typically provided by the web framework or library being used to handle the HTTP request.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods and properties that allow the server to send data,
 * set headers, and control the status code of the response.
 * @author @karthikeyan-cdw
 */
const addBuddy = (request, response) => {
  let result = buddiesServices.addBuddy(request.body);
  response.status(result.status).send({ message: result.data });
  createLog({
    ...result,
    requestStatus: response.statusMessage,
    originalUrl: request.originalUrl,
    ip: request.ip,
    method: request.method,
  });
};

/**
 * @summary This function retrieves all buddies and sends a response with the retrieved data or an error
 * message, and also creates a log of the request.
 * @param request - The `request` parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request URL, request method, request body, and more. It
 * is typically provided by the web framework or library being used to handle the HTTP requests.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods and properties that allow the server to send data
 * back to the client, such as `status()` to set the HTTP status code, `send()` to send the response
 * body.
 * @author @karthikeyan-cdw
 */
const getAllBuddies = (request, response) => {
  let result = buddiesServices.getAllBuddies();
  if (result.status === 200) response.status(result.status).send(result.data);
  else response.status(result.status).send({ message: result.data });
  createLog({
    ...result,
    requestStatus: response.statusMessage,
    originalUrl: request.originalUrl,
    ip: request.ip,
    method: request.method,
  });
};

/**
 * @summary The function retrieves a buddy's information and sends a response with the data or an error message,
 * while also creating a log of the request.
 * @param request - The `request` parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request parameters, request body, and more. It is
 * typically provided by the web framework being used (e.g. Express.js).
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods and properties that allow the server to set the
 * status code, headers, and body of the response.
 * @author @karthikeyan-cdw
 */
const getBuddy = (request, response) => {
  let result = buddiesServices.getBuddy(request.params.buddyId);
  if (result.status === 200) response.status(result.status).send(result.data);
  else response.status(result.status).send({ message: result.data });
  createLog({
    ...result,
    requestStatus: response.statusMessage,
    originalUrl: request.originalUrl,
    ip: request.ip,
    method: request.method,
  });
};

/**
 * @summary This function updates a buddy and logs the request details.
 * @param request - The `request` parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request parameters, request body, and more. It is
 * typically provided by the web framework being used (e.g. Express.js) and is used to extract data
 * from the client.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods and properties that allow the server to set the
 * status code, headers, and body of the response.
 * @author @karthikeyan-cdw
 */
const updateBuddy = (request, response) => {
  let result = buddiesServices.updateBuddy(
    request.params.buddyId,
    request.body
  );
  response.status(result.status).send({ message: result.data });
  createLog({
    ...result,
    requestStatus: response.statusMessage,
    originalUrl: request.originalUrl,
    ip: request.ip,
    method: request.method,
  });
};

/**
 * @summary The function deletes a buddy and sends a response with a message and status code, while also
 * creating a log.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request method, headers, URL, and parameters. In this specific function,
 * it is used to extract the buddyId parameter from the URL path using `request.params.buddyId`.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods and properties that allow the server to set the
 * status code, headers, and body of the response.
 * @author @karthikeyan-cdw
 */
const deleteBuddy = (request, response) => {
  let result = buddiesServices.deleteBuddy(request.params.buddyId);
  response.status(result.status).send({ message: result.data });
  createLog(result);
};

module.exports = {
  addBuddy,
  getBuddy,
  getAllBuddies,
  updateBuddy,
  deleteBuddy,
};
