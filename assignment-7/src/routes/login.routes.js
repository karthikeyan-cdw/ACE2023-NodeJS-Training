// importing the required modules
const express = require("express");
const { loginUser } = require("../controllers/login.controllers.js");

// setting up the routes for the logins
const router = express.Router();
router.post("/", loginUser);
router.use("/", (request, response) => {
  const result = { status: 404, error: "This API wont serves this request" };
  response.status(result.status).send({ error: result.error });
  createLog(result);
});

module.exports = router;
