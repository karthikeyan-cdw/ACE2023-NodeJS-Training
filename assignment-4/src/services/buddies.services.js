// importing the required modules
const { readJSON, writeJSON } = require("../utilities/JSONIO");

// function to add a buddy to the database
const addBuddy = (data) => {
  let buddies = readJSON();
  if (!buddies.some((buddy) => buddy.employeeId === data.employeeId)) {
    buddies.push(data);
    writeJSON(buddies);
    return true;
  }
  return false;
};

// function to get all buddies details from the database
const getAllBuddies = () => {
  let buddies = readJSON();
  return buddies;
};

// function to get a buddy detail from the database
const getBuddy = (empId) => {
  let buddies = readJSON();
  let buddy = buddies.find((buddy) => buddy.employeeId == empId) || [];
  return buddy;
};

// function to update a buddy detail in the database
const updateBuddy = (empId, newData) => {
  let buddies = readJSON();
  let buddyIndex = buddies.findIndex((buddy) => buddy.employeeId === empId);

  if (buddyIndex != -1) {
    let isModifiable = true;
    const shouldNotModify = ["employeeId", "realName", "dob"];
    for (let key in Object(newData)) {
      if (shouldNotModify.includes(key)) {
        isModifiable = false;
        break;
      } else {
        buddies[buddyIndex][key] = newData[key];
      }
    }
    if (isModifiable === false) {
      return 403;
    }
    writeJSON(buddies);
    return 200;
  }
  return 404;
};

// function to delete a buddy from the database
const deleteBuddy = (empId) => {
  let buddies = readJSON();
  let intialBuddiesLength = buddies.length;
  buddies = buddies.filter((buddy) => buddy.employeeId !== empId);
  if (intialBuddiesLength !== buddies.length) {
    writeJSON(buddies);
    return true;
  }
  return false;
};

module.exports = {
  addBuddy,
  getAllBuddies,
  getBuddy,
  updateBuddy,
  deleteBuddy,
};
