// importing the required modules
const Joi = require("joi");
const createLog = require("../helpers/createLog");
const constants = require("../../constants");

/**
 * The function validates the request body for creating a task using Joi schema.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request body, request method, and request URL. It is
 * typically passed as the first parameter to middleware functions in Node.js web applications.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains information such as the status code, headers, and body of
 * the response.
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the stack. It is typically used to handle errors or to move on to the next step in the
 * request-response cycle. In this case, it is passed as a parameter to the `validate` function.
 */
const validateTaskCreateMethod = (request, response, next) => {
  const isValid = Joi.object({
    taskId: Joi.number().required(),
    title: Joi.string().min(3).max(50).trim().required(),
    description: Joi.string().min(3).max(1000).required(),
    dueDate: Joi.date().required(),
    priority: Joi.number().min(1).max(5).default(1).required(),
    taskComments: Joi.array()
      .items({
        comment: Joi.string().min(3).max(1000).required(),
        timestamp: Joi.date().default(Date.now).required(),
      })
      .optional(),
  });
  validate(isValid, request.body, next);
};

/**
 * This function validates the request body for updating a task with specific rules using Joi.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request headers, request body, request method, and request URL.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains information such as the status code, headers, and body of
 * the response.
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the chain. It is typically used to handle errors or to move on to the next step in the
 * request-response cycle. In this case, `next` is passed as a parameter to the `validate` function.
 */
const validateTaskUpdateMethod = (request, response, next) => {
  const isValid = Joi.object({
    title: Joi.string().min(3).max(50).trim().optional(),
    description: Joi.string().min(3).max(1000).optional(),
    dueDate: Joi.date().required().optional(),
    priority: Joi.number().min(1).max(5).default(1).optional(),
    taskComments: Joi.array()
      .items({
        comment: Joi.string().min(3).max(1000).required(),
        timestamp: Joi.date().default(Date.now).required(),
      })
      .optional(),
  });
  validate(isValid, request.body, next);
};

/**
 * The function validates the username and password of a user using Joi schema.
 * @param request - The request parameter is an object that contains information about the incoming
 * HTTP request, such as the request method, headers, URL, and request body. It is typically used to
 * extract data from the request and pass it to the server-side logic for processing.
 * @param response - The `response` parameter is an object that represents the HTTP response that will
 * be sent back to the client. It contains methods and properties that allow you to set the status
 * code, headers, and body of the response.
 * @param next - `next` is a function that is called to pass control to the next middleware function in
 * the chain. It is typically used to move on to the next function after the current middleware
 * function has completed its task. In this case, `next` is passed as a parameter to `validateUser`.
 */
const validateUser = (request, response, next) => {
  const isValid = Joi.object({
    username: Joi.string().max(30).required(),
    password: Joi.string().min(8).max(30).required(),
  });
  validate(isValid, request.body, next);
};

/**
 * The function validates data using a validation function and returns an error response if the data is
 * invalid, otherwise it calls the next function.
 * @param isValid - isValid is a validation schema object that is used to validate the data passed to
 * the function.
 * @param data - The `data` parameter is the input data that needs to be validated. It is passed to the
 * `isValid.validate()` method to check if it meets the required format or schema. If the data is
 * invalid, an error message is returned.
 * @param next - `next` is a function that is passed as a parameter to middleware functions in
 * Express.js. It is used to pass control to the next middleware function in the chain. When `next()`
 * is called, the next middleware function in the chain is executed.
 * @returns If the validation result has an error, a response object with a status code, a message, and
 * an error details array is created and logged. Then, the response object is returned with the message
 * and error details. If there is no error, the `next()` function is called.
 */
const validate = (isValid, data, next) => {
  const validationResult = isValid.validate(data);
  if (validationResult.error !== undefined) {
    const result = {
      status: constants.CODES.BAD_REQUEST,
      data: constants.MESSAGES.DATA_INVALID_FORMAT,
      error: validationResult.error.details,
    };
    createLog(result);
    return response
      .status(result.status)
      .send({ message: result.data, error: result.error });
  }
  return next();
};

module.exports = {
  validateTaskCreateMethod,
  validateTaskUpdateMethod,
  validateUser,
};
