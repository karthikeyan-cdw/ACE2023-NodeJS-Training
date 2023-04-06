// importing the required modules
const jwt = require("jsonwebtoken");
const { readJSON } = require("../utilities/JSONIO");
const { verifyHash } = require("../utilities/crypting");

/**
 * @summary The function `loginUser` takes in an username and password, reads a JSON database of users, verifies
 * the username and password, and returns a JWT token if successful.
 * @param username - The username of the user trying to log in.
 * @param password - The password parameter is a string representing the password entered by the user
 * trying to log in.
 * @returns an object with a `status` property and either a `data` or `token` property depending on the
 * outcome of the login attempt. If there is an error, the `status` property will be set to either 404
 * (User Not Found) or 403 (Invalid Password) and the `data` property will contain a corresponding
 * error message. If the login attempt is successful
 * @author @karthikeyan-cdw
 */
const loginUser = (username, password) => {
  const users = readJSON(process.env.USERS_DATABASE_URL);
  if (users.status === 500) {
    return users;
  }
  let user = users.data.find((user) => user.username == username) || [];
  if (user.length === 0) return { status: 404, data: "User Not Found" };
  if (!verifyHash(password, user.password)) {
    return { status: 403, data: "Invalid Password" };
  }
  const jwtToken = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
  return { status: 200, token: jwtToken };
};

module.exports = { loginUser };
