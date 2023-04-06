// importing required modules
const { readJSON, writeJSON } = require("../utilities/JSONIO");

const addTask = (data) => {
  let tasks = readJSON(process.env.TASKS_DATABASE_URL);
  if (tasks.status === 500) {
    return tasks;
  }
  if (!tasks.data.some((task) => task.taskId === data.taskId)) {
    tasks.data.push(data);
    let result = writeJSON(process.env.TASKS_DATABASE_URL, tasks.data);
    if (result.status === 200) return { status: 201, data: "Task Added" };
    return result;
  }
  return { status: 403, data: "Task Id Already Exists" };
};

const getAllTasks = () => {
  let tasks = readJSON(process.env.TASKS_DATABASE_URL);
  return tasks;
};

const getTask = (taskId) => {
  let tasks = readJSON(process.env.TASKS_DATABASE_URL);
  if (tasks.status === 500) {
    return tasks;
  }
  let task = tasks.data.find((task) => task.taskId == taskId) || [];
  if (task.length === 0) return { status: 404, data: "Task Not Found" };
  return { status: 200, data: task };
};

const updateTask = (taskId, newData) => {
  let tasks = readJSON(process.env.TASKS_DATABASE_URL);
  if (tasks.status === 500) {
    return tasks;
  }
  let taskIndex = tasks.data.findIndex((task) => task.taskId === taskId);

  if (taskIndex != -1) {
    let isModifiable = true;
    const shouldNotModify = ["taskId"];
    for (let key in Object(newData)) {
      if (shouldNotModify.includes(key)) {
        isModifiable = false;
        break;
      } else {
        tasks.data[taskIndex][key] = newData[key];
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
  return { status: 404, data: "Task Not Found" };
};

const deleteTask = (taskId) => {
  let tasks = readJSON(process.env.TASKS_DATABASE_URL);
  if (tasks.status === 500) {
    return tasks;
  }
  let intialTasksLength = tasks.data.length;
  tasks = tasks.data.filter((task) => task.taskId !== taskId);
  if (intialTasksLength !== tasks.length) {
    let result = writeJSON(process.env.TASKS_DATABASE_URL, tasks);
    if (result.status === 200) return { status: 200, data: "Task Deleted" };
    return result;
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
