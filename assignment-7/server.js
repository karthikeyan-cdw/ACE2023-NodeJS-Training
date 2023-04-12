// importing the required modules
const app = require("./index");
const { writeJSON } = require("./utils/readWriteDatabase.util");
const createLog = require("./utils/logger.util");
const constants = require("./constants");
const fs = require("fs");
require("dotenv").config();

let appServer;

if (process.env.STATUS === "test") {
  // starting up the server in test mode
  appServer = app.listen(process.env.TEST_PORT, () => {
    createLog({
      status: constants.CODES.OK,
      message: `Server has started listening in : ${process.env.HOST}:${process.env.TEST_PORT}/`,
    });
    const tasks = {};
    const users = [];
    writeJSON(process.env.TASKS_DATABASE_URL, tasks);
    writeJSON(process.env.USERS_DATABASE_URL, users);
    appServer.close();
  });
} else {
  // starting up the server in development mode
  app.listen(process.env.PORT, () => {
    createLog({
      status: constants.CODES.OK,
      message: `Server has started listening in : ${process.env.HOST}:${process.env.PORT}/`,
    });
    const tasks = {};
    const users = [];
    if (!fs.existsSync(process.env.TASKS_DATABASE_URL))
      writeJSON(process.env.TASKS_DATABASE_URL, tasks);

    if (!fs.existsSync(process.env.USERS_DATABASE_URL))
      writeJSON(process.env.USERS_DATABASE_URL, users);
  });
}
module.exports = app;
