const deleteBuddy = (request, response) => {
  let empId = request.params.id;
  let buddies = JSON.parse(fs.readFileSync(database, "utf-8"));
  let intialBuddiesLength = buddies.length;
  buddies = buddies.filter((buddy) => buddy.employeeId !== empId);
  if (intialBuddiesLength !== buddies.length) {
    fs.writeFileSync(database, JSON.stringify(buddies));
    response.send("Employee Deleted");
  } else {
    response.send("Employee Not Found");
  }
};
module.exports = deleteBuddy;
