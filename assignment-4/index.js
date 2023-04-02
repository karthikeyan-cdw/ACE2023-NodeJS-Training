// importing the required modules
const express = require("express");

// importing the routes
const buddiesRoute = require("./src/routes/buddies.routes");

// setting up the express app
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/buddies", buddiesRoute);

module.exports = app;
