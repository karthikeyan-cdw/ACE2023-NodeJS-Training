let express = require("express");
let router = express.Router();

let viewBuddies = require("../controllers/viewBuddies");
router.get("/", viewBuddies);
let viewBuddy = require("../controllers/viewBuddy");
router.get("/:id", viewBuddy);

module.exports = router;
