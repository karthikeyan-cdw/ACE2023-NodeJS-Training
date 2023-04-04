// importing the required modules
const fs = require("fs");

const writeJSON = (input_data) => {
  try {
    const data = JSON.stringify(input_data);
    try {
      fs.writeFileSync(process.env.DATABASE_URL, data);
      return { status: 200, data: "Data Successfully written" };
    } catch (error) {
      return {
        status: 500,
        data: "Unable to write to Database",
        error: `${error.status || 500} - ${error} - ${error.stack}`,
      };
    }
  } catch (error) {
    return {
      status: 500,
      data: "Invalid Data Format",
      error: `${error.status || 500} - ${error} - ${error.stack}`,
    };
  }
};
const readJSON = () => {
  try {
    const data = fs.readFileSync(process.env.DATABASE_URL, "utf-8");
    try {
      return { status: 200, data: JSON.parse(data) };
    } catch (error) {
      return {
        status: 500,
        data: "Database corrupted",
        error: `${error.status || 500} - ${error} - ${error.stack}`,
      };
    }
  } catch (error) {
    return {
      status: 500,
      data: "Database Not Found",
      error: `${error.status || 500} - ${error} - ${error.stack}`,
    };
  }
};

module.exports = { writeJSON, readJSON };
