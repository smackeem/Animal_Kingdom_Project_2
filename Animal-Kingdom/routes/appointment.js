const express = require("express");
const router = express.Router();

const appointmentCtrl = require("../controllers/appointment");

router.get("/", appointmentCtrl.index);

router.post("/", appointmentCtrl.create);

router.get("/:id", appointmentCtrl.show);

router.get("/:id/edit", appointmentCtrl.edit);

router.put("/:id", appointmentCtrl.update);

module.exports = router;
