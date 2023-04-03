// setting up the controllers for the buddies
const buddiesServices = require("../services/buddies.services");

// function to add a buddy to database
const addBuddy = (request, response) => {
  let result = buddiesServices.addBuddy(request.body);
  switch (result.status) {
    case 200:
      response.status(201).send({ message: "Employee Added" });
      break;
    default:
      response.status(result.status).send({ error: result.data });
  }
};

// function to get all buddies from database
const getAllBuddies = (request, response) => {
  let result = buddiesServices.getAllBuddies();
  response.status(result.status).send(result.data);
};

// function to get a buddy from database using id
const getBuddy = (request, response) => {
  let result = buddiesServices.getBuddy(request.params.buddyId);
  if (result.data.length === 0) {
    response.status(result.status).send({ error: "Employee Not Found" });
  } else {
    response.status(result.status).send(result.data);
  }
};

// function to update the buddy details in database using id
const updateBuddy = (request, response) => {
  let result = buddiesServices.updateBuddy(
    request.params.buddyId,
    request.body
  );
  switch (result.status) {
    case 200:
      response
        .status(result.status)
        .send({ message: "Employee Information Updated" });
      break;
    default:
      response.status(result.status).send({ error: result.data });
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
