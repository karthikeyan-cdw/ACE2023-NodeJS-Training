// importing the required modules
const jwt = require("jsonwebtoken");
const { readJSON, writeJSON } = require("../utilities/JSONIO");

const signupUser = (email, password) => {
  const users = readJSON(process.env.USERS_DATABASE_URL);
  if (users.status === 500) {
    return users;
  }
  if (!users.data.some((user) => user.email === email)) {
    users.data.push({email, password});
    let result = writeJSON(process.env.USERS_DATABASE_URL, users.data);
    if (result.status === 200) return { status: 201, data: "User Created" };
    return result;
  }
  return { status: 403, data: "User Already Exists" };
};

module.exports = { signupUser };
