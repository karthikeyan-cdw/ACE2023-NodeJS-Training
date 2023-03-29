const updateBuddy = (request, response) => {
  let empId = request.params.id;
  let buddies = JSON.parse(fs.readFileSync(database, "utf-8"));
  let employeeFound = false;
  let responseMessage;
  let buddyIndex = buddies.findIndex((buddy) => buddy.employeeId === empId);

  if (buddyIndex != -1) {
  }

  let isModifiable = true;
  for (let key in Object(request.body)) {
    if (key === "employeeId" || key === "employeeId" || key === "realName") {
      isModifiable = false;
    } else {
      buddy[key] = request.body[key];
    }
  }
  fs.writeFileSync(database, JSON.stringify(buddies));
  responseMessage = "Employee Information Updated";
  employeeFound = true;

  if (!employeeFound) responseMessage = "Employee Not Found";
  response.send(responseMessage);
};
module.exports = updateBuddy;
