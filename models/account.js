const express = require("express");
const router = express.Router();
const User = require("../models/user");
const accountCtrl = require("../controllers/account");

router.get("/myaccount", accountCtrl.getAccount);
router.put("/myaccount", accountCtrl.updateAccount);

module.exports = router;
