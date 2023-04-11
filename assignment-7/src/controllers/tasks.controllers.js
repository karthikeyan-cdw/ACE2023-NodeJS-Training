// importing required modules
const createLog = require("../utils/logger.util");
const logger = require("../config/logger.config");
const tasksServices = require("../services/tasks.services");
const constants = require("../../constants");

/**
 * This function adds a task and logs the result.
 * @param request - The `request` parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request body, request method, and request URL. It is
 * typically provided by the web framework or library being used to handle the request.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client who made the request. It contains methods and properties that allow the
 * server to set the status code, headers, and body of the response.
 */
const addTask = (request, response) => {
  logger.info(`BEGIN: Service > addTask`);
  let result = tasksServices.addTask(request.user, request.body);
  response.status(result.status).send({ message: result.data });
  createLog({
    ...result,
    requestStatus: response.statusMessage,
    originalUrl: request.originalUrl,
    ip: request.ip,
    method: request.method,
  });
  logger.info(`END: Service > addTask`);
};

/**
 * This function retrieves all tasks and sends a response with the retrieved data or an error message.
 * It also logs the request details.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request body, request method, request URL, and request
 * parameters. It is typically provided by the web framework or library being used to handle the HTTP
 * request.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods and properties that allow the server to set the
 * status code, headers, and body of the response.
 */
const getAllTasks = (request, response) => {
  logger.info(`BEGIN: Service > getAllTasks`);
  let result = tasksServices.getAllTasks(request.user, request.query);
  if (result.status === constants.CODES.OK)
    response.status(result.status).send(result.data);
  else response.status(result.status).send({ message: result.data });
  createLog({
    ...result,
    requestStatus: response.statusMessage,
    originalUrl: request.originalUrl,
    ip: request.ip,
    method: request.method,
  });
  logger.info(`END: Service > getAllTasks`);
};

/**
 * This is a function that retrieves a task based on the user and task ID provided in the request, and
 * sends a response with the task data or an error message. It also logs the request and response
 * details.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request body, request method, request URL, and request
 * parameters.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods and properties that allow the server to set the
 * status code, headers, and body of the response.
 */
const getTask = (request, response) => {
  logger.info(`BEGIN: Service > getTask`);
  let result = tasksServices.getTask(request.user, request.params.taskId);
  if (result.status === constants.CODES.OK)
    response.status(result.status).send(result.data);
  else response.status(result.status).send({ message: result.data });
  createLog({
    ...result,
    requestStatus: response.statusMessage,
    originalUrl: request.originalUrl,
    ip: request.ip,
    method: request.method,
  });
  logger.info(`END: Service > getTask`);
};

/**
 * This function updates a task and logs the result.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request body, request method, request URL, and other
 * metadata. It is typically provided by the web framework or library being used to handle the request.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client who made the request. It contains methods and properties that allow the
 * server to set the status code, headers, and body of the response.
 */
const updateTask = (request, response) => {
  logger.info(`BEGIN: Service > updateTask`);
  let result = tasksServices.updateTask(
    request.user,
    request.params.taskId,
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
  logger.info(`END: Service > updateTask`);
};

/**
 * This function deletes a task and sends a response with a message and status code.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request body, request parameters, and user information.
 * In this specific function, it is used to retrieve the user information and the task ID from the
 * request parameters.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods and properties that allow the server to set the
 * status code, headers, and body of the response.
 */
const deleteTask = (request, response) => {
  logger.info(`BEGIN: Service > deleteTask`);
  let result = tasksServices.deleteTask(request.user, request.params.taskId);
  response.status(result.status).send({ message: result.data });
  createLog(result);
  logger.info(`END: Service > deleteTask`);
};

module.exports = {
  addTask,
  getTask,
  getAllTasks,
  updateTask,
  deleteTask,
};
