// importing the required modules
const express = require("express");

// setting up the routes for the buddies
const router = express.Router();
const {
  addBuddy,
  getAllBuddies,
  getBuddy,
  updateBuddy,
  deleteBuddy,
} = require("../controllers/buddies.controllers.js");
router.post("/", addBuddy);
router.get("/", getAllBuddies);
router.get("/:buddyId", getBuddy);
router.put("/:buddyId", updateBuddy);
router.delete("/:buddyId", deleteBuddy);

module.exports = router;
