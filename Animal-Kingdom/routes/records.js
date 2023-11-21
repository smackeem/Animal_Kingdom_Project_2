const express = require("express");
const router = express.Router();

const recordsCtrl = require('../controllers/records');

/* GET users listing. */
router.get("/", recordsCtrl.index);

router.get("/new",recordsCtrl.new);

router.post("/", recordsCtrl.create);

router.get("/:id", recordsCtrl.show);

router.delete("/:id", recordsCtrl.delete);

module.exports = router;
