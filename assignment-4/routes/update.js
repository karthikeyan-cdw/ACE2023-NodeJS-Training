let express = require("express");
let router = express.Router();

let updateBuddy = require("../controllers/updateBuddy");
router.put("/:id", updateBuddy);

module.exports = router;
