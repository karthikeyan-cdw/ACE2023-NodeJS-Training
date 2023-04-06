// importing the required modules
const express = require("express");
const { loginUser } = require("../controllers/login.controllers.js");
const { validateUser } = require("../middlewares/validate.js");

// setting up the routes for the login
const router = express.Router();
router.post("/", validateUser, loginUser);
router.use("/", (request, response) => {
  const result = { status: 404, error: "This API wont serves this request" };
  response.status(result.status).send({ error: result.error });
  createLog(result);
});

module.exports = router;
