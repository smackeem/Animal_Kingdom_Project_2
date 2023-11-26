const express = require('express');
const router = express.Router();

const appointmentCtrl = require('../controllers/appointment');

router.get('/user/:id/appointments/new', appointmentCtrl.new);

router.get('/user/:id/appointments', appointmentCtrl.index);

router.get('/user/:userId/appointments/:id/book', appointmentCtrl.petAppt)

router.post('/user/:id/appointments', appointmentCtrl.create);

router.delete('/user/:userId/appointments/:id', appointmentCtrl.delete);

router.put('/user/:userId/appointments/:id', appointmentCtrl.book);

module.exports = router;