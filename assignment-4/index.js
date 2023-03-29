let express = require("express");
let cors = require("cors");
global.fs = require("fs");
let app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  })
);

let port = 4003;
global.database = "./assets/store/cdw_ace23_buddies.json";

let createRoute = require("./routes/create");
app.use("/buddies/newBuddy", createRoute);
let readRoute = require("./routes/read");
app.use("/buddies/", readRoute);
let updateRoute = require("./routes/update");
app.use("/buddies/updateBuddy", updateRoute);
let deleteRoute = require("./routes/delete");
app.use("/buddies/deleteBuddy/", deleteRoute);

app.listen(port, () => {
  console.log(
    "Server has started in port :" +
      port +
      " Open server: http://localhost:" +
      port +
      "/"
  );
  let buddies = [];
  fs.writeFileSync(database, JSON.stringify(buddies));
});

// 1. Create an HTTP Server using Express Package and have all the basic things implemented
// 2. Create a new file `cdw_ace23_buddies.json` programmatically with an empty array on the server startup
// 3. Each buddy should have employeeId, realName, nickName, dob, hobbies
// 4. Implement the below REST APIs along with their respective functionalities
//    A) Create a GET Request to list all the buddy's information
//    B) Create a GET Request to list a single buddy's information using his employeeId/realName
//    C) Create a POST Request to add new buddy information to the existing list
//    D) Create a PUT Request to update the existing buddy information like nickname, hobbies
//    E) Create a DELETE Request to delete an existing buddy
// 5. All the above operations should be performed in `cdw_ace23_buddies.json` file
