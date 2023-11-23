const express = require('express')
const router = express.Router()

const petCtrl = require('../controllers/pet')

router.get("/user/:id/pets", petCtrl.index);

router.get("/user/:id/pets/new",petCtrl.new);

router.get("/user/:id/pets:id/edit", petCtrl.edit);

router.post("/user/:id/pets", petCtrl.create);

router.get("/user/:id/pets/:id", petCtrl.show);

router.delete("/user/:id/pets/:id", petCtrl.delete);

router.put("/user/:id/pets/:id", petCtrl.update);

module.exports = router;