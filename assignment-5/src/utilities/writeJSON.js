// importing the required modules
const fs = require("fs");

const setData = (data) =>
  fs.writeFileSync(process.env.DATABASE_URL, JSON.stringify(data));

module.exports = setData;
