const supertest = require("supertest");
const app = require("../server");
const constants = require("../constants");
const payloads = require("./payloads");

/* This code is testing the user registration functionality of an authentication API. It includes
several test cases with different scenarios such as valid username and password, existing username,
and invalid format. The tests use the Supertest library to make HTTP requests to the API and check
the response status code and body against expected values. The constants and payloads modules are
used to provide input data and expected output messages for the tests. The tests are organized using
the `describe` and `it` functions to group related test cases and provide clear descriptions of what
is being tested. */
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
      expect(statusCode).toBe(constants.CODES.CONFLICT);
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

/* This code is testing the user login functionality of an authentication API. It includes several test
cases with different scenarios such as valid username and password, invalid password, user not
found, and invalid format. The tests use the Supertest library to make HTTP requests to the API and
check the response status code and body against expected values. The constants and payloads modules
are used to provide input data and expected output messages for the tests. The tests are organized
using the `describe` and `it` functions to group related test cases and provide clear descriptions
of what is being tested. */
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

/* This code is testing the access token validation functionality of an authentication API. It includes
several test cases with different scenarios such as missing access token, expired access token, and
invalid access token. The tests use the Supertest library to make HTTP requests to the API and check
the response status code and body against expected values. The constants and payloads modules are
used to provide input data and expected output messages for the tests. The tests are organized using
the `describe` and `it` functions to group related test cases and provide clear descriptions of what
is being tested. */
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
  describe("given the payload with access token and username but expired access token", () => {
    it("should return username not found in header", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/tasks/")
        .set({ Authorization: `Bearer ${payloads.jwtToken2}` })
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
        .set({ Authorization: `Bearer ${"Dummy_token"}` })
        .set({ username: payloads.userInput2.username })
        .send(payloads.taskInput);
      expect(statusCode).toBe(constants.CODES.UNAUTHORIZED);
      expect(body).toEqual({
        message: constants.MESSAGES.AUTH_ACCESS_TOKEN_INVALID,
      });
    });
  });
});
