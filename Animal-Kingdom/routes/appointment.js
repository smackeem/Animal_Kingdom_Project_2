const express = require('express');
const router = express.Router();

const appointmentCtrl = require('../controllers/appointment');

router.get('/user/:id/appointments/new', appointmentCtrl.new);

router.get('/user/:id/appointments', appointmentCtrl.index);

router.post('/user/:id/appointments', appointmentCtrl.create);

router.delete('/user/:userId/appointments/:id', appointmentCtrl.delete);

module.exports = router;