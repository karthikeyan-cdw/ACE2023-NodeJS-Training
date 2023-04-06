// importing the required modules
const express = require("express");
const {signupUser} = require("../controllers/signup.controllers.js");

// setting up the routes for the signup
const router = express.Router();
router.post("/", signupUser);
router.use("/", (request, response) => {
  const result = { status: 404, error: "This API wont serves this request" };
  response.status(result.status).send({ error: result.error });
  createLog(result);
});

module.exports = router;
