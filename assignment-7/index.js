// importing the required modules
const express = require("express");
const cors = require("cors");
const createLog = require("./utils/logger.util");
const auth = require("./middlewares/auth.middleware");
const constants = require("./constants");

// importing the routes
const tasksRoute = require("./routes/tasks.routes");
const authRoute = require("./routes/auth.routes");

// setting up the express app
const app = express();

// setting up cors options
// origin:"*" - accepts request from all domains
const corsOptions = {
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
};

app.use(express.urlencoded({ extended: false }));

// setting up the json parser and handling the json parser error if any occurs.
app.use((request, response, next) => {
  express.json()(request, response, (error) => {
    if (error) {
      const result = {
        status: constants.CODES.BAD_REQUEST,
        error: constants.MESSAGES.DATA_INVALID_FORMAT,
      };
      createLog(result);
      return response.status(result.status).send({ error: result.error });
    }
    next();
  });
});

// cors setup
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
