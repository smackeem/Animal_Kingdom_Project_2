const express = require("express");
const router = express.Router();

const recordsCtrl = require('../controllers/records');

/* GET users listing. */
router.get("/new",recordsCtrl.new);

router.post("/", recordsCtrl.create);

router.get("/", recordsCtrl.index);

module.exports = router;
