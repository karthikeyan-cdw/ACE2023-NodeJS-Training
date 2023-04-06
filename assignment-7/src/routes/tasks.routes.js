// importing the required modules
const express = require("express");
const {
  addTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controllers.js");
const { validateTask } = require("../middlewares/validate.js");
const auth = require("../middlewares/auth.js");

// setting up the routes for the tasks
const router = express.Router();
router.post("/", validateTask, auth, addTask);
router.get("/", validateTask, auth, getAllTasks);
router.get("/:taskId", validateTask, auth, getTask);
router.put("/:taskId", validateTask, auth, updateTask);
router.delete("/:taskId", validateTask, auth, deleteTask);
router.use("/", (request, response) => {
  const result = { status: 404, error: "This API wont serves this request" };
  response.status(result.status).send({ error: result.error });
  createLog(result);
});

module.exports = router;
