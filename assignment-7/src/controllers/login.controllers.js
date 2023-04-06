// importing required modules
const createLog = require("../helpers/createLog");
const { debugLogger } = require("../utilities/logger");

const loginServices = require("../services/login.services");

const loginUser = (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  debugLogger.info(`BEGIN: Service > loginUser`);
  let result = loginServices.loginUser(email, password);
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
  debugLogger.info(`END: Service > loginUser`);
};

module.exports = {
  loginUser,
};
