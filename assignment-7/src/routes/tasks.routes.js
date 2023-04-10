// importing the required modules
const express = require("express");
const {
  addTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controllers.js");
const {
  validateTaskCreateMethod,
  validateTaskUpdateMethod,
} = require("../middlewares/validate.js");
const constants = require("../../constants.js");

// setting up the routes for the tasks
const router = express.Router();
router.post("/", validateTaskCreateMethod, addTask);
router.get("/", getAllTasks);
router.get("/:taskId", getTask);
router.put("/:taskId", validateTaskUpdateMethod, updateTask);
router.delete("/:taskId", deleteTask);
router.use("/", (request, response) => {
  const result = {
    status: constants.CODES.NOT_FOUND,
    error: constants.MESSAGES.NO_SERVICE,
  };
  response.status(result.status).send({ error: result.error });
  createLog(result);
});

module.exports = router;
