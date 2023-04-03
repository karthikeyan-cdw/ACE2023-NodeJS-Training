// importing the required modules
const app = require("./index");
const writeJSON = require("./src/utilities/writeJSON");
require("dotenv").config();

// starting up the server
app.listen(process.env.PORT, () => {
  console.log(
    `Server has started listening in : ${process.env.HOST}/${process.env.PORT}/`
  );
  const buddies = [];
  writeJSON(buddies);
});
