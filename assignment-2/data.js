// Importing the required file
const fs = require("fs");

exports.getRandom = (requested_count) => {
  // Loading the color palette
  const colorPalette = JSON.parse(
    fs.readFileSync("./color_ palette.json", "utf-8")
  );

  /**
   * Function to get n random numbers
   * @param length upper limit for the random number generation
   * @param count number of random numbers to be generated
   * @returns list of random numbers
   */
  function getRandomNumbers(length, count) {
    let result = [];
    while (result.length != count) {
      let random_number = Math.floor(Math.random() * length);
      if (result.includes(random_number)) {
        continue;
      }
      result.push(random_number);
    }
    return result;
  }

  /**
   * Function to get n random elements from an array
   * @param list the list to get random elements from
   * @param count number of random elements required
   * @returns list of rnadom elements
   */
  function get_random_colors(list, count) {
    let result = [],
      randIndices = getRandomNumbers(list.length, count);
    for (let index of randIndices) {
      result.push(list[index]);
    }
    return result;
  }

  // Return random colors
  let randomColors = get_random_colors(colorPalette, requested_count);
  return randomColors;
};
