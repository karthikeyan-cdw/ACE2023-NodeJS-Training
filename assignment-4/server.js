// importing the required modules
const app = require("./index");
const writeJSON = require("./src/utilities/writeJSON");

// constants
const PORT = 4003;
const HOST = "http://localhost";

// starting up the server
app.listen(PORT, () => {
  console.log(`Server has started listening in : ${HOST}/${PORT}/`);
  const buddies = [];
  writeJSON(buddies);
});
