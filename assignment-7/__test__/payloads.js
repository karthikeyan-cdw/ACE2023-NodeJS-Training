const { getJWTToken } = require("../src/utilities/jwtToken");

const payloads = {
  userInput: {
    username: "skc@skc.com",
    password: "skc12345",
  },
  newUserInput: {
    username: "newskc@skc.com",
    password: "skc12345",
  },
  userInputWrongPassword: {
    username: "skc@skc.com",
    password: "skc123456",
  },
  userInputNotAUser: {
    username: "skc@skc2.com",
    password: "skc12345",
  },
  userInputNotAValidFormat: {
    username: "skc@skc2.com",
    password: "skc123",
  },

  userInput1: {
    username: "skc@skc123.com",
    password: "skc12345",
  },
  userInput2: {
    username: "skc2@skc.com",
    password: "skc12345",
  },
  userInput3: {
    username: "skc2@skc.com",
    password: "skc12345",
  },
  taskInputReadTaskId: "1",
  taskInputReadTaskIdInvalid: "abcd",

  taskInput: {
    taskId: "1",
    title: "Task 1",
    description: "Task 1 description",
    priority: 1,
    dueDate: "2023/05/10",
    taskComments: [
      { comment: "comment 1", timestamp: "2023/04/10" },
      { comment: "comment2", timestamp: "2023/04/11" },
    ],
  },
  taskInputInvalidFormat: {
    taskId: "1",
    description: "Task 1 description",
    priority: 1,
    dueDate: "2023/05/10",
    taskComments: [
      { comment: "comment 1", timestamp: "2023/04/10" },
      { comment: "comment2", timestamp: "2023/04/11" },
    ],
  },
  taskInputUpdateTaskId: "1",
  taskInputUpdateTaskIdInvalid: "abcd",
  taskInputUpdate: {
    title: "Task 1",
    description: "Task 1 description updated",
    priority: 1,
    dueDate: "2023/05/10",
    taskComments: [
      { comment: "comment 1", timestamp: "2023/04/10" },
      { comment: "comment2", timestamp: "2023/04/11" },
    ],
  },
  taskInputDeleteTaskId: "1",
  taskInputDeleteTaskIdInvalid: "abcd",
};
const tokens = {
  jwtToken1: getJWTToken(payloads.userInput1.username),
  jwtToken2: getJWTToken(payloads.userInput2.username, "1ms"),
  jwtToken3: getJWTToken(payloads.userInput3.username, "1m"),
};
module.exports = { ...payloads, ...tokens };
