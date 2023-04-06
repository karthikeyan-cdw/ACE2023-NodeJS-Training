// importing the required modules
const Joi = require("joi");
const createLog = require("../helpers/createLog");

const validateTaskCreateMethod = (request, response, next) => {
  const isValid = Joi.object({
    taskId: Joi.number().required(),
    title: Joi.string().min(3).max(50).trim().required(),
    description: Joi.string().min(3).max(1000).required(),
    dueDate: Joi.date().required(),
    priority: Joi.number().min(1).max(5).default(1).required(),
    taskComments: Joi.array().items({
      comment: Joi.string().min(3).max(1000).required(),
      timestamp: Joi.date().default(Date.now).required(),
    }).optional(),
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
const validateTaskUpdateMethod = (request, response, next) => {
  const isValid = Joi.object({
    title: Joi.string().min(3).max(50).trim().optional(),
    description: Joi.string().min(3).max(1000).optional(),
    dueDate: Joi.date().required().optional(),
    priority: Joi.number().min(1).max(5).default(1).optional(),
    taskComments: Joi.array().items({
      comment: Joi.string().min(3).max(1000).required(),
      timestamp: Joi.date().default(Date.now).required(),
    }).optional(),
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
    username: Joi.string().max(30).required(),
    password: Joi.string().min(8).max(30).required(),
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
module.exports = { validateTaskCreateMethod, validateTaskUpdateMethod, validateUser };
