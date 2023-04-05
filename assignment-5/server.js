// importing the required modules
const app = require("./index");
const { writeJSON } = require("./src/utilities/JSONIO");
const createLog = require("./src/helpers/createLog")
require("dotenv").config();

// starting up the server
app.listen(process.env.PORT, () => {
  createLog({
    status: 200,
    message: `Server has started listening in : ${process.env.HOST}:${process.env.PORT}/`,
  });
  const buddies = [];
  writeJSON(buddies);
});
