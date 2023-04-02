// importing the required modules
const express = require("express");
const cors = require("cors");

// importing the routes
const buddiesRoute = require("./src/routes/buddies.routes");

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

app.use("/buddies", buddiesRoute);

module.exports = app;
