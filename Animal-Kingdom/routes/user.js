const express = require("express");
const router = express.Router();

const userCtrl = require('../controllers/users');

router.get('/:id', userCtrl.show);

module.exports = router;