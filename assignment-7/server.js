// importing the required modules
const app = require("./index");
const { writeJSON } = require("./src/utilities/JSONIO");
const createLog = require("./src/helpers/createLog");
const constants = require("./constants");
const fs = require("fs");
require("dotenv").config();

if (process.env.STATUS === "test") {
  // starting up the server in test mode
  app.listen(process.env.TEST_PORT, () => {
    createLog({
      status: constants.CODES.OK,
      message: `Server has started listening in : ${process.env.HOST}:${process.env.TEST_PORT}/`,
    });
    const tasks = {};
    const users = [];
    writeJSON(process.env.TASKS_DATABASE_URL, tasks);
    writeJSON(process.env.USERS_DATABASE_URL, users);
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
