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
const auth = require("../middlewares/auth.js");

// setting up the routes for the tasks
const router = express.Router();
router.post("/", validateTaskCreateMethod, auth, addTask);
router.get("/", auth, getAllTasks);
router.get("/:taskId", auth, getTask);
router.put("/:taskId", validateTaskUpdateMethod, auth, updateTask);
router.delete("/:taskId", auth, deleteTask);
router.use("/", (request, response) => {
  const result = { status: 404, error: "This API wont serves this request" };
  response.status(result.status).send({ error: result.error });
  createLog(result);
});

module.exports = router;
