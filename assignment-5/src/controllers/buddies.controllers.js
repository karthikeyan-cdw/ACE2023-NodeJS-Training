// setting up the controllers for the buddies
const buddiesServices = require("../services/buddies.services");

// function to add a buddy to database
const addBuddy = (request, response) => {
  if (buddiesServices.addBuddy(request.body))
    response.status(201).send({ message: "Employee Added" });
  else response.status(403).send({ error: "Employee Id Already Exists" });
};

// function to get all buddies from database
const getAllBuddies = (request, response) => {
  let buddies = buddiesServices.getAllBuddies();
  response.status(200).send(buddies);
};

// function to get a buddy from database using id
const getBuddy = (request, response) => {
  let buddy = buddiesServices.getBuddy(request.params.buddyId);
  if (buddy.length === 0) {
    response.status(404).send({ error: "Employee Not Found" });
  } else {
    response.status(200).send(buddy);
  }
};

// function to update the buddy details in database using id
const updateBuddy = (request, response) => {
  let statusCode = buddiesServices.updateBuddy(
    request.params.buddyId,
    request.body
  );
  if (statusCode === 200) {
    response.status(200).send({ message: "Employee Information Updated" });
  } else if (statusCode === 403) {
    response.status(403).send({ error: "Can't Update Some Data" });
  } else {
    response.status(404).send({ error: "Employee Not Found" });
  }
};

// function to delete a buddy in database using id
const deleteBuddy = (request, response) => {
  if (buddiesServices.deleteBuddy(request.params.buddyId)) {
    response.status(200).send({ message: "Employee Deleted" });
  } else {
    response.status(404).send({ error: "Employee Not Found" });
  }
};

module.exports = {
  addBuddy,
  getBuddy,
  getAllBuddies,
  updateBuddy,
  deleteBuddy,
};
