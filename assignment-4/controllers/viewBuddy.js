const viewBuddy = (request, response) => {
  let empId = request.params.id;
  let buddies = JSON.parse(fs.readFileSync(database, "utf-8"));
  let buddy = buddies.filter((buddy) => buddy.employeeId == empId);
  if (buddy.length != 0) {
    response.send(buddy);
  }
  response.send("Employee Not Found");
};
module.exports = viewBuddy;
