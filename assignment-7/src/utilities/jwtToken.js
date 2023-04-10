// importing the required modules
const jwt = require("jsonwebtoken");

/**
 * The function generates a JSON Web Token (JWT) with a specified expiry duration for a given username
 * using a secret key.
 * @param username - The `username` parameter is a string that represents the user's username. It is
 * used as the payload for the JSON Web Token (JWT).
 * @param [expiryDuration=30m] - The `expiryDuration` parameter is an optional parameter that specifies
 * the duration for which the JWT token will be valid. It is set to a default value of "30m", which
 * means the token will expire after 30 minutes. However, you can pass a different value to this.
 * @returns The `getJWTToken` function is returning a JSON Web Token (JWT) that contains the `username`
 * parameter as its payload, signed with the `JWT_SECRET_KEY` environment variable and set to expire
 * after the duration specified by the `expiryDuration` parameter (defaulting to 30 minutes if not
 * provided).
 */
const getJWTToken = (username, expiryDuration = "30m") => {
  return jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
    expiresIn: expiryDuration,
  });
};

/**
 * This function verifies a JSON Web Token (JWT) using a secret key.
 * @param jwtToken - The jwtToken parameter is a JSON Web Token (JWT) that needs to be verified. It is
 * a string that contains encoded information about a user or client. The verifyJWTToken function takes
 * this token as input and verifies its authenticity using a secret key.
 * @returns The function `verifyJWTToken` is returning the result of calling the `jwt.verify` method
 * with the `jwtToken` and the `JWT_SECRET_KEY` environment variable as arguments. This method verifies
 * the authenticity of the JWT token and returns the decoded payload if the token is valid. Therefore,
 * the function is returning the decoded payload of the JWT token.
 */
const verifyJWTToken = (jwtToken) => {
  return jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
};

module.exports = { getJWTToken, verifyJWTToken };
