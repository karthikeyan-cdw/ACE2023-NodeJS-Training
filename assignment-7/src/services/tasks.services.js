// importing required modules
const { readJSON, writeJSON } = require("../utilities/JSONIO");
const filterSortPage = require("../utilities/filterSortPage");
const constants = require("../../constants");

/**
 * The function adds a new task to a user's task list in a JSON database and returns a success message
 * or an error message if the task already exists.
 * @param username - The username parameter is a string that represents the name of the user for whom
 * the task is being added.
 * @param data - The `data` parameter is an object that represents a task to be added to a task list.
 * It likely contains properties such as `taskId`, `description`, `dueDate`, and `completed`.
 * @returns an object with a `status` property and a `data` property. The `status` property indicates
 * the status code of the response, and the `data` property contains a message related to the status
 * code. The specific values of these properties depend on the logic of the function and the input
 * parameters.
 */
const addTask = (username, data) => {
  let tasks = readJSON(process.env.TASKS_DATABASE_URL);
  if (tasks.status === constants.CODES.INTERNAL_SERVER_ERROR) {
    return tasks;
  }
  if (tasks.data[username] === undefined) {
    tasks.data[username] = [data];
  } else {
    if (!tasks.data[username].some((task) => task.taskId === data.taskId)) {
      tasks.data[username].push(data);
    } else
      return {
        status: constants.CODES.UNAUTHORIZED,
        data: constants.MESSAGES.TASK_EXISTS,
      };
  }
  let result = writeJSON(process.env.TASKS_DATABASE_URL, tasks.data);
  if (result.status === constants.CODES.OK)
    return {
      status: constants.CODES.CREATED,
      data: constants.MESSAGES.TASK_CREATED,
    };
  return result;
};

/**
 * The function retrieves all tasks for a given username, filters and sorts them based on a query, and
 * returns the result.
 * @param username - The username parameter is a string that represents the name of the user whose
 * tasks are being retrieved.
 * @param query - The `query` parameter is an object that contains information about how to filter,
 * sort, and paginate the tasks. It may have the following properties: 'filter', 'sort', 'pagination'.
 * @returns The function `getAllTasks` returns an object with two properties: `status` and `data`. The
 * `status` property contains a status code indicating the success or failure of the function, and the
 * `data` property contains an array of task objects that match the specified query parameters for the
 * given `username`. If there is an internal server error, the function returns an object with the
 * `status`.
 */
const getAllTasks = (username, query) => {
  let tasks = readJSON(process.env.TASKS_DATABASE_URL);
  let result = filterSortPage(tasks.data[username] || [], query);
  if (result.status === constants.CODES.INTERNAL_SERVER_ERROR) return result;
  return { status: result.status, data: result.data };
};

/**
 * The function retrieves a specific task for a given username from a tasks database and returns it as
 * a response.
 * @param username - The username of the user whose task is being retrieved.
 * @param taskId - `taskId` is a parameter representing the unique identifier of a task that needs to
 * be retrieved from a tasks database.
 * @returns The function `getTask` returns an object with a `status` property and a `data` property.
 * The `status` property contains a numeric HTTP status code indicating the success or failure of the
 * operation, and the `data` property contains either the requested task or an error message.
 */
const getTask = (username, taskId) => {
  let tasks = readJSON(process.env.TASKS_DATABASE_URL);
  if (tasks.status === constants.CODES.INTERNAL_SERVER_ERROR) {
    return tasks;
  }
  let task =
    (tasks.data[username] !== undefined &&
      tasks.data[username].find((task) => task.taskId == taskId)) ||
    [];
  if (task.length === 0)
    return {
      status: constants.CODES.NOT_FOUND,
      data: constants.MESSAGES.TASK_NOT_FOUND,
    };
  return { status: constants.CODES.OK, data: task };
};

/**
 * The function updates a task in a tasks database for a given user, with specified new data, while
 * ensuring that certain fields cannot be modified.
 * @param username - The username of the user whose task is being updated.
 * @param taskId - taskId is a unique identifier for a specific task in the tasks database. It is used
 * to locate and update the task with the new data provided in the newData parameter.
 * @param newData - `newData` is an object containing the updated data for a specific task. The keys of
 * the object represent the fields to be updated, and the values represent the new values for those
 * fields.
 * @returns an object with a `status` property and a `data` property. The `status` property indicates
 * the status of the operation (e.g. OK, NOT_FOUND, UNAUTHORIZED, INTERNAL_SERVER_ERROR), and the
 * `data` property provides a message related to the status.
 */
const updateTask = (username, taskId, newData) => {
  let tasks = readJSON(process.env.TASKS_DATABASE_URL);
  if (tasks.status === constants.CODES.INTERNAL_SERVER_ERROR) {
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
        return {
          status: constants.CODES.UNAUTHORIZED,
          data: constants.MESSAGES.TASK_CANT_BE_UPDATED,
        };
      }
      let result = writeJSON(process.env.TASKS_DATABASE_URL, tasks.data);
      if (result.status === constants.CODES.OK)
        return {
          status: constants.CODES.OK,
          data: constants.MESSAGES.TASK_UPDATED,
        };
      return result;
    }
  }
  return {
    status: constants.CODES.NOT_FOUND,
    data: constants.MESSAGES.TASK_NOT_FOUND,
  };
};

/**
 * The function deletes a task for a given username and taskId from a tasks database and returns a
 * success message or an error message if the task is not found.
 * @param username - The username parameter is a string that represents the username of the user whose
 * task is to be deleted.
 * @param taskId - taskId is a unique identifier for a task that needs to be deleted from the tasks
 * database.
 * @returns an object with a `status` property and a `data` property. The `status` property indicates
 * the status of the operation and the `data` property contains a message related to the status. The
 * possible values for `status` are `constants.CODES.OK`, `constants.CODES.INTERNAL_SERVER_ERROR`, and
 * `constants.CODES.NOT_FOUND`.
 */
const deleteTask = (username, taskId) => {
  let tasks = readJSON(process.env.TASKS_DATABASE_URL);
  if (tasks.status === constants.CODES.INTERNAL_SERVER_ERROR) {
    return tasks;
  }
  if (tasks.data[username] !== undefined) {
    let intialTasksLength = tasks.data[username].length;
    tasksOfUser = tasks.data[username].filter((task) => task.taskId !== taskId);
    if (intialTasksLength !== tasks.data[username].length) {
      tasks.data[username] = tasksOfUser;
      let result = writeJSON(process.env.TASKS_DATABASE_URL, tasks.data);
      if (result.status === constants.CODES.OK)
        return {
          status: constants.CODES.OK,
          data: constants.MESSAGES.TASK_DELETED,
        };
      return result;
    }
    return {
      status: constants.CODES.NOT_FOUND,
      data: constants.MESSAGES.TASK_NOT_FOUND,
    };
  }
  return {
    status: constants.CODES.NOT_FOUND,
    data: constants.MESSAGES.TASK_NOT_FOUND,
  };
};

module.exports = {
  addTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
};
