//routes/records.js
const express = require("express");
const router = express.Router();

const recordsCtrl = require("../controllers/records");

/* GET users listing. */
router.get("/user/:id/records", recordsCtrl.index);

// router.get("/user/:id/records/new", recordsCtrl.new);

router.get("/user/:id/records/:id/edit", recordsCtrl.edit);

router.post("/user/:id/records", recordsCtrl.create);

router.get("/user/:id/records/:id", recordsCtrl.show);

router.delete("/user/:id/records/:id", recordsCtrl.delete);

router.put("/user/:userId/records/:id", recordsCtrl.update);

module.exports = router;
