let express = require("express");
let router = express.Router();

let deleteBuddy = require("../controllers/deleteBuddy");
router.delete("/:id", deleteBuddy);

module.exports = router;
