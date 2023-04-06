// importing required modules
const createLog = require("../helpers/createLog");
const { debugLogger } = require("../utilities/logger");

const signupServices = require("../services/signup.services");

const signupUser = (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  debugLogger.info(`BEGIN: Service > signupUser`);
  let result = signupServices.signupUser(email, password);
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
