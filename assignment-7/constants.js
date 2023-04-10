const CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const MESSAGES = {
  NO_SERVICE: "This API won't serves this request",
  USER_NOT_FOUND: "User Not Found",
  INVALID_PASSWORD: "Invalid Password",
  USER_EXISTS: "User Already Exists",
  TASK_EXISTS: "Task Id Already Exists",
  TASK_CREATED: "Task Added",
  TASK_NOT_FOUND: "Task Not Found",
  TASK_CANT_BE_UPDATED: "Can't Update Some Data",
  TASK_UPDATED: "Task Information Updated",
  TASK_DELETED: "Task Deleted",
  SYNTAX_ERROR: "Syntax Error",
  DATA_WRITTEN_SUCCESSFULLY: "Data Successfully written",
  DATA_WRITE_UNSUCCESSFUL: "Unable to write to Database",
  DATA_INVALID_FORMAT: "Invalid Data Format",
  DATABASE_CORRUPTED: "Database corrupted",
  DATABASE_NOT_FOUND: "Database Not Found",
  AUTH_ACCESS_TOKEN_NOT_FOUND: "Access Token Not Found in Header",
  AUTH_USERNAME_NOT_FOUND: "Username Not Found in Header",
  AUTH_ACCESS_TOKEN_MISMATCH: "It's not your Access Token",
  AUTH_SUCCESS: "Authentication Success",
  AUTH_ACCESS_TOKEN_EXPIRED: "Access Token Expired, Login Again",
  AUTH_ACCESS_TOKEN_INVALID: "Invalid Access Token",
};

const FILENAMES = {
  LOGGER_FILE: "./logs/listify.log",
};

module.exports = { CODES, MESSAGES, FILENAMES };
