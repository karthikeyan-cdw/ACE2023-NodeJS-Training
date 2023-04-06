// importing the required modules
const express = require("express");
const cors = require("cors");
const createLog = require("./src/helpers/createLog");

// importing the routes
const tasksRoute = require("./src/routes/tasks.routes");
const loginRoute = require("./src/routes/login.routes");
const signupRoute = require("./src/routes/signup.routes");

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

app.use("/tasks", tasksRoute);
app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/", (request, response) => {
  const result = { status: 404, error: "This API wont serves this request" };
  response.status(result.status).send({ error: result.error });
  createLog(result);
});
module.exports = app;
