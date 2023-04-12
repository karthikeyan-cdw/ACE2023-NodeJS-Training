const supertest = require("supertest");
const app = require("../server");
const constants = require("../constants");
const payloads = require("./payloads");

/* This code is testing the functionality of creating a task in a task management application. It
includes several test cases using the Jest testing framework to ensure that the API endpoint for
creating a task is working as expected. The tests cover scenarios such as creating a task with valid
input, creating a task that already exists, creating a task with invalid input format, and creating
a task with an invalid route parameter. The tests use Supertest to make HTTP requests to the API and
check the response status codes and message bodies to ensure that the API is behaving correctly. */
describe("create task", () => {
  describe("given the task payload with access token and username with valid body", () => {
    it("should return tasks created", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/tasks/")
        .set({ Authorization: `Bearer ${payloads.jwtToken1}` })
        .send(payloads.taskInput);
      expect(statusCode).toBe(201);
      expect(body).toEqual({ message: constants.MESSAGES.TASK_CREATED });
    });
  });
  describe("given the task payload with access token and username with valid body which already exists", () => {
    it("should return tasks created", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/tasks/")
        .set({ Authorization: `Bearer ${payloads.jwtToken1}` })
        .send(payloads.taskInput);
      expect(statusCode).toBe(constants.CODES.CONFLICT);
      expect(body).toEqual({ message: constants.MESSAGES.TASK_EXISTS });
    });
  });
  describe("given the task payload with access token and username with invalid body", () => {
    it("should return invalid data format", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/tasks/")
        .set({ Authorization: `Bearer ${payloads.jwtToken1}` })
        .send(payloads.taskInputInvalidFormat);
      expect(statusCode).toBe(constants.CODES.BAD_REQUEST);
      expect(body).toHaveProperty("error");
    });
  });
  describe("given the task payload with access token and username with invalid route param", () => {
    it("should return no service", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/tasks/garbage")
        .set({ Authorization: `Bearer ${payloads.jwtToken1}` })
        .send(payloads.taskInput);
      expect(statusCode).toBe(404);
      expect(body).toHaveProperty("error");
    });
  });
});

/* This code is testing the functionality of reading all tasks in a task management application. It
includes two test cases using the Jest testing framework to ensure that the API endpoint for reading
all tasks is working as expected. The first test case checks if the API returns a list of tasks when
a read request is made with a valid access token and username. The second test case checks if the
API returns a list of tasks that match the query parameters when a read request is made with a valid
access token, username, and query parameters. The tests use Supertest to make HTTP requests to the
API and check the response status codes to ensure that the API is behaving correctly. */
describe("read all task", () => {
  describe("given the read request with access token and username", () => {
    it("should return list of tasks", async () => {
      const { statusCode, body } = await supertest(app)
        .get(`/tasks/`)
        .set({ Authorization: `Bearer ${payloads.jwtToken1}` })
        .send();
      expect(statusCode).toBe(constants.CODES.OK);
    });
  });
  describe("given the read request with access token and username with query param", () => {
    it("should return list of tasks matching the query params", async () => {
      const { statusCode, body } = await supertest(app)
        .get(`/tasks/?filter=[{"priority":1}]`)
        .set({ Authorization: `Bearer ${payloads.jwtToken1}` })
        .send();
      expect(statusCode).toBe(constants.CODES.OK);
    });
  });
});

/* This code is testing the functionality of reading a task by its ID in a task management application.
It includes two test cases using the Jest testing framework to ensure that the API endpoint for
reading a task by ID is working as expected. The tests cover scenarios such as reading a task with a
valid ID and reading a task with an invalid ID. The tests use Supertest to make HTTP requests to the
API and check the response status codes and message bodies to ensure that the API is behaving
correctly. */
describe("read task by id", () => {
  describe("given the read request with access token and username with valid id", () => {
    it("should return list of tasks", async () => {
      const { statusCode, body } = await supertest(app)
        .get(`/tasks/${payloads.taskInputReadTaskId}`)
        .set({ Authorization: `Bearer ${payloads.jwtToken1}` })
        .send();
      expect(statusCode).toBe(constants.CODES.OK);
    });
  });
  describe("given the read request with access token and username with invalid id", () => {
    it("should return list of tasks", async () => {
      const { statusCode, body } = await supertest(app)
        .get(`/tasks/${payloads.taskInputReadTaskIdInvalid}`)
        .set({ Authorization: `Bearer ${payloads.jwtToken1}` })
        .send();
      expect(statusCode).toBe(404);
    });
  });
});

/* This code is testing the functionality of updating a task in a task management application. It
includes three test cases using the Jest testing framework to ensure that the API endpoint for
updating a task is working as expected. The tests cover scenarios such as updating a task with valid
input, updating a task with invalid input format, and updating a task with an invalid route
parameter. The tests use Supertest to make HTTP requests to the API and check the response status
codes and message bodies to ensure that the API is behaving correctly. */
describe("update task", () => {
  describe("given the task id and task payload with access token and username with valid body", () => {
    it("should return tasks updated", async () => {
      const { statusCode, body } = await supertest(app)
        .put(`/tasks/${payloads.taskInputUpdateTaskId}`)
        .set({ Authorization: `Bearer ${payloads.jwtToken1}` })
        .send(payloads.taskInputUpdate);
      expect(statusCode).toBe(constants.CODES.OK);
      expect(body).toEqual({ message: constants.MESSAGES.TASK_UPDATED });
    });
  });
  describe("given the task id and task payload with access token and username with invalid body", () => {
    it("should return invalid data format", async () => {
      const { statusCode, body } = await supertest(app)
        .put(`/tasks/${payloads.taskInputUpdateTaskId}`)
        .set({ Authorization: `Bearer ${payloads.jwtToken1}` })
        .send(payloads.taskInputInvalidFormat);
      expect(statusCode).toBe(constants.CODES.BAD_REQUEST);
      expect(body).toHaveProperty("error");
    });
  });
  describe("given the task id and task payload with access token and username with invalid route param / task ID", () => {
    it("should return no task found", async () => {
      const { statusCode, body } = await supertest(app)
        .put(`/tasks/${payloads.taskInputUpdateTaskIdInvalid}`)
        .set({ Authorization: `Bearer ${payloads.jwtToken1}` })
        .send(payloads.taskInputUpdate);
      expect(statusCode).toBe(404);
      expect(body).toEqual({ message: constants.MESSAGES.TASK_NOT_FOUND });
    });
  });
});

/* This code is testing the functionality of deleting a task in a task management application. It
includes two test cases using the Jest testing framework to ensure that the API endpoint for
deleting a task is working as expected. The tests cover scenarios such as deleting a task with a
valid ID and deleting a task with an invalid ID. The tests use Supertest to make HTTP requests to
the API and check the response status codes and message bodies to ensure that the API is behaving
correctly. */
describe("delete task", () => {
  describe("given the task id with access token and username", () => {
    it("should return tasks updated", async () => {
      const { statusCode, body } = await supertest(app)
        .delete(`/tasks/${payloads.taskInputDeleteTaskId}`)
        .set({ Authorization: `Bearer ${payloads.jwtToken1}` })
        .send();
      expect(statusCode).toBe(constants.CODES.OK);
      expect(body).toEqual({ message: constants.MESSAGES.TASK_DELETED });
    });
  });
  describe("given the task id with access token and username with invalid route param / task ID", () => {
    it("should return no task found", async () => {
      const { statusCode, body } = await supertest(app)
        .delete(`/tasks/${payloads.taskInputDeleteTaskIdInvalid}`)
        .set({ Authorization: `Bearer ${payloads.jwtToken1}` })
        .send();
      expect(statusCode).toBe(404);
      expect(body).toEqual({ message: constants.MESSAGES.TASK_NOT_FOUND });
    });
  });
});
