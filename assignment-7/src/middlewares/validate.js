// importing the required modules
const Joi = require("joi");
const createLog = require("../helpers/createLog");

const validateTask = (request, response, next) => {
  const isValid = Joi.object({
    taskId: Joi.number(),
    title: Joi.string().min(3).max(50).trim().required(),
    description: Joi.string().min(3).max(1000).required(),
    dueDate: Joi.date().required(),
    priority: Joi.number().min(1).max(5).default(1),
    taskComments: Joi.array().items({
      comment: Joi.string().min(3).max(1000),
      timestamp: Joi.date().default(Date.now),
    }),
  });
  const validationResult = isValid.validate(request.body);
  if (validationResult.error !== undefined) {
    const result = {
      status: 400,
      data: "Invalid Format",
      error: validationResult.error.details,
    };
    createLog(result);
    return response
      .status(result.status)
      .send({ message: result.data, error: result.error });
  } else {
    next();
  }
};

const validateUser = (request, response, next) => {
  const isValid = Joi.object({
    username: Joi.string().min(5).max(30).required(),
    email: Joi.string().email().min(5).max(50).optional(),
    password: Joi.string().min(8),
  });
  const validationResult = isValid.validate(request.body);
  if (validationResult.error !== undefined) {
    const result = {
      status: 400,
      data: "Invalid Format",
      error: validationResult.error.details,
    };
    createLog(result);
    return response
      .status(result.status)
      .send({ message: result.data, error: result.error });
  } else {
    next();
  }
};
module.exports = { validateTask, validateUser };
