const Appointment = require('../models/appointment');
const Record = require('../models/record');
const Pet = require('../models/pet');
const User = require('../models/users');
const appointment = require('../models/appointment');
const today = new Date();
module.exports = {
    new: newAppt,
    create,
    index,
    delete: deleteAppt,
    book,
    petAppt,
    cancel
}

async function newAppt(req, res, next){
    try{
        const user = await User.findById(req.params.id);
        res.render('appointments/new',{title: 'New Medical Record', errMsg: '', user});
    }catch(err){
        console.log(err);
    }
}

async function create(req, res, next){
    try{
        const appointment = await Appointment.create(req.body);
        appointment.vet = await User.findById(req.params.id);
        appointment.isAvailable = true;
        await appointment.save();
        res.redirect(`/user/${req.params.id}/appointments`);
    }catch(err){
        console.log(err)
        res.redirect(`/user/${req.params.id}`);
    }
}

async function index(req, res, next){
    try{
        const user = await User.findById(req.params.id);
        const availabilities = await Appointment.find({vet: req.params.id, isAvailable: true, date: {$gte: today}}).sort({date: 1});
        const appointments = await Appointment.find({isAvailable: true, date: {$gte: today}}).sort({date: 1});
        res.render('appointments/index', {title: 'Your Availabilities', availabilities, user, appointments})
    }catch(err){
        console.log(err);
    }
}

async function deleteAppt(req, res, next){
    try{
        await Appointment.findByIdAndDelete(req.params.id);
        res.redirect(`/user/${req.params.userId}/appointments`);
    }catch(err){
        console.log(err);
        res.redirect(`/user/${req.params.userId}/appointments`);
    }
}

async function petAppt(req, res, next){
    try{
        const user = await User.findById(req.params.userId);
        const pets = await Pet.find({owner: req.params.userId});
        const appointment = await Appointment.findById(req.params.id);
        res.render('appointments/book',{title: "Book Appointment", user, pets, appointment})
    }catch(err){
        console.log(err);
    }
}

async function book(req, res, next){
    req.body.reason = req.body.reason.trim()
    req.body.isAvailable = false;
    try{
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/user/${req.params.userId}`);
    }catch(err){
        console.log(err);
        res.redirect(`/user/${req.params.userId}`);
    }
}

async function cancel(req, res, next){
    try{
        const appointment = await Appointment.findById(req.params.id);
        appointment.pet = undefined;
        appointment.reason = undefined;
        appointment.isAvailable = true;
        appointment.save();
        res.redirect(`/user/${req.params.userId}`)
    }catch(err){
        console.log(err);
        res.redirect(`/user/${req.params.userId}`);
    }
}