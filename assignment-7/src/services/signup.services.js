// importing the required modules
const jwt = require("jsonwebtoken");
const { readJSON, writeJSON } = require("../utilities/JSONIO");
const { createHash } = require("../utilities/crypting");

/**
 * @summary The function `signupUser` checks if a user already exists in a database, adds the user if they don't
 * exist, and returns a JSON Web Token if successful.
 * @param username - The username of the user who wants to sign up.
 * @param password - The password parameter is a string representing the password of the user who is
 * signing up.
 * @returns an object with a `status` property and either a `token` or `data` property depending on the
 * outcome of the function. If the `users` object has a `status` property of 500, the function returns
 * the `users` object. If the `username` does not already exist in the `users` array, the function adds
 * the new user to the array
 * @author @karthikeyan-cdw
 */
const signupUser = (username, password) => {
  const users = readJSON(process.env.USERS_DATABASE_URL);
  if (users.status === 500) {
    return users;
  }
  if (!users.data.some((user) => user.username === username)) {
    users.data.push({ username, password: createHash(password) });
    let result = writeJSON(process.env.USERS_DATABASE_URL, users.data);
    if (result.status === 200) {
      const jwtToken = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30m",
      });
      return { status: 200, token: jwtToken };
    }
    return result;
  }
  return { status: 403, data: "User Already Exists" };
};

module.exports = { signupUser };
