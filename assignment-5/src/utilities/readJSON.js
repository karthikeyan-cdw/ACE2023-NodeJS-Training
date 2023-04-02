// importing the required modules
const fs = require("fs");

// adding the database
const database = "./database/cdw_ace23_buddies.json";

const getData = () => JSON.parse(fs.readFileSync(database, "utf-8"));

module.exports = getData;
