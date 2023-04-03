// importing the required modules
const express = require("express");
const {
  addBuddy,
  getAllBuddies,
  getBuddy,
  updateBuddy,
  deleteBuddy,
} = require("../controllers/buddies.controllers.js");

// setting up the routes for the buddies
const router = express.Router();
router.post("/", addBuddy);
router.get("/", getAllBuddies);
router.get("/:buddyId", getBuddy);
router.put("/:buddyId", updateBuddy);
router.delete("/:buddyId", deleteBuddy);
router.use("/", (request, response) => {
  response.send({ error: "This API wont serves this request" });
});

module.exports = router;
