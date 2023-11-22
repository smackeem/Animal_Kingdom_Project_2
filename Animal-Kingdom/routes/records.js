const express = require("express");
const router = express.Router();

const recordsCtrl = require('../controllers/records');

/* GET users listing. */
router.get("/records", recordsCtrl.index);

router.get("/records/new",recordsCtrl.new);

router.post("/records", recordsCtrl.create);

router.get("/records/:id", recordsCtrl.show);

router.delete("/records/:id", recordsCtrl.delete);

module.exports = router;
