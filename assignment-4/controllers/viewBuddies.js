const viewBuddies = (request, response) => {
  let buddies = JSON.parse(fs.readFileSync(database, "utf-8"));
  if (buddies.length != 0) {
    response.send(buddies);
  }
  response.send("No Employees Found");
};
module.exports = viewBuddies;
