const express = require('express')
const router = express.Router()

const petCtrl = require('../controllers/pet')

router.get("/", petCtrl.index);

router.get("/new",petCtrl.new);

router.post("/", petCtrl.create);

router.get("/:id", petCtrl.show);

router.delete("/:id", petCtrl.delete);

module.exports = router;