const addBuddy = (request, response) => {
  let buddies = JSON.parse(fs.readFileSync(database, "utf-8"));
  let alreadyExists = false;
  buddies.forEach((buddy) => {
    if (buddy.employeeId == request.body.employeeId) {
      alreadyExists = true;
    }
  });
  if (alreadyExists) {
    response.send("Employee Already Exists");
  } else {
    buddies.push(request.body);
    fs.writeFileSync(database, JSON.stringify(buddies));
    response.send("Employee Added");
  }
};
module.exports = addBuddy;
