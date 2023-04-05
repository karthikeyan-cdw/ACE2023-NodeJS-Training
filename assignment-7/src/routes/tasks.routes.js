// importing the required modules
const express = require("express");
const {
  addTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controllers.js");

// setting up the routes for the tasks
const router = express.Router();
router.post("/", addTask);
router.get("/", getAllTasks);
router.get("/:taskId", getTask);
router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);
router.use("/", (request, response) => {
  response.send({ error: "This API wont serves this request" });
});

module.exports = router;
