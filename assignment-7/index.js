// importing the required modules
const express = require("express");
const cors = require("cors");
const createLog = require("./src/helpers/createLog");
const auth = require("./src/middlewares/auth");
const constants = require("./constants");

// importing the routes
const tasksRoute = require("./src/routes/tasks.routes");
const authRoute = require("./src/routes/auth.routes");

// setting up the express app
const app = express();

// setting up cors options
// origin:"*" - accepts request from all domains
const corsOptions = {
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
};

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));

// setting up routes
app.use("/tasks", auth, tasksRoute);
app.use("/auth", authRoute);
app.use("/", (request, response) => {
  const result = {
    status: constants.CODES.NOT_FOUND,
    error: constants.MESSAGES.NO_SERVICE,
  };
  response.status(result.status).send({ error: result.error });
  createLog(result);
});

module.exports = app;
