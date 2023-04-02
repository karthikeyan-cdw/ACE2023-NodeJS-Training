// importing the required modules
const fs = require("fs");

// adding the database
const database = "./database/cdw_ace23_buddies.json";

// function to add a buddy to the database
const addBuddy = (data) => {
  let buddies = JSON.parse(fs.readFileSync(database, "utf-8"));
  let alreadyExists = false;
  buddies.forEach((buddy) => {
    if (buddy.employeeId === data.employeeId) {
      alreadyExists = true;
    }
  });
  if (alreadyExists) {
    return false;
  } else {
    buddies.push(data);
    fs.writeFileSync(database, JSON.stringify(buddies));
    return true;
  }
};

// function to get all buddies details from the database
const getAllBuddies = () => {
  let buddies = JSON.parse(fs.readFileSync(database, "utf-8"));
  return buddies;
};

// function to get a buddy detail from the database
const getBuddy = (empId) => {
  let buddies = JSON.parse(fs.readFileSync(database, "utf-8"));
  let buddy = buddies.filter((buddy) => buddy.employeeId == empId);
  return buddy;
};

// function to update a buddy detail in the database
const updateBuddy = (empId, newData) => {
  let buddies = JSON.parse(fs.readFileSync(database, "utf-8"));
  let buddyIndex = buddies.findIndex((buddy) => buddy.employeeId === empId);

  if (buddyIndex != -1) {
    let isModifiable = true;
    for (let key in Object(newData)) {
      if (key === "employeeId" || key === "realName" || key === "dob") {
        isModifiable = false;
      } else {
        buddies[buddyIndex][key] = newData[key];
      }
    }
    if (isModifiable === false) {
      return 403;
    } else {
      fs.writeFileSync(database, JSON.stringify(buddies));
      return 200;
    }
  } else {
    return 404;
  }
};

// function to delete a buddy from the database
const deleteBuddy = (empId) => {
  let buddies = JSON.parse(fs.readFileSync(database, "utf-8"));
  let intialBuddiesLength = buddies.length;
  buddies = buddies.filter((buddy) => buddy.employeeId !== empId);
  if (intialBuddiesLength !== buddies.length) {
    fs.writeFileSync(database, JSON.stringify(buddies));
    return true;
  } else {
    return false;
  }
};

module.exports = {
  addBuddy,
  getAllBuddies,
  getBuddy,
  updateBuddy,
  deleteBuddy,
};
