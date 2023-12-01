//routes/account.js
const express = require("express");
const router = express.Router();
const accountCtrl = require("../controllers/account");

router.get("/user/:id/myaccount", accountCtrl.getAccount);

router.put("/user/:id/myaccount", accountCtrl.updateAccount);

module.exports = router;
