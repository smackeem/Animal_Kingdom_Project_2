//routes/account.js

const express = require("express");
const router = express.Router();
const accountCtrl = require("../controllers/account");

router.get("/myaccount", accountCtrl.getAccount); // get account

router.put("/myaccount", accountCtrl.updateAccount); // update account

module.exports = router;
