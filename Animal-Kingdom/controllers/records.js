//controllers/records.js
const Record = require("../models/record");
const Pet = require("../models/pet");
const User = require("../models/users");

module.exports = {
  new: newRecord,
  create,
  index,
  delete: deleteRecord,
  show,
  edit,
  update,
};

async function newRecord(req, res, next) {
  try {
    const pets = await Pet.find({});
    const user = await User.findById(req.params.id);
    res.render("records/new", {
      title: "New Medical Record",
      errMsg: "",
      pets,
      user,
    });
  } catch (err) {
    console.log(err);
  }
}

async function create(req, res, next) {
  req.body.diagnosis = req.body.diagnosis.trim();
  req.body.treatment = req.body.treatment.trim();
  req.body.medication = req.body.medication.trim();
  let record = await Record.create(req.body);
  try {
    record.pet = await Pet.findById(req.body.pet);
    record.vet = await User.findById(req.params.id);
    await record.save();
    res.redirect(`/user/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/user/${req.params.id}`);
  }
}

async function index(req, res, next) {
  try {
    const records = await Record.find({});
    res.render("records/index", { title: "All Medical Records", records });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
}

async function deleteRecord(req, res, next) {
  try {
    const record = await Record.findById(req.params.id);
    await Record.findByIdAndDelete(req.params.id);
    res.redirect(`/user/${record.vet._id}`);
  } catch (err) {
    console.log(err);
  }
}

async function show(req, res, next) {
  try {
    const record = await Record.findById(req.params.id)
      .populate("vet")
      .populate("pet");
    const user = record.vet;
    res.render("records/show", { title: "Pet medical record", record, user });
  } catch (err) {
    console.log(err);
  }
}

async function edit(req, res, next) {
  try {
    const record = await Record.findById(req.params.id).populate("pet");
    const pets = await Pet.find({});
    res.render("records/edit", {
      title: "Edit Medical Record",
      errMsg: "",
      record,
      pets,
      user: record.vet,
    });
  } catch (err) {
    console.log(err);
  }
}

async function update(req, res, next) {
  try {
    req.body.diagnosis = req.body.diagnosis.trim();
    req.body.treatment = req.body.treatment.trim();
    req.body.medication = req.body.medication.trim();
    const record = await Record.findById(req.params.id);
    await Record.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/user/${record.vet}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/user/${record.vet}`);
  }
}
