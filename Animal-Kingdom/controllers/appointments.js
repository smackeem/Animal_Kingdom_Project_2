const Appointment = require("../models/appointments");

module.exports = {
  index,
  create,
  show,
  edit,
  update,
};

// async function appointments index
async function index(req, res) {
  try {
    const appointments = await Appointment.find({});
    res.render(
      "appointments/index",
      { title: "All Appointments" },
      appointments
    );
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
}

// async function appointments create
async function create(req, res) {
  req.body.reason = req.body.reason.trim();
  req.body.date = req.body.date.trim();
  let appointment = await Appointment.create(req.body);
  try {
    appointment.pet = await Pet.findById(req.body.pet);
    appointment.vet = await User.findById(req.params.id);
    await appointment.save();
    res.redirect(`/user/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/user/${req.params.id}`);
  }
}

// async function appointments show
async function show(req, res) {
  try {
    const appointment = await Appointment.findById(req.params.id);
    res.render(
      "appointments/show",
      { title: "Appointment Details" },
      appointment
    );
  } catch (err) {
    console.log(err);
    res.redirect(`/user/${appointment.vet._id}`);
  }
}

// async function appointments edit
async function edit(req, res) {
  try {
    const appointment = await Appointment.findById(req.params.id);
    res.render("appointments/edit", { title: "Edit Appointment" }, appointment);
  } catch (err) {
    console.log(err);
  }
}

// async function appointments update
async function update(req, res) {
  try {
    req.body.reason = req.body.reason.trim();
    req.body.date = req.body.date.trim();
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.redirect(`/user/${appointment.vet._id}`);
  } catch (err) {
    console.log(err);
  }
}
