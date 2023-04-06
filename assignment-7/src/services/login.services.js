// importing the required modules
const jwt = require("jsonwebtoken");
const { readJSON } = require("../utilities/JSONIO");
const { verifyHash } = require("../utilities/crypting");

const loginUser = (email, password) => {
  const users = readJSON(process.env.USERS_DATABASE_URL);
  if (users.status === 500) {
    return users;
  }
  let user = users.data.find((user) => user.email == email) || [];
  if (user.length === 0) return { status: 404, data: "User Not Found" };
  console.log(user.password, password);
  if (!verifyHash(password, user.password)) {
    return { status: 403, data: "Invalid Password" };
  }
  const jwtToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1m",
  });
  return { status: 200, token: jwtToken };
};

module.exports = { loginUser };
