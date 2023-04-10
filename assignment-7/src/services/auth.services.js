// importing the required modules
const { readJSON, writeJSON } = require("../utilities/JSONIO");
const { createHash, verifyHash } = require("../utilities/crypting");
const { getJWTToken } = require("../utilities/jwtToken");
const constants = require("../../constants");

/**
 * The function takes in a username and password, reads a JSON database of users, verifies the user's
 * credentials, and returns a JWT token if successful.
 * @param username - The username of the user trying to log in.
 * @param password - The password parameter is a string representing the password entered by the user
 * trying to log in.
 * @returns The function `loginUserService` returns an object with a `status` property and either a
 * `data` or `token` property depending on the outcome of the login attempt. If the `users` object
 * returned from `readJSON` has a `status` property of `constants.CODES.INTERNAL_SERVER_ERROR`, then
 * that object is returned as is.
 */
const loginUserService = (username, password) => {
  const users = readJSON(process.env.USERS_DATABASE_URL);
  if (users.status === constants.CODES.INTERNAL_SERVER_ERROR) {
    return users;
  }
  let user = users.data.find((user) => user.username == username) || [];
  if (user.length === 0)
    return {
      status: constants.CODES.NOT_FOUND,
      data: constants.MESSAGES.USER_NOT_FOUND,
    };
  if (!verifyHash(password, user.password)) {
    return {
      status: constants.CODES.UNAUTHORIZED,
      data: constants.MESSAGES.INVALID_PASSWORD,
    };
  }
  return { status: constants.CODES.OK, token: getJWTToken(username) };
};

/**
 * The function `signupUserService` checks if a user already exists in a database and creates a new
 * user with a hashed password if they do not exist.
 * @param username - The username of the user who wants to sign up.
 * @param password - The password parameter is a string representing the password that the user wants
 * to use for their account.
 * @returns an object with a `status` property and either a `token` or `data` property depending on the
 * outcome of the function. If the `users` object has a `status` property with a value of
 * `constants.CODES.INTERNAL_SERVER_ERROR`, then the function returns the `users` object. If the
 * `username` does not exist in the `users` array, then user not found returned.
 */
const signupUserService = (username, password) => {
  const users = readJSON(process.env.USERS_DATABASE_URL);
  if (users.status === constants.CODES.INTERNAL_SERVER_ERROR) {
    return users;
  }
  if (!users.data.some((user) => user.username === username)) {
    users.data.push({ username, password: createHash(password) });
    let result = writeJSON(process.env.USERS_DATABASE_URL, users.data);
    if (result.status === constants.CODES.OK) {
      return { status: constants.CODES.OK, token: getJWTToken(username) };
    }
    return result;
  }
  return {
    status: constants.CODES.UNAUTHORIZED,
    data: constants.MESSAGES.USER_EXISTS,
  };
};

module.exports = { loginUserService, signupUserService };
