const supertest = require("supertest");
const app = require("../server");
const constants = require("../constants");
const payloads = require("./payloads");

describe("user registration", () => {
  describe("given the username and password in valid format", () => {
    it("should return the payload with token", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/auth/signup/")
        .send(payloads.userInput);
      expect(statusCode).toBe(constants.CODES.OK);
      expect(body).toHaveProperty("token");
    });
  });
  describe("given the username already exists", () => {
    it("should return user already exists", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/auth/signup/")
        .send(payloads.userInput);
      expect(statusCode).toBe(constants.CODES.UNAUTHORIZED);
      expect(body).toEqual({ message: constants.MESSAGES.USER_EXISTS });
    });
  });
  describe("given the username or password not in valid format", () => {
    it("should return invalid format", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/auth/signup/")
        .send(payloads.userInputNotAValidFormat);
      expect(statusCode).toBe(constants.CODES.BAD_REQUEST);
      expect(body).toHaveProperty("error");
    });
  });
});

describe("user login", () => {
  describe("given the username and password in valid format", () => {
    it("should return the payload with token", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/auth/login/")
        .send(payloads.userInput);
      expect(statusCode).toBe(constants.CODES.OK);
      expect(body).toHaveProperty("token");
    });
  });
  describe("given the username and wrong password", () => {
    it("should return invalid password", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/auth/login/")
        .send(payloads.userInputWrongPassword);
      expect(statusCode).toBe(constants.CODES.UNAUTHORIZED);
      expect(body).toEqual({ message: constants.MESSAGES.INVALID_PASSWORD });
    });
  });
  describe("given the username and password where user not exists", () => {
    it("should return user not found", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/auth/login/")
        .send(payloads.userInputNotAUser);
      expect(statusCode).toBe(constants.CODES.NOT_FOUND);
      expect(body).toEqual({ message: constants.MESSAGES.USER_NOT_FOUND });
    });
  });
  describe("given the username and password not in valid format", () => {
    it("should return invalid format", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/auth/signup/")
        .send(payloads.userInputNotAValidFormat);
      expect(statusCode).toBe(constants.CODES.BAD_REQUEST);
      expect(body).toHaveProperty("error");
    });
  });
});

describe("access token validation", () => {
  describe("given the payload without access token and without username", () => {
    it("should return access token not found in header", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/tasks/")
        .send(payloads.taskInput);
      expect(statusCode).toBe(constants.CODES.UNAUTHORIZED);
      expect(body).toEqual({
        message: constants.MESSAGES.AUTH_ACCESS_TOKEN_NOT_FOUND,
      });
    });
  });
  describe("given the payload with access token and without username", () => {
    it("should return username not found in header", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/tasks/")
        .set({ "x-auth-token": `Bearer ${payloads.jwtToken1}` })
        .send(payloads.taskInput);
      expect(statusCode).toBe(constants.CODES.UNAUTHORIZED);
      expect(body).toEqual({
        message: constants.MESSAGES.AUTH_USERNAME_NOT_FOUND,
      });
    });
  });
  describe("given the payload with access token and username but expired access token", () => {
    it("should return username not found in header", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/tasks/")
        .set({ "x-auth-token": `Bearer ${payloads.jwtToken2}` })
        .set({ username: payloads.userInput2.username })
        .send(payloads.taskInput);
      expect(statusCode).toBe(constants.CODES.UNAUTHORIZED);
      expect(body).toEqual({
        message: constants.MESSAGES.AUTH_ACCESS_TOKEN_EXPIRED,
      });
    });
  });
  describe("given the payload with access token and username but invalid access token", () => {
    it("should return invalid access token", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/tasks/")
        .set({ "x-auth-token": `Bearer ${"Dummy_token"}` })
        .set({ username: payloads.userInput2.username })
        .send(payloads.taskInput);
      expect(statusCode).toBe(constants.CODES.UNAUTHORIZED);
      expect(body).toEqual({
        message: constants.MESSAGES.AUTH_ACCESS_TOKEN_INVALID,
      });
    });
  });
  describe("given the payload with access token and username but with other's access token", () => {
    it("should return it's not your access token", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/tasks/")
        .set({ "x-auth-token": `Bearer ${payloads.jwtToken1}` })
        .set({ username: payloads.userInput2.username })
        .send(payloads.taskInput);
      expect(statusCode).toBe(constants.CODES.BAD_REQUEST);
      expect(body).toEqual({
        message: constants.MESSAGES.AUTH_ACCESS_TOKEN_MISMATCH,
      });
    });
  });
});

describe("create task", () => {
  describe("given the task payload with access token and username with valid body", () => {
    it("should return tasks created", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/tasks/")
        .set({ "x-auth-token": `Bearer ${payloads.jwtToken1}` })
        .set({ username: payloads.userInput1.username })
        .send(payloads.taskInput);
      expect(statusCode).toBe(201);
      expect(body).toEqual({ message: constants.MESSAGES.TASK_CREATED });
    });
  });
  describe("given the task payload with access token and username with invalid body", () => {
    it("should return invalid data format", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/tasks/")
        .set({ "x-auth-token": `Bearer ${payloads.jwtToken1}` })
        .set({ username: payloads.userInput1.username })
        .send(payloads.taskInputInvalidFormat);
      expect(statusCode).toBe(constants.CODES.BAD_REQUEST);
      expect(body).toHaveProperty("error");
    });
  });
  describe("given the task payload with access token and username with invalid route param", () => {
    it("should return no service", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/tasks/garbage")
        .set({ "x-auth-token": `Bearer ${payloads.jwtToken1}` })
        .set({ username: payloads.userInput1.username })
        .send(payloads.taskInput);
      expect(statusCode).toBe(404);
      expect(body).toHaveProperty("error");
    });
  });
});

describe("update task", () => {
  describe("given the task id and task payload with access token and username with valid body", () => {
    it("should return tasks updated", async () => {
      const { statusCode, body } = await supertest(app)
        .put(`/tasks/${payloads.taskInputUpdateTaskId}`)
        .set({ "x-auth-token": `Bearer ${payloads.jwtToken1}` })
        .set({ username: payloads.userInput1.username })
        .send(payloads.taskInputUpdate);
      expect(statusCode).toBe(constants.CODES.OK);
      expect(body).toEqual({ message: constants.MESSAGES.TASK_UPDATED });
    });
  });
  describe("given the task id and task payload with access token and username with invalid body", () => {
    it("should return invalid data format", async () => {
      const { statusCode, body } = await supertest(app)
        .put(`/tasks/${payloads.taskInputUpdateTaskId}`)
        .set({ "x-auth-token": `Bearer ${payloads.jwtToken1}` })
        .set({ username: payloads.userInput1.username })
        .send(payloads.taskInputInvalidFormat);
      expect(statusCode).toBe(constants.CODES.BAD_REQUEST);
      expect(body).toHaveProperty("error");
    });
  });
  describe("given the task id and task payload with access token and username with invalid route param / task ID", () => {
    it("should return no task found", async () => {
      const { statusCode, body } = await supertest(app)
        .put(`/tasks/${payloads.taskInputUpdateTaskIdInvalid}`)
        .set({ "x-auth-token": `Bearer ${payloads.jwtToken1}` })
        .set({ username: payloads.userInput1.username })
        .send(payloads.taskInputUpdate);
      expect(statusCode).toBe(404);
      expect(body).toEqual({ message: constants.MESSAGES.TASK_NOT_FOUND });
    });
  });
});

describe("read all task", () => {
  describe("given the read request with access token and username", () => {
    it("should return list of tasks", async () => {
      const { statusCode, body } = await supertest(app)
        .get(`/tasks/`)
        .set({ "x-auth-token": `Bearer ${payloads.jwtToken1}` })
        .set({ username: payloads.userInput1.username })
        .send();
      expect(statusCode).toBe(constants.CODES.OK);
    });
  });
  describe("given the read request with access token and username with query param", () => {
    it("should return list of tasks matching the query params", async () => {
      const { statusCode, body } = await supertest(app)
        .get(`/tasks/?filter=[{"priority":1}]`)
        .set({ "x-auth-token": `Bearer ${payloads.jwtToken1}` })
        .set({ username: payloads.userInput1.username })
        .send();
      expect(statusCode).toBe(constants.CODES.OK);
    });
  });
});

describe("read task by id", () => {
  describe("given the read request with access token and username with valid id", () => {
    it("should return list of tasks", async () => {
      const { statusCode, body } = await supertest(app)
        .get(`/tasks/${payloads.taskInputReadTaskId}`)
        .set({ "x-auth-token": `Bearer ${payloads.jwtToken1}` })
        .set({ username: payloads.userInput1.username })
        .send();
      expect(statusCode).toBe(constants.CODES.OK);
    });
  });
  describe("given the read request with access token and username with invalid id", () => {
    it("should return list of tasks", async () => {
      const { statusCode, body } = await supertest(app)
        .get(`/tasks/${payloads.taskInputReadTaskIdInvalid}`)
        .set({ "x-auth-token": `Bearer ${payloads.jwtToken1}` })
        .set({ username: payloads.userInput1.username })
        .send();
      expect(statusCode).toBe(404);
    });
  });
});

describe("delete task", () => {
  describe("given the task id with access token and username", () => {
    it("should return tasks updated", async () => {
      const { statusCode, body } = await supertest(app)
        .delete(`/tasks/${payloads.taskInputDeleteTaskId}`)
        .set({ "x-auth-token": `Bearer ${payloads.jwtToken1}` })
        .set({ username: payloads.userInput1.username })
        .send();
      expect(statusCode).toBe(constants.CODES.OK);
      expect(body).toEqual({ message: constants.MESSAGES.TASK_DELETED });
    });
  });
  describe("given the task id with access token and username with invalid route param / task ID", () => {
    it("should return no task found", async () => {
      const { statusCode, body } = await supertest(app)
        .delete(`/tasks/${payloads.taskInputDeleteTaskIdInvalid}`)
        .set({ "x-auth-token": `Bearer ${payloads.jwtToken1}` })
        .set({ username: payloads.userInput1.username })
        .send();
      expect(statusCode).toBe(404);
      expect(body).toEqual({ message: constants.MESSAGES.TASK_NOT_FOUND });
    });
  });
});
