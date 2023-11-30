//routes/account.js

const express = require("express");
const router = express.Router();
const accountCtrl = require("../controllers/account");

router.get("/user/:id/myaccount", accountCtrl.getAccount); // get account

router.put("/user/:id/myaccount", accountCtrl.updateAccount); // update account

module.exports = router;
