//controllers/pet.js
const Pet = require("../models/pet");
const User = require("../models/users");
const Record = require("../models/record");
const Appointment = require("../models/record");

module.exports = {
  index,
  create,
  show,
  delete: deletePet,
  edit,
  update,
};

async function index(req, res) {
  try {
    const pets = await Pet.find({});
    res.render("pets/index", { title: "My Pets" }, pets);
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
}

async function create(req, res) {
  req.body.name = req.body.name.trim();
  req.body.breed = req.body.breed.trim();
  req.body.age = req.body.age.trim();
  const pet = await Pet.create(req.body);
  try {
    const owner = await User.findById(req.params.id);
    pet.owner = owner;
    pet.save();
    res.redirect(`/user/${pet.owner._id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/user/${pet.owner._id}`);
  }
}

async function show(req, res) {
  try {
    const pet = await Pet.findById(req.params.id).populate("owner");
    const user = await User.findById(req.params.userId);
    const records = await Record.find({ pet: pet._id }).sort({date: -1});
    res.render("pets/show", { title: "Pet Profile", pet, records, user });
  } catch (err) {
    console.log(err);
    res.redirect(`/user/${pet.owner._id}`);
  }
}

async function deletePet(req, res) {
  try {
    console.log("testing");
    const pet = await Pet.findById(req.params.id);
    const appointments = await Appointment.find({pet: pet._id});
    await Promise.all(appointments.map(async (appointment) => {
      appointment.isAvailable = true;
      await appointment.save();
    }));
    await Pet.findByIdAndDelete(req.params.id);
    res.redirect(`/user/${pet.owner}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/user/${pet.owner._id}`);
  }
}

async function edit(req, res, next) {
  try {
    const pet = await Pet.findById(req.params.id);
    const user = pet.owner;
    res.render("pets/edit", { title: "Edit Pet Profile", pet, user });
  } catch (err) {
    console.log(err);
    res.redirect(`/user/${pet.owner._id}`);
  }
}

async function update(req, res, next) {
  try {
    req.body.name = req.body.name.trim();
    req.body.breed = req.body.breed.trim();
    const pet = await Pet.findById(req.params.id);
    await Pet.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/user/${pet.owner._id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/user/${pet.owner._id}`);
  }
}
