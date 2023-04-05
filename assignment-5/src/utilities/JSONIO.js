// importing the required modules
const fs = require("fs");

/**
 * @summary The function writes input data to a JSON file and returns a status and message indicating success or
 * failure.
 * @param input_data - The input_data parameter is the data that needs to be written to a JSON file. It
 * should be in a format that can be converted to a JSON string using the JSON.stringify() method.
 * @returns The function `writeJSON` returns an object with a `status` property and a `data` property.
 * The `status` property indicates the status of the operation (either 200 for success or 500 for
 * failure), and the `data` property contains a message indicating the result of the operation. If
 * there is an error, the object also contains an `error` property with a string describing it.
 * @author @karthikeyan-cdw
 */
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

/**
 * @summary This function reads a JSON file from a specified database URL and returns either the parsed data or
 * an error message.
 * @returns The function `readJSON` returns an object with a `status` property and a `data` property.
 * If the `fs.readFileSync` method is successful in reading the file specified in the
 * `process.env.DATABASE_URL` environment variable, the `data` property will contain the parsed JSON
 * data from the file and the `status` property will be set to 200. If there is an error, returns `404`.
 * @author @karthikeyan-cdw
 */
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
