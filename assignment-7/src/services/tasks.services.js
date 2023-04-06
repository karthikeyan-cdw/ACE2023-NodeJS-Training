// importing required modules
const { readJSON, writeJSON } = require("../utilities/JSONIO");
const filterSortPage = require("../utilities/filterSortPage");

const addTask = (username, data) => {
  let tasks = readJSON(process.env.TASKS_DATABASE_URL);
  if (tasks.status === 500) {
    return tasks;
  }
  if (tasks.data[username] === undefined) {
    tasks.data[username] = [data];
  } else {
    if (!tasks.data[username].some((task) => task.taskId === data.taskId)) {
      tasks.data[username].push(data);
    } else return { status: 403, data: "Task Id Already Exists" };
  }
  let result = writeJSON(process.env.TASKS_DATABASE_URL, tasks.data);
  if (result.status === 200) return { status: 201, data: "Task Added" };
  return result;
};

const getAllTasks = (username, query) => {
  let tasks = readJSON(process.env.TASKS_DATABASE_URL);
  let result = filterSortPage(tasks.data[username], query);
  if (result.status === 500) return result;
  return { status: result.status, data: result.data };
};

const getTask = (username, taskId) => {
  let tasks = readJSON(process.env.TASKS_DATABASE_URL);
  if (tasks.status === 500) {
    return tasks;
  }
  let task =
    (tasks.data[username] !== undefined &&
      tasks.data[username].find((task) => task.taskId == taskId)) ||
    [];
  if (task.length === 0) return { status: 404, data: "Task Not Found" };
  return { status: 200, data: task };
};

const updateTask = (username, taskId, newData) => {
  let tasks = readJSON(process.env.TASKS_DATABASE_URL);
  if (tasks.status === 500) {
    return tasks;
  }
  if (tasks.data[username] !== undefined) {
    let taskIndex = tasks.data[username].findIndex(
      (task) => task.taskId === taskId
    );

    if (taskIndex != -1) {
      let isModifiable = true;
      const shouldNotModify = ["taskId"];
      for (let key in Object(newData)) {
        if (shouldNotModify.includes(key)) {
          isModifiable = false;
          break;
        } else {
          tasks.data[username][taskIndex][key] = newData[key];
        }
      }
      if (isModifiable === false) {
        return { status: 403, data: "Can't Update Some Data" };
      }
      let result = writeJSON(process.env.TASKS_DATABASE_URL, tasks.data);
      if (result.status === 200)
        return { status: 200, data: "Task Information Updated" };
      return result;
    }
  }
  return { status: 404, data: "Task Not Found" };
};

const deleteTask = (username, taskId) => {
  let tasks = readJSON(process.env.TASKS_DATABASE_URL);
  if (tasks.status === 500) {
    return tasks;
  }
  if (tasks.data[username] !== undefined) {
    let intialTasksLength = tasks.data[username].length;
    tasks = tasks.data[username].filter((task) => task.taskId !== taskId);
    if (intialTasksLength !== tasks.length) {
      let result = writeJSON(process.env.TASKS_DATABASE_URL, tasks);
      if (result.status === 200) return { status: 200, data: "Task Deleted" };
      return result;
    }
  }
  return { status: 404, data: "Task Not Found" };
};

module.exports = {
  addTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
};
