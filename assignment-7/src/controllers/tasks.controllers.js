const createLog = require("../helpers/createLog");
const { debugLogger } = require("../utilities/logger");

const tasksServices = require("../services/tasks.services");

const addTask = (request, response) => {
  debugLogger.info(`BEGIN: Service > addTask`);
  let result = tasksServices.addTask(request.body);
  response.status(result.status).send({ message: result.data });
  createLog({
    ...result,
    requestStatus: response.statusMessage,
    originalUrl: request.originalUrl,
    ip: request.ip,
    method: request.method,
  });
  debugLogger.info(`END: Service > addTask`);
};

const getAllTasks = (request, response) => {
  debugLogger.info(`BEGIN: Service > getAllTasks`);
  let result = tasksServices.getAllTasks();
  if (result.status === 200) response.status(result.status).send(result.data);
  else response.status(result.status).send({ message: result.data });
  createLog({
    ...result,
    requestStatus: response.statusMessage,
    originalUrl: request.originalUrl,
    ip: request.ip,
    method: request.method,
  });
  debugLogger.info(`END: Service > getAllTasks`);
};

const getTask = (request, response) => {
  debugLogger.info(`BEGIN: Service > getTask`);
  let result = tasksServices.getTask(request.params.taskId);
  if (result.status === 200) response.status(result.status).send(result.data);
  else response.status(result.status).send({ message: result.data });
  createLog({
    ...result,
    requestStatus: response.statusMessage,
    originalUrl: request.originalUrl,
    ip: request.ip,
    method: request.method,
  });
  debugLogger.info(`END: Service > getTask`);
};

const updateTask = (request, response) => {
  debugLogger.info(`BEGIN: Service > updateTask`);
  let result = tasksServices.updateTask(request.params.taskId, request.body);
  response.status(result.status).send({ message: result.data });
  createLog({
    ...result,
    requestStatus: response.statusMessage,
    originalUrl: request.originalUrl,
    ip: request.ip,
    method: request.method,
  });
  debugLogger.info(`END: Service > updateTask`);
};

const deleteTask = (request, response) => {
  debugLogger.info(`BEGIN: Service > deleteTask`);
  let result = tasksServices.deleteTask(request.params.taskId);
  response.status(result.status).send({ message: result.data });
  createLog(result);
  debugLogger.info(`END: Service > deleteTask`);
};

module.exports = {
  addTask,
  getTask,
  getAllTasks,
  updateTask,
  deleteTask,
};
