// importing the required modules
const express = require("express");
const { loginUser, signupUser } = require("../controllers/auth.controllers.js");
const { validateUser } = require("../middlewares/validator.middleware.js");
const constants = require("../constants");

// setting up the routes for the user auth process
const router = express.Router();
router.post("/login", validateUser, loginUser);
router.post("/signup", validateUser, signupUser);
router.use("/", (request, response) => {
  const result = {
    status: constants.CODES.NOT_FOUND,
    error: constants.MESSAGES.NO_SERVICE,
  };
  response.status(result.status).send({ error: result.error });
  createLog(result);
});

module.exports = router;
