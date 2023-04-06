// importing required modules
const bcrypt = require("bcrypt");

const saltRounds = process.env.BCRYPT_SALT || 10;

/**
 * @summary The function createHashs a given text using bcrypt hashing algorithm.
 * @param text - The text that needs to be createHashed.
 * @author @karthikeyan-c
 */
const createHash = (text) => {
  return bcrypt.hashSync(text, saltRounds);
};

/**
 * @summary The function uses bcrypt to compare a plain text input with a hashed value and returns a boolean
 * result.
 * @param text - The plain text that needs to be verified against the hash.
 * @param hash - The `hash` parameter is a string that represents the hashed value of some text. It is
 * typically generated using a hashing algorithm like bcrypt, which takes in a plain text value and
 * produces a fixed-length string that is unique to that input. The purpose of hashing is to securely
 * store sensitive information like passwords.
 * @author @karthikeyan-c
 */
const verifyHash = (text, hash) => {
  return bcrypt.compareSync(text, hash);
};

module.exports = { createHash, verifyHash };
