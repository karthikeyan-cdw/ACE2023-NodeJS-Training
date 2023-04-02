// importing the required modules
const fs = require("fs");

const getData = () =>
  JSON.parse(fs.readFileSync(process.env.DATABASE_URL, "utf-8"));

module.exports = getData;
