// importing the required modules
const fs = require("fs");

const writeJSON = (input_data) => {
  try {
    const data = JSON.stringify(input_data);
    try {
      fs.writeFileSync(process.env.DATABASE_URL, data);
      return { status: 200, data: "Data Successfully written" };
    } catch {
      return { status: 500, data: "Unable to write to Database" };
    }
  } catch {
    return { status: 500, data: "Invalid Data Format" };
  }
};
const readJSON = () => {
  try {
    const data = fs.readFileSync(process.env.DATABASE_URL, "utf-8");
    try {
      return { status: 200, data: JSON.parse(data) };
    } catch {
      return { status: 500, data: "Database corrupted" };
    }
  } catch {
    return { status: 500, data: "Database Not Found" };
  }
};

module.exports = { writeJSON, readJSON };
