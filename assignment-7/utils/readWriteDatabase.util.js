// importing the required modules
const fs = require("fs");
const constants = require("../constants");

/**
 * The function writes input data to a JSON file and returns a status and message indicating success or
 * failure.
 * @param database - The path to the file where the JSON data will be written.
 * @param input_data - The input_data parameter is the data that needs to be written to the specified
 * database file in JSON format.
 * @returns The `writeJSON` function returns an object with `status`, `data`, and `error` properties.
 * The specific values of these properties depend on the outcome of the function's execution. If the
 * data is written successfully, the `status` property will be set to `constants.CODES.OK` and the
 * `data` property will be set to `constants.MESSAGES.DATA_WRITTEN_SUCCESSFULL.
 */
const writeJSON = (database, input_data) => {
  try {
    const data = JSON.stringify(input_data);
    try {
      fs.writeFileSync(database, data);
      return {
        status: constants.CODES.OK,
        data: constants.MESSAGES.DATA_WRITTEN_SUCCESSFULLY,
      };
    } catch (error) {
      return {
        status: constants.CODES.INTERNAL_SERVER_ERROR,
        data: constants.MESSAGES.DATA_WRITE_UNSUCCESSFUL,
        error: `${
          error.status || constants.CODES.INTERNAL_SERVER_ERROR
        } - ${error} - ${error.stack}`,
      };
    }
  } catch (error) {
    return {
      status: constants.CODES.INTERNAL_SERVER_ERROR,
      data: constants.MESSAGES.DATA_INVALID_FORMAT,
      error: `${
        error.status || constants.CODES.INTERNAL_SERVER_ERROR
      } - ${error} - ${error.stack}`,
    };
  }
};

/**
 * The function reads a JSON file from a database and returns its contents or an error message if the
 * file is corrupted or not found.
 * @param database - The `database` parameter is a string representing the file path of the JSON
 * database that needs to be read.
 * @returns The `readJSON` function returns an object with a `status` property and a `data` property.
 * The `status` property indicates the status of the operation, and the `data` property contains the
 * result of the operation. If an error occurs, an additional `error` property is included in the
 * returned object.
 */
const readJSON = (database) => {
  try {
    const data = fs.readFileSync(database, "utf-8");
    try {
      return { status: constants.CODES.OK, data: JSON.parse(data) };
    } catch (error) {
      return {
        status: constants.CODES.INTERNAL_SERVER_ERROR,
        data: constants.MESSAGES.DATABASE_CORRUPTED,
        error: `${
          error.status || constants.CODES.INTERNAL_SERVER_ERROR
        } - ${error} - ${error.stack}`,
      };
    }
  } catch (error) {
    return {
      status: constants.CODES.INTERNAL_SERVER_ERROR,
      data: constants.MESSAGES.DATABASE_NOT_FOUND,
      error: `${
        error.status || constants.CODES.INTERNAL_SERVER_ERROR
      } - ${error} - ${error.stack}`,
    };
  }
};

module.exports = { writeJSON, readJSON };
