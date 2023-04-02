// importing the required modules
const fs = require("fs");

// adding the database
const database = "./database/cdw_ace23_buddies.json";

const setData = (data) => fs.writeFileSync(database, JSON.stringify(data));

module.exports = setData;
