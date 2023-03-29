/**
 * @author Karthikeyan C
 * @version 1.0
 */

// Importing the required file
const fs = require("fs");

exports.getRandom = (requested_count) => {
  // Loading the color palette
  // returns empty list if file not found
  let colorPaletteRaw;
  let isEmpty = false;
  try {
    colorPaletteRaw = fs.readFileSync("./color_ palette.json", "utf-8");
  } catch (error) {
    if (error.code == "ENOENT") {
      isEmpty = true;
    }
  }
  if (!isEmpty) {
    try {
      const colorPalette = JSON.parse(colorPaletteRaw);

      // Logging the color palette
      console.log("ColorPalette: ", colorPalette);

      let randomColors = get_random_colors(colorPalette, 5);

      if (randomColors.length !== 0) {
        return randomColors;
      } else {
        return "RandomColors is empty, aborting write process";
      }
    } catch (error) {
      return "Unable to parse JSON, check file is empty or invalid format";
    }
  } else {
    return "File Not Found, aborting the process";
  }

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

  // // Return random colors
  // let randomColors = get_random_colors(colorPalette, requested_count);
  // return randomColors;
};
