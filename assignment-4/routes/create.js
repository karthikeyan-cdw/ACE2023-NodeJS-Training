let express = require("express");
let router = express.Router();

let addBuddy = require("../controllers/addBuddy");
router.post("/", addBuddy);

module.exports = router;
