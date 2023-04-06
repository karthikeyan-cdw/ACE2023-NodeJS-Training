// importing the required modules
const fs = require("fs");

/**
 * @summary The function writes input data to a JSON file and returns a status and message indicating success or
 * failure.
 * @param database - The database parameter is a string that represents the file path of the JSON file
 * where the data will be written.
 * @param input_data - The input_data parameter is the data that needs to be written to the database in
 * JSON format.
 * @returns The function `writeJSON` returns an object with a `status` property and a `data` property.
 * If the data is successfully written to the database, the `status` property is set to 200 and the
 * `data` property is set to "Data Successfully written". If there is an error writing to the database,
 * the `status` property is set to 500.
 * @author @karthikeyan-cdw
 */
const writeJSON = (database, input_data) => {
  try {
    const data = JSON.stringify(input_data);
    try {
      fs.writeFileSync(database, data);
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

/**
 * @summary The function reads a JSON file from a database and returns either the parsed data or an error
 * message.
 * @param database - The `database` parameter is a string representing the file path of the JSON
 * database that needs to be read.
 * @returns The function `readJSON` returns an object with a `status` property and a `data` property.
 * The `status` property indicates the status of the operation (200 for success, 500 for error), and
 * the `data` property contains the result of the operation (either the parsed JSON data or an error
 * message). If an error occurs, the object also includes an `error` property.
 * @author @karthikeyan-cdw
 */
const readJSON = (database) => {
  try {
    const data = fs.readFileSync(database, "utf-8");
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
