// importing the required modules
const { readJSON, writeJSON } = require("../utilities/JSONIO");

// function to add a buddy to the database
const addBuddy = (data) => {
  let buddies = readJSON();
  if (buddies.status === 500) {
    return buddies;
  }
  if (!buddies.data.some((buddy) => buddy.employeeId === data.employeeId)) {
    buddies.data.push(data);
    let result = writeJSON(buddies.data);
    return result;
  }
  return { status: 403, data: "Employee Id Already Exists" };
};

// function to get all buddies details from the database
const getAllBuddies = () => {
  let buddies = readJSON();
  return buddies;
};

// function to get a buddy detail from the database
const getBuddy = (empId) => {
  let buddies = readJSON();
  if (buddies.status === 500) {
    return buddies;
  }
  let buddy = buddies.data.find((buddy) => buddy.employeeId == empId) || [];
  if (buddy.length === 0) return { status: 404, data: buddy };
  return { status: 200, data: buddy };
};

// function to update a buddy detail in the database
const updateBuddy = (empId, newData) => {
  let buddies = readJSON();
  if (buddies.status === 500) {
    return buddies;
  }
  let buddyIndex = buddies.data.findIndex(
    (buddy) => buddy.employeeId === empId
  );

  if (buddyIndex != -1) {
    let isModifiable = true;
    const shouldNotModify = ["employeeId", "realName", "dob"];
    for (let key in Object(newData)) {
      if (shouldNotModify.includes(key)) {
        isModifiable = false;
        break;
      } else {
        buddies.data[buddyIndex][key] = newData[key];
      }
    }
    if (isModifiable === false) {
      return { status: 403, data: "Can't Update Some Data" };
    }
    let result = writeJSON(buddies.data);
    return result;
  }
  return { status: 404, data: "Employee Not Found" };
};

// function to delete a buddy from the database
const deleteBuddy = (empId) => {
  let buddies = readJSON();
  if (buddies.status === 500) {
    return buddies;
  }
  let intialBuddiesLength = buddies.data.length;
  buddies = buddies.data.filter((buddy) => buddy.employeeId !== empId);
  if (intialBuddiesLength !== buddies.length) {
    let result = writeJSON(buddies);
    return result;
  }
};

module.exports = {
  addBuddy,
  getAllBuddies,
  getBuddy,
  updateBuddy,
  deleteBuddy,
};
