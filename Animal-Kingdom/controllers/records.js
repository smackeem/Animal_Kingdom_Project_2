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
  formatDateTime
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
    res.status(500).render("users/show", { errMsg: "Error Loading Page. Try again!"});
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
    res.status(500).render("records/new", { errMsg: "Error creating Record. Review inputs and try again!" });
  }
}

async function index(req, res, next) {
  try {
    const records = await Record.find({});
    res.render("records/index", { title: "All Medical Records", records });
  } catch (err) {
    console.log(err);
    res.status(500).render("users/show", { errMsg: "Error loading Records. Try again!" });
  }
}

async function deleteRecord(req, res, next) {
  try {
    const record = await Record.findById(req.params.id);
    await Record.findByIdAndDelete(req.params.id);
    res.redirect(`/user/${record.vet._id}`);
  } catch (err) {
    console.log(err);
    res.status(500).render("pets/show", { errMsg: "Error DELETING Record. TRY again!" });
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
    res.status(500).render("users/show", { errMsg: "Error loading Record. Try again!" });
  }
}

async function edit(req, res, next) {
  try {
    const record = await Record.findById(req.params.id).populate("pet");
    const pets = await Pet.find({});
    rDate = formatDateTime(record.date);
    res.render("records/edit", {
      title: "Edit Medical Record",
      errMsg: "",
      record,
      pets,
      user: record.vet,
     rDate,
    });
  } catch (err) {
    console.log(err);
    res.status(500).render("pets/show", { errMsg: "Error Loading Page. Try again!" });
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
    res.status(500).render("pets/show", { errMsg: "Error Updating Record. Try again!" });
  }
}

function formatDateTime(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}