// importing required modules
const bcrypt = require("bcrypt");

const saltRounds = Number(process.env.BCRYPT_SALT) || 10;

/**
 * The function creates a hash using bcrypt algorithm with a given text and salt rounds.
 * @param text - The text parameter is the string that needs to be hashed using the bcrypt algorithm.
 * @returns The function `createHash` is returning the result of calling `bcrypt.hashSync` with the
 * `text` parameter and `saltRounds` constant as arguments. The `bcrypt.hashSync` function is used to
 * generate a hash value for the given text using a salt and a specified number of rounds. Therefore,
 * the return value of `createHash` is the hash value generated.`
 */
const createHash = (text) => {
  return bcrypt.hashSync(text, saltRounds);
};

/**
 * The function verifies if a given text matches a given hash using bcrypt.
 * @param text - The plain text that needs to be verified against the hash.
 * @param hash - The hash parameter is a string that represents the hashed value of some text. It is
 * typically generated using a hashing algorithm like bcrypt, which takes in a plain text string and
 * outputs a fixed-length string of characters that represents the original text in a way that is
 * difficult to reverse.
 * @returns The function `verifyHash` is returning a boolean value indicating whether the `text`
 * parameter matches the `hash` parameter after being hashed with bcrypt. If the two values match, the
 * function will return `true`, otherwise it will return `false`.
 */
const verifyHash = (text, hash) => {
  return bcrypt.compareSync(text, hash);
};

module.exports = { createHash, verifyHash };
