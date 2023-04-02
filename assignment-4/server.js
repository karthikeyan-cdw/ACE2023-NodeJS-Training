// importing the required modules
const app = require("./index");
const fs = require("fs");

// constants
const PORT = 4003;
const HOST = "http://localhost";

// adding the database
const database = "./database/cdw_ace23_buddies.json";

// starting up the server
app.listen(PORT, () => {
  console.log("Server has started listening in : " + HOST + ":/" + PORT + "/");
  const buddies = [];
  fs.writeFileSync(database, JSON.stringify(buddies));
});
