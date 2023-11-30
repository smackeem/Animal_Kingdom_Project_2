// controller/user.js
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Pet = require("../models/pet");
const Record = require("../models/record");
const Appointment = require("../models/appointment");
const today = new Date();
const bcrypt = require("bcryptjs");

module.exports = {
  create,
  login,
  show,
};

async function create(req, res, next) {
  try {
    const { username, email } = req.body;
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email })
    if (existingUser) return res.status(500).render("users/signup", {title: "Sign up", errMsg: "Username already exists. Please choose a new one."});
    if (existingEmail) return res.status(500).render("users/signup", {title: "Sign up", errMsg: "Email already exists. Please choose a new one."});
    const newUser = await User.create(req.body);
    newUser.address = req.body;
    await newUser.save().then((newUser) => {
        const token = jwt.sign({ _id: newUser._id }, process.env.SECRET, {expiresIn: "60 days"});
        res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
        return res.redirect("/user/login");
      }).catch((error) => {
        res.status(500).render("users/signup", { errMsg: error.message });
      });
  } catch (error) {
    res.status(500).render("users/signup", { errMs: error.message });
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();
    if (!user) {
      return res.status(500).render("users/login", { errMsg: "Invalid username" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(500).render("users/login", { errMsg: "Invalid password" });
    }
    
    const token = jwt.sign({ _id: user._id }, process.env.SECRET, {expiresIn: "60 days"});
    res.cookie("nToken", token, { maxAge: 900000, httpOnly: true });
    res.redirect(`/user/${user._id}`);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).render("users/login", { errMsg: "Error Loading Your Profile" });
  }
}

async function show(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    const allPets = await Pet.find({});
    const pets = await Pet.find({ owner: { _id: user._id } }).populate("owner");
    const vetRecords = await Record.find({ vet: { _id: user._id } }).populate("pet");
    const allPatients = vetRecords.map((record) => record.pet);
    const patients = mergeDuplicates(allPatients, ["_id"]);
    const petAppointments = await Appointment.find({
      pet: { $in: pets },
      date: { $gte: today },
    })
      .populate("pet")
      .populate("vet")
      .sort({ date: 1 });
    const vetAppointments = await Appointment.find({
      vet: req.params.id,
      isAvailable: false,
      date: { $gte: today },
    })
      .populate("pet")
      .sort({ date: 1 });
    res.render("users/show", {
      errMsg: "",
      title: `${user.firstName}'s Profile`,
      user,
      pets,
      vetRecords,
      patients,
      petAppointments,
      vetAppointments,
      allPets
    });
  } catch (err) {
    res.redirect(`/user/${req.params.userId}`);
  }
}

function mergeDuplicates(arr, key) {
  const uniqueMap = new Map();
  arr.forEach((item) => {
    const identifier = key.map((k) => item[k]).join("|");
    if (uniqueMap.has(identifier)) {
      Object.assign(uniqueMap.get(identifier), item);
    } else {
      uniqueMap.set(identifier, { ...item });
    }
  });
  const mergedArray = Array.from(uniqueMap.values());
  return mergedArray;
}
