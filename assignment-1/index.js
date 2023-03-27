// 1. Store the attached `color_ palette.json` in your filesystem
// 2. Read the JSON file as a JSON array from the filesystem using the core `fs` module
// 3. Randomize the color palette and take 5 colors
// 4. Programmatically create a new file `randomized_color_ palette.json` in your filesystem and write the randomized 5 colors into that file
// 5. Read the newly created `randomized_color_ palette.json` again in the same NodeJS program and print those 5 colors in the console

// Importing the required file
const fs = require("fs");

// Loading the color palette
const colorPalette = JSON.parse(
  fs.readFileSync("./color_ palette.json", "utf-8")
);

// Logging the color palette
console.log(colorPalette);

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
let randomColors = get_random_colors(colorPalette, 5);

// Writing the random colors into the file
fs.writeFileSync(
  "./randomized_color_ palette.json",
  JSON.stringify(randomColors)
);

// Logging the random colors
console.log(
  JSON.parse(fs.readFileSync("./randomized_color_ palette.json", "utf-8"))
);
