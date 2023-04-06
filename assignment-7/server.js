// importing the required modules
const app = require("./index");
const { writeJSON } = require("./src/utilities/JSONIO");
const createLog = require("./src/helpers/createLog");
const fs = require("fs");
require("dotenv").config();

// starting up the server
app.listen(process.env.PORT, () => {
  createLog({
    status: 200,
    message: `Server has started listening in : ${process.env.HOST}:${process.env.PORT}/`,
  });
  const tasks = [];
  const users = [];
  if (!fs.existsSync(process.env.TASKS_DATABASE_URL))
    writeJSON(process.env.TASKS_DATABASE_URL, tasks);

  if (!fs.existsSync(process.env.USERS_DATABASE_URL))
    writeJSON(process.env.USERS_DATABASE_URL, users);
});
