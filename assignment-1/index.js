// 1. Store the attached `color_ palette.json` in your filesystem
// 2. Read the JSON file as a JSON array from the filesystem using the core `fs` module
// 3. Randomize the color palette and take 5 colors
// 4. Programmatically create a new file `randomized_color_ palette.json` in your filesystem and write the randomized 5 colors into that file
// 5. Read the newly created `randomized_color_ palette.json` again in the same NodeJS program and print those 5 colors in the console

/**
 * @author Karthikeyan C
 * @version 1.0
 */

// Importing the required file
const fs = require("fs");

// Loading the color palette
// returns empty list if file not found
let colorPaletteRaw;
try {
  colorPaletteRaw = fs.readFileSync("./color_ palette.json", "utf-8");
} catch (error) {
  if (error.code == "ENOENT") {
    console.log("File Not Found");
    colorPaletteRaw = "[]";
  }
}

const colorPalette = JSON.parse(colorPaletteRaw);

// Logging the color palette
console.log("ColorPalette: ", colorPalette);

/**
 * Function to get n random numbers
 * @param length upper limit for the random number generation
 * @param count number of random numbers to be generated
 * @returns list of random numbers, empty list if length is 0
 */
function getRandomNumbers(length, count) {
  let result = [];
  if (length === 0) {
    console.log("List is Empty");
    return result;
  }
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
let randomColors = get_random_colors(colorPalette, 5);

if (randomColors.length !== 0) {
  // Writing the random colors into the file
  fs.writeFileSync(
    "./randomized_color_ palette.json",
    JSON.stringify(randomColors)
  );

  // Logging the random colors
  console.log(
    JSON.parse(fs.readFileSync("./randomized_color_ palette.json", "utf-8"))
  );
} else {
  console.log("RandomColors is empty, aborting write process");
}
