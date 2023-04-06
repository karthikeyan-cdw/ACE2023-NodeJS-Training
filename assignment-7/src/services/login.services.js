// importing the required modules
const jwt = require("jsonwebtoken");
const { readJSON } = require("../utilities/JSONIO");

const loginUser = (email, password) => {
  const users = readJSON(process.env.USERS_DATABASE_URL);
  if (users.status === 500) {
    return users;
  }
  let user = users.data.find((user) => user.email == email) || [];
  if (user.length === 0) return { status: 404, data: "User Not Found" };

  if (user.password !== password) {
    console.log("U:", user, "P:", password);
    return { status: 403, data: "Invalid Password" };
  }
  const jwtToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1m",
  });
  return { status: 200, token: jwtToken };
};

module.exports = { loginUser };
