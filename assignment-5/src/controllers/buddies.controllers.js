// importing the required modules
const createLog = require("../helpers/createLog");

// setting up the controllers for the buddies
const buddiesServices = require("../services/buddies.services");

// function to add a buddy to database
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

// function to get all buddies from database
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

// function to get a buddy from database using id
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

// function to update the buddy details in database using id
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

// function to delete a buddy in database using id
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
