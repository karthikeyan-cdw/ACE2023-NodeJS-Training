// importing required modules
const { readJSON, writeJSON } = require("../utils/readWriteDatabase.util");
const filterSortPage = require("../utils/filterSortPage.util");
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
  if (tasks.status === constants.CODES.INTERNAL_SERVER_ERROR) return tasks;
  if (tasks.data[username] !== undefined) {
    let taskIndex = tasks.data[username].findIndex(
      (task) => task.taskId === taskId
    );
    if (taskIndex != -1)
      return updateTaskInData(newData, tasks, taskIndex, username);
  }
  return {
    status: constants.CODES.NOT_FOUND,
    data: constants.MESSAGES.TASK_NOT_FOUND,
  };
};

/**
 * The function updates a task in a data object if it is modifiable, otherwise it returns an
 * unauthorized error message.
 * @param newData - The new data that needs to be updated in the tasks object.
 * @param tasks - The `tasks` parameter is an object that contains data about tasks. It has a `data`
 * property that is also an object, where each key is a username and the value is an array of tasks
 * associated with that user. The `updateTaskInData` function modifies this data object by updating
 * @param taskIndex - The index of the task in the array of tasks for a specific user.
 * @param username - The `username` parameter is a string that represents the name of the user whose
 * task is being updated in the `tasks` data.
 * @returns an object with a `status` property and a `data` property. The `status` property indicates
 * the status of the operation, and the `data` property contains a message related to the status. If
 * the task is successfully updated, the `status` property will be `constants.CODES.OK` and the `data`
 * property will be `constants.MESSAGES.TASK_UPDATED`.
 */
const updateTaskInData = (newData, tasks, taskIndex, username) => {
  let isModifiable = true;
  const shouldNotModify = ["taskId"];
  for (let key in Object(newData)) {
    if (shouldNotModify.includes(key)) {
      isModifiable = false;
      break;
    }
    tasks.data[username][taskIndex][key] = newData[key];
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
};

/**
 * The function deletes a task from a database based on the provided username and task ID.
 * @param username - The username of the user whose task is to be deleted.
 * @param taskId - The `taskId` parameter is the unique identifier of the task that needs to be deleted
 * from the database.
 * @returns The function `deleteTask` returns an object with a `status` property and a `data` property.
 * If the `readJSON` function returns an error, the `status` property will be set to
 * `constants.CODES.INTERNAL_SERVER_ERROR` and the entire `tasks` object will be returned. If the
 * `username` provided is found in the `tasks` object.
 */
const deleteTask = (username, taskId) => {
  let tasks = readJSON(process.env.TASKS_DATABASE_URL);
  if (tasks.status === constants.CODES.INTERNAL_SERVER_ERROR) {
    return tasks;
  }
  if (tasks.data[username] !== undefined) {
    return deleteTaskFromDatabase(tasks, username, taskId);
  }
  return {
    status: constants.CODES.NOT_FOUND,
    data: constants.MESSAGES.TASK_NOT_FOUND,
  };
};

/**
 * The function deletes a specific task from a user's list of tasks in a database and returns a success
 * message or a not found message.
 * @param tasks - The `tasks` parameter is an object that represents a database of tasks. It has a
 * `data` property that contains an object with usernames as keys and an array of tasks as values. Each
 * task in the array has a `taskId` property that uniquely identifies it.
 * @param username - The username is a string parameter that represents the name of the user whose task
 * is to be deleted from the database.
 * @param taskId - taskId is a unique identifier for a specific task in the tasks database. It is used
 * to identify the task that needs to be deleted from the database.
 * @returns an object with a `status` property and a `data` property. The `status` property indicates
 * the status of the operation (either `constants.CODES.OK` or `constants.CODES.NOT_FOUND`) and the
 * `data` property contains a message related to the status (either `constants.MESSAGES.TASK_DELETED`
 * or `constants.MESSAGES.TASK_NOT_FOUND`).
 */
const deleteTaskFromDatabase = (tasks, username, taskId) => {
  let intialTasksLength = tasks.data[username].length;
  tasksOfUser = tasks.data[username].filter((task) => {
    return task.taskId !== taskId;
  });
  if (intialTasksLength !== tasksOfUser.length) {
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
};

module.exports = {
  addTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
};
